import os
import re
import requests
import json
import base64
import sys
import time
import argparse
import subprocess
from typing import List, Tuple

# Attempt to load mapping for Kannada script
try:
    from kannada_mapping import KANNADA_MAPPING
except ImportError:
    KANNADA_MAPPING = {}

# Load API key from .env file
def load_api_key():
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    if not os.path.exists(env_path):
        print(f"Error: .env file not found at {env_path}")
        return None
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('GOOGLE_CLOUD_API_KEY='):
                return line.split('=')[1].strip()
    return None

def parse_markdown_script(file_path: str) -> List[Tuple[str, str]]:
    """Parses a markdown script into a list of (speaker, text) tuples."""
    if not os.path.exists(file_path):
        print(f"Error: Script file not found at {file_path}")
        return []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match patterns like **Speaker**: Text
    # This regex is simple but should work for the provided sample
    matches = re.findall(r'\*\*(.*?)\*\*:\s*(.*?)(?=\n\*\*|\Z)', content, re.DOTALL)
    
    # Process text to remove extra newlines
    processed = [(speaker, text.strip()) for speaker, text in matches]
    return processed

def wrap_with_ssml(text: str, default_lang="en-IN") -> str:
    """
    Wraps text with SSML tags, handling ⟨phonetic⟩ tags by wrapping them 
    in the appropriate language code.
    """
    # Regex to find phonetic tags
    phonetic_pattern = re.compile(r'⟨(?P<phonetic>[^⟩]+)⟩')
    
    def replace_phonetic(match):
        phonetic_text = match.group('phonetic').strip()
        # Clean up key for mapping lookup
        safe_key = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic_text).strip('_')
        
        # Try to find the Kannada word in the mapping, otherwise use text with space normalization
        kannada_word = KANNADA_MAPPING.get(safe_key, phonetic_text.replace('-', ' '))
        
        # Wrap in Kannada lang tag
        return f"<lang xml:lang='kn-IN'>{kannada_word}</lang>"

    # First, handle phonetic tags
    processed_text = phonetic_pattern.sub(replace_phonetic, text)
    
    # Wrap entire chunk in speak and default lang
    return f"<speak><lang xml:lang='{default_lang}'>{processed_text}</lang></speak>"

def generate_podcast_audio(script_path: str, output_dir_name: str):
    api_key = load_api_key()
    if not api_key:
        sys.exit(1)

    # Setup directories
    base_dir = os.path.dirname(os.path.dirname(__file__))
    output_dir = os.path.join(base_dir, 'docs', 'assets', output_dir_name)
    os.makedirs(output_dir, exist_ok=True)

    # Parse script
    script_data = parse_markdown_script(script_path)
    if not script_data:
        print("No dialogue found in script.")
        return

    # Voice Mapping
    voices = {
        "host": "en-IN-Wavenet-A",
        "expert": "kn-IN-Chirp3-HD-Puck",
        "guru": "kn-IN-Chirp3-HD-Puck"
    }

    url = "https://texttospeech.googleapis.com/v1/text:synthesize"
    headers = {"X-Goog-Api-Key": api_key, "Content-Type": "application/json"}

    print(f"Generating podcast with {len(script_data)} turns...")

    for i, (speaker, text) in enumerate(script_data, 1):
        speaker_key = speaker.lower()
        voice_name = voices.get(speaker_key, "en-IN-Wavenet-A")
        
        # Default language for the speaker block
        # Expert block should use kn-IN by default to ensure Chirp handles English loanwords with Kannada accent if needed
        lang_code = "kn-IN" if "kn-IN" in voice_name else "en-IN"
        
        # Format SSML
        ssml_text = wrap_with_ssml(text, default_lang=lang_code)
        
        mp3_filename = f"{i:03d}_{speaker_key}.mp3"
        mp3_path = os.path.join(output_dir, mp3_filename)

        payload = {
            "input": {"ssml": ssml_text},
            "voice": {
                "languageCode": lang_code,
                "name": voice_name
            },
            "audioConfig": {
                "audioEncoding": "MP3",
                "pitch": 0,
                "speakingRate": 0.95
            }
        }

        # Handle Wavenet specific gender if not Chirp
        if "Wavenet" in voice_name and "A" in voice_name:
            payload["voice"]["ssmlGender"] = "FEMALE"

        try:
            # Add small delay to avoid rate limits
            if i > 1:
                time.sleep(0.1)
                
            response = requests.post(url, headers=headers, json=payload, timeout=15)
            if response.status_code == 200:
                audio_content = base64.b64decode(response.json()['audioContent'])
                with open(mp3_path, 'wb') as out:
                    out.write(audio_content)
                print(f"Generated {mp3_filename}")
            else:
                print(f"Error {response.status_code} for turn {i}: {response.text}")
        except Exception as e:
            print(f"Failed to generate turn {i}: {e}")

    # Stitch files using FFmpeg
    stitch_podcast(output_dir, output_dir_name)

    print(f"\nDONE: Podcast generation and stitching complete in {output_dir}")

def stitch_podcast(output_dir: str, output_name: str):
    """Stitches all generated MP3 segments into a single file using FFmpeg."""
    base_dir = os.path.dirname(os.path.dirname(__file__))
    project_bin = os.path.join(base_dir, "bin", "ffmpeg")
    tmp_bin = "/tmp/ffmpeg-bin/ffmpeg"
    
    if os.path.exists(project_bin):
        ffmpeg_bin = project_bin
    elif os.path.exists(tmp_bin):
        ffmpeg_bin = tmp_bin
    else:
        # Fallback to system ffmpeg if it exists in PATH
        ffmpeg_bin = "ffmpeg"
        
    output_file = os.path.join(output_dir, f"{output_name}_full.mp3")
    
    # Get all segment files
    segments = sorted([f for f in os.listdir(output_dir) if f.endswith(".mp3") and not f.endswith("_full.mp3")])
    if not segments:
        return

    # Create a concat list file
    concat_list_path = os.path.join(output_dir, "concat_list.txt")
    with open(concat_list_path, "w") as f:
        for segment in segments:
            f.write(f"file '{segment}'\n")

    print(f"Stitching {len(segments)} segments into {output_file}...")
    
    try:
        cmd = [
            ffmpeg_bin, "-y", "-f", "concat", "-safe", "0", 
            "-i", concat_list_path, "-c", "copy", output_file
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully created: {output_file}")
            # Clean up segments and concat list if successful (optional, but keep for now to verify)
            # os.remove(concat_list_path)
        else:
            print(f"FFmpeg Error: {result.stderr}")
    except Exception as e:
        print(f"Failed to stitch podcast: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate SWALPA Multi-Voice Podcast.')
    parser.add_argument('--script', default='research/podcast_script_sample.md', help='Path to markdown script')
    parser.add_argument('--output-dir', default='podcast_intro', help='Subdir in docs/assets/')
    args = parser.parse_args()

    # Get absolute path for script
    script_abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', args.script))
    
    generate_podcast_audio(script_abs_path, args.output_dir)
