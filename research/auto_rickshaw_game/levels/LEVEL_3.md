# Level 3: The Surge (Stormy Weather)

**Scenario**: A sudden Bangalore downpour starts. The sky is dark, and the roads are flooded. The driver pulls over.

## 🌍 Environment Modifier
*   **Active**: `Weather: Rain`
*   **Effect**: Driver `Patience` drops by 5 every turn. `Price` expectations are 1.5x.

## 💬 Dialogue Tree: The Standstill

### Turn 1: The Rain Demand
*   **Driver**: *"Saar, thumba male barthide. Nilli-stini, illandre 200 kodi."* (Module 07/10)
*   **Player Choice A (Sympathetic)**: *"Anna, thumba heavy male ide, gothu. Swalpa adjust maadi, 50 extra kodthini."* (Module 02/08/10)
    *   `Effect (Anna)`: { Respect: +20, Success: Agree } -> *"Sari saar, banni."*
    *   `Effect (Guru)`: { Respect: +10, Price: Meter+70 } -> *"Sari, adre bega nillisi."*
*   **Player Choice B (Aggressive)**: *"Why double? Meter haaki anna!"* (Module 09)
    *   `Effect (Macha)`: { Patience: -40, Respect: -10 } -> *"Hogi saar, bere auto nodi."*

### Turn 2: The Softener (The Cultural "Oota")
*   **Condition**: If Respect < 30.
*   **Player Choice A**: *"Sari anna, tumba kelsa ideya? Oota aytha?"* (Module 03/10)
    *   `Effect (Anna)`: { Respect: +30, Patience: +20 } -> *"Aythu saar, banni hogona."*
*   **Player Choice B (Firm but fair)**: *"Illi nilli-sidre kelsa aagalla. Nera hogi, extra kodthini."* (Module 09)
    *   `Effect`: { Respect: +10, Progress: +50% }

## 🎯 Victory Condition
Arrive at the destination without paying more than 1.5x the meter or being abandoned in the rain.
