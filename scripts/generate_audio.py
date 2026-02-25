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
        
        # IMPROVEMENT: Normalization to prevent gTTS from spelling out all-caps segments
        # 1. Lowercase: "CHAY" -> "chay" (prevents acronym interpretation)
        # 2. Syllable Overrides: "gey" -> "gay", "hul" -> "hull" etc.
        # 3. Hyphens to spaces: "kuh-chay-ree" -> "kuh chay ree" (better prosody)
        
        # Mapping common mispronunciations or syllables that trigger spelling-out behavior
        phonetic_overrides = {
            # Fix for spelling out all-caps/short syllables
            'hul': 'hull',
            'pul': 'pull',
            'cul': 'cull',
            'tul': 'tull',
            
            # Fix for 'nuh' sounding like 'noo' (mapping to 'a'/short-a sound)
            'nuh': 'na',
            'muh': 'ma',
            'ruh': 'ra',
            'duh': 'da',
            'kuh': 'ka',
            'guh': 'ga',
            'luh': 'la',
            'vuh': 'va',
            'yuh': 'ya',
            'buh': 'ba',
            'huh': 'ha',
            'thuh': 'tha',
            'shuh': 'sha',
            
            # Ending vowel fixes
            'gey': 'gay',
            'dey': 'day',
            'bey': 'bay',
            'ney': 'nay',
            'ley': 'lay',
            'hey': 'hay',
            'sey': 'say',
            'tay': 'tay',
            'ay': 'ay',
            
            # General fixes
            'ree': 'ree', 
        }
        
        # Process the text
        normalized = phonetic_text.lower()
        parts = normalized.split('-')
        overridden_parts = [phonetic_overrides.get(p, p) for p in parts]
        tts_text = ' '.join(overridden_parts)
        
        # We'll overwrite even if it exists to apply the quality fix
        try:
            tts = gTTS(text=tts_text, lang='en', tld='co.in', slow=False)
            tts.save(mp3_path)
            success_count += 1
            if i % 50 == 0 or i == len(unique_phonetics):
                print(f"[{i}/{len(unique_phonetics)}] Processed: {phonetic_text} -> '{tts_text}'")
        except Exception as e:
            print(f"Failed to generate audio for {phonetic_text}: {e}", file=sys.stderr)
            
    print(f"Successfully generated {success_count} new audio files.")

if __name__ == "__main__":
    generate_audio()
