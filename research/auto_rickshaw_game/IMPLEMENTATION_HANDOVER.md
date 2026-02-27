# 🏁 HANDOVER: Auto-Rickshaw Protocol Implementation

**To the Implementing Agent**:
This directory contains the full blueprint for a React/Vite-based game simulator designed to teach Bangalore Kannada through situational immersion.

## 📁 Repository Structure
*   `GAME_ARCHITECTURE.md`: State management and tech stack.
*   `LEVEL_MAPPING.md`: Connections to the 10 SWALPA modules.
*   `ASSETS_MANIFEST.md`: Audio and visual requirements.
*   `levels/`: Markdown scripts for Levels 1-4.

## 💡 Implementation Core
1.  **State**: Track `RespectMeter`, `Wallet`, and `PatienceMeter`.
2.  **Logic**: Treat the `levels/*.md` files as the source of truth for the dialogue tree.
3.  **Educational Goal**: The game is a "callback" to the Swalpa documentation. If a player fails, point them to the specific module (e.g., Module 09 for Level 2).
4.  **Audio Integration**: Use the existing `scripts/generate_podcast.py` pattern to generate high-quality Kannada audio for the driver's lines.

## 🎯 Winning Criteria
A player should be able to go from a "Tourist" (paying 150 INR for 2km) to a "Macha" (paying meter plus 10 with a smile) purely by learning the correct phrases from the SWALPA modules.

**Good luck, Macha!**
