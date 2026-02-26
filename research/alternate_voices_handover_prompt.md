# Handoff Prompt: Alternate Voice Exploration for Native Kannada Audio (V4)

## 🎯 Context
The SWALPA project has a fully functional **Native Audio V3** batch using `kn-IN-Wavenet-A` (female). All 374 audio assets are verified and working. We now want to explore a **friendlier, more natural male voice** for a potential V4 batch.

> **IMPORTANT**: This task is for the **private repo only**. Do NOT deploy to the public site. The user wants to audition the new voice locally before deciding.

## 🏗️ Current Architecture
*   **Private Repo**: `git@github.com:saurabh-net/swalpa-private.git`
*   **Public Repo**: `https://github.com/saurabh-net/swalpa.git`
*   **Current Audio**:
    *   `docs/assets/audio/` — Phonetic batch (en-IN-Wavenet-A, female). **Keep as-is.**
    *   `docs/assets/audio_native/` — Native V3 batch (kn-IN-Wavenet-A, female). **Keep as-is.**
*   **Key Scripts**:
    *   `scripts/generate_audio.py` — Generator with `--mode native` support.
    *   `scripts/kannada_mapping.py` — 374+ phonetic-to-Unicode mappings.
*   **API Key**: Stored in `.env` (git-ignored), loaded by the generator.

## 🔬 Research Summary: Google Cloud TTS Voice Options for Kannada

### Voice Tiers (Best to Good)

| Tier | Quality | Price (per 1M chars) | Free Tier | SSML Support | Streaming |
|------|---------|---------------------|-----------|--------------|-----------|
| **Chirp 3: HD** | ⭐⭐⭐⭐⭐ Most natural, emotional resonance | $30 | 1M chars/mo | ✅ (limited) | ✅ |
| **Neural2** | ⭐⭐⭐⭐ Custom Voice tech, high quality | $16 | 1M chars/mo | ✅ Full | ❌ |
| **Wavenet** | ⭐⭐⭐⭐ Trained on human audio, warm | $16 | 1M chars/mo | ✅ Full | ❌ |
| **Standard** | ⭐⭐ Basic parametric/vocoder | $4 | 4M chars/mo | ✅ Full | ❌ |

> **Cost Estimate**: Our 374 assets average ~10 chars each = ~3,740 chars total. This is **well within the free tier** for ALL tiers. Cost is effectively $0.

### Chirp 3: HD Voices (Recommended — Most Natural)

**Kannada (kn-IN) IS confirmed supported** by Chirp 3: HD.

| Voice Name | Gender | Style Description |
|------------|--------|-------------------|
| **Puck** | Male | Versatile, engaging, friendly |
| **Charon** | Male | Warm, authoritative |
| **Fenrir** | Male | Bold, expressive |
| **Orus** | Male | Calm, clear |
| **Aoede** | Female | Bright, expressive |
| **Kore** | Female | Warm, friendly |
| **Leda** | Female | Clear, professional |
| **Zephyr** | Female | Soft, soothing |

### Existing Wavenet / Neural2 Voices for Kannada

| Voice Name | Gender | Tier |
|------------|--------|------|
| `kn-IN-Wavenet-A` | Female | Wavenet (current V3) |
| `kn-IN-Wavenet-B` | Male | Wavenet |
| `kn-IN-Wavenet-C` | Female | Wavenet |
| `kn-IN-Wavenet-D` | Male | Wavenet |
| `kn-IN-Neural2-A` | Female | Neural2 |
| `kn-IN-Neural2-B` | Male | Neural2 |
| `kn-IN-Neural2-C` | Female | Neural2 |
| `kn-IN-Neural2-D` | Male | Neural2 |

## 🚀 Your Objective

Generate a new audio batch using a more natural-sounding **male** voice and store it alongside existing batches for local comparison.

### Step 1: Pick the Best Voice
**Recommended**: Start with **Chirp 3: HD `Puck`** (friendly male). Also test **`Charon`** (warm male) as a backup.

