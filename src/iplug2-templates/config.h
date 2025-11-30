// config.h - Configuration for IntheBox VST3 Plugin
// Version 1.0.9 - Lo-Fi Tape Saturator
// iPlug2 + React WebView Integration

#define PLUG_NAME "IntheBox"
#define PLUG_MFR "INTHEBOX"
#define PLUG_VERSION_HEX 0x00010009  // v1.0.9
#define PLUG_VERSION_STR "1.0.9"
#define PLUG_UNIQUE_ID 'ItBx'
#define PLUG_MFR_ID 'INTB'
#define PLUG_URL_STR "https://www.inthebox.audio"
#define PLUG_EMAIL_STR "support@inthebox.audio"
#define PLUG_COPYRIGHT_STR "Copyright 2025 INTHEBOX"
#define PLUG_CLASS_NAME IntheBox

// ===== GUI DIMENSIONS - CRITICAL! =====
// The React GUI is 600x800px at 100% zoom
// Default zoom is 75% (as per localStorage in App.tsx)
// Therefore, the VST window should open at:
#define PLUG_WIDTH 620   // UI width (544px) + 1cm padding on both sides
#define PLUG_HEIGHT 916  // UI height (840px) + 1cm padding on both sides

// Alternative configurations (uncomment if needed):
// For 100% zoom (full size):
// #define PLUG_WIDTH 600
// #define PLUG_HEIGHT 800
//
// For 50% zoom (compact):
// #define PLUG_WIDTH 300
// #define PLUG_HEIGHT 400

// GUI Settings
#define PLUG_FPS 60                  // 60fps for smooth animations
#define PLUG_SHARED_RESOURCES 0
#define PLUG_HOST_RESIZE 1           // Allow host to resize (user can change zoom)

// Plugin Type
#define PLUG_TYPE 0                  // Effect plugin
#define PLUG_TYPE_IDS { 'IEF1' }

// MIDI
#define PLUG_DOES_MIDI_IN 0
#define PLUG_DOES_MIDI_OUT 0
#define PLUG_DOES_MPE 0
#define PLUG_DOES_STATE_CHUNKS 1     // Enable preset saving

// UI
#define PLUG_HAS_UI 1
#define PLUG_WIDTH_RESIZABLE 1       // Allow width resize
#define PLUG_HEIGHT_RESIZABLE 1      // Allow height resize
#define PLUG_MIN_WIDTH 620           // Lock to maintain 1cm wood border
#define PLUG_MAX_WIDTH 620
#define PLUG_MIN_HEIGHT 916
#define PLUG_MAX_HEIGHT 916

// Latency
#define PLUG_LATENCY 0               // Zero latency (adjust if you add lookahead)

// Channel Configuration
#define PLUG_CHANNEL_IO "2-2"        // Stereo in, stereo out

// AAX Settings (for Pro Tools)
#define AAX_TYPE_IDS 'IEF1', 'IEF2'
#define AAX_TYPE_IDS_AUDIOSUITE 'IEA1', 'IEA2'
#define AAX_PLUG_MFR_STR "INTHEBOX"
#define AAX_PLUG_NAME_STR "IntheBox\nIPEF"
#define AAX_PLUG_CATEGORY_STR "Effect"
#define AAX_DOES_AUDIOSUITE 1

// VST3 Settings
#define VST3_SUBCATEGORY "Fx|Distortion"
#define VST3_SDK_VERSION "VST 3.7.7"

// AU Settings (for Logic Pro / GarageBand)
#define AU_TYPE aufx
#define AU_MFR_ID INTB
#define AU_PLUG_MFR_STR "INTHEBOX"
#define AU_PLUG_NAME_STR "IntheBox"
#define AU_PLUG_CATEGORY_ID kAudioUnitType_Effect
#define AU_PLUG_CATEGORY_STR "Effect"

// WebView Support - REQUIRED for React GUI
#define IPLUG_EDITOR 1
#define PLUG_HAS_UI 1

// Build options
#define APP_NUM_CHANNELS 2
#define APP_N_VECTOR_WAIT 0
#define APP_MULT 1
#define APP_COPY_AUV3 0
#define APP_SIGNAL_VECTOR_SIZE 64

// Branding (optional - add icon file to resources/)
#define PLUG_ICON_ID "icon.png"
#define PLUG_ICON_PATH "resources/icon.png"

// Debug options (set to 0 for release builds)
#define PLUG_DO_LOG 1                // Enable logging in debug builds
