# Level 3: The Surge (Stormy Weather)

**Scenario**: A sudden Bangalore downpour starts. Traffic is at a standstill. The driver wants double the fare to continue.

## 🎴 Key Learning
*   Adjectives (Module 07)
*   Numbers (Module 05)
*   Negotiation (Module 04)

## 💬 Dialogue Tree

### Turn 1: The Rain Demand
*   **Driver**: *"Saar, thumba male barthide. Double kodi, illandre nillisthini."* (Sir, heavy rain is coming. Give double, or I will stop)
*   **Player Choice A**: *"Bēda anna, thumba jaasthi ide. Swalpa adjust maadi."* (No brother, that's too much. Please adjust a bit)
    *   `Effect`: { Respect: +10, Price: Meter + 50 }
*   **Player Choice B**: *"Why double? I already agreed meter!"*
    *   `Effect`: { Patience: -30, Respect: -10 }

### Turn 2: The Softener
*   **Player Choice A**: *"Metro terminal varge banni, innu hattu rupayi extra kodthini."* (Come till the Metro terminal, I'll give 10 rupees extra)
    *   `Effect`: { Respect: +20, Success: True }
*   **Player Choice B**: *"Illi nillisi, bere auto nodthini."* (Stop here, I'll see another auto)
    *   `Effect`: { GameEnd: Failure }

## 🎯 Victory Condition
Arrive at the destination without paying more than 1.5x the meter or the driver abandoning you in the rain.
