# SWALPA Styling Recommendations

This document outlines suggested styling improvements for the SWALPA site to align with its Bangalore-centric, "Speak first, read never" philosophy.

## 🎨 Color Palette: "Namma Bengaluru"

Instead of the default `indigo`, we should use colors that evoke the spirit of Bangalore.

*   **Gulmohar Red (`#E53935`)**: The primary brand color. Inspired by the vibrant Red Flame trees across the city. High energy, friendly, and attention-grabbing.
*   **Cubbon Green (`#2E7D32`)**: Secondary color. Inspired by Bangalore's lush parks. Used for success states, secondary buttons, and navigational elements.
*   **Dosa Gold (`#FFB300`)**: Accent color. Warm, inviting, and practical. Good for highlighting key phrases or high-impact vocabulary.
*   **Vidhana Grey (`#455A64`)**: Neutral text and background accents. Inspired by the granite architecture of the Vidhana Soudha.

## 🔠 Typography

*   **Primary Font**: Use `Inter` or `Outfit` for a modern, tech-friendly feel that resonates with the Bangalore IT crowd.
*   **Headings**: Bold, prominent headers that clearly demarcate "Survival" vs "Social" modules.
*   **Phonetic Guides**: Use a distinct, monospaced or italicized style for the phonetic guides (e.g., `⟨nuh-nuh-GEY⟩`) to make them stand out as the primary learning tool.

## 🍱 Component Design

*   **Phrase Cards**: Instead of plain lists, wrap phrases in subtle cards with shadows.
*   **Audio Integration**: Larger, more accessible "Play" icons. Use custom CSS to make the audio player feel integrated rather than a browser default.
*   **Visual Context**: Use small, consistent icons (Squoosh-optimized) next to category headers (e.g., an auto-rickshaw for "Travel", a coffee cup for "Social").

---

# Image Generation Prompts (Gemini Nano/Banana)

Use these prompts to generate high-quality assets for the site.

### 1. Website Favicon & App Icon
> **Prompt**: A minimalist, modern logo for a language learning app called SWALPA. The logo should feature a stylized, vibrant orange speech bubble merged with a minimal silhouette of a Bangalore street auto-rickshaw. Flat design, solid background (white or transparent), bold lines. Professional, friendly, and high-contrast.

### 2. Hero Section Illustration
> **Prompt**: A high-quality vector illustration of a modern IT professional (gender-neutral) comfortably speaking with a Bangalore street vendor. In the background, subtle hints of Cubbon Park greenery and a Metro pillar. Bright, "Gulmohar Red" and "Cubbon Green" color palette. Clean lines, modern "SaaS" illustration style (flat with subtle gradients). No text.

### 3. Module Icons (Icon Set)
> **Prompt**: A set of 6 minimalist line icons in a consistent style using a "Gulmohar Red" color. Icons should represent: 
> 1. History (Ancient temple pillar)
> 2. Survival/Emergency (A help sign or ambulance)
> 3. Social Interaction (Two Coffee mugs)
> 4. Travel/Transport (A Bangalore auto-rickshaw)
> 5. Numbers/Money (A rupee coin)
> 6. Verbs/Grammar (A gear or puzzle piece)
> Clean, simple, and recognizable at small sizes.

---

# 📄 Static Artifacts (Printable & Downloadable)

To complement the digital experience, we should provide static assets that users can carry with them offline.

1.  **"Auto-Survival" Dashboard (PDF)**: A single-sided A4 PDF with the top 20 phrases for interacting with auto-drivers and delivery partners. High-contrast, large text for quick glancing.
2.  **Pronunciation "Pocket Cards"**: Business-card-sized cutouts featuring the phonetic vowels and common suffixes like `-ge`, `-inda`, and `-alli`.
3.  **Bangalore "Swag" Stickers**: Stylized circle stickers with catchy phrases like `"Oota Aitha?"` or `"Sir, Swalpa Adjust Maadi"` featuring the new branding. This builds community and organic awareness.

---

# 🚀 Technology Stack Perspective: MkDocs vs. VitePress

Regarding your concern about MkDocs: **MkDocs is NOT deprecated**, but there is a major shift in the ecosystem. 

### The Current State
*   **MkDocs & Material**: Still extremely stable and widely used. However, the team behind the "Material" theme is shifting focus to a new tool called **Zensical** (support for Material remains until late 2026).
*   **Why stay on MkDocs?**: It's incredibly fast to write in plain Markdown. For a "Speak first, read never" resource, the low friction of content creation is a huge plus.
*   **Why "Upgrade" to VitePress?**:
    *   **Better Interactivity**: VitePress is powered by Vue/Vite. We could build much more "app-like" interactive flashcards, quizzes, and custom audio players directly in the docs.
    *   **Premium Feel**: It has a more modern, "SaaS-like" aesthetic out of the box with smoother transitions.
    *   **Future Proofing**: If we want to add complex language-learning logic (like space-repetition algorithms for flashcards), VitePress gives us the full power of JavaScript/Vue.

### Recommendation
1.  **Phase 1 (Current)**: Apply the "Namma Bengaluru" branding to the existing MkDocs site. This gives you an immediate visual win.
2.  **Phase 2 (Optional)**: If you want a truly "WOW" app-like experience, we can plan a migration to **VitePress**. This would allow us to build a more robust, interactive language-learning platform beyond just a documentation site.

---

# Proactive Suggestions

1.  **"Quick-Reply" Dashboard**: A dedicated page or sticky footer with the top 5 most used phrases (e.g., "Bēku", "Bēda", "How much?", "Go straight").
2.  **Interactive Flashcards**: Improve the existing flashcards (Module 11) with a better UI that mimics physical cards.
3.  **Bangalore "Easter Eggs"**: Add subtle local references in the examples (e.g., mentioning "Corner House" or "MTR") to build cultural familiarity.
