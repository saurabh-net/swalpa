# Level 4: The Change War (Payment)

**Scenario**: You've reached your destination. The meter shows 87 INR. You give a 100 INR note. The driver says, *"Change illa saar."*

## 🎴 Key Learning
*   Numbers & Money (Module 05)
*   Daily Logistics (Module 10)

## 💬 Dialogue Tree

### Turn 1: The Transaction
*   **Driver**: *"Yappattu rupayi saar. Change illa."*
*   **Player Choice A**: *"Sari anna, bidi. Change beda."* (Refer: Module 10 - "Keep the change")
    *   `Effect`: { Respect: +30, LocalStatus: Macha }
*   **Player Choice B**: *"AyyO, change kodi anna. Google Pay idiya?"* (Oh, give change brother. Do you have Google Pay?)
    *   `Effect`: { Respect: +10, Wallet: +13 }
*   **Player Choice C**: *"Check correctly! You must have change!"*
    *   `Effect`: { Respect: -20, GameEnd: AwkwardSilence }

## 🏁 Final Score
Based on your **RespectMeter**:
*   **0-30**: "Sabaash! You survived, but you paid the 'Tourist Tax'."
*   **31-70**: "Good job! You're a Resident now."
*   **71-100**: "MACHA! You own these streets."
