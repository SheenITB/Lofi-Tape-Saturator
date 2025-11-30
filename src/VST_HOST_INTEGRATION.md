# 🎛️ VST Host Integration Guide - IntheBox

## Problema risolto ✅

La GUI appariva "esplosa" o disallineata quando caricata in un VST host perché aveva:
- ❌ Padding eccessivo in `index.html` (40px)
- ❌ Doppia centratura (container + wrapper interno)
- ❌ Overflow auto che causava scrolling
- ❌ Media queries che interferivano con le dimensioni fisse

### Modifiche applicate:

1. **`index.html`** → Rimosso padding, impostato `overflow: hidden`, position fixed
2. **`App.tsx`** → Wrapper principale ora usa `absolute inset-0` invece di dimensioni calcolate
3. **Scaling** → Rimane a 75% di default ma ora centrato correttamente

---

## 📦 Come integrare in iPlug2

### STEP 1: Build del progetto React

```bash
# Nel tuo progetto Figma Make
npm run build
```

Questo crea una cartella `dist/` con:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [altri assets]
```

---

### STEP 2: Setup iPlug2 Project

Struttura del tuo progetto iPlug2:

```
IntheBox/
├── IntheBox.cpp           # DSP engine
├── IntheBox.h             # Header
├── resources/
│   └── web/               # ← COPIA QUI IL BUILD REACT
│       ├── index.html
│       └── assets/
└── config.h
```

**Copia** l'intero contenuto di `dist/` nella cartella `resources/web/`.

---

### STEP 3: Configura iPlug2 WebView

#### `IntheBox.h`

```cpp
#pragma once

#include "IPlug_include_in_plug_hdr.h"
#include "IControl.h"

const int kNumPrograms = 1;

enum EParams
{
  kDrive = 0,
  kTone,
  kMPC,
  kWow,
  kNoise,
  kFlutter,
  kResampler,
  kLowPass,
  kDryWet,
  kPower,
  kNumParams
};

class IntheBox final : public iplug::Plugin
{
public:
  IntheBox(const iplug::InstanceInfo& info);

#if IPLUG_EDITOR
  void OnUIOpen() override;
  void OnUIClose() override;
  void OnParamChange(int paramIdx) override;
#endif

  void ProcessBlock(iplug::sample** inputs, iplug::sample** outputs, int nFrames) override;

private:
  // DSP variables
  double mDrive = 0.0;
  double mTone = 0.0;
  // ... altri parametri
};
```

#### `IntheBox.cpp`

```cpp
#include "IntheBox.h"
#include "IPlug_include_in_plug_src.h"

IntheBox::IntheBox(const InstanceInfo& info)
: Plugin(info, MakeConfig(kNumParams, kNumPrograms))
{
  // Parametri con valori di default come richiesto
  GetParam(kDrive)->InitDouble("Drive", 0.0, 0.0, 100.0, 0.1, "%");
  GetParam(kTone)->InitDouble("Tone", 0.0, 0.0, 100.0, 0.1, "%");
  // Default MPC now 0 -> 16-bit baseline (sweeps toward 4-bit)
  GetParam(kMPC)->InitDouble("MPC", 0.0, 0.0, 100.0, 1.0, "bit");
  GetParam(kWow)->InitDouble("Wow", 0.0, 0.0, 100.0, 0.1, "%");
  GetParam(kNoise)->InitDouble("Noise", 0.0, 0.0, 100.0, 0.1, "%");
  GetParam(kFlutter)->InitDouble("Flutter", 0.0, 0.0, 100.0, 0.1, "%");
  GetParam(kResampler)->InitDouble("Resampler", 100.0, 0.0, 100.0, 1.0, "Hz");
  GetParam(kLowPass)->InitDouble("LowPass", 100.0, 0.0, 100.0, 1.0, "Hz");
  // Default Dry/Wet set to fully wet (100%)
  GetParam(kDryWet)->InitDouble("DryWet", 100.0, 0.0, 100.0, 1.0, "%");
  GetParam(kPower)->InitBool("Power", false); // STOP di default

#if IPLUG_EDITOR
  mMakeGraphicsFunc = [&]() {
    return MakeGraphics(*this, PLUG_WIDTH, PLUG_HEIGHT, PLUG_FPS);
  };
  
  mLayoutFunc = [&](IGraphics* pGraphics) {
    // Carica la GUI React buildata
    pGraphics->AttachPanelBackground(IColor(255, 42, 24, 16)); // #2a1810
    pGraphics->LoadWebView("web/index.html");
    
    // Comunicazione bidirezionale GUI ↔ DSP
    pGraphics->SetWebViewReadyFunc([pGraphics](IWebView* pWebView) {
      // Quando la GUI è pronta, invia i valori iniziali
      pWebView->EvaluateJavaScript("console.log('iPlug2 WebView Ready')");
    });
  };
#endif
}

