# **Socio-Linguistic Architecture and Advanced Level Design for the Auto-Rickshaw Protocol**

The SWALPA project represents a paradigm shift in language pedagogy, moving away from rote memorization toward a high-stakes, immersion-based simulation of urban life in Bangalore. Central to this experience is the "Auto-Rickshaw Protocol," a game mechanic that treats linguistic proficiency as a form of social currency. In the congested, high-friction environment of Bangalore, the auto-rickshaw is more than a vehicle; it is a mobile theater of negotiation where power dynamics, regional identity, and economic survival intersect.1

This document details the deep level design for Levels 7, 8, and 9, integrating the "Respect-Patience-Fare" (RPF) engine with authentic "Bangalore Kannada" dialect.

## ---

**🏗️ Core Game Mechanics & Constraints**

The game operates on a **State-Based Engine** where every linguistic choice impacts three primary variables:

1. **Respect (Maryade)**: Measures the NPC's view of the player. High respect unlocks "loyalty discounts" and de-escalates conflicts.3  
2. **Wallet (Duddu)**: The literal cost of the trip. Bangalore drivers often view themselves as "hobbyists" who charge based on whim or "Outsider Taxes".4  
3. **Patience (Shakti)**: A decaying meter. In high-stress zones like Majestic, it decays by \-2 per minute of real-time deliberation.6

### **The Four-Choice Matrix (Standardized)**

* **Choice A (English)**: Direct/Clear. Result: Respect (-15 to \-20), Cost (+10% to \+20%). Perceived as "arrogant" or "outsider".5  
* **Choice B (Kannada \- Polite)**: Respectful honorifics (Anna/Sir). Result: Respect (+10 to \+25), Cost (-10%). Builds "familial rapport".  
* **Choice C (Kannada \- Mix/Attempt)**: "Broken" or formal Kannada. Result: Small Respect gain, Neutral cost. Seen as a goodwill gesture.  
* **Choice D (Scenario-Specific)**: Contextual slang or local logic (e.g., "Adjust maadi"). Result: High Respect/Patience gains.9

## ---

**📍 Level 7: The Sudden Breakdown**

### **📊 Level Metadata**

* **Title**: The Electronic City Flyover Limbo.  
* **Scenario**: Stranded on the high-speed Electronic City Flyover, 30 feet above the ground, with no service lanes.15 The engine has failed.  
* **NPC Personality**: **Shankar Anna** (The Tired Pragmatist). A middle-aged driver and hardcore fan of actor Shankar Nag.14  
* **Initial State**: Respect: 50, Wallet: ₹500, Patience: 60\.

### **🎭 Dialogue Graph**

#### **Node 7.1: The Mechanical Sputter**

The auto-rickshaw jerks and dies. Shankar Anna stares at the dashboard in silence while high-speed traffic roars past.16

* **Choice A**: "Excuse me? Why did we stop? I'm going to be late for my meeting\!"  
  * **Effect**: Respect \-20, Wallet \+15% (Aggression Tax), Patience \-15.  
  * **Kannada/Outcome**: (Direct English) Driver perceives lack of empathy for his livelihood.5  
* **Choice B**: "Anna, yenaythu? Engine problem-aa?" (Brother, what happened? Is it an engine problem?).17  
  * **Effect**: Respect \+15, Wallet Neutral, Patience \+10.  
  * **Logic**: Using "Anna" and asking a question builds a shared problem state.3  
* **Choice C**: "Auto stop aythu? Help beka?" (Auto stopped? Do you need help?).  
  * **Effect**: Respect \+5, Wallet Neutral, Patience \+5.  
  * **Logic**: Simple Kannada shows effort but lacks the deep respect of Choice B.  
* **Choice D**: "Ayyo\! Shankar Nag avru ididre nimma auto ondu second-alli sari madthidru\!" (Ayyo\! If Shankar Nag were here, he would have fixed your auto in a second\!).  
  * **Effect**: Respect \+30, Wallet Neutral, Patience \+20.  
  * **Logic**: Invoking the driver's idol triggers a nostalgia-based patience boost.14

#### **Node 7.2: The Refund Negotiation (The Scam)**

Shankar declares the engine "Dead." He demands the full fare plus a "service fee," despite being only halfway.18

* **Choice A**: "I’m not paying you a single rupee. You didn't drop me where you promised."  
  * **Effect**: Respect \-25, Patience \-30 (**Trigger: Language Barrier**).  
  * **Logic**: Driver claims "Kannada mathadi\!" (Speak Kannada\!) to ignore the protest.8  
