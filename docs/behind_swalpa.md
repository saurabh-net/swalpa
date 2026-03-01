# 📖 Behind SWALPA

Welcome to the engine room!

SWALPA started as a simple New Year’s resolution to finally learn Kannada. It began as a small collection of personal notes and evolved into an interactive platform specifically designed for people living and working in Bengaluru.

---

## Learning Street-Smart Kannada

### The "Why"
Most traditional language apps focus on formal grammar and rigid vocabulary—teaching you how to say "The cat is on the table." But if you live in Bengaluru, that doesn't help you survive the daily commute.

You need to know how to:

1.  Negotiate fares with an auto-rickshaw driver.
2.  Handle logistics, direct deliveries, and "adjust" your way through the daily chaos.
3.  Use the right slang to sound like a local insider, not a textbook.

### The SWALPA Philosophy
Instead of rote memorization of alphabets, SWALPA focuses on **high-frequency necessity**. We emphasize the "Bēku/Bēda" (Want/Don't Want) engine, equipping you with the immediate vocabulary needed to respectfully interact with vendors, drivers, and service personnel.

Our interactive games (like *Meter Haaki* and *Adjust Maadi*) let you dry-run these scenarios safely before trying them on the street.

### Connection and Culture
Learning the local language goes far beyond mere survival—it is fundamentally about respect. Making an honest attempt to speak Kannada shows the people living around you that you value their culture. Transactions transform into genuine conversations, and the city opens up.

It also changes how you see Bengaluru itself. Suddenly, maps and menus start revealing their histories. You realize that **Doddakannelli** means "Big" (Dodda) Kannelli, while **Chikka Thirupathi** means "Small" (Chikka) Thirupathi. Translating my absolute favorite dish—**Bisi Bele Bath**—literally gives you the recipe: "Hot" (Bisi) "Lentil" (Bele) "Rice Dish" (Bath). Once you learn that **Benne** means butter, you stop questioning why a Benne Dosa tastes so good.

Even the chaotic traffic geography makes sense when you understand the names:

- **Hosa** (e.g., Hosa Road): Means *New*. You'll find "Hosa" versions of many old neighborhoods as the city expands.
- **-halli** (e.g., Marathahalli, Munnekolala): Means *Village*. A reminder that today's massive tech hubs were farmland just a generation ago.
- **-pete** (e.g., Chickpet, Balepet): This means *Market*. These represent the historic, densely packed commercial centers of the old city.

### Extending the Framework
The street-smart framework built here isn't just for Kannada. The core philosophy of learning a language through survival scenarios is expanding. A sister project applying these exact same principles to Tamil is currently in the works over at [konjam.org](https://konjam.org/)!

---

## Engineering & AI Architecture

While language is the focus of the site, the underlying platform serves as an experimental playground for modern web architecture and AI workflows.

### The Stack (Local-First)
The platform is designed to be high-performance, private, and extremely low-maintenance.

- **Frontend**: Built on MkDocs Material (static site generation) heavily augmented with Vanilla Javascript.
- **Persistence**: We use a **Local-First** architecture. Progress is instantly saved to your browser's `localStorage` ensuring sub-millisecond UI feedback. We integrate **Userbase.com** for optional end-to-end cloud sync, allowing you to back up your streak across devices.
- **Interactivity**: Custom-built JS game engines, Orbit-powered Spaced Repetition (SRS) flashcards, and a Giscus-powered feedback system.

### AI-Assisted, Human-Led Workflow
The core 10 lessons serve as the manually curated "Source of Truth," constructed after weeks of research. However, the interactive layers built on top of them are powered by AI:

- **Audio Generation**: We utilize Python scripts to interface with Google Cloud's advanced Text-to-Speech models (like Chirp3-HD) to generate the native-sounding, street-accurate pronunciation clips.
- **Agentic Coding**: The game engines, UI features, and cloud sync logic were co-developed alongside **Antigravity** (an agentic coding AI).
- **Content Expansion**: Workflows utilizing Gemini Deep Research and NotebookLM help process grammar rules, generate podcast scripts, and maintain architectural consistency across the Markdown codebase.

### Behind the Curtains
The project is entirely open-source ([GitHub Public Repo](https://github.com/saurabh-net/swalpa)). However, we maintain a private staging repository that acts as an internal "brain"—holding thousands of lines of raw research, Python build scripts, and experimental features before they are distilled and deployed to this live site.

---

*Disclosure: I work at Google, but this is a pure passion project built on the side to keep myself accountable to my learning goals. The AI stack utilized throughout this project consists exclusively of Google's public tools (Gemini, NotebookLM, Google Cloud TTS). Keep exploring, keep practicing, and remember: Banni, swalpa swalpa kaliyona! (Come, let's learn little by little!)*