#if IPLUG_EDITOR
void IntheBox::OnUIOpen()
{
  Plugin::OnUIOpen();
  
  // Invia tutti i parametri alla GUI quando si apre
  for (int i = 0; i < kNumParams; i++) {
    OnParamChange(i);
  }
}

void IntheBox::OnUIClose()
{
  Plugin::OnUIClose();
}

void IntheBox::OnParamChange(int paramIdx)
{
  // Quando un parametro cambia nel DAW, notifica la GUI React
  if (GetUI()) {
    WDL_String json;
    json.SetFormatted(256, 
      "{\"type\":\"paramChange\",\"id\":\"%s\",\"value\":%f}",
      GetParam(paramIdx)->GetName(),
      GetParam(paramIdx)->Value()
    );
    
    GetUI()->GetWebView()->EvaluateJavaScript(json.Get());
  }
}
#endif

void IntheBox::ProcessBlock(sample** inputs, sample** outputs, int nFrames)
{
  const int nChans = NOutChansConnected();
  
  // Leggi i parametri correnti
  mDrive = GetParam(kDrive)->Value();
  mTone = GetParam(kTone)->Value();
  // ... altri parametri
  
  // DSP processing loop
  for (int s = 0; s < nFrames; s++) {
    for (int c = 0; c < nChans; c++) {
      // Qui va il tuo DSP engine
      // Per ora pass-through
      outputs[c][s] = inputs[c][s];
    }
  }
}
```

---

### STEP 4: Configurazione dimensioni in `config.h`

```cpp
// IntheBox config.h
#define PLUG_NAME "IntheBox"
#define PLUG_MFR "IntheBox Audio"
#define PLUG_VERSION_HEX 0x00010000
#define PLUG_VERSION_STR "1.0.0"
#define PLUG_UNIQUE_ID 'ItBx'
#define PLUG_MFR_ID 'ItBA'
#define PLUG_URL_STR "https://www.itbblog.com"
#define PLUG_EMAIL_STR "info@itbblog.com"
#define PLUG_COPYRIGHT_STR "Copyright 2025 IntheBox Audio"
#define PLUG_CLASS_NAME IntheBox

// GUI dimensions - IMPORTANTE!
// La GUI è 600x800 al 100%, ma di default si carica al 75%
// Quindi la finestra del plugin deve essere:
#define PLUG_WIDTH 450   // 600 * 0.75
#define PLUG_HEIGHT 600  // 800 * 0.75

// Oppure se vuoi dimensioni fisse a 100%:
// #define PLUG_WIDTH 600
// #define PLUG_HEIGHT 800

#define PLUG_FPS 60
#define PLUG_SHARED_RESOURCES 0
#define PLUG_HOST_RESIZE 0  // Disabilita resize se vuoi dimensioni fisse

