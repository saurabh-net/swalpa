import os
import re
import glob
import sys

sys.path.append(os.path.join(os.getcwd(), 'scripts'))
try:
    from kannada_mapping import KANNADA_MAPPING
except ImportError:
    KANNADA_MAPPING = {}

# Find 0-byte files
silent_keys = []
for root, dirs, files in os.walk('docs/assets/audio_native'):
    for f in files:
        if f.endswith('.mp3') and os.path.getsize(os.path.join(root, f)) == 0:
            silent_keys.append(f.replace('.mp3', ''))

# Find their corresponding original words
docs_dir = 'docs'
pattern = re.compile(r'([^⟨\n]{1,40})\s*⟨(?P<phonetic>[^⟩]+)⟩')
md_files = glob.glob(os.path.join(docs_dir, '*.md'))

missing_info = {}
for f in md_files:
    if 'flashcard' in f: continue
    with open(f, 'r', encoding='utf-8') as content:
        data = content.read()
        for m in pattern.finditer(data):
            phonetic = m.group('phonetic').strip()
            safe_filename = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic)
            safe_filename = re.sub(r'_+', '_', safe_filename).strip('_')
            
            if safe_filename in silent_keys:
                raw_word = match_word = re.sub(r'[*‘“’”]+', '', m.group(1)).strip().split('\n')[-1].strip()
                missing_info[safe_filename] = match_word

for k, w in sorted(missing_info.items()):
    print(f"'{k}': '{w}',")
