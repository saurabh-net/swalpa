# Level 1: The Terminal Selection

**Scenario**: You just stepped out of the Majestic Metro Station. The sun is beating down, and the air is thick with the scent of filter coffee and diesel. Three autos are lined up.

## 🌍 Environment Randomness
*   **Traffic**: [Random: Low/Medium/High]
*   **Weather**: [Random: Sunny/Drizzling]

## 🎴 Driver Selection
Pick your driver. Each has a different "vibe" and will react differently to your Kannada.

### 1. Guru (The Stoic)
*   **Visual**: Older, wearing a clean khaki uniform, reading a newspaper.
*   **Trait**: Very traditional. Dislikes over-familiarity. 
*   **Best for**: Players who prefer formal, correct grammar (Module 06).

### 2. Anna (The Friendly)
*   **Visual**: Middle-aged, bright smile, auto decorated with local movie posters.
*   **Trait**: Loves a good chat.
*   **Best for**: Players who enjoy social icebreakers like "Oota aitha?" (Module 03).

### 3. Macha (The Hustler)
*   **Visual**: Young, wearing sunglasses, listening to fast music.
*   **Trait**: Impatient but respects "SWAG".
*   **Best for**: Players comfortable with slang and confidence (Module 08).

---

## 💬 Dialogue Tree: The First Contact

### Turn 1: Engagement
*   **Player Choice A (Polite/Formal)**: *"Namaskara anna, 12th Main Indiranagar barthira?"* (Module 01/02)
    *   `Effect (Guru)`: { Respect: +20, Patience: +10 } -> *"Banni saar, meter haakthini."*
    *   `Effect (Macha)`: { Respect: +5, Patience: -5 } -> *"Hogthini, standard 200 kodi."*
*   **Player Choice B (Social/Banter)**: *"Oota aytha guru? Indiranagar Metro varge barthira?"* (Module 03/08)
    *   `Effect (Anna)`: { Respect: +25, Patience: +20 } -> *"Aythu saar! Banni, Indiranagar thumba doora, swalpa adjust maadi."*
    *   `Effect (Guru)`: { Respect: -10, Patience: -5 } -> *"Aythu. Hogutthe, meter plus 30 kodi."*
*   **Player Choice C (Direct/Casual)**: *"Indiranagar? Meter haaki."* (Module 02/09)
    *   `Effect (Macha)`: { Respect: +15, Patience: +10 } -> *"Sari macha, banni."*
    *   `Effect (Anna)`: { Respect: -10, Patience: -15 } -> *"No saar, thumba traffic ide."*

### Turn 2: The Negotiation (If no agreement)
*   **Condition**: Driver asks for fixed rate or "Meter plus".
*   **Player Choice A (Bargain)**: *"Bēda guru, thumba jaasthi aithu. Meter haaki, hattu rupayi extra kodthini."* (Module 04/07)
    *   `Effect`: { Respect: +15, Price: Meter+10 }
*   **Player Choice B (Firm)**: *"Bere auto nodthini, bidi."* (Module 02/08)
    *   `Effect`: { GameEnd: ResetLevel }

## 🎯 Victory Condition
Board the auto with a Respect score > 40 and an agreed price within 20 INR of the standard meter.
