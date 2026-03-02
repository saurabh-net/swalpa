# AI Workflows

While language is the focus of the site, the underlying platform serves as an experimental playground for AI assisted development and workflows.

## The Stack (Local-First)
The platform is designed to be high-performance, private, and extremely low-maintenance.

- **Frontend**: Built on MkDocs Material (static site generation) heavily augmented with Vanilla Javascript.
- **Persistence**: We use a **Local-First** architecture. Progress is instantly saved to your browser's `localStorage` ensuring sub-millisecond UI feedback. We integrate **Firebase** for optional real-time cloud sync, allowing you to back up your streak across devices.
- **Interactivity**: Custom-built JS game engines, Orbit-powered Spaced Repetition (SRS) flashcards, NotebookLM authored podcasts and slides, and a Giscus-powered feedback system.

---

## AI-Assisted, Human-Led Workflow
The core 10 lessons serve as the manually curated "Source of Truth," constructed after weeks of research. However, the interactive layers built on top of them are powered by AI:

- **Agentic Coding**: The game engines, UI features, and **Firebase** cloud sync logic were co-developed alongside **Antigravity** (an agentic coding AI).
- **Audio Generation**: We utilize Python scripts to interface with Google Cloud's advanced Text-to-Speech models (like Chirp3-HD) to generate the native-sounding, street-accurate pronunciation clips.
- **Content Expansion**: Workflows utilizing Gemini Deep Research and NotebookLM help process grammar rules, generate podcast scripts, and maintain architectural consistency across the Markdown codebase.

---

## Behind the Curtains
The project is entirely open-source ([GitHub Public Repo](https://github.com/saurabh-net/swalpa)). However, we maintain a private staging repository that acts as an internal "brain"—holding thousands of lines of raw research, Python build scripts, and experimental features before they are distilled and deployed to this live site.

### Extending the Framework
The framework built here isn't just for Kannada. The core philosophy of learning a language through survival scenarios is expanding. We've recently migrated our persistence layer to **Firebase** to provide robust, real-time synchronization across devices, making the platform ready for even more languages. A sister project applying these exact same principles to Tamil -- with a different author -- is currently in the works over at [konjam.org](https://konjam.org/)!


---

*Disclosure: I work at Google, but this is a pure passion project built on the side to keep myself accountable to my learning goals. The AI stack utilized throughout this project consists exclusively of Google's public tools (Gemini, NotebookLM, Google Cloud TTS, Firebase, Antigravity). Keep exploring, keep practicing, and remember: Banni, swalpa swalpa kaliyona! (Come, let's learn little by little!)*
