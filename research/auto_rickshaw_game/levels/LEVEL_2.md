# Level 2: The Maze (Navigation)

**Scenario**: You are in the auto. The driver is entering the narrow, confusing gullies of Malleshwaram. He seems slightly unsure of the new flyover diversions.

## 🔀 Branching Path
*   **Path A: The Gully Shortcut** (Faster progress but higher risk of driver frustration).
*   **Path B: The Main Road** (Safe, but slower and subject to "Traffic" randomness).

---

## 💬 Dialogue Tree: The Guide

### Turn 1: The Junction
*   **Driver**: *"Saar, illi flyover work aagtide. Left-ah, right-ah?"* (Module 10)
*   **Player Choice A (Right/Precise)**: *"Illi balagade thagonli, aamele nera hogi."* (Module 09)
    *   `Effect (Guru)`: { Respect: +15, Progress: +30% } -> *"Sari saar, neat-agi heli-deeri."*
    *   `Effect (Macha)`: { Respect: +10, Progress: +40% } -> *"Super macha, fast-agi hogona."*
*   **Player Choice B (Indecisive)**: *"Left hogi... alla alla, right thogoli! Swalpa adjust maadi."* (Module 02/08)
    *   `Effect (All)`: { Patience: -20, Respect: -5 } -> *"Saar, swalpa clear-agi heli."*

### Turn 2: The "Hurry" Environment (Random Trigger)
*   **Condition**: If `Path A` is chosen and `Patience < 50`.
*   **Driver**: *"Tumba jaasthi time aagtide saar. Illi nillisti-ni?"* (Module 07/09)
*   **Player Choice A (Encouraging)**: *"Bēda anna, swalpa munde hogi. Alli park hatra nillisi."* (Module 09)
    *   `Effect (Anna)`: { Respect: +10, Patience: +15 }
*   **Player Choice B (Bribe/Urgent)**: *"Bega hogi anna, innu hattu rupayi extra kodthini."* (Module 05/09)
    *   `Effect (Macha)`: { Respect: +20, Progress: +50% }

## 🎯 Victory Condition
Reach the destination without the **PatienceMeter** hitting zero.
