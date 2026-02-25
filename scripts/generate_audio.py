import os
import re
import glob
from gtts import gTTS
import urllib.parse
import sys

def generate_audio():
    docs_dir = os.path.join(os.path.dirname(__file__), '..', 'docs')
    audio_dir = os.path.join(docs_dir, 'assets', 'audio')
    
    # Ensure audio directory exists
    os.makedirs(audio_dir, exist_ok=True)
    
    # Regex to find phonetic guides, e.g., ⟨SWAL-pah⟩
    # We'll use the phonetic text itself to generate the audio filename
    # since it's unique enough for each word.
    pattern = re.compile(r'⟨([^⟩]+)⟩')
    
    # Find all markdown files (excluding flashcards since they don't have these guides)
    md_files = glob.glob(os.path.join(docs_dir, '*.md'))
    
    unique_phonetics = set()
    
    for file_path in md_files:
        name = os.path.basename(file_path)
        if 'flashcard' in name:
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        matches = pattern.findall(content)
        for match in matches:
            # Clean up the phonetic text to be a safe filename
            clean_text = match.strip()
            unique_phonetics.add(clean_text)

    print(f"Found {len(unique_phonetics)} unique phonetic guides.")
    
    # Generate MP3 for each unique phonetic guide
    success_count = 0
    for i, phonetic_text in enumerate(unique_phonetics, 1):
        # Create a safe filename (alphanumeric, dashes, underscores)
        safe_filename = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic_text)
        # remove multiple consecutive underscores
        safe_filename = re.sub(r'_+', '_', safe_filename).strip('_')
        
        mp3_path = os.path.join(audio_dir, f"{safe_filename}.mp3")
        
        if os.path.exists(mp3_path):
            continue # Already generated
            
        try:
            # Use gTTS with language set to English ('en') with an Indian accent ('co.in' TLD)
            # This is because the text is English transliteration (e.g. SWAL-pah)
            # Kannada TTS expects Kannada script natively.
            tts = gTTS(text=phonetic_text, lang='en', tld='co.in', slow=False)
            tts.save(mp3_path)
            success_count += 1
            print(f"[{i}/{len(unique_phonetics)}] Generated audio for: {phonetic_text}")
        except Exception as e:
            print(f"Failed to generate audio for {phonetic_text}: {e}", file=sys.stderr)
            
    print(f"Successfully generated {success_count} new audio files.")

if __name__ == "__main__":
    generate_audio()
