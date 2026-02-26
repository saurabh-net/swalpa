import os
import re
import glob
import requests
import json
import base64
import sys
import time

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

def generate_audio():
    api_key = load_api_key()
    if not api_key:
        print("Error: GOOGLE_CLOUD_API_KEY not found in .env")
        sys.exit(1)

    docs_dir = os.path.join(os.path.dirname(__file__), '..', 'docs')
    audio_dir = os.path.join(docs_dir, 'assets', 'audio')
    os.makedirs(audio_dir, exist_ok=True)
    
    # Regex to find phonetic guides, e.g., ⟨SWAL-pah⟩
    pattern = re.compile(r'⟨([^⟩]+)⟩')
    
    # Find all markdown files (excluding flashcards)
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
            unique_phonetics.add(match.strip())

    print(f"Found {len(unique_phonetics)} unique phonetic guides.")
    
    # Mapping common mispronunciations or syllables that trigger spelling-out behavior
    phonetic_overrides = {
        'hul': 'hull', 'pul': 'pull', 'cul': 'cull', 'tul': 'tull',
        'nuh': 'na', 'muh': 'ma', 'ruh': 'ra', 'duh': 'da',
        'kuh': 'ka', 'guh': 'ga', 'luh': 'la', 'vuh': 'va',
        'yuh': 'ya', 'buh': 'ba', 'huh': 'ha', 'thuh': 'tha', 'shuh': 'sha',
        'gey': 'gay', 'dey': 'day', 'bey': 'bay', 'ney': 'nay',
        'ley': 'lay', 'hey': 'hay', 'sey': 'say', 'tay': 'tay', 'ay': 'ay',
        'ree': 'ree', 
    }

    url = "https://texttospeech.googleapis.com/v1/text:synthesize"
    headers = {
        "X-Goog-Api-Key": api_key,
        "Content-Type": "application/json"
    }
    
    success_count = 0
    errors = 0
    
    for i, phonetic_text in enumerate(sorted(list(unique_phonetics)), 1):
        safe_filename = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic_text)
        safe_filename = re.sub(r'_+', '_', safe_filename).strip('_')
        mp3_path = os.path.join(audio_dir, f"{safe_filename}.mp3")
        
        normalized = phonetic_text.lower()
        parts = normalized.split('-')
        overridden_parts = [phonetic_overrides.get(p, p) for p in parts]
        tts_text = ' '.join(overridden_parts)
        
        payload = {
            "input": {"text": tts_text},
            "voice": {
                "languageCode": "en-IN",
                "name": "en-IN-Wavenet-A",
                "ssmlGender": "FEMALE"
            },
            "audioConfig": {
                "audioEncoding": "MP3",
                "pitch": 0,
                "speakingRate": 0.95
            }
        }
        
        # Simple retry logic (3 attempts)
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = requests.post(url, headers=headers, json=payload, timeout=10)
                if response.status_code == 200:
                    audio_content = base64.b64decode(response.json()['audioContent'])
                    with open(mp3_path, 'wb') as out:
                        out.write(audio_content)
                    success_count += 1
                    break
                else:
                    print(f"Error {response.status_code} for {phonetic_text} (Attempt {attempt+1}): {response.text}")
                    if attempt < max_retries - 1:
                        time.sleep(1) # Wait before retry
                    else:
                        errors += 1
            except Exception as e:
                print(f"Failed to generate audio for {phonetic_text} (Attempt {attempt+1}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(1)
                else:
                    errors += 1
        
        if i % 20 == 0 or i == len(unique_phonetics):
            print(f"[{i}/{len(unique_phonetics)}] Status: {success_count} success, {errors} errors. Current: {phonetic_text}")
            
    print(f"DONE: {success_count} success, {errors} errors using Google Cloud TTS (Wavenet).")

if __name__ == "__main__":
    generate_audio()
