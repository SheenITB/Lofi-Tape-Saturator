#define PLUG_NAME "Lofi Tape Saturator"
#define PLUG_MFR "itbblog"
#define PLUG_VERSION_HEX 0x00010009
#define PLUG_VERSION_STR "1.0.9"
#define PLUG_UNIQUE_ID 'LTSt'
#define PLUG_MFR_ID 'ITBB'
#define PLUG_URL_STR "https://www.itbblog.com"
#define PLUG_EMAIL_STR "support@itbblog.com"
#define PLUG_COPYRIGHT_STR "Copyright 2025 itbblog"
#define PLUG_CLASS_NAME IPlugWebUI

#define BUNDLE_NAME "LofiTapeSaturator"
#define BUNDLE_MFR "itbblog"
#define BUNDLE_DOMAIN "com.itbblog"

#define SHARED_RESOURCES_SUBPATH "LofiTapeSaturator"

#define PLUG_CHANNEL_IO "2-2"

#define PLUG_LATENCY 0
#define PLUG_TYPE 0
#define PLUG_DOES_MIDI_IN 1
#define PLUG_DOES_MIDI_OUT 1
#define PLUG_DOES_MPE 0
#define PLUG_DOES_STATE_CHUNKS 0
#define PLUG_HAS_UI 1
#define PLUG_WIDTH 500
#define PLUG_HEIGHT 700
#define PLUG_FPS 60
#define PLUG_SHARED_RESOURCES 0
#define PLUG_HOST_RESIZE 1
#define PLUG_MIN_WIDTH 500
#define PLUG_MIN_HEIGHT 700

// DPI Awareness for Windows high-DPI displays
#define PLUG_WIN_DPI_AWARE 1

#define AUV2_ENTRY IPlugWebUI_Entry
#define AUV2_ENTRY_STR "IPlugWebUI_Entry"
#define AUV2_FACTORY IPlugWebUI_Factory
#define AUV2_VIEW_CLASS IPlugWebUI_View
#define AUV2_VIEW_CLASS_STR "IPlugWebUI_View"

#define AAX_TYPE_IDS 'LTSt'
#define AAX_TYPE_IDS_AUDIOSUITE 'LTSA'
#define AAX_PLUG_MFR_STR "itbblog"
#define AAX_PLUG_NAME_STR "Lofi Tape Saturator\nLTSt"
#define AAX_PLUG_CATEGORY_STR "Effect"
#define AAX_DOES_AUDIOSUITE 1

// VST3 FUID (Factory Unique Identifiers) - CRITICAL for Ableton compatibility
// Processor UID (must be unique)
#define VST3_PROCESSOR_UID 0x4C544653, 0x61747572, 0x61746F72, 0x00000001
// Controller UID (must be unique and different from processor)
#define VST3_CONTROLLER_UID 0x4C544643, 0x6F6E7472, 0x6F6C6C65, 0x00000001

#define VST3_SUBCATEGORY "Fx|Distortion"

#define APP_NUM_CHANNELS 2
#define APP_N_VECTOR_WAIT 0
#define APP_MULT 1
#define APP_COPY_AUV3 0
#define APP_SIGNAL_VECTOR_SIZE 64
