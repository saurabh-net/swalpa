# Podcast Feature: AI-Driven Spoken Kannada Learning

## Overview
The Podcast Feature is a planned extension of the SWALPA project. It leverages AI-generated audio and research corpus data to provide an immersive, audio-first learning experience for non-native speakers in Bengaluru. 

The primary goal is to move beyond static text and simple audio snippets toward long-form, context-rich content (podcasts) that demonstrates natural conversational flow, prosody, and the distinct "linguistic layer cake" of Bengaluru Kannada.

## Current State & Pilot Assessment
We have an existing sample podcast in the `research/` folder:
- **File**: `v3_Survive_Bengaluru_Traffic_With_Kannada_Mechanics.m4a`
- **Assessment**: The conceptual content is excellent, covering high-utility scenarios and vocabulary. However, the **Kannada pronunciation is completely incorrect**, rendering it unusable for its intended instructional purpose.

## The Strategy: NotebookLM Generation
To create a high-fidelity replacement with accurate pronunciation, we will leverage **NotebookLM** using our refined site content as the primary "source of truth."

### 1. Source Inputs
We will feed NotebookLM the following data:
- **Full Site Content**: All markdown files in `docs/`, which now include precise phonetic respellings (e.g., `⟨nuh-nuh-GEY⟩`) and structured lessons.
- **Research PDFs**: The theoretical foundations found in `research/` (e.g., *Improving Kannada Pronunciation in AI Podcasts*).
- **Audio Snippets**: If supported, providing the 374+ generated audio snippets to help ground the model's phonetic understanding.

### 2. Configuration & Prompting
When generating the podcast in NotebookLM, we will customize the starting configuration to:
- **Length**: Set to "Long" to allow for deep-dive explanations and contextual examples.
- **Goal Alignment**: Explicitly define the podcast's goal to match the SWALPA mission: *A phonetic-only, Bangalore-functional Kannada resource for non-native speakers (IT professionals, migrants).*
- **Phonetic Emphasis**: Direct the model to prioritize the phonetic guides in the source text to inform the spoken output.

### 3. Proposed Tasks
- [ ] (Optional) Create a text transcript of the existing `v3...m4a` pilot to extract its successful narrative structure.
- [ ] Experiment with NotebookLM prompts to ensure it uses the pronunciation guides effectively.
- [ ] Validate the spoken Kannada in the new NotebookLM output against our local `⟨phonetic⟩` guides.

## Core Research Pillars
The feature is informed by the following internal research documents:

1. **Improving Kannada Pronunciation in AI Podcasts**: 
   - Focuses on the technical challenges of using TTS engines for Kannada.
   - Researches phonetic mapping (similar to the `⟨...⟩` guides) to ensure AI voices sound natural.
   
2. **Bengaluru Spoken Kannada Corpus**:
   - Provides the lexical and morphosyntactic foundation.
   - Ensures the language reflects actual street-level "Bangalore Kannada."

3. **Language Research Corpus Generation**:
   - Outlines methodology for generating diverse language samples.

## Reference Material
- `research/Improving Kannada Pronunciation in AI Podcasts.pdf`
- `research/v3_Survive_Bengaluru_Traffic_With_Kannada_Mechanics.m4a` (Experimental audio pilot)
- `research/Kannada Language Research Corpus Generation.pdf`

> [!NOTE]
> This document remains in the `research` folder and is not yet part of the public documentation. All refinement work is strictly confined to the `swalpa-private` repository.
