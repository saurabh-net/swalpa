from gtts import gTTS
import os

text = "ನಮಸ್ಕಾರ" # Namaskara in Kannada script
tts = gTTS(text, lang='kn')
tts.save("test_kannada.mp3")
print(f"Generated test_kannada.mp3: {os.path.exists('test_kannada.mp3')}")
