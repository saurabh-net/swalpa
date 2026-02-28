import os
import re
import requests
import json
import base64
import sys
import time
import argparse
from typing import List, Tuple

try:
    from kannada_mapping import KANNADA_MAPPING
except ImportError:
    KANNADA_MAPPING = {}

def load_api_key():
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    if not os.path.exists(env_path):
        return None
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('GOOGLE_CLOUD_API_KEY='):
                return line.split('=')[1].strip()
    return None

def parse_markdown_script(file_path: str) -> List[Tuple[str, str]]:
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    matches = re.findall(r'\*\*(.*?)\*\*:\s*(.*?)(?=\n\*\*|\Z)', content, re.DOTALL)
    processed = [(speaker, text.strip()) for speaker, text in matches]
    return processed

def wrap_with_ssml(text: str, speaker_key: str, default_lang="en-IN") -> str:
    """
    Enhanced SSML wrapping for 'Premium' feel using compatible tags.
    """
    # 1. Phonetic Tags
    phonetic_pattern = re.compile(r'⟨(?P<phonetic>[^⟩]+)⟩')
    
    def replace_phonetic(match):
        phonetic_text = match.group('phonetic').strip()
        safe_key = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic_text).strip('_')
        kannada_word = KANNADA_MAPPING.get(safe_key, phonetic_text.replace('-', ' '))
        # Add a tiny pause before and after Kannada words for clarity
        return f"<break time='100ms'/><lang xml:lang='kn-IN'>{kannada_word}</lang><break time='100ms'/>"

    processed_text = phonetic_pattern.sub(replace_phonetic, text)
    
    # 2. Add natural punctuation breaks
    # Only for the Host (Wavenet) as Chirp is already very natural with punctuation
    if speaker_key == "host":
        processed_text = processed_text.replace('. ', '. <break time=\"400ms\"/>')
        processed_text = processed_text.replace('? ', '? <break time=\"500ms\"/>')
        processed_text = processed_text.replace(', ', ', <break time=\"200ms\"/>')
        
    # 3. Wrapping in prosody for Wavenet (Host) to make it more 'conversational'
    if speaker_key == "host":
        return f"<speak><lang xml:lang='en-IN'><prosody rate=\"0.95\" pitch=\"-1st\" volume=\"+2dB\">{processed_text}</prosody></lang></speak>"
    else:
        # Expert - focus on clarity
        return f"<speak><lang xml:lang='kn-IN'><prosody rate=\"0.9\" pitch=\"0st\">{processed_text}</prosody></lang></speak>"

def generate_premium_podcast(script_path: str, output_dir_name: str):
    api_key = load_api_key()
    if not api_key:
        sys.exit(1)

    base_dir = os.path.dirname(os.path.dirname(__file__))
    output_dir = os.path.join(base_dir, 'docs', 'assets', output_dir_name)
    os.makedirs(output_dir, exist_ok=True)

    script_data = parse_markdown_script(script_path)
    if not script_data:
        print("No dialogue found.")
        return

    # Using Wavenet-A for Host because it supports <lang> and <prosody>
    # Puck for Expert as it's the high-fidelity native model
    voices = {
        "host": "en-IN-Wavenet-A", 
        "expert": "kn-IN-Chirp3-HD-Puck",
        "guru": "kn-IN-Chirp3-HD-Puck"
    }

    url = "https://texttospeech.googleapis.com/v1" # Back to stable v1
    headers = {"X-Goog-Api-Key": api_key, "Content-Type": "application/json"}

    print(f"Generating Premium sample with {len(script_data)} turns...")

    for i, (speaker, text) in enumerate(script_data, 1):
        speaker_key = speaker.lower()
        voice_name = voices.get(speaker_key, "en-IN-Wavenet-A")
        lang_code = "kn-IN" if "kn-IN" in voice_name else "en-IN"
        
        ssml_text = wrap_with_ssml(text, speaker_key, default_lang=lang_code)
        
        mp3_filename = f"{i:03d}_{speaker_key}.mp3"
        mp3_path = os.path.join(output_dir, mp3_filename)

        payload = {
            "input": {"ssml": ssml_text},
            "voice": {
                "languageCode": lang_code,
                "name": voice_name
            },
            "audioConfig": {
                "audioEncoding": "MP3"
            }
        }

        # Wavenet gender hint
        if "Wavenet-A" in voice_name:
            payload["voice"]["ssmlGender"] = "FEMALE"

        try:
            if i > 1:
                time.sleep(0.15) # Safety buffer
            response = requests.post(f"{url}/text:synthesize", headers=headers, json=payload, timeout=15)
            if response.status_code == 200:
                audio_content = base64.decodebytes(response.json()['audioContent'].encode('utf-8'))
                with open(mp3_path, 'wb') as out:
                    out.write(audio_content)
                print(f"Generated {mp3_filename}")
            else:
                print(f"Error {response.status_code} for turn {i}: {response.text}")
        except Exception as e:
            print(f"Failed turn {i}: {e}")

    # Stitch files using FFmpeg
    stitch_podcast(output_dir, output_dir_name)

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
        ffmpeg_bin = "ffmpeg"
        
    output_file = os.path.join(output_dir, f"{output_name}_full.mp3")
    segments = sorted([f for f in os.listdir(output_dir) if f.endswith(".mp3") and not f.endswith("_full.mp3")])
    if not segments:
        return

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
        import subprocess
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully created: {output_file}")
        else:
            print(f"FFmpeg Error: {result.stderr}")
    except Exception as e:
        print(f"Failed to stitch podcast: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate SWALPA Premium Podcast.')
    parser.add_argument('--script', default='research/podcasts/v3_traffic_5min.md', help='Path to script')
    parser.add_argument('--output-dir', default='v4_traffic_premium_sample', help='Output subdir')
    args = parser.parse_args()
    
    script_abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', args.script))
    generate_premium_podcast(script_abs_path, args.output_dir)
