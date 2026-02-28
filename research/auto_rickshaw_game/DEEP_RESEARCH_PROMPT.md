# Gemini Deep Research Prompt: Auto-Rickshaw Protocol Level Design

Copy and paste the prompt below into Gemini Deep Research to generate detailed level scripts for the game.

---

## 🎭 The Task: Deep Level Design for "Auto-Rickshaw Protocol"

**Objective**: Act as a Senior Game Designer and Lead Linguist for "SWALPA," a project teaching Bangalore Kannada through real-world street interactions. Your task is to design a series of deep, intricate branching dialogue levels for the "Auto-Rickshaw Protocol" game.

### 🏗️ Game Mechanics & Constraints
For every dialogue node in the graph, you MUST provide exactly **4 choices**:
1.  **Choice A (English)**: Direct and clear. Effectively makes progress in the task (e.g., getting a price) but **ALWAYS** results in a loss of **Respect (-15 to -20)** and a higher **Cost (+10% to +20% fare)**.
2.  **Choice B (Kannada - Polite/Local)**: Earns **Respect (+10 to +25)** and potentially lowers **Money Cost (-10%)**. Uses correct polite imperatives or local Bangalore slang.
3.  **Choice C (Kannada - Mix/Attempt)**: Mixed results. Uses Kannada but maybe slightly incorrect or overly formal. Small **Respect** gain, neutral cost.
4.  **Choice D (Scenario-Specific)**: Miming, pointing, or using a very specific local phrase (e.g., "Adjust maadi").

**Scenario Variation**: Occasionally introduce "Language Barriers" where the NPC says they don't understand English. In these nodes, the English choice fails or causes the NPC to get frustrated (Patience -30).

### 📊 Level Metadata Requirements
For each level, generate a detailed script using the following JSON-compatible structure (simulated):
*   **Level Title & Scenario**: Setting the scene (e.g., "The Majestic Peak Hour", "The Midnight Hospital Run").
*   **NPC Personality**: A brief description of the driver's archetype (e.g., "The Philosophical Elder", "The Aggressive Hustler").
*   **Dialogue Graph**: A clear mapping of nodes (Engagement -> Negotiation -> conflict -> resolution).
*   **State Effects**: Explicitly state the effect on respect, wallet, and patience for every choice.

### 📍 Level Selection (Pick 3 to Start)
1.  **Level 7: The Sudden Breakdown**: The auto engine sputters and stops in the middle of a busy flyover. Negotiate the next move or a partial refund.
2.  **Level 8: The Majestic Bus Stand Chaos**: Multiple drivers are shouting at you. Navigate the chaos to find someone willing to go to a far-off layout like Sarjapur.
3.  **Level 9: The Rainy Night Medical Emergency**: You need to reach a pharmacy or hospital quickly. Emotional stakes are high.

**Tone**: Urban, authentic, gritty-but-helpful. Capture the unique "Rickshaw Logic" of Bangalore.

**Linguistic Requirement**: All Kannada options should be provided in **Latin transliteration** (e.g., "Hogona?") with the **English translation** in parentheses.

---
