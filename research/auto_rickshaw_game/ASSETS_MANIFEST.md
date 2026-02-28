# Assets Manifest & UX Guidelines

## 🎙️ Audio Assets (The Voice of Bangalore)
To achieve the "Premium" feel, use the **Swalpa Multi-Voice Engine** (`generate_podcast.py` logic):

*   **Host/Narrator**: Use a clear English voice for tutorials.
*   **Auto Driver (Guru/Anna)**:
    *   **Voice**: `kn-IN-Chirp3-HD-Puck` (Male)
    *   **Logic**: Every Kannada line should use the `<lang xml:lang='kn-IN'>` tag with the custom phonetic mapping from `scripts/kannada_mapping.py`.
*   **Ambient**:
    *   `traffic_hum.mp3` (Low volume loop)
    *   `rain_background.mp3` (For Level 3)
    *   `meter_click.mp3` (UI feedback)

## 🎨 Visual System (Swalpa Brand)
*   **Palette**: Use the curated HSL colors from `docs/assets/css/custom.css` (#FFD200 and #CE1126).
*   **Generated Assets**:
    *   ![Auto Rickshaw Icon](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/auto_rickshaw_icon.png)
    *   ![Level 1 Background](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/level_1_background.png)
    *   ![Respect Meter UI](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/respect_meter_ui.png)
    *   ![Level 2 Gullies](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/level_2_gullies.png)
    *   ![Level 3 Rain](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/level_3_rain.png)
    *   ![Level 4 Traffic](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/level_4_traffic.png)
    *   ![Level 5 Detour](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/level_5_detour.png)
    *   ![Level 6 Payment](file:///Users/saurabhmaurya/Documents/swalpa-private/research/auto_rickshaw_game/assets/level_6_payment.png)
*   **UI Components**:
    *   **RespectMeter**: A horizontal bar that changes color (Red -> Yellow -> Green -> Gold).
    *   **Dialogue Box**: Glassmorphic translucent background.
    *   **Auto Sprite**: Simple 2D side-view or top-down view for navigation.

## 📱 Interactive Elements
*   **Phonetic Hover**: When a player hovers over a Kannada option, show the enlarged ⟨PHO-NE-TIC⟩ guide and play the sound.
*   **Micro-animations**: Subtle shake of the screen if the driver gets impatient.
