import os
import re
import glob
import sys

# Add scripts dir to path for import
sys.path.append(os.path.join(os.getcwd(), 'scripts'))
try:
    from kannada_mapping import KANNADA_MAPPING
except ImportError:
    KANNADA_MAPPING = {}

docs_dir = 'docs'
pattern = re.compile(r'([^⟨\n]{1,40})\s*⟨(?P<phonetic>[^⟩]+)⟩')
md_files = glob.glob(os.path.join(docs_dir, '*.md'))

missing_map = {}
for f in md_files:
    if 'flashcard' in f: continue
    with open(f, 'r', encoding='utf-8') as content:
        data = content.read()
        for m in pattern.finditer(data):
            phonetic = m.group('phonetic').strip()
            safe_filename = re.sub(r'[^a-zA-Z0-9_\-]/g', '_', phonetic) # Wait, regex was wrong in my mind
            # Let's use the exact logic from generate_audio.py
            safe_filename = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic)
            safe_filename = re.sub(r'_+', '_', safe_filename).strip('_')
            
            if safe_filename not in KANNADA_MAPPING:
                word = re.sub(r'[*‘“’”]+', '', m.group(1)).strip().split('\n')[-1].strip()
                if word:
                    missing_map[safe_filename] = word

for safe_name, word in sorted(missing_map.items()):
    print(f"    '{safe_name}': '{word}',")
