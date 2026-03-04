---
image: assets/img/social/og_lesson_11.jpg
description: Interactive Kannada flashcards — practice recognising Kannada words and phrases in their English meaning. Spaced repetition for real Bangalore street vocabulary.
hide:
  - toc
---
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Kannada to English Flashcards",
    "description": "Practice recognising Kannada words and translating them to English with spaced repetition flashcards covering everyday Bangalore vocabulary.",
    "educationalLevel": "Beginner",
    "learningResourceType": "Flashcards",
    "inLanguage": ["kn", "en"],
    "provider": { "@type": "Organization", "name": "SWALPA", "url": "https://swalpa.org" }
}
</script>

<script type="module" src="https://js.withorbit.com/orbit-web-component.js"></script>

<style>
/* Hide all review areas by default */
orbit-reviewarea {
    display: none;
}
/* Show the active one */
orbit-reviewarea.active {
    display: block;
    animation: fadeIn 0.5s ease;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.flashcard-nav {
    margin: 40px 0;
    text-align: center;
    padding: 20px;
    background: rgba(var(--md-primary-fg-color--rgb), 0.05);
    border-radius: 12px;
    border: 1px dashed var(--md-primary-fg-color);
}
.next-cards-btn {
    background: var(--md-primary-fg-color);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
}
.next-cards-btn:hover {
    transform: scale(1.05);
    background: var(--md-primary-fg-color--dark);
}
.progress-text {
    margin-top: 10px;
    font-size: 0.85rem;
    color: var(--md-typeset-color);
    opacity: 0.7;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const areas = document.querySelectorAll('orbit-reviewarea');
    let currentIndex = 0;

    const updateVisibility = () => {
        areas.forEach((area, index) => {
            if (index === currentIndex) {
                area.classList.add('active');
            } else {
                area.classList.remove('active');
            }
        });
        
        // Update progress text
        const progressEl = document.getElementById('flashcard-progress');
        if (progressEl) {
            progressEl.innerText = `Block ${currentIndex + 1} of ${areas.length} (Cards ${currentIndex * 5 + 1} - ${Math.min((currentIndex + 1) * 5, 100)})`;
        }
        
        // Final block check
        const nextBtn = document.getElementById('next-block-btn');
        if (nextBtn) {
            if (currentIndex === areas.length - 1) {
                nextBtn.innerText = "All Done! Restart?";
                nextBtn.onclick = () => { currentIndex = 0; updateVisibility(); };
            } else {
                nextBtn.innerText = "Next 5 Cards →";
                nextBtn.onclick = () => { currentIndex++; updateVisibility(); window.scrollTo({top: 0, behavior: 'smooth'}); };
            }
        }
    };

    // Initial state
    if (areas.length > 0) {
        updateVisibility();
    }

    // Badge observer (existing)
    const observer = new MutationObserver(() => {
        if (document.querySelectorAll('orbit-reviewarea').length > 0) {
            document.querySelectorAll('orbit-reviewarea').forEach(area => {
                area.addEventListener('click', () => {
                    if (window.unlockBadge) window.unlockBadge('flashcard_shishya');
                }, { once: true });
            });
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
</script>

# Flashcards (Kannada to English)

> [!TIP]
> **Sync your progress with [withorbit.com](https://withorbit.com).** By completing a small set of cards, you'll be prompted to sign in, ensuring your spaced repetition progress is saved across devices!

<div class="flashcard-nav">
    <button id="next-block-btn" class="next-cards-btn">Next 5 Cards →</button>
    <div id="flashcard-progress" class="progress-text">Block 1 of 20</div>
</div>

<orbit-reviewarea id="orbit-kn-en-1">
<orbit-prompt question="Naanu. (Used primarily in the nominative case; acts as the anchor for self-identification.)" answer="**The Kannada first-person singular pronoun for &quot;I&quot; or &quot;Me&quot;.**"></orbit-prompt>
<orbit-prompt question="Neevu. (The absolute default for strangers, vendors, and colleagues in Bengaluru.)" answer="**The polite second-person pronoun that is the default for addressing strangers and colleagues in Bengaluru.**"></orbit-prompt>
<orbit-prompt question="Neenu. (Reserved strictly for close friends or children; avoid using with service personnel.)" answer="**The informal Kannada pronoun for &quot;You&quot; (equivalent to Hindi &quot;Tu&quot;).**"></orbit-prompt>
<orbit-prompt question="Avaru. (The third-person respectful pronoun; functions for both genders and as the general plural &quot;they&quot;.)" answer="**The third-person respectful pronoun that functions for both genders and serves as the general plural &quot;they&quot;.**"></orbit-prompt>
<orbit-prompt question="Naavu. (The first-person plural pronoun; used inclusively.)" answer="**The Kannada first-person inclusive plural pronoun for &quot;We&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-2">
<orbit-prompt question="Idu. (Refers to an inanimate object or animal in close physical proximity within the Amahat category.)" answer="**The demonstrative pronoun that refers to an inanimate object or animal in close physical proximity.**"></orbit-prompt>
<orbit-prompt question="Adu. (Refers to an object or animal at a distance.)" answer="**The Kannada demonstrative pronoun for &quot;That&quot; referring to an object at a distance.**"></orbit-prompt>
<orbit-prompt question="Illi. (Spatial marker meaning &quot;Here&quot;; essential for instructing transport drivers where to stop.)" answer="**The spatial marker that is essential for instructing transport drivers where to stop.**"></orbit-prompt>
<orbit-prompt question="Alli. (Spatial marker denoting a distant location.)" answer="**The spatial marker in Kannada that denotes a distant location for &quot;There&quot;.**"></orbit-prompt>
<orbit-prompt question="Elli?. (The primary spatial interrogative; often combined with directional suffixes.)" answer="**The primary spatial interrogative word for &quot;Where?&quot; in Kannada.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-3">
<orbit-prompt question="Yenu? or Enu?. (The universal interrogative for objects and concepts; can also express surprise.)" answer="**The universal Kannada interrogative word for &quot;What?&quot; used for objects and concepts.**"></orbit-prompt>
<orbit-prompt question="Yeshtu? or Eshtu?. (Meaning &quot;How much?&quot;; critical for all financial transactions and market inquiries.)" answer="**The interrogative word that is critical for financial transactions and market inquiries regarding price.**"></orbit-prompt>
<orbit-prompt question="Yaaru?. (The interrogative for identifying people.)" answer="**The Kannada interrogative word used specifically for identifying people as &quot;Who?&quot;.**"></orbit-prompt>
<orbit-prompt question="Yaake?. (Interrogative used to demand reasoning or causation.)" answer="**The Kannada interrogative used to demand reasoning or causation meaning &quot;Why?&quot;.**"></orbit-prompt>
<orbit-prompt question="Haudu. (Affirmative response; the &#x27;ou&#x27; diphthong is pronounced similarly to the &#x27;o&#x27; in &quot;go&quot;.)" answer="**The standard affirmative response in Kannada for &quot;Yes&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-4">
<orbit-prompt question="Illa. (Negative response indicating absence or disagreement; pronounced with emphasis on the first syllable.)" answer="**The Kannada word that functions as both &quot;No&quot; and a negative response indicating absence.**"></orbit-prompt>
<orbit-prompt question="Beku. (Indicating desire or requirement; used pervasively in commercial transactions.)" answer="**The essential modal verb that indicates desire or requirement for &quot;Want&quot; or &quot;Need&quot;.**"></orbit-prompt>
<orbit-prompt question="Beda. (Meaning &quot;Do not want/need&quot;; useful for declining offers, refusing higher fares, or dismissing hawkers.)" answer="**The negative counterpart to &quot;Beku&quot; used to decline offers or refuse higher fares.**"></orbit-prompt>
<orbit-prompt question="Banni. (The required formal application for daily use meaning &quot;Please come&quot;.)" answer="**The respectful imperative form of the verb &quot;Baa&quot; (Come).**"></orbit-prompt>
<orbit-prompt question="Hogi. (Essential for directing transport meaning &quot;Please go&quot;.)" answer="**The respectful imperative form of the verb &quot;Hogu&quot; (Go).**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-5">
<orbit-prompt question="Kodi. (Root is Kodu; used when requesting items in a shop or asking for a ticket.)" answer="**The respectful imperative verb that is used when requesting items in a shop or asking for a ticket.**"></orbit-prompt>
<orbit-prompt question="Thagonli. (Root is Thogo; used when handing cash or items to a vendor.)" answer="**The respectful imperative used when handing cash or items to a vendor.**"></orbit-prompt>
<orbit-prompt question="Maadi. (The respectful imperative of &quot;Maadu&quot;; often used in phrases like &quot;Adjust maadi&quot;.)" answer="**The universal auxiliary verb that is often appended to English nouns to create &#x27;Kanglish&#x27; verbs.**"></orbit-prompt>
<orbit-prompt question="Nillisi. (Imperative verb meaning &quot;Stop&quot;; standard command for instructing an auto or cab driver to halt.)" answer="**The standard respectful command for instructing a driver to stop.**"></orbit-prompt>
<orbit-prompt question="Nodi. (Root is Nodu; used to direct someone&#x27;s attention or request they inspect something.)" answer="**The respectful imperative is used to request someone to inspect or look at something.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-6">
<orbit-prompt question="Heli. (Root is Helu; used to prompt information, such as asking a vendor to state a final price.)" answer="**The respectful imperative used to prompt information like a final price.**"></orbit-prompt>
<orbit-prompt question="Keli. (Root is Kelu; used to gain attention before a question or to ask/listen.)" answer="**The respectful imperative used to gain someone&#x27;s attention before asking a question.**"></orbit-prompt>
<orbit-prompt question="Nera. (Directional adverb; used extensively in navigation as in &quot;Nera hogi&quot;.)" answer="**The directional adverb that is used to instruct a driver to go &quot;Straight&quot;.**"></orbit-prompt>
<orbit-prompt question="Edagade or Eda. (Directional noun where Eda means left and gade means side.)" answer="**The Kannada directional noun for &quot;Left&quot;.**"></orbit-prompt>
<orbit-prompt question="Balagade or Bala. (Directional noun where Bala means right and gade means side.)" answer="**The Kannada directional noun for &quot;Right&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-7">
<orbit-prompt question="Mundhe. (Spatial marker meaning forward or ahead; often used as &quot;Mundhe nillisi&quot;.)" answer="**The spatial marker for &quot;Forward&quot; is often combined with &quot;Nillisi&quot; to mean &quot;Stop ahead&quot;.**"></orbit-prompt>
<orbit-prompt question="Hindhe. (Spatial marker; indicates the rear or reversing direction.)" answer="**The spatial marker in Kannada that denotes &quot;Backward&quot; or &quot;Behind&quot;.**"></orbit-prompt>
<orbit-prompt question="Olagade. (Spatial marker meaning inside; useful for directing personnel to leave items inside a gate or door.)" answer="**The spatial marker that is used to direct delivery personnel to leave items &quot;Inside&quot;.**"></orbit-prompt>
<orbit-prompt question="Horagade or Aache. (Spatial marker; used to instruct drivers, delivery agents, or guests to wait externally.)" answer="**The spatial marker for &quot;Outside&quot; is used to instruct drivers or guests to wait externally.**"></orbit-prompt>
<orbit-prompt question="Swalpa. (Highly utilized adverb; can mean a small amount or function as a conversational softener.)" answer="**The adverb that functions as both a measure for &quot;A little&quot; and a polite conversational softener.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-8">
<orbit-prompt question="Jaasthi. (Adverb indicating excess; used in market bargaining as in &quot;Thumba jaasthi&quot;.)" answer="**The adverb for &quot;Too much&quot; or &quot;More&quot; is frequently used in market bargaining.**"></orbit-prompt>
<orbit-prompt question="Bega. (Adverb of speed; used to urge drivers or request expedited service.)" answer="**The Kannada adverb for &quot;Fast&quot; used to urge drivers to speed up.**"></orbit-prompt>
<orbit-prompt question="Nidhana or Mellage. (Adverb of speed; essential for requesting individuals to speak slower or drive carefully.)" answer="**The adverb that is essential for requesting individuals to speak more slowly.**"></orbit-prompt>
<orbit-prompt question="Chennagide. (Indicating satisfactory quality; applied to food, weather, or general states of being.)" answer="**The Kannada adjective/state that indicates satisfactory quality for &quot;Good&quot; or &quot;Well&quot;.**"></orbit-prompt>
<orbit-prompt question="Ketta. (Adjective meaning &quot;Bad&quot;; describing poor quality or negative states.)" answer="**The Kannada adjective that is used to describe poor quality or negative states.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-9">
<orbit-prompt question="Sari. (Agreement particle meaning &quot;Correct&quot; or &quot;Okay&quot;; used to confirm instructions or agree to a price.)" answer="**The agreement particle that is used to acknowledge a statement or agree to a price.**"></orbit-prompt>
<orbit-prompt question="Ondu. (The foundational numeric unit; also functions syntactically as an indefinite article.)" answer="**The Kannada word for the numeric unit &quot;One&quot;.**"></orbit-prompt>
<orbit-prompt question="Eradu. (Numeric unit central to basic counting and market transactions.)" answer="**The Kannada word for the numeric unit &quot;Two&quot;.**"></orbit-prompt>
<orbit-prompt question="Mooru. (Numeric unit for 3.)" answer="**The Kannada word for the numeric unit &quot;Three&quot;.**"></orbit-prompt>
<orbit-prompt question="Naalku. (Numeric unit for 4.)" answer="**The Kannada word for the numeric unit &quot;Four&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-10">
<orbit-prompt question="Aidhu. (Numeric unit for 5.)" answer="**The Kannada word for the numeric unit &quot;Five&quot;.**"></orbit-prompt>
<orbit-prompt question="Aaru. (Numeric unit for 6.)" answer="**The Kannada word for the numeric unit &quot;Six&quot;.**"></orbit-prompt>
<orbit-prompt question="Yelu. (Numeric unit for 7.)" answer="**The Kannada word for the numeric unit &quot;Seven&quot;.**"></orbit-prompt>
<orbit-prompt question="Entu. (Numeric unit for 8.)" answer="**The Kannada word for the numeric unit &quot;Eight&quot;.**"></orbit-prompt>
<orbit-prompt question="Ombathu. (Numeric unit for 9.)" answer="**The Kannada word for the numeric unit &quot;Nine&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-11">
<orbit-prompt question="Hattu. (Numeric unit for 10; demonstrates the shift from the ancient root Pattu.)" answer="**The numeric unit for &quot;Ten&quot; demonstrates the historical Proto-Dravidian &#x27;p&#x27; to &#x27;h&#x27; shift.**"></orbit-prompt>
<orbit-prompt question="Hannondu. (Numeric compound; demonstrates Sandhi fusion of Hattu (10) and Ondu (1).)" answer="**The numeric compound meaning &quot;Eleven&quot; demonstrates the fusion of Hattu and Ondu via Sandhi.**"></orbit-prompt>
<orbit-prompt question="Hanneradu. (Numeric compound formed from 10 + 2.)" answer="**The Kannada numeric compound for &quot;Twelve&quot;.**"></orbit-prompt>
<orbit-prompt question="It signifies the &#x27;teen&#x27; equivalent in Kannada grammar. (Example: Hadimooru signifies 13.)" answer="**What the Kannada prefix &quot;Hadi-&quot; signifies in numeric compounds like Hadimooru (Thirteen).**"></orbit-prompt>
<orbit-prompt question="Hadinaalku. (Numeric compound signifying 10 + 4.)" answer="**The Kannada numeric compound for &quot;Fourteen&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-12">
<orbit-prompt question="Hadinaidu. (Numeric compound signifying 10 + 5.)" answer="**The Kannada numeric compound for &quot;Fifteen&quot;.**"></orbit-prompt>
<orbit-prompt question="Hadinaaru. (Numeric compound signifying 10 + 6.)" answer="**The Kannada numeric compound for &quot;Sixteen&quot;.**"></orbit-prompt>
<orbit-prompt question="Hadinelu. (Numeric compound signifying 10 + 7.)" answer="**The Kannada numeric compound for &quot;Seventeen&quot;.**"></orbit-prompt>
<orbit-prompt question="Hadinentu. (Numeric compound signifying 10 + 8.)" answer="**The Kannada numeric compound for &quot;Eighteen&quot;.**"></orbit-prompt>
<orbit-prompt question="Hattombattu. (Numeric compound signifying 10 + 9.)" answer="**The Kannada numeric compound for &quot;Nineteen&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-13">
<orbit-prompt question="Ippattu. (The base unit for the twenties; the &#x27;-ttu&#x27; ending denotes multiples of ten.)" answer="**The numeric base unit for &quot;Twenty&quot; uses the &#x27;-ttu&#x27; suffix to denote a multiple of ten.**"></orbit-prompt>
<orbit-prompt question="Moovattu. (Numeric multiple of ten; used constantly in small retail and transport.)" answer="**The Kannada numeric multiple for &quot;Thirty&quot; often used in retail.**"></orbit-prompt>
<orbit-prompt question="Nalavattu. (Numeric multiple of ten representing 40.)" answer="**The Kannada numeric multiple for &quot;Forty&quot;.**"></orbit-prompt>
<orbit-prompt question="Aivattu. (Numeric multiple of ten representing 50.)" answer="**The Kannada numeric multiple for &quot;Fifty&quot;.**"></orbit-prompt>
<orbit-prompt question="Nooru. (The base unit for hundreds; vital for larger transactions and rent discussions.)" answer="**The base unit for &quot;One Hundred&quot; is vital for rent and larger transactions.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-14">
<orbit-prompt question="Saavira. (The base unit for thousands.)" answer="**The Kannada base unit for &quot;One Thousand&quot;.**"></orbit-prompt>
<orbit-prompt question="-alli or -nalli. (The locative case suffix; replaces prepositions like &#x27;in&#x27; or &#x27;at&#x27;.)" answer="**The Sapthami Vibhakti suffix indicates location in space or time for &quot;In&quot; or &quot;On&quot;.**"></orbit-prompt>
<orbit-prompt question="-ge, -ige, or -kke. (The dative case suffix; indicates target destination or recipient, crucial for transport.)" answer="**The Chaturthi Vibhakti suffix indicates a target destination or recipient for &quot;To&quot;.**"></orbit-prompt>
<orbit-prompt question="-inda or -nindha. (The instrumental case suffix; indicates origin or means and often serves as an ablative.)" answer="**The Triteeya Vibhakti suffix indicates origin or means for &quot;From&quot; or &quot;By&quot;.**"></orbit-prompt>
<orbit-prompt question="-a, -ina, or -na. (The genitive case suffix; indicates possession or relationship, replacing English &#x27;Of&#x27;.)" answer="**The Shashti Vibhakti suffix indicates possession or relationship for &quot;Of&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-15">
<orbit-prompt question="-galu. (The primary plural suffix for inanimate objects, such as Pustakagalu for books.)" answer="**The primary agglutinative suffix used to indicate plurality for non-human (inanimate) objects.**"></orbit-prompt>
<orbit-prompt question="-ru or -aru. (The specific plural suffix for the Mahat category, denoting respect or multiple human subjects.)" answer="**The plural suffix is reserved for the Mahat (Rational) category to denote respect or multiple people.**"></orbit-prompt>
<orbit-prompt question="Nanage or Nange. (Meaning &quot;To me&quot;; the absolute anchor for all experiential verbs like hunger or desire.)" answer="**The dative form of the first-person pronoun &quot;I&quot;, used as the anchor for experiential verbs.**"></orbit-prompt>
<orbit-prompt question="Nimage. (Meaning &quot;To you (Respectful)&quot;; used in phrases like &quot;Nimage yenu beku?&quot;)" answer="**The dative form of the respectful second-person pronoun &quot;You&quot;.**"></orbit-prompt>
<orbit-prompt question="Eega. (Temporal adverb indicating the present moment.)" answer="**The temporal adverb for &quot;Now&quot; is used to demand immediate action.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-16">
<orbit-prompt question="Aamele. (Temporal adverb; extremely common in delaying tactics or scheduling.)" answer="**The temporal adverb meaning &quot;Later&quot; or &quot;Afterwards&quot; is common in scheduling.**"></orbit-prompt>
<orbit-prompt question="Ivathu or Ivattu. (Temporal noun indicating the current day.)" answer="**The temporal noun indicates the current day, &quot;Today&quot;.**"></orbit-prompt>
<orbit-prompt question="Naale. (Temporal noun indicating the future day.)" answer="**The temporal noun for &quot;Tomorrow&quot; is often used to postpone meetings or visits.**"></orbit-prompt>
<orbit-prompt question="Ninne. (Temporal noun indicating the previous day.)" answer="**The temporal noun indicates the previous day, &quot;Yesterday&quot;.**"></orbit-prompt>
<orbit-prompt question="Beligge. (Temporal noun indicating the period before noon.)" answer="**The Kannada temporal noun for &quot;Morning&quot;.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-17">
<orbit-prompt question="Madhyahna. (Temporal noun indicating midday.)" answer="**The Kannada temporal noun for &quot;Afternoon&quot;.**"></orbit-prompt>
<orbit-prompt question="Sanje or Saayankala. (Temporal noun indicating the period before sunset.)" answer="**The Kannada temporal noun for &quot;Evening&quot;.**"></orbit-prompt>
<orbit-prompt question="Rathri. (Temporal noun indicating nighttime.)" answer="**The Kannada temporal noun for &quot;Night&quot;.**"></orbit-prompt>
<orbit-prompt question="Samaya or Hothu. (Noun used to ask duration or exact clock time.)" answer="**The noun is used to ask about duration or exact clock time for &quot;Time&quot;.**"></orbit-prompt>
<orbit-prompt question="Mattu. (Meaning &quot;And&quot;; used to link similar items in lists or connect parallel ideas.)" answer="**The conjunction is used to link similar items in lists or parallel ideas.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-18">
<orbit-prompt question="Aadare or Adare. (Meaning &quot;But&quot;; essential for building complex sentences and introducing contrast.)" answer="**The conjunction is essential for building complex sentences and introducing contrast.**"></orbit-prompt>
<orbit-prompt question="Athava. (Meaning &quot;Or&quot;; used for presenting options or choices in a transaction.)" answer="**The conjunction is used for presenting options or choices in a transaction.**"></orbit-prompt>
<orbit-prompt question="Ekeandre. (Combines Yake and Andare to provide reasoning.)" answer="**The conjunction meaning &quot;Because&quot; combines the words for &quot;Why&quot; (Yake) and &quot;If said&quot; (Andare).**"></orbit-prompt>
<orbit-prompt question="Aadirinda. (Conjunction used to indicate causality and result.)" answer="**The conjunction indicates causality and result, meaning &quot;Therefore&quot; or &quot;So&quot;.**"></orbit-prompt>
<orbit-prompt question="Gothu. (Meaning &quot;Known&quot;; syntax requires the dative subject as in &quot;Nanage gothu&quot;.)" answer="**The experiential verb that indicates knowledge and requires a dative subject.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-19">
<orbit-prompt question="Gothilla. (Meaning &quot;Unknown&quot; or &quot;I don&#x27;t know&quot;; highly useful for establishing boundaries.)" answer="**The negative experiential verb that is useful for establishing boundaries regarding local knowledge.**"></orbit-prompt>
<orbit-prompt question="Hasivu. (Expressed experientially with the dative subject, as in &quot;Nanage hasivu agtide&quot;.)" answer="**The state of &quot;Hunger&quot; is expressed in Kannada syntax.**"></orbit-prompt>
<orbit-prompt question="Bayarike. (Expressed experientially with the dative subject, as in &quot;Nanage bayarike agide&quot;.)" answer="**The state of &quot;Thirst&quot; is expressed in Kannada syntax.**"></orbit-prompt>
<orbit-prompt question="Novu. (Used with the dative subject to express physical distress, such as &quot;Thumba novu ide&quot;.)" answer="**The noun is used with the dative subject to express physical distress or &quot;Pain&quot;.**"></orbit-prompt>
<orbit-prompt question="Kopa. (Expressed dynamically, as in &quot;Nanage kopa bandide&quot;.)" answer="**The emotion of &quot;Anger&quot; is expressed in the Kannada dative paradigm.**"></orbit-prompt>
</orbit-reviewarea>

<orbit-reviewarea id="orbit-kn-en-20">
<orbit-prompt question="Bhaya. (Expressed experientially, as in &quot;Nanage bhaya agide&quot;.)" answer="**The emotion of &quot;Fear&quot; is expressed in the Kannada dative paradigm.**"></orbit-prompt>
<orbit-prompt question="Ide. (Meaning &quot;Is&quot; or &quot;Exists&quot;; used to confirm availability, as in &quot;Neeru ideya?&quot;)" answer="**The third-person neuter verb that confirms availability or existence.**"></orbit-prompt>
<orbit-prompt question="Illa. (Functions as &quot;No&quot; and the verb of non-existence; used to deny availability.)" answer="**The word that functions as both &quot;No&quot; and the verb of non-existence to deny availability.**"></orbit-prompt>
<orbit-prompt question="Hogthini or Hoguttene. (Formed by Root (Hogu) + Tense (-t-) + Pronoun (-ini/-ene).)" answer="**The finite verb form for &quot;I go&quot; or &quot;I am going&quot;.**"></orbit-prompt>
<orbit-prompt question="Barthini or Baruttene. (Indicates intention to arrive; highly useful for delivery updates.)" answer="**The finite verb form for &quot;I come&quot; or &quot;I am coming&quot;.**"></orbit-prompt>
</orbit-reviewarea>
