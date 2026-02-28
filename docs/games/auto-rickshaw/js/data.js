export const DRIVERS = {
    'Guru': {
        name: 'Guru (The Stoic)',
        voice: 'Deep',
        modifiers: { respect: 0.8, patience: 1.0 },
        description: 'Older, khaki uniform. Traditional and formal.'
    },
    'Anna': {
        name: 'Anna (The Friendly)',
        voice: 'Warm',
        modifiers: { respect: 1.0, patience: 1.2 },
        description: 'Middle-aged, big smile. Loves a good chat.'
    },
    'Macha': {
        name: 'Macha (The Hustler)',
        voice: 'Fast',
        modifiers: { respect: 1.2, patience: 0.8 },
        description: 'Young, sunglasses. Respects confidence and slang.'
    }
};

export const LEVELS = {
    1: {
        title: "The Terminal Selection",
        scenario: "Choose your driver at the Metro exit terminal. Each has a different vibe.",
        background: "assets/level_1_background.png",
        dialogue: {
            engagement: {
                speaker: "System",
                text: "Pick your driver to begin the protocol:",
                choices: [
                    { text: "Guru (The Stoic) - High Respect, Low Patience", driver: 'Guru', next: 'start_negotiation' },
                    { text: "Anna (The Friendly) - Balanced, Loves Chatting", driver: 'Anna', next: 'start_negotiation' },
                    { text: "Macha (The Hustler) - Fast, Loves confidence", driver: 'Macha', next: 'start_negotiation' },
                    { text: "Wait for a modern app-based cab", effect: { patience: -30 }, next: 'start_negotiation' }
                ]
            },
            start_negotiation: {
                speaker: "Driver", // Will be dynamic in game logic
                text: "Dynamic",   // Will be dynamic in game logic
                choices: [
                    {
                        text: "⟨Namaskāra⟩ Anna, Indiranagar 12th Main banni.",
                        effect: { respect: 15 },
                        next: "fare_check"
                    },
                    {
                        text: "Indiranagar. ⟨Meter hāki⟩.",
                        effect: { respect: 5, patience: -10 },
                        next: "fare_check"
                    },
                    {
                        text: "⟨Oota āytha⟩? Indiranagar banni.",
                        effect: { respect: 25, patience: 10 },
                        next: "fare_check"
                    },
                    {
                        text: "Go to Indiranagar. Move fast.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20, barrier: true },
                        next: "fare_check"
                    }
                ]
            },
            fare_check: {
                speaker: "Driver",
                text: "Meter plus 20 kodi saar. Thumba traffic ide.",
                choices: [
                    {
                        text: "Sari anna, ⟨hogōṇa⟩.",
                        effect: { respect: 10, wallet: -20 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Bēda⟩ guru, meter haaki.",
                        effect: { respect: 15, patience: -10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Svalpa adjust māḍi⟩ anna, student naanu.",
                        effect: { respect: 20 },
                        next: "level_complete"
                    },
                    {
                        text: "Fine, here's 50 extra. Just go.",
                        isEnglish: true,
                        effect: { respect: -10, wallet: -50 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    2: {
        title: "The Maze (Navigation)",
        scenario: "Navigate the narrow gullies of Malleshwaram. Guided by your driver.",
        background: "assets/level_2_gullies.png",
        dialogue: {
            engagement: {
                speaker: "Driver",
                text: "Saar, illi flyover work aagtide. Left-ah, right-ah?",
                choices: [
                    {
                        text: "Illi ⟨balagaḍe thagoḷi⟩, aamele nera ⟨hōgi⟩.",
                        effect: { respect: 15, patience: 10 },
                        next: "shortcut_check"
                    },
                    {
                        text: "⟨Left hōgi⟩... alla alla, ⟨right thagoḷi⟩!",
                        effect: { respect: -5, patience: -20 },
                        next: "shortcut_check"
                    },
                    {
                        text: "⟨Svalpa adjust māḍi⟩ anna, full confusion.",
                        effect: { respect: 10 },
                        next: "shortcut_check"
                    },
                    {
                        text: "Just follow the GPS. Take the next left.",
                        isEnglish: true,
                        effect: { respect: -10, patience: -15 },
                        next: "shortcut_check"
                    }
                ]
            },
            shortcut_check: {
                speaker: "Driver",
                text: "Saar, shortcut thogolla? Time ulit-the.",
                choices: [
                    {
                        text: "Haudu, gully olgade ⟨hōgi⟩.",
                        effect: { respect: 15, patience: 10 },
                        next: "destination_near"
                    },
                    {
                        text: "⟨Bēda⟩, main road-alle ⟨hōgi⟩.",
                        effect: { respect: 5, patience: -10 },
                        next: "destination_near"
                    },
                    {
                        text: "Nimage ⟨gottidre⟩ thagoli anna.",
                        effect: { respect: 20 },
                        next: "destination_near"
                    },
                    {
                        text: "Whatever is faster. I have a meeting.",
                        isEnglish: true,
                        effect: { respect: -15, wallet: -20 },
                        next: "destination_near"
                    }
                ]
            },
            destination_near: {
                speaker: "Driver",
                text: "Destination banthu saar. Illi nillisti-ni.",
                choices: [
                    {
                        text: "⟨Dhanyavāda⟩ anna. Illi ⟨nillisi⟩.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Svalpa munde nillisi⟩.",
                        effect: { respect: 5 },
                        next: "level_complete"
                    },
                    {
                        text: "Super anna, ⟨ārāmāgi iri⟩.",
                        effect: { respect: 20 },
                        next: "level_complete"
                    },
                    {
                        text: "Stop here. Keep the change.",
                        isEnglish: true,
                        effect: { wallet: -10, respect: -5 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    3: {
        title: "The Surge (Stormy Weather)",
        scenario: "A sudden Bangalore downpour starts. The driver pulls over.",
        background: "assets/level_3_rain.png",
        isRainy: true,
        dialogue: {
            engagement: {
                speaker: "Driver",
                text: "Saar, thumba ⟨male⟩ barthide. Nilli-stini, illandre 200 kodi.",
                choices: [
                    {
                        text: "Anna, thumba heavy ⟨male⟩ ide. 50 extra kodthini, ⟨banni⟩.",
                        effect: { respect: 20 },
                        next: "rain_negotiation"
                    },
                    {
                        text: "Why double? ⟨Meter hāki⟩ anna!",
                        isEnglish: true,
                        effect: { respect: -10, patience: -30 },
                        next: "rain_negotiation"
                    },
                    {
                        text: "Anna, ⟨svalpa adjust māḍi⟩. Patient naanu.",
                        effect: { respect: 15 },
                        next: "rain_negotiation"
                    },
                    {
                        text: "⟨Devaru nimage oḷḷēdu māḍthāre⟩, banni.",
                        effect: { respect: 30 },
                        next: "rain_negotiation"
                    }
                ]
            },
            rain_negotiation: {
                speaker: "Driver",
                text: "Dynamic",
                choices: [
                    {
                        text: "Sari anna, tumba kelsa ideya? ⟨Oota āytha⟩?",
                        effect: { respect: 30, patience: 20 },
                        next: "level_complete"
                    },
                    {
                        text: "Illi ⟨nillisi⟩, bere auto nodthini.",
                        effect: { end: 'reset' }
                    },
                    {
                        text: "⟨Dhanyavāda⟩ anna, help madidri.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Fine, take the 200 rupees. Just drive.",
                        isEnglish: true,
                        effect: { wallet: -100, respect: -20 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    4: {
        title: "The Bottleneck (Traffic)",
        scenario: "You are stuck in Silboard traffic. The driver is getting restless.",
        background: "assets/level_4_traffic.png",
        dialogue: {
            engagement: {
                speaker: "Driver",
                text: "Yen guru, thumba traffic ide. Mathe?",
                choices: [
                    {
                        text: "Sakkath traffic guru. ⟨Svalpa adjust māḍi⟩.",
                        effect: { respect: 20, patience: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "Indu thumba ⟨traffic⟩ ideya?",
                        effect: { respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Oota āytha⟩? Traffic problem common.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Can we go faster? I'm missing my shift.",
                        isEnglish: true,
                        effect: { respect: -20, patience: -25 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    5: {
        title: "The Detour (Blocked)",
        scenario: "A 'No Entry' sign forces a long detour. Use your verbs.",
        background: "assets/level_5_detour.png",
        dialogue: {
            engagement: {
                speaker: "Driver",
                text: "Saar, illi daari illa. 'No Entry'. U-turn thonbond ⟨banni⟩.",
                choices: [
                    {
                        text: "Sari anna, ⟨hōgi⟩.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Alli ⟨nillisi⟩, nanu hog-theeni.",
                        effect: { respect: 5, patience: -10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Munde hōgi⟩, bere daari ide.",
                        effect: { respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "This is too long! Just find a way through.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    6: {
        title: "The Change (Payment)",
        scenario: "You reached the destination. Time to pay up.",
        background: "assets/level_6_payment.png",
        dialogue: {
            engagement: {
                speaker: "Driver",
                text: "Banthu saar. 150 aaguthe.",
                choices: [
                    {
                        text: "Sari anna, hattu rupayi extra kodi, change ⟨bēḍa⟩.",
                        effect: { wallet: -160, respect: 25 },
                        next: "level_complete"
                    },
                    {
                        text: "Change illa saar, PhonePe ⟨māḍōṇa⟩?",
                        effect: { wallet: -150, respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Dhanyavāda⟩ anna. Change thagoli.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "I only have a 500 note. Do you have change?",
                        isEnglish: true,
                        effect: { respect: -10, patience: -20 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    7: {
        title: "The Electronic City Flyover Limbo",
        scenario: "Stranded on the high-speed flyover. The engine has failed. Shankar Anna looks worried.",
        background: "assets/level_7_flyover.png",
        dialogue: {
            engagement: {
                speaker: "Shankar Anna",
                text: "... (Silence as the engine dies) ...",
                choices: [
                    {
                        text: "Excuse me? Why did we stop? I'm late!",
                        isEnglish: true,
                        effect: { respect: -20, patience: -15 },
                        next: "refund_negotiation"
                    },
                    {
                        text: "Anna, ⟨yēnāythu⟩? Engine problem-aa?",
                        effect: { respect: 15, patience: 10 },
                        next: "refund_negotiation"
                    },
                    {
                        text: "Auto stop aythu? ⟨Help bēkā⟩?",
                        effect: { respect: 5, patience: 5 },
                        next: "refund_negotiation"
                    },
                    {
                        text: "Ayyo! Shankar Nag avru ididre sari madthidru!",
                        effect: { respect: 30, patience: 20 },
                        next: "refund_negotiation"
                    }
                ]
            },
            refund_negotiation: {
                speaker: "Shankar Anna",
                text: "Engine dead saar. Full fare kodi mathu service charge beku.",
                choices: [
                    {
                        text: "I’m not paying! You didn't drop me.",
                        isEnglish: true,
                        effect: { respect: -25, patience: -30, barrier: true },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, ⟨svalpa nyāya māthāḍi⟩. Half fare thagoli.",
                        effect: { respect: 20, wallet: -75 },
                        next: "level_complete"
                    },
                    {
                        text: "Full fare ⟨bēḍa⟩. Discount kodi please.",
                        effect: { respect: 5, wallet: -100 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, ⟨svalpa adjust māḍi⟩. Student naanu.",
                        effect: { respect: 15, wallet: -80 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    8: {
        title: "The Terminal (Majestic Chaos)",
        scenario: "Majestic Bus Stand at 6:30 PM. Rain is starting. You need to go to Sarjapur.",
        background: "assets/level_8_majestic.png",
        isHighStress: true,
        dialogue: {
            engagement: {
                speaker: "Manju",
                text: "(Leaning against the auto, ignoring everyone)",
                choices: [
                    {
                        text: "Are you free? Sarjapur ⟨banni⟩. Meter haaki.",
                        isEnglish: true,
                        effect: { respect: -20, patience: -15 },
                        next: "surcharge_negotiation"
                    },
                    {
                        text: "⟨Namaskāra⟩ Anna, Sarjapur bartira? Urgent ide.",
                        effect: { respect: 20, patience: 15 },
                        next: "surcharge_negotiation"
                    },
                    {
                        text: "Sarjapur-aa? ⟨Meter hāki⟩ madi banni.",
                        effect: { respect: 5, patience: 5 },
                        next: "surcharge_negotiation"
                    },
                    {
                        text: "Sarjapur? One-and-half... bartira?",
                        effect: { respect: 25, patience: 20, wallet: -50 },
                        next: "surcharge_negotiation"
                    }
                ]
            },
            surcharge_negotiation: {
                speaker: "Manju",
                text: "200 kodi flat. Empty return ide, traffic ide.",
                choices: [
                    {
                        text: "Ridiculous! I'll check Uber.",
                        isEnglish: true,
                        effect: { respect: -20, patience: -30, barrier: true },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, nanu student. One-forty-ge ⟨adjust māḍi⟩.",
                        effect: { respect: 25, wallet: -140 },
                        next: "level_complete"
                    },
                    {
                        text: "One-fifty koddthini. ⟨Banni hogona⟩.",
                        effect: { respect: 10, wallet: -150 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, extra 30 koddthini. ⟨Hogōṇa⟩.",
                        effect: { respect: 20, wallet: -180 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    9: {
        title: "The High-Stakes Monsoon",
        scenario: "Midnight. Indira Nagar. Heavy rain. You need Aster CMI Hospital immediately.",
        background: "assets/level_9_emergency.png",
        isRainy: true,
        dialogue: {
            engagement: {
                speaker: "Gowda",
                text: "Thumbā ⟨male⟩ barthide. Manege hogabeku.",
                choices: [
                    {
                        text: "Please stop! Emergency! I'll pay double!",
                        isEnglish: true,
                        effect: { respect: -15, wallet: -300 },
                        next: "humanity_check"
                    },
                    {
                        text: "Anna, dayavittu ⟨nillisi⟩. Hospital-ge ⟨hogabēku⟩.",
                        effect: { respect: 30, patience: 20 },
                        next: "humanity_check"
                    },
                    {
                        text: "Emergency hospital. ⟨Bega hogōṇa⟩ please.",
                        effect: { respect: 10, patience: 5 },
                        next: "humanity_check"
                    },
                    {
                        text: "Anna, ⟨svalpa adjust māḍi⟩. Devaru nimage olledu madthare.",
                        effect: { respect: 40, patience: 30 },
                        next: "humanity_check"
                    }
                ]
            },
            humanity_check: {
                speaker: "Gowda",
                text: "(Arrival at Hospital) Meter says 120. ⟨Banni⟩ saar.",
                choices: [
                    {
                        text: "Here is 240 as promised. ⟨Dhanyavāda⟩.",
                        isEnglish: true,
                        effect: { respect: -10, wallet: -240 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, neevu devru thara bandri. 300 thagoli.",
                        effect: { respect: 60, wallet: -300 },
                        next: "level_complete"
                    },
                    {
                        text: "Thanks Anna. ⟨Ārāmāgi iri⟩.",
                        effect: { respect: 15, wallet: -120 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, Shankar Nag thara help madidri. ⟨Dhanyavāda⟩.",
                        effect: { respect: 50, wallet: -120 },
                        next: "level_complete"
                    }
                ]
            }
        }
    }
};

export const RANKS = [
    { threshold: 400, title: "Outer Ring Roadie", desc: "You survived, but the drivers think you're a clueless 'it-park' bot. Speak more Kannada!" },
    { threshold: 700, title: "Sakkath Student", desc: "Solid effort! You're navigating the gullies with emerging confidence." },
    { threshold: 1000, title: "A True Macha", desc: "Boss! Your 'Adjust Maadi' game is strong. Drivers respect the swagger." },
    { threshold: Infinity, title: "Legendary Vishwa-Guru", desc: "Namma Ooru Legend! You speak more Kannada than the local traffic police." }
];
