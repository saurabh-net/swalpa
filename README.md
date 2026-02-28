# SWALPA (Spoken Words And Language Practical Acquisition)
> **Survive and thrive in Bengaluru. No script required.**

SWALPA (meaning "A little" in Kannada) is a highly interactive, practically-focused learning environment designed for expats, tech professionals, and newcomers living in Bangalore.

Traditional language apps teach you grammar rules and the written script. **SWALPA teaches you street survival.** We focus exclusively on phonetic pronunciation, situational roleplay, and the high-frequency vocabulary necessary to navigate daily life without friction.

🌐 **Live Application: [https://swalpa.org](https://swalpa.org)**

---

## 🎯 The Goal
The mission is simple: **Reduce friction in Bangalore.** 
Whether you're negotiating with an auto driver at Silk Board, requesting a plumber to fix a leak, or buying groceries in Indiranagar, SWALPA provides the exact, culturally-appropriate phrases you need to earn respect and get things done.

## 🚀 Core Features

### 1. The Core Survival Lessons
10 hyper-focused lessons covering the absolute essentials. We strip away complex academic grammar and focus on agglutinative logic (how words stick together) with phonetic pronunciation guides. Categories include:
* Auto & Cab Negotiation
* Landlord & Repair Interactions
* Local Bangalorean Slang
* Polite Social Interactions

### 2. High-Fidelity Audio Podcasts
We generated native, studio-quality Kannada audio (both male and female voices) using state-of-the-art Google Cloud TTS (Chirp-3-HD). Listen to specific words, or stream long-form podcasts dissecting sentence structure directly in the browser with zero playback latency.

### 3. Interactive Scenario Games
Stop reading and start reacting. SWALPA features custom-built JS roleplaying games:
* **Meter Haaki**: A time-pressured negotiation simulator with a Bangalore auto driver. Respond correctly to secure a fair ride.
* **Adjust Maadi**: Roleplay navigating a rent negotiation or repair request with your landlord.
* **Suffix Station**: A high-speed arcade game testing your ability to attach the right grammar suffixes under pressure.

### 4. Spaced-Repetition Flashcards
Our flashcards are powered by [Orbit](https://withorbit.com/). The embedded spaced-repetition algorithm tracks your memory retention strictly in your browser's local storage, ensuring you perfectly internalize the vocabulary over time.

### 5. Streaks, Badges & Profile Gamification
Consistency is key. 
* A dynamic **Word of the Day** widget pulls you back daily.
* Maintain **Streaks** (stored locally) to unlock milestone badges (e.g., *Regular Giraki*, *Dedicated Shishya*).
* Perform well in the games to earn "Respect Points" and climb the ranks from a *Tourist* to a *Bangalore Guru*.
* Showcase your progress with a custom built `<Share 📤>` modal designed to share seamlessly to WhatsApp or X.

---

## 🛠️ Infrastructure & Tech Stack

SWALPA masquerades as a static documentation site but operates as a **Progressive Web App (PWA)** under the hood.

* **Frontend Engine**: MkDocs (Material Theme)
* **Styling**: Extensive Custom CSS providing glassmorphism and responsive grid layouts.
* **Logic & State**: 100% Vanilla JavaScript. No React context, no massive build steps.
* **Persistence**: Purely `localStorage`. There is no backend database tracking user progress, maximizing privacy and speed.

## 🚀 Development Quick Start

If you want to spin up the documentation site locally:

1. Ensure Python 3 is installed.
2. Install the Material theme dependency:
```bash
pip install mkdocs-material
```
3. Run the live-reloading server:
```bash
mkdocs serve
```
4. Access the site at `http://127.0.0.1:8000/`.