* **Choice B**: "Anna, swalpa nyaya mathadi. Half-way mathra bandiddivi, half fare thagoli." (Brother, speak a little fairly. We've only come halfway, take half fare.).17  
  * **Effect**: Respect \+20, Wallet \-50% (of original), Patience \+10.  
  * **Logic**: Appeals to the driver’s "higher moral fiber".1  
* **Choice C**: "Full fare beda. Discount kodi please." (No full fare. Give a discount please.).17  
  * **Effect**: Respect \+5, Wallet \-20%, Patience Neutral.  
* **Choice D**: "Anna, swalpa adjust maadi. Nanu bere auto hidiyoke bere hodu beku." (Brother, please adjust. I have to find another auto elsewhere.).9  
  * **Effect**: Respect \+15, Wallet \-40%, Patience \+15.  
  * **Logic**: The "Adjust" mantra acknowledges the shared inconvenience.12

## ---

**📍 Level 8: The Majestic Bus Stand Chaos**

### **📊 Level Metadata**

* **Title**: The Terminal of a Thousand Rejections.  
* **Scenario**: Kempegowda Bus Station (Majestic) at 6:30 PM. Rain is starting.6 The player needs to go to Sarjapur (17 km/hr average speed).19  
* **NPC Personality**: **Manju** (The Aggressive Hustler). 25, cynical, and tired of "techies".2  
* **Initial State**: Respect: 30, Wallet: ₹1000, Patience: 40\.

### **🎭 Dialogue Graph**

#### **Node 8.1: The Interrogation**

Manju is leaning against his auto. The "Khaali" (Empty) board is flipped, but he is refusing everyone.20

* **Choice A**: "Are you free? I want to go to Sarjapur. Switch on the meter.".13  
  * **Effect**: Respect \-20, Wallet \+20%, Patience \-15.  
  * **Logic**: Demanding the meter in English at Majestic is seen as "demanding".5  
* **Choice B**: "Namaskara Anna, Sarjapur bartira? Thumba urgent ide." (Greetings brother, will you come to Sarjapur? It's very urgent.).  
  * **Effect**: Respect \+20, Wallet Neutral, Patience \+15.  
  * **Logic**: Respectful greeting and an appeal to urgency bypass the initial refusal.  
* **Choice C**: "Sarjapur-aa? Meter kothi madi banni." (Sarjapur? Keep the meter on and come.).10  
  * **Effect**: Respect \+5, Wallet Neutral, Patience \+5.  
  * **Logic**: Using the slang "Meter Kothi" shows the player isn't a novice.10  
* **Choice D**: *Tilts head and raises eyebrows.* "Sarjapur? One-and-half... bartira?" (Sarjapur? One-and-half... will you come?).15  
  * **Effect**: Respect \+25, Wallet \+50%, Patience \+20.  
  * **Logic**: Pre-emptively offering the 1.5x surcharge signals understanding of "Rickshaw Logic".15

#### **Node 8.2: The "Empty Return" Surcharge**

Manju demands a flat ₹200, citing traffic and an "empty return".23

* **Choice A**: "That's ridiculous\! It's only 15 kilometers\! I'll check Uber.".24  
  * **Effect**: Respect \-20, Patience \-30 (**Trigger: Language Barrier**).  
  * **Logic**: Mentioning ride-hailing apps is a "Respect Killer".24  
* **Choice B**: "Anna, nanu student. Eradu-nooru thumba jasthi. One-forty-ge adjust maadi." (Brother, I am a student. Two-hundred is too much. Adjust for one-forty.).25  
  * **Effect**: Respect \+25, Wallet \-30% (from demand), Patience \+10.  
  * **Logic**: Identifying as a "student" is a powerful empathy-trigger.26  
* **Choice C**: "One-fifty koddthini. Banni hogona." (I'll give one-fifty. Come, let's go.).11  
  * **Effect**: Respect \+10, Wallet \-25%, Patience \+5.  
* **Choice D**: "Anna, 'Meter kothi' madi, extra thirty koddthini." (Brother, keep the meter on, I'll give thirty extra.).10  
  * **Effect**: Respect \+20, Wallet Meter \+ ₹30, Patience \+15.  
  * **Logic**: The hybrid "Meter Plus" approach is often more successful at Majestic.22

## ---

**📍 Level 9: The Rainy Night Medical Emergency**

### **📊 Level Metadata**

* **Title**: The High-Stakes Monsoon.  
* **Scenario**: 11:45 PM. Heavy rain in Indira Nagar. The player has a sick relative and needs to reach Aster CMI Hospital.13  
* **NPC Personality**: **Gowda** (The Philosophical Elder). 60 years old, meticulous, and religious.1  
* **Initial State**: Respect: 60, Wallet: ₹2000, Patience: 70\.

### **🎭 Dialogue Graph**

#### **Node 9.1: The Rainy Refusal**

*Gowda shakes his head, claiming it is too much rain and he is going home.*

* **Choice A**: "Please stop\! It's an emergency\! I'll pay double, triple, anything\!"  
  * **Effect**: Respect \-15, Wallet \+200%, Patience Neutral.  
  * **Logic**: Panicked English leads to immediate price gouging.22  
* **Choice B**: "Anna, dayavittu nilsi. Mane-alli yaaro aarama illa. Hospital-ge hogabeku." (Brother, please stop. Someone at home is not well. Must go to the hospital.).  
  * **Effect**: Respect \+30, Wallet Neutral, Patience \+20.  
  * **Logic**: Using "aarama illa" (not well) and "Anna" signals a genuine crisis.  
* **Choice C**: "Emergency hospital. Fast hogi please." (Emergency hospital. Go fast please.).  
  * **Effect**: Respect \+10, Wallet Neutral, Patience \+5.  
* **Choice D**: *Points at the relative.* "Anna, swalpa adjust maadi. Devaru nimage olledu madthare." (Brother, please adjust. God will do good to you.).17  
  * **Effect**: Respect \+40, Wallet Neutral, Patience \+30.  
  * **Logic**: Invoking divine blessing ("Devaru") is standard for requesting favors from elders.17

#### **Node 9.2: The "Humanity" Check (The Payoff)**

*The player arrives at the hospital. The meter says ₹120.*

* **Choice A**: "Here is 240 as promised. Thanks for the ride." (Direct English).  
  * **Effect**: Respect \-10, Wallet \-₹240, Patience Neutral.  
* **Choice B**: "Anna, neevu devru thara bandri. Idhu thagoli, swalpa jasthi idhe. Dhanyavadagalu." (Brother, you came like God. Take this, it's a little extra. Thank you.).17  
  * **Effect**: Respect \+60 (Max Respect), Wallet \-₹300, Patience \+40.  
  * **Logic**: Re-emphasizing "Devru" (God) status cements the relationship.17  
* **Choice C**: "Thanks Anna. ArAmAg'iri." (Thanks brother. Be comfortable/stay well.).  
  * **Effect**: Respect \+15, Wallet \-₹240, Patience \+10.  
* **Choice D**: *Gives money with both hands.* "Anna, Shankar Nag avara thara help madidri. Nimma sahaya mareyalla." (Brother, you helped like Shankar Nag. I won't forget your help.).  
  * **Effect**: Respect \+50, Wallet \-₹240, Patience \+30.  
  * **Logic**: Comparing a driver's actions to their idol is the highest form of praise.14

## ---

**🛠️ Advanced Game Mechanics**

### **1\. The Language Barrier State**

When the player selects Choice A (English) in a high-tension node, the game may trigger a "Barrier Check."

* **NPC Dialogue**: "Kannada mathadi\! Hindi-English namage gothilla\!" (Speak Kannada\! We don't know Hindi-English\!).8  
* **Penalty**: Patience decays at 3x speed until a Kannada phrase is used.

### **2\. The "Adjust Maadi" Fail-Safe**

If a player’s Respect score drops below 10, NPCs will no longer stop. The player must use the **"Adjust Maadi" Global Reset**:

* **Phrase**: "Swalpa adjust maadi" (Please adjust a little).10  
* **Effect**: Resets NPC hostility to "Neutral" and allows the player to resume the protocol.9

### **3\. Phonetic Bonus**

The game uses a microphone-input confidence interval. If the player speaks the Latin transliteration with 70%+ accuracy, they receive a **\+5 Respect Bonus** per phrase.

#### **Works cited**

1. Vampires of Bangalore – Auto rickshaw drivers | Maverickvedam's Blog \- WordPress.com, accessed February 27, 2026, [https://maverickvedam.wordpress.com/2011/05/03/vampires-of-bangalore-auto-rickshaw-drivers/](https://maverickvedam.wordpress.com/2011/05/03/vampires-of-bangalore-auto-rickshaw-drivers/)  
2. Language wars: Bengaluru's auto drivers, non-local techies and a Kannada lesson, accessed February 27, 2026, [https://thesouthfirst.com/karnataka/language-wars-bengalurus-auto-drivers-non-local-techies-and-a-kannada-lesson/](https://thesouthfirst.com/karnataka/language-wars-bengalurus-auto-drivers-non-local-techies-and-a-kannada-lesson/)  
3. NAMMA BENGALURU\! \- PC's Interest\!, accessed February 27, 2026, [https://prateekchakraborty.wordpress.com/2016/04/30/namma-bengaluru/](https://prateekchakraborty.wordpress.com/2016/04/30/namma-bengaluru/)  
4. Bengaluru Man Uses ChatGPT to Negotiate Auto Fare in Kannada, Internet Applauds Smart Use of AI \- The CSR Journal, accessed February 27, 2026, [https://thecsrjournal.in/bengaluru-man-uses-chatgpt-negotiate-auto-fare-kannada/](https://thecsrjournal.in/bengaluru-man-uses-chatgpt-negotiate-auto-fare-kannada/)  
5. Why do so many Bangalore auto drivers behave like hooligans on the road? \- Reddit, accessed February 27, 2026, [https://www.reddit.com/r/bangalore/comments/1lz00tt/why\_do\_so\_many\_bangalore\_auto\_drivers\_behave\_like/](https://www.reddit.com/r/bangalore/comments/1lz00tt/why_do_so_many_bangalore_auto_drivers_behave_like/)  
6. What are the major problems Bangalore city is facing? \- Quora, accessed February 27, 2026, [https://www.quora.com/What-are-the-major-problems-Bangalore-city-is-facing](https://www.quora.com/What-are-the-major-problems-Bangalore-city-is-facing)  
7. A Study of the Autorickshaw Sector in Bangalore City CiSTUP, IISc \- Scribd, accessed February 27, 2026, [https://www.scribd.com/document/499993640/A-Study-of-the-Autorickshaw-Sector-in-Bangalore-CiSTUP-Index-Of](https://www.scribd.com/document/499993640/A-Study-of-the-Autorickshaw-Sector-in-Bangalore-CiSTUP-Index-Of)  
8. Uber driver threatened me and told I know your pickup location : r/bangalore \- Reddit, accessed February 27, 2026, [https://www.reddit.com/r/bangalore/comments/1e3rtyo/uber\_driver\_threatened\_me\_and\_told\_i\_know\_your/](https://www.reddit.com/r/bangalore/comments/1e3rtyo/uber_driver_threatened_me_and_told_i_know_your/)  
9. What are the common slang words used in Bangalore Kannada ..., accessed February 27, 2026, [https://talkpal.ai/culture/what-are-the-common-slang-words-used-in-bangalore-kannada/](https://talkpal.ai/culture/what-are-the-common-slang-words-used-in-bangalore-kannada/)  
10. Understanding Bangalorean Slang: A Guide for Non-Kannada ..., accessed February 27, 2026, [https://multibhashi.com/blogs/bangalorean-slang-guide-non-kannada-multibhashi](https://multibhashi.com/blogs/bangalorean-slang-guide-non-kannada-multibhashi)  
11. Learn Kannada | PDF | Shiva | Curry \- Scribd, accessed February 27, 2026, [https://www.scribd.com/document/517333622/Learn-Kannada](https://www.scribd.com/document/517333622/Learn-Kannada)  
12. Old Bangalore. : r/bangalore \- Reddit, accessed February 27, 2026, [https://www.reddit.com/r/bangalore/comments/pt1i5v/old\_bangalore/](https://www.reddit.com/r/bangalore/comments/pt1i5v/old_bangalore/)  
13. Bangalore – Travel guide at Wikivoyage, accessed February 27, 2026, [https://en.wikivoyage.org/wiki/Bangalore](https://en.wikivoyage.org/wiki/Bangalore)  
14. Characteristics of Drivers- Esp. in Bangalore \- Page 2 \- Team-BHP, accessed February 27, 2026, [https://www.team-bhp.com/forum/shifting-gears/14972-characteristics-drivers-esp-bangalore-2.html](https://www.team-bhp.com/forum/shifting-gears/14972-characteristics-drivers-esp-bangalore-2.html)  
15. What are some travel hacks with respect to Electronic city flyover in Bangalore? Specific times to take/avoid flyover? Patterns when traffic Jam appears? Best way to get out of traffic jam if stuck in flyover. Any specific lane to follow? \- Quora, accessed February 27, 2026, [https://www.quora.com/What-are-some-travel-hacks-with-respect-to-Electronic-city-flyover-in-Bangalore-Specific-times-to-take-avoid-flyover-Patterns-when-traffic-Jam-appears-Best-way-to-get-out-of-traffic-jam-if-stuck-in-flyover-Any](https://www.quora.com/What-are-some-travel-hacks-with-respect-to-Electronic-city-flyover-in-Bangalore-Specific-times-to-take-avoid-flyover-Patterns-when-traffic-Jam-appears-Best-way-to-get-out-of-traffic-jam-if-stuck-in-flyover-Any)  
16. Rants on Bangalore's traffic situation \- Page 721 \- Team-BHP, accessed February 27, 2026, [https://www.team-bhp.com/forum/street-experiences/67737-rants-bangalores-traffic-situation-721.html](https://www.team-bhp.com/forum/street-experiences/67737-rants-bangalores-traffic-situation-721.html)  
17. Which are the most common Kannada phrases/expressions used in ..., accessed February 27, 2026, [https://www.quora.com/Which-are-the-most-common-Kannada-phrases-expressions-used-in-everyday-life-and-their-meaning](https://www.quora.com/Which-are-the-most-common-Kannada-phrases-expressions-used-in-everyday-life-and-their-meaning)  
18. Auto drivers are bastards. : r/bangalore \- Reddit, accessed February 27, 2026, [https://www.reddit.com/r/bangalore/comments/128i74r/auto\_drivers\_are\_bastards/](https://www.reddit.com/r/bangalore/comments/128i74r/auto_drivers_are_bastards/)  
19. Bengaluru Congestion Pricing Scheme Report \- JICA Report PDF, accessed February 27, 2026, [https://openjicareport.jica.go.jp/pdf/12235198\_04.pdf](https://openjicareport.jica.go.jp/pdf/12235198_04.pdf)  
20. Hi Bangalore\! I'm working on a game where you are an auto driver in Bangalore. \- Reddit, accessed February 27, 2026, [https://www.reddit.com/r/bangalore/comments/19bd8so/hi\_bangalore\_im\_working\_on\_a\_game\_where\_you\_are/](https://www.reddit.com/r/bangalore/comments/19bd8so/hi_bangalore_im_working_on_a_game_where_you_are/)  
21. Bangalore Central | Getaway2india's Blog, accessed February 27, 2026, [https://getaway2india.wordpress.com/tag/bangalore-central/](https://getaway2india.wordpress.com/tag/bangalore-central/)  
22. Bangalore's Autorickshaw Sector Study | PDF | Public Transport | Taxicab \- Scribd, accessed February 27, 2026, [https://www.scribd.com/document/194562861/Autorickshaws-Blore-FinalReport-Dec12-Cistup](https://www.scribd.com/document/194562861/Autorickshaws-Blore-FinalReport-Dec12-Cistup)  
23. I am working on a game where you are an auto driver in Bangalore \- Reddit, accessed February 27, 2026, [https://www.reddit.com/r/bangalore/comments/1hyx02o/i\_am\_working\_on\_a\_game\_where\_you\_are\_an\_auto/](https://www.reddit.com/r/bangalore/comments/1hyx02o/i_am_working_on_a_game_where_you_are_an_auto/)  
24. I am a north Indian guy, going to Bangalore for the first time. What are some important tips you would like to give me? \- Quora, accessed February 27, 2026, [https://www.quora.com/I-am-a-north-Indian-guy-going-to-Bangalore-for-the-first-time-What-are-some-important-tips-you-would-like-to-give-me](https://www.quora.com/I-am-a-north-Indian-guy-going-to-Bangalore-for-the-first-time-What-are-some-important-tips-you-would-like-to-give-me)  
25. Bengaluru man uses ChatGPT to bargain auto fare like an elder brother \- without knowing Kannada. Even the driver was impressed \- The Economic Times, accessed February 27, 2026, [https://m.economictimes.com/magazines/panache/bengaluru-man-uses-chatgpt-to-bargain-auto-fare-like-an-elder-brother-without-knowing-kannada-even-the-driver-was-impressed/articleshow/120723465.cms](https://m.economictimes.com/magazines/panache/bengaluru-man-uses-chatgpt-to-bargain-auto-fare-like-an-elder-brother-without-knowing-kannada-even-the-driver-was-impressed/articleshow/120723465.cms)  
26. Bengaluru man's video on how to use ChatGPT to negotiate auto fare in Kannada is viral, accessed February 27, 2026, [https://www.indiatoday.in/trending-news/story/bengaluru-man-uses-chatgpt-to-negotiate-auto-fare-in-kannada-viral-tutorial-video-2716741-2025-04-29](https://www.indiatoday.in/trending-news/story/bengaluru-man-uses-chatgpt-to-negotiate-auto-fare-in-kannada-viral-tutorial-video-2716741-2025-04-29)  
27. What are the most common slang words used by Bangalore youth today? \- Talkpal, accessed February 27, 2026, [https://talkpal.ai/culture/what-are-the-most-common-slang-words-used-by-bangalore-youth-today/](https://talkpal.ai/culture/what-are-the-most-common-slang-words-used-by-bangalore-youth-today/)