import requests
import os
import base64

def load_api_key():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('GOOGLE_CLOUD_API_KEY='):
                return line.split('=')[1].strip()
    return None

api_key = load_api_key()
url = "https://texttospeech.googleapis.com/v1/text:synthesize"
headers = {"X-Goog-Api-Key": api_key, "Content-Type": "application/json"}

# Test AA-roo (ಆರು)
payloads = [
    # Option 1: Current (with lang)
    {"input": {"ssml": "<speak><lang xml:lang='kn-IN'>ಆರು</lang></speak>"}, "voice": {"languageCode": "kn-IN", "name": "kn-IN-Wavenet-A"}, "audioConfig": {"audioEncoding": "MP3"}},
    # Option 2: Simple speak
    {"input": {"ssml": "<speak>ಆರು</speak>"}, "voice": {"languageCode": "kn-IN", "name": "kn-IN-Wavenet-A"}, "audioConfig": {"audioEncoding": "MP3"}},
    # Option 3: Plain text
    {"input": {"text": "ಆರು"}, "voice": {"languageCode": "kn-IN", "name": "kn-IN-Wavenet-A"}, "audioConfig": {"audioEncoding": "MP3"}}
]

for i, payload in enumerate(payloads):
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        content = response.json().get('audioContent', '')
        size = len(base64.b64decode(content))
        print(f"Option {i+1} size: {size}")
    else:
        print(f"Option {i+1} error: {response.text}")
