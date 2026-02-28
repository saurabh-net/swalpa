export const NPCS = {
    'Reddy Uncle (Landlord)': {
        name: 'Reddy Uncle (Landlord)',
        modifiers: { respect: 0.8, patience: 0.9 },
        description: 'Older, traditional, value-conscious landlord.'
    },
    'Elaneer Anna': {
        name: 'Elaneer Anna',
        modifiers: { respect: 1.1, patience: 1.2 },
        description: 'Friendly street vendor, appreciates polite Kannada.'
    },
    'Plumber Kumar': {
        name: 'Plumber Kumar',
        modifiers: { respect: 0.9, patience: 1.0 },
        description: 'No-nonsense technician. Hates being questioned.'
    },
    'Lineman Mahadeva': {
        name: 'Lineman Mahadeva',
        modifiers: { respect: 1.2, patience: 0.8 },
        description: 'Works for the state. Respects seniority and patience.'
    }
};

export const LEVELS = {
    1: {
        title: "The Landlord (Rent Negotiation)",
        scenario: "Your landlord is increasing the rent by 15%. Time to use your charm.",
        background: "../../assets/img/scenes/hallway.jpg",
        isHighStress: false,
        dialogue: {
            engagement: {
                speaker: "Reddy Uncle (Landlord)",
                text: "Nodappa, rent 15% in-crease mad-idini from next month.",
                choices: [
                    {
                        text: "Uncle, ⟨svalpa adjust māḍi⟩. 15% is too much.",
                        effect: { respect: 20 },
                        next: "rent_negotiation"
                    },
                    {
                        text: "I won't pay 15%! We agreed on 5% last year.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20, barrier: true },
                        next: "rent_negotiation"
                    },
                    {
                        text: "Uncle, 10% ⟨māḍōṇa⟩? Nanu obbane idini.",
                        effect: { respect: 30, patience: 10 },
                        next: "rent_negotiation"
                    },
                    {
                        text: "Fine. Take 15%. Just fix the leakage.",
                        isEnglish: true,
                        effect: { wallet: -150, respect: 5 },
                        next: "level_complete"
                    }
                ]
            },
            rent_negotiation: {
                speaker: "Reddy Uncle (Landlord)",
                text: "Yen madodu thamma? Maintenance jasti agide. Society charge bere.",
                choices: [
                    {
                        text: "Sari uncle. Next month 10% jaasti ⟨koḍthīni⟩.",
                        effect: { respect: 20, wallet: -50 },
                        next: "level_complete"
                    },
                    {
                        text: "Uncle, ⟨oḷḷēdu māḍthāre⟩, 8% madi.",
                        effect: { respect: 35, wallet: -20 },
                        next: "level_complete"
                    },
                    {
                        text: "This is illegal. I will send a legal notice.",
                        isEnglish: true,
                        effect: { respect: -40, patience: -50, end: 'failed' }
                    },
                    {
                        text: "Sari uncle. ⟨Bāḍige⟩ transfer madthini.",
                        effect: { respect: 10, wallet: -100 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    2: {
        title: "The Tender Coconut Vendor",
        scenario: "You want a nice cold elaneer (tender coconut). The vendor quotes 60 Rupees.",
        background: "../../assets/img/scenes/street_vendor.jpg",
        dialogue: {
            engagement: {
                speaker: "Elaneer Anna",
                text: "Ondu yeradu 60 rupayi saar. Sweet ide.",
                choices: [
                    {
                        text: "Anna, 60 thumba ⟨jāsti⟩. 50 ⟨tagoḷi⟩.",
                        effect: { respect: 20, patience: 10 },
                        next: "vendor_negotiation"
                    },
                    {
                        text: "60 Rupees? Last week it was 40!",
                        isEnglish: true,
                        effect: { respect: -10, patience: -15 },
                        next: "vendor_negotiation"
                    },
                    {
                        text: "Sweet ⟨ideya⟩? ⟨Enu bele⟩ anna, sakhath bisi ide.",
                        effect: { respect: 25 },
                        next: "vendor_negotiation"
                    },
                    {
                        text: "Just cut one and give me quickly.",
                        isEnglish: true,
                        effect: { respect: -5, patience: -10 },
                        next: "vendor_negotiation"
                    }
                ]
            },
            vendor_negotiation: {
                speaker: "Elaneer Anna",
                text: "No saar. Wholesale market-nalli rate 50 ide. Margin itt-idini.",
                choices: [
                    {
                        text: "Sari, yeradu kodi. 100 rupayi ⟨kodthini⟩.",
                        effect: { respect: 30, wallet: -100 },
                        next: "level_complete"
                    },
                    {
                        text: "I’ll scan the QR code for 50.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20, wallet: -50 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna ⟨svalpa adjust māḍi⟩, daily customer naanu.",
                        effect: { respect: 15, wallet: -55 },
                        next: "level_complete"
                    },
                    {
                        text: "Sari Anna, 60 kodi. ⟨Kaṭ madi⟩.",
                        effect: { respect: 10, wallet: -60 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    3: {
        title: "The Plumber",
        scenario: "The pipe is leaking. The plumber has arrived but is looking at a massive repair.",
        background: "../../assets/img/scenes/bathroom.jpg",
        isHighStress: true,
        dialogue: {
            engagement: {
                speaker: "Plumber Kumar",
                text: "Pipe full damage aagide saar. 1500 aagutte.",
                choices: [
                    {
                        text: "Are you crazy? It's just a small leak!",
                        isEnglish: true,
                        effect: { respect: -20, patience: -25, barrier: true },
                        next: "plumber_negotiation"
                    },
                    {
                        text: "Kumar, ⟨svalpa nōḍi māḍi⟩. 1500 thumba ⟨jāsti⟩.",
                        effect: { respect: 20, patience: 10 },
                        next: "plumber_negotiation"
                    },
                    {
                        text: "Valve ⟨beka⟩? Just seal madi saku.",
                        effect: { respect: 10 },
                        next: "plumber_negotiation"
                    },
                    {
                        text: "Please help anna, water is spilling everywhere.",
                        isEnglish: true,
                        effect: { respect: 5, patience: -5 },
                        next: "plumber_negotiation"
                    }
                ]
            },
            plumber_negotiation: {
                speaker: "Plumber Kumar",
                text: "Parts-ge 800 aaguthe. Service charge 700. Material cost.",
                choices: [
                    {
                        text: "Sari Kumar, ⟨chennāgi māḍi⟩. 1200 ⟨kodthini⟩.",
                        effect: { respect: 25, wallet: -120 },
                        next: "level_complete"
                    },
                    {
                        text: "I will buy the parts. Just tell me labor charge.",
                        isEnglish: true,
                        effect: { respect: -10, patience: -15 },
                        next: "level_complete"
                    },
                    {
                        text: "Kumar ⟨adjust māḍi⟩, last time 500 togond-idri.",
                        effect: { respect: 15, wallet: -100 },
                        next: "level_complete"
                    },
                    {
                        text: "Sari ⟨māḍi⟩, but gaaranti kodabeku.",
                        effect: { respect: 10, wallet: -150 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    4: {
        title: "The BESCOM Power Cut",
        scenario: "Power has been out for 4 hours. You see a BESCOM lineman near the transformer.",
        background: "../../assets/img/scenes/transformer.jpg",
        isHighStress: true,
        dialogue: {
            engagement: {
                speaker: "Lineman Mahadeva",
                text: "Enappa? Line fault ide. Innu 3 hours baralla.",
                choices: [
                    {
                        text: "3 hours? I have WFH! Turn it on!",
                        isEnglish: true,
                        effect: { respect: -30, patience: -40, barrier: true },
                        next: "bescom_response"
                    },
                    {
                        text: "Anna, ⟨yēnāythu⟩? Cable problem-aa?",
                        effect: { respect: 20, patience: 10 },
                        next: "bescom_response"
                    },
                    {
                        text: "Current ⟨yāvāga baruthe⟩ anna? WFH ide.",
                        effect: { respect: 15 },
                        next: "bescom_response"
                    },
                    {
                        text: "Anna ⟨svalpa bēga māḍi⟩. Inverter down aagide.",
                        effect: { respect: 25, patience: 5 },
                        next: "bescom_response"
                    }
                ]
            },
            bescom_response: {
                speaker: "Lineman Mahadeva",
                text: "Tree branch biddide cable mele. Kelsa mad-tha idivi.",
                choices: [
                    {
                        text: "Sari anna, ⟨ārāmāgi māḍi⟩. Safety first.",
                        effect: { respect: 40, patience: 30 },
                        next: "level_complete"
                    },
                    {
                        text: "How long will that take? I'm complaining on Twitter.",
                        isEnglish: true,
                        effect: { respect: -40, patience: -50, end: 'failed' }
                    },
                    {
                        text: "Anna ⟨help māḍana⟩? Light beku.",
                        effect: { respect: 20, patience: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "Coffee thagolthira anna? ⟨Thumba kelsa ide⟩ nimage.",
                        effect: { respect: 50, patience: 40, wallet: -10 },
                        next: "level_complete"
                    }
                ]
            }
        }
    }
};

export const RANKS = [
    { threshold: 200, title: "Fresh Off the Boat", desc: "You survived, but your wallet took a beating. Start using 'Adjust Maadi'!" },
    { threshold: 400, title: "Sakkath Student", desc: "Solid effort! You're navigating vendors and landlords with emerging confidence." },
    { threshold: 600, title: "A True Macha", desc: "Boss! Your 'Adjust Maadi' game is strong. Everyone respects the swagger." },
    { threshold: Infinity, title: "Local Legend", desc: "Namma Ooru Legend! You handle Bangalore logistics better than the locals." }
];
