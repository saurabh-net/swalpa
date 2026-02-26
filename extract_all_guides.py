import os
import re
import glob

docs_dir = 'docs'
pattern = re.compile(r'⟨(?P<phonetic>[^⟩]+)⟩')
md_files = glob.glob(os.path.join(docs_dir, '*.md'))

items = set()
for f in md_files:
    if 'flashcard' in f: continue
    with open(f, 'r', encoding='utf-8') as content:
        for m in pattern.finditer(content.read()):
            phonetic = m.group('phonetic').strip()
            safe_filename = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic)
            safe_filename = re.sub(r'_+', '_', safe_filename).strip('_')
            items.add(safe_filename)

for it in sorted(list(items)):
    print(it)
