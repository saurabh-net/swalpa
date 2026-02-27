import requests, os, json, base64

with open('.env') as f:
    for line in f:
        if line.startswith('GOOGLE_CLOUD_API_KEY='):
            api_key = line.split('=')[1].strip()

url = "https://texttospeech.googleapis.com/v1/text:synthesize"
headers = {"X-Goog-Api-Key": api_key, "Content-Type": "application/json"}

# Test 1: SSML with lang tag
payload = {
    "input": {"ssml": "<speak><lang xml:lang='kn-IN'>Bēku</lang></speak>"},
    "voice": {"languageCode": "kn-IN", "name": "kn-IN-Chirp3-HD-Puck"},
    "audioConfig": {"audioEncoding": "MP3"}
}

resp = requests.post(url, headers=headers, json=payload)
print("SSML kn-IN text Bēku status:", resp.status_code)
if resp.status_code == 200:
    print("Success!")
else:
    print(resp.text)

# Test 2: Plain text with Bēku
payload2 = {
    "input": {"text": "Bēku"},
    "voice": {"languageCode": "kn-IN", "name": "kn-IN-Chirp3-HD-Puck"},
    "audioConfig": {"audioEncoding": "MP3"}
}
resp2 = requests.post(url, headers=headers, json=payload2)
print("Plain text Bēku status:", resp2.status_code)
if resp2.status_code != 200:
    print(resp2.text)