> **⚠️ API Difference**: Chirp 3: HD uses a different API request format than Wavenet/Neural2. The `voice.name` field uses a different naming pattern (e.g., `kn-IN-Chirp3-HD-Puck` rather than `kn-IN-Wavenet-B`). **You must verify the exact API request format** by consulting the [Chirp 3 HD docs](https://cloud.google.com/text-to-speech/docs/chirp3-hd) before modifying the script.

> **⚠️ SSML Compatibility**: Chirp 3: HD has **limited SSML support** compared to Wavenet. It supports `<speak>`, `<break>`, `<p>`, `<s>`, `<say-as>`, and `<sub>`, but **may NOT support `<lang>`**. If `<lang>` is not supported, you may need to send plain Kannada text without the SSML wrapper. Test this carefully.

If Chirp 3: HD doesn't work well for Kannada pronunciation, fall back to:
1. `kn-IN-Neural2-B` (male, Neural2 tier)
2. `kn-IN-Wavenet-B` (male, Wavenet tier)

### Step 2: Create a New Output Directory
Store the new batch in a **separate directory** to preserve existing recordings:

```
docs/assets/audio_native_v4_male/    # Chirp 3 HD male batch
```

**DO NOT overwrite or delete** `docs/assets/audio/` or `docs/assets/audio_native/`.

### Step 3: Modify the Generator Script
Update `scripts/generate_audio.py` to support a new mode or flag:

```bash
# Example usage:
python3 scripts/generate_audio.py --mode native --voice kn-IN-Chirp3-HD-Puck --output-dir audio_native_v4_male
```

Key changes:
1. Accept `--voice` and `--output-dir` as optional CLI arguments.
2. If Chirp 3 HD, adjust the API payload format accordingly.
3. Keep the existing `KANNADA_MAPPING` from `kannada_mapping.py` — the Unicode input is voice-agnostic.
4. Maintain the **resumable** logic (skip existing non-zero files).
5. Maintain the **0-byte audit** check after completion.

### Step 4: Update `audio.js` for Local Testing
Temporarily modify `docs/assets/js/audio.js` to point to the new directory for local listening:

```javascript
const audioSubdir = 'audio_native_v4_male';
```

Or, if you prefer, re-enable the toggle with a third option. The user wants to A/B test locally.

### Step 5: Verify Locally
1. Run `mkdocs serve` (already configured at `127.0.0.1:8000`).
2. Click through several audio buttons on different pages.
3. Confirm zero 0-byte files: `find docs/assets/audio_native_v4_male -size 0 | wc -l`
4. Take browser screenshots for the walkthrough.

### Step 6: Commit to Private Repo Only
```bash
git add docs/assets/audio_native_v4_male/ scripts/generate_audio.py docs/assets/js/audio.js
git commit -m "Add V4 native male voice batch (Chirp 3 HD Puck) for local testing"
git push origin main
```

**DO NOT push to the `public` remote.**

## 📂 Key Files to Read First
1. [generate_audio.py](file:///Users/saurabhmaurya/Documents/swalpa-private/scripts/generate_audio.py) — Current generator logic.
2. [kannada_mapping.py](file:///Users/saurabhmaurya/Documents/swalpa-private/scripts/kannada_mapping.py) — All 374 Unicode mappings (reuse as-is).
3. [audio.js](file:///Users/saurabhmaurya/Documents/swalpa-private/docs/assets/js/audio.js) — Frontend playback logic.
4. [pronunciation_tts_retrospective.md](file:///Users/saurabhmaurya/Documents/swalpa-private/research/pronunciation_tts_retrospective.md) — How V3 was built.
5. [GEMINI.md](file:///Users/saurabhmaurya/Documents/swalpa-private/GEMINI.md) — Repo rules (never push scripts/research to public).
6. [Chirp 3: HD docs](https://cloud.google.com/text-to-speech/docs/chirp3-hd) — API format for the new voice tier.

## 🚦 Constraints
*   **Preserve All Existing Audio**: Never delete `audio/` or `audio_native/` directories.
*   **Private Repo Only**: All changes stay in `swalpa-private`. No public deployment.
*   **Reuse Mappings**: The `KANNADA_MAPPING` dictionary is voice-agnostic. Don't regenerate it.
*   **0-Byte Audit**: After batch generation, always verify no silent files exist.
*   **Free Tier**: Our 374 assets (~3,740 chars) are well within the 1M free chars/month for all tiers.
