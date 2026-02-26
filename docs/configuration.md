# Configuration

This page allows you to customize your experience on SWALPA.

## Audio Preferences

Choose the voice style you prefer for the Kannada audio pronunciations. The selected voice will be used across all pages on this site.

<div class="audio-voice-toggle-container" style="margin-top: 20px; padding: 15px; background-color: var(--md-default-bg-color); border: 1px solid var(--md-default-fg-color--lightest); border-radius: 4px; display: flex; align-items: center;">
    <label for="voice-select" style="font-weight: bold; margin-right: 15px;">Voice Style:</label>
    <select id="voice-select" style="padding: 5px; font-size: 1rem; border-radius: 4px; border: 1px solid var(--md-default-fg-color--lightest);">
        <option value="audio_native_v4_male">Native Male (Chirp 3 HD) - Default</option>
        <option value="audio_native">Native Female (Wavenet)</option>
    </select>
    <span id="save-status" style="margin-left: 15px; color: var(--md-typeset-color); font-size: 0.9em; transition: opacity 0.3s ease; opacity: 0;">Saved!</span>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const swalpaAudioVoiceKey = 'swalpa_voice_dir';
    const voiceSelect = document.getElementById('voice-select');
    const saveStatus = document.getElementById('save-status');

    if (voiceSelect) {
        // Load existing preference or use default
        let currentVoiceDir = localStorage.getItem(swalpaAudioVoiceKey) || 'audio_native_v4_male';
        voiceSelect.value = currentVoiceDir;

        // Listen for changes
        voiceSelect.addEventListener('change', function(e) {
            localStorage.setItem(swalpaAudioVoiceKey, e.target.value);
            
            // Show "Saved!" confirmation briefly
            saveStatus.style.opacity = '1';
            setTimeout(() => {
                saveStatus.style.opacity = '0';
            }, 2000);
        });
    }
});
</script>
