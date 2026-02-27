# Level 2: The Maze (Navigation)

**Scenario**: You are inside the auto. The driver is taking a "shortcut" but seems lost. You need to guide him using precise directions.

## 🎴 Key Learning
*   Directions (Module 09)
*   Polite Requests (Module 06)

## 💬 Dialogue Tree

### Turn 1: Approaching a Junction
*   **Driver**: *"Illi left-ah, right-ah saar?"*
*   **Player Choice A**: *"Illi balagade thogoli, amele nera hogi."* (Right here, then go straight)
    *   `Effect`: { Respect: +10, Progress: +25% }
*   **Player Choice B**: *"Left hogi... alla alla, right thogoli!"* (Go left... no no, take right!)
    *   `Effect`: { Patience: -20, Respect: -5 }

### Turn 2: Precision Stopping
*   **Goal**: Stop exactly in front of the gate.
*   **Player Choice A**: *"Hange munde hogi... swalpa munde... alli nillisi."* (Go a bit ahead... stop there)
    *   `Effect`: { Respect: +15, Progress: 100% }
*   **Player Choice B**: *"Stop here! Nillisi!"*
    *   `Effect`: { Respect: -5, Patience: -5 }

## 🎯 Victory Condition
Reach the destination without the **PatienceMeter** hitting zero.
