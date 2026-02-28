/**
 * Question Bank for The Agglutination & Matching Station
 * 50 Questions across 6 categories
 *
 * Each question has:
 *   type: 'spatial' | 'respect' | 'pronoun' | 'kanglish' | 'pronoun_hogu' | 'pronoun_baru'
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
    // SECTION 1: Spatial Suffixes — Mane (House)
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

    // ═══════════════════════════════════════════════
    // SECTION 2: Spatial Suffixes — Kacheri (Office)
    // ═══════════════════════════════════════════════
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
        target: 'From the office',
        base: 'Kacheri',
        displayBase: 'Kacheri',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-inda'],
        result: 'Kacherinda',
        category: 'Spatial Suffixes',
        hint: '-inda = "From" — origin marker'
    },

    // ═══════════════════════════════════════════════
    // SECTION 3: Spatial Suffixes — Halli (Village)
    // ═══════════════════════════════════════════════
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
    {
        type: 'spatial',
        target: 'To the village',
        base: 'Halli',
        displayBase: 'Halli',
        options: ['-alli', '-ge', '-inda', '-olage'],
        correct: ['-ge'],
        result: 'Hallige',
        category: 'Spatial Suffixes',
        hint: '-ge = "To" — direction towards'
    },
    {
        type: 'spatial',
        target: 'In the village',
        base: 'Halli',
        displayBase: 'Halli',
        options: ['-alli', '-ge', '-inda', '-olage'],
        correct: ['-alli'],
        result: 'Hallialli',
        category: 'Spatial Suffixes',
        hint: '-alli = "In" — locative suffix'
    },

    // ═══════════════════════════════════════════════
    // SECTION 4: Spatial Suffixes — Angadi (Shop)
    // ═══════════════════════════════════════════════
    {
        type: 'spatial',
        target: 'In the shop',
        base: 'Angadi',
        displayBase: 'Angadi',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-alli'],
        result: 'Angadialli',
        category: 'Spatial Suffixes',
        hint: '-alli = "In" — locative suffix for any place'
    },
    {
        type: 'spatial',
        target: 'To the shop',
        base: 'Angadi',
        displayBase: 'Angadi',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-ge'],
        result: 'Angadige',
        category: 'Spatial Suffixes',
        hint: '-ge = "To" — going towards the shop'
    },
    {
        type: 'spatial',
        target: 'To the shops (Plural)',
        base: 'Angadi',
        displayBase: 'Angadi',
        options: ['-alli', '-ge', '-inda', '-gal'],
        correct: ['-gal', '-ge'],
        result: 'Angadigalge',
        category: 'Spatial Suffixes',
        hint: '-gal = Plural, then -ge = "To"'
    },

    // ═══════════════════════════════════════════════
    // SECTION 5: Respect Filter (Polite Verb Suffixes)
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
    {
        type: 'respect',
        target: 'Tell (Polite)',
        base: 'Helu',
        displayBase: 'Helu',
        options: ['-nni', '-gi', '-li', '-di'],
        correct: ['-li'],
        result: 'Heli',
        category: 'Respect Filter',
        hint: 'Helu → Heli (Polite "Tell/Say")'
    },
    {
        type: 'respect',
        target: 'Ask (Polite)',
        base: 'Kelu',
        displayBase: 'Kelu',
        options: ['-nni', '-gi', '-li', '-di'],
        correct: ['-li'],
        result: 'Keli',
        category: 'Respect Filter',
        hint: 'Kelu → Keli (Polite "Ask/Listen")'
    },
    {
        type: 'respect',
        target: 'Eat (Polite)',
        base: 'Tinnu',
        displayBase: 'Tinnu',
        options: ['-nni', '-gi', '-di', '-ni'],
        correct: ['-ni'],
        result: 'Tinni',
        category: 'Respect Filter',
        hint: 'Tinnu → Tinni (Polite "Eat")'
    },
    {
        type: 'respect',
        target: 'Send (Polite)',
        base: 'Kalsu',
        displayBase: 'Kalsu',
        options: ['-si', '-gi', '-di', '-li'],
        correct: ['-si'],
        result: 'Kalsi',
        category: 'Respect Filter',
        hint: 'Kalsu → Kalsi (Polite "Send")'
    },

    // ═══════════════════════════════════════════════
    // SECTION 6: Pronoun Mirroring — Maadth- (Will Do)
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
        target: 'Will you do? (Casual)',
        base: 'Maadt',
        displayBase: 'Neenu Maadt-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-iya'],
        result: 'Maadtiya',
        category: 'Pronoun Mirroring',
        hint: 'Neenu (You-Casual) → -iya ending'
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
    // SECTION 7: Pronoun Mirroring — Hogth- (Will Go)
    // ═══════════════════════════════════════════════
    {
        type: 'pronoun_hogu',
        target: 'I will go',
        base: 'Hogth',
        displayBase: 'Naanu Hogth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ini'],
        result: 'Hogthini',
        category: 'Pronoun Mirroring',
        hint: 'Naanu (I) → -ini. Root: Hogu (to go)'
    },
    {
        type: 'pronoun_hogu',
        target: 'She will go',
        base: 'Hogth',
        displayBase: 'Avalu Hogth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ale'],
        result: 'Hogthale',
        category: 'Pronoun Mirroring',
        hint: 'Avalu (She) → -ale. Root: Hogu (to go)'
    },
    {
        type: 'pronoun_hogu',
        target: 'They will go',
        base: 'Hogth',
        displayBase: 'Avru Hogth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-are'],
        result: 'Hogthare',
        category: 'Pronoun Mirroring',
        hint: 'Avru (They) → -are. Root: Hogu (to go)'
    },
    {
        type: 'pronoun_hogu',
        target: 'We will go',
        base: 'Hogth',
        displayBase: 'Naavu Hogth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ivi'],
        result: 'Hogthivi',
        category: 'Pronoun Mirroring',
        hint: 'Naavu (We) → -ivi. Root: Hogu (to go)'
    },

    // ═══════════════════════════════════════════════
    // SECTION 8: Pronoun Mirroring — Barth- (Will Come)
    // ═══════════════════════════════════════════════
    {
        type: 'pronoun_baru',
        target: 'I will come',
        base: 'Barth',
        displayBase: 'Naanu Barth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ini'],
        result: 'Barthini',
        category: 'Pronoun Mirroring',
        hint: 'Naanu (I) → -ini. Root: Baru (to come)'
    },
    {
        type: 'pronoun_baru',
        target: 'We will come',
        base: 'Barth',
        displayBase: 'Naavu Barth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ivi'],
        result: 'Barthivi',
        category: 'Pronoun Mirroring',
        hint: 'Naavu (We) → -ivi. Root: Baru (to come)'
    },
    {
        type: 'pronoun_baru',
        target: 'He will come',
        base: 'Barth',
        displayBase: 'Avanu Barth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-ane'],
        result: 'Barthane',
        category: 'Pronoun Mirroring',
        hint: 'Avanu (He) → -ane. Root: Baru (to come)'
    },
    {
        type: 'pronoun_baru',
        target: 'They will come',
        base: 'Barth',
        displayBase: 'Avru Barth-',
        options: ['-ini', '-ivi', '-iya', '-ira', '-ane', '-ale', '-are'],
        correct: ['-are'],
        result: 'Barthare',
        category: 'Pronoun Mirroring',
        hint: 'Avru (They) → -are. Root: Baru (to come)'
    },

    // ═══════════════════════════════════════════════
    // SECTION 9: Genitive Suffix (Possessive)
    // ═══════════════════════════════════════════════
    {
        type: 'spatial',
        target: "Saurabh's house",
        base: 'Saurabh',
        displayBase: 'Saurabh-na Mane',
        options: ['-na', '-ge', '-alli', '-inda'],
        correct: ['-na'],
        result: 'Saurabh-na',
        category: 'Genitive Suffix',
        hint: '-na = "Of" / possessive. "Saurabh-na Mane" = Saurabh\'s house'
    },
    {
        type: 'spatial',
        target: "Driver's auto",
        base: 'Driver',
        displayBase: 'Driver-na Auto',
        options: ['-na', '-ge', '-alli', '-inda'],
        correct: ['-na'],
        result: 'Driver-na',
        category: 'Genitive Suffix',
        hint: '-na = Possessive suffix. Works with any noun!'
    },

    // ═══════════════════════════════════════════════
    // SECTION 10: Kanglish Converter (Euphonic -u)
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
    },
    {
        type: 'kanglish',
        target: 'Say "Coffee" in Kanglish',
        base: 'Coffee',
        displayBase: 'Coffee',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Coffee-u',
        category: 'Kanglish Converter',
        hint: 'Coffee-u — The fuel of Bengaluru!'
    },
    {
        type: 'kanglish',
        target: 'Say "Meeting" in Kanglish',
        base: 'Meeting',
        displayBase: 'Meeting',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Meeting-u',
        category: 'Kanglish Converter',
        hint: 'Meeting-u — Office life runs on these.'
    },
    {
        type: 'kanglish',
        target: 'Say "Phone" in Kanglish',
        base: 'Phone',
        displayBase: 'Phone',
        options: ['-a', '-i', '-u', '-e'],
        correct: ['-u'],
        result: 'Phone-u',
        category: 'Kanglish Converter',
        hint: 'Phone-u — Essential modern vocabulary!'
    },
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
