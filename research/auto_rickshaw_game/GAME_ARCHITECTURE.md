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
*   **CurrentLevel**: (1-6)
*   **ActiveDriver**: (Guru, Anna, or Macha)
*   **Environment**: { Traffic: (Low/Med/High), Weather: (Clear/Rain), TimeOfDay: (Morning/Evening) }

### 2. Driver Profiles
| Profile | Voice | Modifier | Loves | Dislikes |
| :--- | :--- | :--- | :--- | :--- |
| **Guru (The Stoic)** | Deep/Measured | Respect Gain: 0.8x | `-ri` suffixes, formal logic. | Slang, "Macha" (unless 80+ Respect). |
| **Anna (The Friendly)** | Warm/Melodic | Patience Gain: 1.2x | "Oota aitha?", family talk. | Rudeness, silence. |
| **Macha (The Hustler)** | Fast/High-energy | Progress: +10% | Confidence, "Guru/Macha", Slang. | Indecision, "Meter haaki" (during rain). |

### 3. Dialogue Engine
The game uses a branching dialogue system with localized randomness:
*   **Base Effect**: `{ respect: +/-X, price: +/-Y, patience: +/-Z }`.
*   **Random Variation**: `Effect * (0.8 to 1.2)` based on driver's initial "Mood" seed.
*   **Environmental Penalty**: If `Weather: Rain`, `Price` effects are heightened by 1.5x.

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
