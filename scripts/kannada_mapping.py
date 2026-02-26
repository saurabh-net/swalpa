# Mapping of Phonetic Filename to Kannada Unicode Script
# Used for the 'native' audio generation batch in SWALPA

KANNADA_MAPPING = {
    # 01_history_and_nuances / General
    "muh-RAH": "ಮರ", "NEE-roo": "ನೀರು", "um-MAH": "ಅಮ್ಮ", "up-PAH": "ಅಪ್ಪ",
    "kun-NOO": "ಕಣ್ಣು", "KAA-loo": "ಕಾಲು", "PAAL": "ಹಾಲು", "HAA-loo": "ಹಾಲು",
    "PUL-lee": "ಹಳ್ಳಿ", "HUL-lee": "ಹಳ್ಳಿ", "PUT-too": "ಹತ್ತು", "HUT-too": "ಹತ್ತು",
    "HOO-voo": "ಹೂವು", "HOH-goo": "ಹೋಗು", "hoo-doo-GAH": "ಹುಡುಗ",
    "vee-CHAA-rah": "ವಿಚಾರ", "sun-TOH-shah": "ಸಂತೋಷ", "pruh-YUTH-nah": "ಪ್ರಯತ್ನ",
    "POO-jay": "ಪೂಜೆ", "aa-KAA-shah": "ಆಕಾಶ", "suh-MY-yah": "ಸಮಯ",
    "RAAH-tree": "ರಾತ್ರಿ", "ub-HYAA-sah": "ಅಭ್ಯಾಸ", "KAA-run": "ಕಾರಣ",
    "kuh-CHAY-ree": "ಕಚೇರಿ", "DUCK-uh-lay": "ದಾಖಲೆ", "AR-jee": "ಅರ್ಜಿ",
    "kuh-NOO-noo": "ಕಾನೂನು", "CHAA-koo": "ಚಾಕು", "MAY-joo": "ಮೇಜು",
    "TY-yaa-roo": "ತಯಾರು", "MUN-noo": "ಮಣ್ಣು", "BAA-yee": "ಬಾಯಿ",
    "huh-lay-gun-nuh-DAH": "ಹಳಗನ್ನಡ", "HOH-sah-gun-nuh-dah": "ಹೊಸಗನ್ನಡ",
    "var-nuh-MAA-laa": "ವರ್ಣಮಾಲೆ",

    # Pronouns & Postpositions
    "NAA-noo": "ನಾನು", "NEE-noo": "ನೀನು", "uh-VUH-noo": "ಅವನು", "uh-VUH-loo": "ಅವಳು",
    "uh-vuh-RUN-nah": "ಅವರನ್ನು", "NAA-voo": "ನಾವು", "NEE-voo": "ನೀವು", "ee-VUH-roo": "ಇವರು",
    "UV-noo": "ಅವನು", "UV-roo": "ಅವರು", "nuh-nuh-GEY": "ನನಗೆ", "NIN-gey": "ನಿನಗೆ",
    "NIM-ee-gey": "ನಿಮಗೆ", "NIM-mah": "ನಿಮ್ಮ", "NUN-nah": "ನನ್ನ", "nuh-nuh-GEY_GOH-too": "ನನಗೆ ಗೊತ್ತು",
    "nuh-nuh-GEY_goh-TILL-lah": "ನನಗೆ ಗೊತ್ತಿಲ್ಲ", "nuh-nuh-GEY_coffee_BAY-koo": "ನನಗೆ ಕಾಫಿ ಬೇಕು",
    "nuh-nuh-GEY_khoo-SHEE_ah-gee-DAY": "ನನಗೆ ಖುಷಿ ಆಗಿದೆ", "nuh-nuh-GEY_huh-see-VOO_ah-gee-DAY": "ನನಗೆ ಹಸಿವು ಆಗಿದೆ",
    "MUH-ney-YUL-lee": "ಮನೆಯಲ್ಲಿ", "MUH-ney-YIN-dah": "ಮನೆಯಿಂದ", "MUH-ney-GEY": "ಮನೆಗೆ",
    "MUH-ney-OH-luh-gey": "ಮನೆಯ ಒಳಗೆ", "OH-luh-gey": "ಒಳಗೆ", "OH-luh-guh-dey": "ಒಳಗಡೆ",
    "HOH-ruh-guh-dey_AAH-chey": "ಹೊರಗಡೆ", "HOH-ruh-guh-dey_AAH-chey_ee-REE": "ಹೊರಗಡೆ ಇರಿ",

    # Numbers
    "OM-buh-too": "ಒಂಬತ್ತು", "ON-doo": "ಒಂದು", "AY-ruh-doo": "ಎರಡು", "MOO-roo": "ಮೂರು",
    "NAAL-koo": "ನಾಲ್ಕು", "EYE-doo": "ಐದು", "AA-roo": "ಆರು", "YAY-loo": "ಏಳು", "EN-too": "ಎಂಟು",
    "HUT-too": "ಹತ್ತು", "hun-NON-doo": "ಹನ್ನೊಂದು", "hun-NAY-ruh-doo": "ಹನ್ನೆರಡು",
    "IP-puh-too": "ಇಪ್ಪತ್ತು", "MOO-vuh-too": "ಮೂವತ್ತು", "nuh-LUH-vuh-too": "ನಲವತ್ತು",
    "EYE-vuh-too": "ಐವತ್ತು", "uh-ROO-vuh-too": "ಅರವತ್ತು", "YAY-luh-vuh-too": "ಎಪ್ಪತ್ತು",
    "YEM-buh-too": "ಎಂಬತ್ತು", "THOM-buh-too": "ತೊಂಬತ್ತು", "NOO-roo": "ನೂರು",
    "SAA-vee-rah": "ಸಾವಿರ", "LUK-shah": "ಲಕ್ಷ",

    # Common Phrases / Survival
    "nuh-mus-KAA-rah": "ನಮಸ್ಕಾರ", "see-GOH-nah": "ಸಿಗೋಣ", "heg-GID-dee-rah": "ಹೇಗಿದ್ದೀರಾ",
    "chen-NAH-gee-dee-nee": "ಚೆನ್ನಾಗಿದ್ದೀನಿ", "chen-nah-GID-dee-nee": "ಚೆನ್ನಾಗಿದ್ದೀನಿ",
    "ESHT-eye-too": "ಎಷ್ಟಾಯ್ತು", "ESH-too": "ಎಷ್ಟು", "ESH-too_AAH-goo-they": "ಎಷ್ಟು ಆಗುತ್ತೆ",
    "ILL-lah": "ಇಲ್ಲ", "ee-DAY": "ಇದೆ", "ee-DOO": "ಇದು", "UH-doo": "ಅದು", "ELL-ee": "ಎಲ್ಲಿ",
    "ELL-ee-dee-rah": "ಎಲ್ಲಿದ್ದೀರಾ", "HAY-gey": "ಹೇಗೆ", "YAY-noo": "ಏನು", "YAA-key": "ಯಾಕೆ",
    "YAA-roo": "ಯಾರು", "YAA-kun-drey_AY-key-UN-drey": "ಯಾಕಂದ್ರೆ", "HAA-gey": "ಹಾಗೆ",
    "ee-GAH": "ಈಗ", "NAA-ley": "ನಾಳೆ", "NIN-ney": "ನಿನ್ನೆ", "HOH-sah": "ಹೊಸ", "HUH-ley": "ಹಳೆ",
    "DOD-dah": "ದೊಡ್ಡ", "CHIK-kah_SUN-nah": "ಚಿಕ್ಕ", "BAY-gah": "ಬೇಗ", "nee-DHAA-nah_MEL-luh-gey": "ನಿಧಾನ",
    "nee-DHAA-nah_HOH-gee": "ನಿಧಾನ ಹೋಗಿ", "BEE-see": "ಬಿಸಿ", "THUN-nee": "ತಣ್ಣಗೆ",
    "OOP-poo": "ಉಪ್ಪು", "SUK-kuh-rey": "ಸಕ್ಕರೆ", "KHUH-rah": "ಖಾರ", "KUH-hee": "ಕಹಿ",
    "SEE-hee": "ಸಿಹಿ", "ROO-chee": "ರುಚಿ",

    # Logistics & Verbs
    "MAA-dee": "ಮಾಡಿ", "KOH-dee": "ಕೊಡಿ", "HOH-gee": "ಹೋಗಿ", "BUN-nee": "ಬನ್ನಿ",
    "NIL-lee-see": "ನಿಲ್ಲಿಸಿ", "TIN-nee": "ತಿನ್ನಿ", "KOO-dee-ree": "ಕುಡಿಯಿರಿ",
    "tay-GAY-ee-ree": "ತೆಗೆಯಿರಿ", "TOH-goh-lee": "ತಗೊಳ್ಳಿ", "KAY-lee": "ಕೇಳಿ",
    "HAY-lee": "ಹೇಳಿ", "NOH-dee": "ನೋಡಿ", "OH-dee": "ಓದಿ", "buh-RAY-ee-ree": "ಬರೆಯಿರಿ",
    "KEL-sah": "ಕೆಲಸ", "SUH-ree": "ಸರಿ", "THUP-poo": "ತಪ್ಪು", "MOH-sah": "ಮೋಸ",
    "SWAL-pah": "ಸ್ವಲ್ಪ", "THOOM-bah": "ತುಂಬಾ", "JAAS-tee": "ಜಾಸ್ತಿ",
    "OO-tah": "ಊಟ", "OO-tah_EYE-tah": "ಊಟ ಆಯ್ತಾ", "OO-tah_chen-nah-GEE-dey": "ಊಟ ಚೆನ್ನಾಗಿದೆ",
    "tay-GAY_tay-GAY-ee-ree": "ತೆಗೆಯಿರಿ", "KOH-doo_KOH-dee": "ಕೊಡಿ",
    "HOH-goh_HOH-gee": "ಹೋಗಿ", "BAA_BUN-nee": "ಬನ್ನಿ", "NIL-loo_NIL-lee-see": "ನಿಲ್ಲಿಸಿ",
    "TIN-noo_TIN-nee": "ತಿನ್ನಿ", "KOO-dee_KOO-dee-ree": "ಕುಡಿಯಿರಿ",
    "NOH-doo_NOH-dee": "ನೋಡಿ", "OH-doo_OH-dee-ree": "ಓದಿ", "BAH-ree_buh-RAY-ee-ree": "ಬರೆಯಿರಿ",
    "TOH-goh_tuh-GOHN-lee": "ತಗೊಳ್ಳಿ", "KUL-soo_KUL-see": "ಕಲಿಸಿ",
    "HAA-koo_HAA-kee": "ಹಾಕಿ", "BEE-doo_BEE-dee": "ಬಿಡಿ", "tay-GAY_tay-GAY-ee-ree": "ತೆಗೆಯಿರಿ",

    # Fruits & Vegetables
    "BAH-ley-hun-noo": "ಬಾಳೆಹಣ್ಣು", "MAA-vee-nah-hun-noo": "ಮಾವಿನಹಣ್ಣು",
    "NIM-bey-hun-noo": "ನಿಂಬೆಹಣ್ಣು", "HUN-noo": "ಹಣ್ಣು", "EE-rool-lee": "ಈರುಳ್ಳಿ",
    "ah-LOO-gud-dey": "ಆಲೂಗಡ್ಡೆ", "bell-LOOL-lee": "ಬೆಳ್ಳುಳ್ಳಿ", "SHOON-tee": "ಶುಂಠಿ",
    "koh-THUM-buh-ree": "ಕೊತ್ತಂಬರಿ", "KUH-ree-BAY-voo": "ಕರಿಬೇವು", "SOW-tey-kai": "ಸೌತೆಕಾಯಿ",
    "may-nuh-see-nuh-KAI": "ಮೆಣಸಿನಕಾಯಿ", "ten-gee-nuh-KAA-yey": "ತೆಂಗಿನಕಾಯಿ",
    "thaa-ruh-KAA-ree": "ತರಕಾರಿ",

    # Services
    "current_HOR-gee-dey": "ಕರೆಂಟ್ ಹೋಗಿದೆ", "current_ILL-lah": "ಕರೆಂಟ್ ಇಲ್ಲ",
    "fan_thee-ROOG-TILL-lah": "ಫ್ಯಾನ್ ತಿರುಗುತ್ತಿಲ್ಲ", "light_oo-RITH-ILL-lah": "ಲೈಟ್ ಉರಿಯುತ್ತಿಲ್ಲ",
    "pipe_leak_AAG-tee-dey": "ಪೈಪ್ ಲೀಕ್ ಆಗುತ್ತಿದೆ", "pipe_block_AAH-gee-dey": "ಪೈಪ್ ಬ್ಲಾಕ್ ಆಗಿದೆ",
    "switch_work_AAH-guh-TILL-lah": "ಸ್ವಿಚ್ ಕೆಲಸ ಮಾಡುತ್ತಿಲ್ಲ", "clean_MAA-dee": "ಕ್ಲೀನ್ ಮಾಡಿ",
    "KUH-sah_goo-DEE-soo": "ಕಸ ಗುಡಿಸು", "BUT-tey_OH-gay": "ಬಟ್ಟೆ ಒಗೆ",
    "NAY-lah_oh-RAY-soo": "ನೆಲ ಒರೆಸು", "PAA-trey_toh-LAY": "ಪಾತ್ರೆ ತೊಳಿ",

    # Travel & Conflict
    "ILL-lee_NIL-lee-see": "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ", "gate_HUH-trah_BEE-dee": "ಗೇಟ್ ಹತ್ರ ಬಿಡಿ",
    "signal-ULL-lee_NIL-lee-see": "ಸಿಗ್ನಲ್ ಹತ್ತಿರ ನಿಲ್ಲಿಸಿ", "MAAD-bay-koo": "ಮಾಡಬೇಕು",
    "MAAD-tee-nee": "ಮಾಡುತ್ತೀನಿ", "bar-TEE-nee": "ಬರುತ್ತೀನಿ", "HOG-tee-nee": "ಹೋಗುತ್ತೀನಿ",
    "licence_ee-DAY": "ಲೈಸೆನ್ಸ್ ಇದೆ", "fine_ESH-too": "ಫೈನ್ ಎಷ್ಟು", "puncture_AAH-gee-dey": "ಪಂಕ್ಚರ್ ಆಗಿದೆ",
    "parking_ELL-ee_ee-DAY": "ಪಾರ್ಕಿಂಗ್ ಎಲ್ಲಿ ಇದೆ", "police_kuh-RACE-tee-nee": "ಪೊಲೀಸ್ ಕಳಿಸುತ್ತೀನಿ",
    "location_kul-see-DAY-nee": "ಲೊಕೇಶನ್ ಕಳಿಸಿದ್ದೀನಿ", "online_pay_MAA-dee-DAY-nee": "ಆನ್ಲೈನ್ ಪೇ ಮಾಡಿದ್ದೀನಿ",
    "RAH-jay": "ರಜೆ", "suh-MY-yah": "ಸಮಯ", "time_ee-DAY-yah": "ಟೈಮ್ ಇದೆಯಾ",

    # Adjectives & Slang
    "chen-nah-GEE-dey_OLL-ley-ah-doo": "ಚೆನ್ನಾಗಿದೆ", "bom-BAAT_SUK-kuth": "ಬೊಂಬಾಟ್ ಸಕ್ಕತ್",
    "CHIN-dee": "ಚಿಂದಿ", "suh-ree-YAA-gee_MAA-dee": "ಸರಿಯಾಗಿ ಮಾಡಿ", "SOOM-muh-ney": "ಸುಮ್ಮನೆ",
    "SOOM-muh-ney_ee-REE": "ಸುಮ್ಮನೆ ಇರಿ", "YAYN_GOO-roo_YAYN_suh-maa-CHAAR": "ಏನ್ ಗುರು ಏನ್ ಸಮಾಚಾರ",
    "scene_ILL-lah": "ಸೀನ್ ಇಲ್ಲ",

    # Verbs (Expanded Tenses)
    "MAAD-tee-yah": "ಮಾಡುತ್ತೀಯಾ", "MAAD-tee-rah": "ಮಾಡುತ್ತೀರಾ", "MAAD-tee-vee": "ಮಾಡುತ್ತೀವಿ",
    "MAAD-thaa-ney": "ಮಾಡುತ್ತಿದ್ದಾನೆ", "MAAD-thaa-ley": "ಮಾಡುತ್ತಿದ್ದಾಳೆ", "MAAD-thaa-rey": "ಮಾಡುತ್ತಿದ್ದಾರೆ",
    "MAAD-thaa-ley": "ಮಾಡುತ್ತಾಳೆ", "AAH-gee-dey": "ಆಗಿದೆ", "AAH-gee-too": "ಆಗಿತ್ತು",
    "AAH-gee-DAY-nee": "ಆಗಿದ್ದೀನಿ", "ah-gee-DAA-ney": "ಆಗಿದ್ದಾನೆ", "ah-GEE-too": "ಆಗಿತ್ತು",
}

# Add any missing or colloquial mappings manually below
UNMAPPED_FALLBACK = {
    "Olage": "ಒಳಗೆ",
    "Ninge": "ನಿನಗೆ",
    "Nimige": "ನಿಮಗೆ",
    "Nanage": "ನನಗೆ",
}
