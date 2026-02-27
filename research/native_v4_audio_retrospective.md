# Retrospective: Alternate Voice Exploration for Native Kannada Audio (V4)

## Objective
To explore a friendly, more natural male voice (Chirp 3 HD) for a potential V4 batch of native Kannada audio. We generated the batch and implemented a local toggle to compare the new voice with the existing Native Female (Wavenet) voice.

## Implementation Details
1. **Script Modifications (`scripts/generate_audio.py`)**:
   - Added `--voice` and `--output-dir` arguments to make the generation script more flexible.
   - Using the `kn-IN-Chirp3-HD-Puck` male voice by default for the V4 batch.
   - Refined the handling of Kannada text to ensure SSML tags (`<lang xml:lang='kn-IN'>`) are correctly applied and passed to the Google Cloud TTS API.
   - Addressed an issue where `strip_accents()` stripped essential Kannada vowel markers, allowing better fallback pronunciation for unmapped Unicode words.

2. **Audio Generation**:
   - Created a complete set of 368 new audio files using the Chirp 3 HD male voice.
   - Saved the new audio files to the `docs/assets/audio_native_v4_male` directory to prevent any overwrite of existing assets.
   - Verified that no 0-byte audio files were generated.

3. **UI Integration (`docs/assets/js/audio.js`)**:
   - Reintroduced the voice selection toggle (a dropdown menu) placed below the main article header.
   - The toggle enables easy switching between "Native Female (Wavenet)" and "Native Male (Chirp 3 HD)".
   - The selected voice preference is locally stored via `localStorage` to persist across page loads.

## Fixes Following Initial Generation
- **Prefix Issue**: Initially, the script utilized an English prompt prefix to assist the Chirp 3 model ("The following word is in Kannada: "). This resulted in the prefix being spoken before every word. It was removed once testing confirmed the Chirp 3 model properly handled the `<lang xml:lang='kn-IN'>` SSML tag.
- **Accent Stripping Issue**: The fallback mechanism originally used `strip_accents()`, which inadvertently corrupted Kannada text by removing necessary vowel signs (e.g., converting `ಬೇಗ ಹೋಗಿ` to `ಬೕಗ ಹೂೕಗ`). The `strip_accents` logic was removed for native words to preserve correct pronunciation.

## Validation Results
- Generated Audio Files: `368` files in `docs/assets/audio_native_v4_male/`
- Zero-byte files found: `0`
- The voice toggle functions successfully on the local development setup, allowing seamless A/B comparison of the male and female voices.

## Conclusion
The alternate male voice exploration was successful. The `kn-IN-Chirp3-HD-Puck` voice provides a natural and friendly alternative. The addition of the voice toggle facilitates easy local testing before any final decisions are made for production. All modifications and assets remain strictly in the private repository as intended.
