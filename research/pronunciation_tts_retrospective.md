# Retrospective: High-Fidelity Kannada TTS & Pronunciation Logic

## 🎯 Goal
To provide authentic, native-grade Kannada pronunciation for the SWALPA project, moving beyond generic Text-to-Speech (TTS) defaults that often struggle with transliterated South Indian languages.

## 🏗️ Technical Evolution

### Phase 1: Engine Upgrade (gTTS to Google Cloud TTS)
- **Problem**: The initial `gTTS` library sounded robotic and lacked nuanced prosody for Indian English/Kannada phonetics.
- **Solution**: Migrated to the **Google Cloud Text-to-Speech REST API** using **Wavenet** voices (`en-IN-Wavenet-A` and `kn-IN-Wavenet-A`).
- **Optimization**: Implemented a `phonetic_overrides` system for the English voice to handle specific syllable biases (e.g., mapping `nuh` to `na` to prevent common mispronunciations).

### Phase 2: Solving the "Westernized" Accent (Native Batch)
- **Problem**: When feeding Latin transliterations (e.g., *Olage*) to the `kn-IN` voice, the engine interpreted them using English/Latin phonology, resulting in a "French" or "Western" accent.
- **Solution**: **Direct Unicode Mapping**.
  - Created `scripts/kannada_mapping.py` containing 374+ manual mappings of phonetic IDs to actual Kannada script (e.g., `OH-luh-gey` -> `ಒಳಗೆ`).
  - By feeding the engine Kannada script, the `kn-IN` voice automatically applies authentic Kannada prosody, pitch, and duration.
- **SSML Implementation**: Wrapped all inputs in SSML `<speak><lang xml:lang='kn-IN'>...</lang></speak>` tags to explicitly declare the linguistic context.

### Phase 3: Robustness & 0-Byte Recovery
- **Problem**: The Google `kn-IN` voice would often return silence (0-byte files) if the input text contained accented characters (e.g., `Bēku`) or was otherwise "confusing" in Latin script.
- **Solution**: 
  - **Accent Stripping**: Integrated `unicodedata` to normalize and strip diacritics from any fallback Latin text.
  - **Resumable Batching**: Updated `generate_audio.py` to skip existing non-zero files, allowing for stable recovery from API interruptions.
  - **100% Coverage Audit**: Performed recursive audits to identify and fix every silent asset in the 374-item batch.

## 🛠️ Developer Checklist for Future Audio Batches
1. **Update Mappings**: Add any new phonetic terms to `scripts/kannada_mapping.py` first.
2. **Key Check**: Ensure keys in the mapping match the sanitized phonetic IDs used as filenames.
3. **Run Generator**: `python3 scripts/generate_audio.py --mode native`.
4. **Audit Size**: Run `find docs/assets/audio_native -size 0` after every batch to ensure no silent failures.

## 🚀 Impact
- **Learning Mode**: High-quality Indian-English voice for phonetic guidance.
- **Native Mode**: 100% authentic Kannada pronunciations, serving as a "gold standard" for listeners.
