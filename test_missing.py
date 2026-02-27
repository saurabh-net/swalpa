import re, glob, os
import scripts.kannada_mapping as km

docs_dir = 'docs'
pattern = re.compile(r'([^*‘“⟨\n]{1,40})\s*⟨(?P<phonetic>[^⟩]+)⟩')
md_files = glob.glob(os.path.join(docs_dir, '*.md'))

missing = set()
for f in md_files:
    with open(f, 'r') as file:
        content = file.read()
    for match in pattern.finditer(content):
        phonetic_text = match.group('phonetic').strip()
        safe_filename = re.sub(r'[^a-zA-Z0-9_\-]', '_', phonetic_text)
        safe_filename = re.sub(r'_+', '_', safe_filename).strip('_')
        if safe_filename not in km.KANNADA_MAPPING:
            missing.add(safe_filename)

print("Missing count:", len(missing))
print("Missing samples:", list(missing)[:10])
