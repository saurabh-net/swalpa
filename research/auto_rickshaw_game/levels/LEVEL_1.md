# Level 1: The Booking Standoff

**Scenario**: You are at a busy Metro exit. Three drivers are waiting. You need to pick one and get him to agree to a fare.

## 🎴 Characters
*   **Auto Driver A**: Grumpy, looking for high fare.
*   **Auto Driver B**: Elderly, respectful, prefers long distance.
*   **Auto Driver C**: Young "Macha" type, likes slang and confidence.

## 💬 Dialogue Tree

### Turn 1: Engagement
*   **Driver B**: *"Ellige hogabeku saar?"* (Where do you want to go, sir?)
*   **Player Choice A**: *"Guru, 12th Main Indiranagar barthira?"*
    *   `Effect`: { Respect: +15, Patience: +10 }
    *   `Driver Response`: *"Barthini, banni. Meter plus hattu kodi."*
*   **Player Choice B**: *"Hey, you go Indiranagar?"*
    *   `Effect`: { Respect: -10, Patience: -5 }
    *   `Driver Response`: *"No saar, busy time. One-and-half only."*

### Turn 2: The Farewell (Meter vs. Fix)
*   **Condition**: If Driver asks for one-and-half.
*   **Player Choice A**: *"Bēda guru, meter haaki. Swalpa doora maatra."* (Refer: Module 02/09)
    *   `Effect`: { Respect: +10, Price: Meter }
*   **Player Choice B**: *"Hogappa, bere auto nodthini."* (Refer: Module 08/09)
    *   `Effect`: { GameEnd: ResetLevel }

## 🎯 Victory Condition
Successfully board an auto with a fare agreement within 20 INR of the standard meter.
