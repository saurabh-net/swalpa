# The Auto Protocol: Architecture & State

This document outlines the technical structure and state management for the "Auto-Rickshaw Protocol" simulator.

## 🏗️ System Architecture

### 1. Game State Manager
*   **RespectMeter**: (0-100)
    *   0-25: Tourist (High prices, high rejection)
    *   26-50: Resident (Standard negotiation)
    *   51-85: Local (Lower prices, friendly banter)
    *   86-100: Macha (Best prices, mutual respect)
*   **Wallet**: (Initial: 500 INR)
*   **PatienceMeter**: (0-100) - Driver's willingness to wait. Drops if player chooses wrong grammar or takes too long.
*   **CurrentLevel**: (1-4)
*   **CurrentModule**: Reference to the Swalpa `docs/` module.

### 2. Dialogue Engine
The game uses a branching dialogue system. Each choice has:
*   **Label**: The text shown to the player (mix of English intent and Kannada phonetics).
*   **Phonetic**: The actual text passed to the **Swalpa TTS**.
*   **Effect**: `{ respect: +/-X, price: +/-Y, patience: +/-Z }`.

---

## 🛠️ Tech Stack Recommendations
*   **Frontend**: Next.js or Vite for a responsive web interface.
*   **Styling**: Vanilla CSS (Premium/Glassmorphic design).
*   **Audio**: Integrated with `generate_podcast.py` (GC TTS) for on-the-fly or pre-rendered voice lines.
*   **Data**: JSON-based level configurations.

---

## 💾 State Persistence
*   Use `localStorage` to save player progress and unlocked levels.
*   "Flashcard Integration": Link back to the specific Swalpa markdown page if a player repeatedly fails a grammar check.