// Formati supportati
#define PLUG_TYPE 0
#define PLUG_DOES_MIDI_IN 0
#define PLUG_DOES_MIDI_OUT 0
#define PLUG_DOES_MPE 0
#define PLUG_DOES_STATE_CHUNKS 1
#define PLUG_HAS_UI 1
#define PLUG_WIDTH_RESIZABLE 0
#define PLUG_HEIGHT_RESIZABLE 0
```

---

### STEP 5: Comunicazione GUI → DSP (React → C++)

Per inviare cambi parametri dalla GUI React al DSP:

#### Nel tuo React (`App.tsx` - già implementato ✅)

```typescript
const notifyDSP = (parameterId: string, value: number | boolean) => {
  if (dsp?.onParameterChange) {
    dsp.onParameterChange(parameterId, value);
  }
  
  // Per iPlug2 WebView, usa questo invece:
  if (window.IPLUG) {
    window.IPLUG.setParameterValue(parameterId, value);
  }
};
```

#### Aggiungi TypeScript types globali

Crea un file `global.d.ts` nel progetto React:

```typescript
// global.d.ts
interface Window {
  IPLUG?: {
    setParameterValue: (id: string, value: number | boolean) => void;
    getParameterValue: (id: string) => number | boolean;
  };
}
```

---

### STEP 6: Build VST3

```bash
cd IntheBox
mkdir build && cd build
cmake ..
make

# Su macOS, questo genera:
# IntheBox/build/VST3/IntheBox.vst3
```

---

## 🔧 Troubleshooting

### Problema: GUI ancora disallineata

**Soluzione:**
1. Verifica che `PLUG_WIDTH` e `PLUG_HEIGHT` siano corretti (450x600 per 75% zoom)
2. Controlla che non ci sia CSS custom nel DAW host
3. Prova a impostare `PLUG_HOST_RESIZE 0` per bloccare resize

### Problema: GUI non si carica

**Soluzione:**
1. Verifica path: `resources/web/index.html` deve esistere
2. Controlla console del WebView per errori JavaScript
3. Assicurati che tutti gli assets siano nella cartella `assets/`

### Problema: Parametri non sincronizzati

**Soluzione:**
1. Implementa `OnParamChange` come mostrato sopra
2. Aggiungi listener JavaScript nella GUI React
3. Verifica che i nomi parametri corrispondano tra C++ e TypeScript

### Problema: VU Meter non si aggiorna

**Soluzione:**
```cpp
// In ProcessBlock, calcola il livello RMS
void IntheBox::ProcessBlock(sample** inputs, sample** outputs, int nFrames)
{
  // ... DSP processing ...
  
  // Calcola livello per VU meter
  double rmsLevel = 0.0;
  for (int s = 0; s < nFrames; s++) {
    double sample = outputs[0][s]; // Canale L
    rmsLevel += sample * sample;
  }
  rmsLevel = sqrt(rmsLevel / nFrames);
  
  // Invia alla GUI (throttled a ~30fps per performance)
  static int frameCounter = 0;
  if (++frameCounter >= 2) {
    frameCounter = 0;
    SendMeterLevel(rmsLevel);
  }
}

void IntheBox::SendMeterLevel(double level)
{
  if (GetUI()) {
    WDL_String js;
    js.SetFormatted(64, "updateVUMeter(%f)", level);
    GetUI()->GetWebView()->EvaluateJavaScript(js.Get());
  }
}
```

---

## ✅ Checklist finale

- [ ] Build React completato (`npm run build`)
- [ ] File copiati in `resources/web/`
- [ ] `config.h` configurato con dimensioni corrette
- [ ] `IntheBox.cpp` implementato con WebView load
- [ ] Parametri inizializzati con valori di default corretti:
  - [ ] Drive = 0%
  - [ ] Tone = 0%
  - [ ] MPC = 0 (16-bit)
  - [ ] Wow = 0%
  - [ ] Noise = 0%
  - [ ] Flutter = 0%
  - [ ] Power = false (STOP)
- [ ] Build VST3 eseguito senza errori
- [ ] Plugin testato in DAW host (Logic, Ableton, Reaper, etc.)

---

## 📚 Risorse utili

- iPlug2 Documentation: https://iplug2.github.io/
- iPlug2 Examples: https://github.com/iPlug2/iPlug2/tree/master/Examples
- WebView API: https://iplug2.github.io/docs/IWebView_8h.html

---

**Progetto:** IntheBox Lo-Fi Tape Saturator  
**Versione GUI:** 1.0.9  
**Framework:** React + iPlug2  
**Dimensioni:** 600x800px (75% default zoom = 450x600px)  
**Data:** 23 Ottobre 2025
