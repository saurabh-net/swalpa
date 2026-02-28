/**
 * Question Bank for The Agglutination & Matching Station
 * 
 * Each question has:
 *   type: 'spatial' | 'respect' | 'pronoun' | 'kanglish'
 *   target: English phrase to translate
 *   base: Kannada base word (what gets displayed as the stem)
 *   displayBase: How the base word is shown in the UI (may include pronoun prefix)
 *   options: Array of suffix strings to show as clickable buttons
 *   correct: Array of suffix strings in the correct order (1 or more)
 *   result: The exact expected final assembled string
 *   category: Display category name
 *   hint: Brief grammatical hint shown after answer
 */

export const QUESTIONS = [
    // ═══════════════════════════════════════════════
    // SECTION 1: Spatial Suffixes (Agglutination)
    // ═══════════════════════════════════════════════
    {
        type: 'spatial',
        target: 'In the house',
        base: 'Mane',
        displayBase: 'Mane',
        options: ['-alli', '-ge', '-inda', '-olage', '-gal'],
        correct: ['-alli'],
        result: 'Maneyalli',
        category: 'Spatial Suffixes',
        hint: '-alli = "In" (like Hindi "mein")'
    },
    {
        type: 'spatial',
        target: 'To the house',
        base: 'Mane',
        displayBase: 'Mane',
        options: ['-alli', '-ge', '-inda', '-olage', '-gal'],
        correct: ['-ge'],
        result: 'Manege',
        category: 'Spatial Suffixes',
        hint: '-ge = "To" (like Hindi "ko")'
    },
    {
        type: 'spatial',
        target: 'From the house',
        base: 'Mane',
        displayBase: 'Mane',
        options: ['-alli', '-ge', '-inda', '-olage', '-gal'],
        correct: ['-inda'],
        result: 'Maneyinda',
        category: 'Spatial Suffixes',
        hint: '-inda = "From" (like Hindi "se")'
    },
    {
        type: 'spatial',
        target: 'Inside the house',
        base: 'Mane',
        displayBase: 'Mane',
        options: ['-alli', '-ge', '-y-olage', '-gal'],
        correct: ['-y-olage'],
        result: 'Mane-y-olage',
        category: 'Spatial Suffixes',
        hint: '-olage = "Inside" (like Hindi "ke andar")'
    },
    {
        type: 'spatial',
        target: 'In the houses (Plural)',
        base: 'Mane',
        displayBase: 'Mane',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-gal', '-alli'],
        result: 'Manegalalli',
        category: 'Spatial Suffixes',
        hint: '-gal = Plural marker, then add -alli for "in"'
    },
    // Extra spatial: Office (Kacheri)
    {
        type: 'spatial',
        target: 'In the office',
        base: 'Kacheri',
        displayBase: 'Kacheri',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-alli'],
        result: 'Kacherialli',
        category: 'Spatial Suffixes',
        hint: '-alli = "In" — works with any noun!'
    },
    {
        type: 'spatial',
        target: 'To the office',
        base: 'Kacheri',
        displayBase: 'Kacheri',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-ge'],
        result: 'Kacherige',
        category: 'Spatial Suffixes',
        hint: '-ge = "To" — the directional suffix'
    },
    {
        type: 'spatial',
        target: 'From the village',
        base: 'Halli',
        displayBase: 'Halli',
        options: ['-alli', '-ge', '-inda', '-olage'],
        correct: ['-inda'],
        result: 'Halliinda',
        category: 'Spatial Suffixes',
        hint: '-inda = "From" — origin marker'
    },

    // ═══════════════════════════════════════════════
    // SECTION 2: Respect Filter (Polite Verb Suffixes)
    // ═══════════════════════════════════════════════
    {
        type: 'respect',
        target: 'Come (Polite)',
        base: 'Baa',
        displayBase: 'Baa',
        options: ['-nni', '-gi', '-di', '-lisi'],
        correct: ['-nni'],
        result: 'Banni',
        category: 'Respect Filter',
        hint: 'Baa → Banni (Polite "Come")'
    },
    {
        type: 'respect',
        target: 'Go (Polite)',
        base: 'Hogu',
        displayBase: 'Hogu',
        options: ['-nni', '-gi', '-di', '-lisi'],
        correct: ['-gi'],
        result: 'Hogi',
        category: 'Respect Filter',
        hint: 'Hogu → Hogi (Polite "Go")'
    },
    {
        type: 'respect',
        target: 'Give (Polite)',
        base: 'Kodu',
        displayBase: 'Kodu',
        options: ['-nni', '-gi', '-di', '-lisi'],
        correct: ['-di'],
        result: 'Kodi',
        category: 'Respect Filter',
        hint: 'Kodu → Kodi (Polite "Give")'
    },
    {
        type: 'respect',
        target: 'Stop (Polite)',
        base: 'Nillu',
        displayBase: 'Nillu',
        options: ['-nni', '-gi', '-di', '-lisi'],
        correct: ['-lisi'],
        result: 'Nillisi',
        category: 'Respect Filter',
        hint: 'Nillu → Nillisi (Polite "Stop")'
    },
    {
        type: 'respect',
        target: 'Do (Polite)',
        base: 'Maadu',
        displayBase: 'Maadu',
        options: ['-nni', '-gi', '-di', '-lisi'],
        correct: ['-di'],
        result: 'Maadi',
        category: 'Respect Filter',
        hint: 'Maadu → Maadi — the universal "Do" verb!'
    },
    {
        type: 'respect',
        target: 'See (Polite)',
        base: 'Nodu',
        displayBase: 'Nodu',
        options: ['-nni', '-gi', '-di', '-lisi'],
        correct: ['-di'],
        result: 'Nodi',
        category: 'Respect Filter',
        hint: 'Nodu → Nodi (Polite "See/Look")'
    },

    // ═══════════════════════════════════════════════
    // SECTION 3: Pronoun Mirroring (Subject-Verb)
    // ═══════════════════════════════════════════════
    {
        type: 'pronoun',
        target: 'I will do',
        base: 'Maadth',
        displayBase: 'Naanu Maadth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ini'],
        result: 'Maadthini',
        category: 'Pronoun Mirroring',
        hint: 'Naanu (I) → -ini ending'
    },
    {
        type: 'pronoun',
        target: 'We will do',
        base: 'Maadth',
        displayBase: 'Naavu Maadth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ivi'],
        result: 'Maadthivi',
        category: 'Pronoun Mirroring',
        hint: 'Naavu (We) → -ivi ending'
    },
    {
        type: 'pronoun',
        target: 'Will you do? (Respectful)',
        base: 'Maadt',
        displayBase: 'Neevu Maadt-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ira'],
        result: 'Maadtira',
        category: 'Pronoun Mirroring',
        hint: 'Neevu (You-Respectful) → -ira ending'
    },
    {
        type: 'pronoun',
        target: 'He will do',
        base: 'Maadth',
        displayBase: 'Avanu Maadth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ane'],
        result: 'Maadthane',
        category: 'Pronoun Mirroring',
        hint: 'Avanu (He) → -ane ending'
    },
    {
        type: 'pronoun',
        target: 'She will do',
        base: 'Maadth',
        displayBase: 'Avalu Maadth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ale'],
        result: 'Maadthale',
        category: 'Pronoun Mirroring',
        hint: 'Avalu (She) → -ale ending'
    },
    {
        type: 'pronoun',
        target: 'They will do',
        base: 'Maadth',
        displayBase: 'Avru Maadth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-are'],
        result: 'Maadthare',
        category: 'Pronoun Mirroring',
        hint: 'Avru (They/Respectful) → -are ending'
    },

    // ═══════════════════════════════════════════════
    // SECTION 4: Kanglish Converter (Euphonic -u)
    // ═══════════════════════════════════════════════
    {
        type: 'kanglish',
        target: 'Say "Bus" in Kanglish',
        base: 'Bus',
        displayBase: 'Bus',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Bus-u',
        category: 'Kanglish Converter',
        hint: 'Add -u to make English words fit Kannada phonetics!'
    },
    {
        type: 'kanglish',
        target: 'Say "Ticket" in Kanglish',
        base: 'Ticket',
        displayBase: 'Ticket',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Ticket-u',
        category: 'Kanglish Converter',
        hint: 'The euphonic -u suffix is universal for English nouns'
    },
    {
        type: 'kanglish',
        target: 'Say "Hospital" in Kanglish',
        base: 'Hospital',
        displayBase: 'Hospital',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Hospital-u',
        category: 'Kanglish Converter',
        hint: 'Hospital → Hospital-u. Works for almost any English noun!'
    },
    {
        type: 'kanglish',
        target: 'Say "Car" in Kanglish',
        base: 'Car',
        displayBase: 'Car',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Car-u',
        category: 'Kanglish Converter',
        hint: 'Car-u — Bengaluru runs on these!'
    },
    {
        type: 'kanglish',
        target: 'Say "Paper" in Kanglish',
        base: 'Paper',
        displayBase: 'Paper',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Paper-u',
        category: 'Kanglish Converter',
        hint: 'Paper-u — Documents, newspapers, all of it.'
    }
];

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Get a shuffled copy of the full question bank
 */
export function getShuffledQuestions() {
    return shuffleArray(QUESTIONS);
}
