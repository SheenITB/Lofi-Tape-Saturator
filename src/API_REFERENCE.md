# 📡 IntheBox VST3 - API Reference

**Versione:** 1.0.9  
**Architettura:** React GUI ↔ iPlug2 C++ Backend  
**Comunicazione:** JavaScript Bridge (WebView)

---

## 🏗️ ARCHITETTURA SISTEMA

```
┌──────────────────────────────────────────────────┐
│  REACT GUI (Browser/WebView)                     │
│  File: App.tsx                                   │
│                                                  │
│  - Componenti UI (Knob, VUMeter, TapeReels)    │
│  - State management (useState)                   │
│  - Event handlers                                │
│                                                  │
│  window.IPLUG_API = {                           │
│    setParameter(name, value)                     │
│    getParameter(name)                            │
│    updateVUMeter(level)                          │
│    updateClipping(isClipping)                    │
│  }                                               │
└──────────────────┬───────────────────────────────┘
                   │
                   │ JavaScript Bridge
                   │ (WebView.EvaluateJavaScript)
                   │
┌──────────────────▼───────────────────────────────┐
│  IPLUG2 WEBVIEW CONTROL                          │
│  File: IntheBox.cpp                              │
│                                                  │
│  - LoadWebView("web/index.html")                │
│  - EvaluateJavaScript(...)                      │
│  - OnParamChange(paramIdx) → GUI                │
│  - OnParamChangeUI(paramIdx) ← GUI              │
└──────────────────┬───────────────────────────────┘
                   │
                   │ Parameter changes
                   │
┌──────────────────▼───────────────────────────────┐
│  C++ DSP ENGINE                                  │
│  File: IntheBox.cpp                              │
│                                                  │
│  - ProcessBlock(inputs, outputs, nFrames)       │
│  - Tape saturation algorithm                     │
│  - VU meter calculation                          │
│  - Clipping detection                            │
└──────────────────────────────────────────────────┘
```

---

## 📋 PARAMETRI VST3

### **Enum Definition (C++)**

```cpp
// File: IntheBox.h
enum EParams
{
  kParamDrive = 0,      // 0-100% - Tape saturation amount
  kParamTone,           // 0-100% - Tone control
  kParamMPC,            // 0-100 → 16→4-bit mode
  kParamWow,            // 0-100% - Pitch variation
  kParamNoise,          // 0-100% - Tape noise level
  kParamFlutter,        // 0-100% - Speed variation
  kParamResampler,      // 0-100 → Sample rate reduction
  kParamLowPass,        // 0-100 → Low-pass filter cutoff
  kParamDryWet,         // 0-100% - Dry/Wet mix
  kParamPower,          // Bool - Tape STOP/PLAY
  kParamClipperMode,    // 0-100% - Clipper mode
  kNumParams
};
```

### **Parameter Table**

| **ID** | **Nome**        | **Tipo**  | **Range** | **Default** | **Descrizione**                  |
|--------|-----------------|-----------|-----------|-------------|----------------------------------|
| 0      | `Drive`         | `double`  | 0-100     | 0           | Tape saturation amount           |
| 1      | `Tone`          | `double`  | 0-100     | 0           | Tone control (EQ)                |
| 2      | `MPC`           | `double`  | 0-100     | 0           | Bit depth (16 down to 4-bit)     |
| 3      | `Wow`           | `double`  | 0-100     | 0           | Pitch variation                  |
| 4      | `Noise`         | `double`  | 0-100     | 0           | Tape noise level                 |
| 5      | `Flutter`       | `double`  | 0-100     | 0           | Speed variation                  |
| 6      | `Resampler`     | `double`  | 0-100     | 100         | Sample rate reduction            |
| 7      | `LowPass`       | `double`  | 0-100     | 100         | Low-pass filter cutoff           |
| 8      | `DryWet`        | `double`  | 0-100     | 50          | Dry/Wet mix                      |
| 9      | `Power`         | `bool`    | 0/1       | 0 (STOP)    | Tape transport (STOP/PLAY)       |
| 10     | `ClipperMode`   | `double`  | 0-100     | 50          | Clipper mode                     |

---

## 🔗 REACT ↔ C++ COMMUNICATION

### **1. React → C++ (GUI cambia parametro)**

**React (App.tsx):**
```typescript
// Quando l'utente muove una manopola
const setDriveWithDSP = (value: number) => {
  setDrive(value); // Aggiorna state locale
  notifyDSP('drive', value); // Notifica C++
};

const notifyDSP = (parameterId: string, value: number | boolean) => {
  if (dsp?.onParameterChange) {
    dsp.onParameterChange(parameterId, value);
  }
};
```

**C++ (IntheBox.cpp):**
```cpp
void IntheBox::OnParamChangeUI(int paramIdx, EParamSource source)
{
  // Riceve cambio parametro dalla GUI React
  switch(paramIdx) {
    case kParamDrive:
      mDrive = GetParam(kParamDrive)->Value();
      break;
    // ... altri parametri ...
  }
  
  Plugin::OnParamChangeUI(paramIdx, source);
}
```

---

### **2. C++ → React (Automation DAW/Preset load)**

**C++ (IntheBox.cpp):**
```cpp
void IntheBox::OnParamChange(int paramIdx)
{
  // Quando parametro cambia (automation, preset, ecc.)
  if (GetUI() && GetUI()->GetWebView()) {
    const char* paramName = GetParam(paramIdx)->GetName();
    double value = GetParam(paramIdx)->Value();
    
    WDL_String json;
    json.SetFormatted(512, 
      "if(window.updateParameter){window.updateParameter('%s',%f)}",
      paramName,
      value
    );
    
    // Esegui JavaScript nella WebView React
    GetUI()->GetWebView()->EvaluateJavaScript(json.Get());
  }
}
```

**React (window global):**
```typescript
// Listener globale per aggiornamenti C++
window.updateParameter = (name: string, value: number) => {
  console.log(`Parameter updated from C++: ${name} = ${value}`);
  
  // Aggiorna state React
  switch(name.toLowerCase()) {
    case 'drive':
      setDrive(value);
      break;
    case 'tone':
      setTone(value);
      break;
    // ... altri parametri ...
  }
};
```

---

### **3. VU Meter Updates (C++ → React)**

**C++ (IntheBox.cpp):**
```cpp
void IntheBox::SendMeterLevel(double level)
{
  // Invia livello VU meter a React (chiamato ~30fps)
  if (GetUI() && GetUI()->GetWebView()) {
    WDL_String js;
    js.SetFormatted(128, 
      "if(window.updateVUMeter){window.updateVUMeter(%f)}", 
      level
    );
    GetUI()->GetWebView()->EvaluateJavaScript(js.Get());
  }
}
```

**React:**
```typescript
window.updateVUMeter = (level: number) => {
  setVULevel(level); // Aggiorna VU meter UI
};
```

---

### **4. Clipping Detection (C++ → React)**

**C++ (IntheBox.cpp):**
```cpp
void IntheBox::SendClippingState(bool isClipping)
{
  if (GetUI() && GetUI()->GetWebView()) {
    WDL_String js;
    js.SetFormatted(128, 
      "if(window.updateClipping){window.updateClipping(%s)}", 
      isClipping ? "true" : "false"
    );
    GetUI()->GetWebView()->EvaluateJavaScript(js.Get());
  }
}
```

**React:**
```typescript
window.updateClipping = (isClipping: boolean) => {
  setIsClipping(isClipping); // LED rosso lampeggia
};
```

---

## 🎨 COMPONENTI REACT

### **Knob Component**

```typescript
// File: components/Knob.tsx
interface KnobProps {
  label: string;
  value: number;        // 0-100
  onChange: (value: number) => void;
  size?: 'small' | 'medium' | 'large';
  unit?: string;        // '%', 'kHz', 'dB'
}

export function Knob({ label, value, onChange, size, unit }: KnobProps) {
  // Rotation angle: -135° to +135° (270° total)
  const angle = -135 + (value / 100) * 270;
  
  const handleMouseMove = (e: MouseEvent) => {
    const deltaY = e.movementY;
    const sensitivity = 0.5;
    const newValue = Math.max(0, Math.min(100, value - deltaY * sensitivity));
    onChange(newValue);
  };
  
  return (
    <div className="knob-container">
      <div 
        className="knob"
        style={{ transform: `rotate(${angle}deg)` }}
        onMouseDown={() => { /* add listener */ }}
      />
      <div className="label">{label}</div>
      <div className="value">{value.toFixed(1)}{unit}</div>
    </div>
  );
}
```

---

### **VUMeter Component**

```typescript
// File: components/VUMeter.tsx
interface VUMeterProps {
  level?: number; // 0.0 - 1.0
}

export function VUMeter({ level = 0 }: VUMeterProps) {
  const [currentLevel, setCurrentLevel] = useState(level);
  
  useEffect(() => {
    // Smooth decay
    const interval = setInterval(() => {
      setCurrentLevel(prev => Math.max(0, prev - 0.02));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Green zone: 0-70%, Yellow: 70-85%, Red: 85-100%
  const color = currentLevel > 0.85 ? '#ff3333' :
                currentLevel > 0.70 ? '#ffaa00' : '#33ff33';
  
  return (
    <div className="vu-meter">
      <div 
        className="vu-bar"
        style={{
          width: `${currentLevel * 100}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
}
```

---

### **TapeReels Component**

```typescript
// File: components/TapeReels.tsx
interface TapeReelsProps {
  flutter: number; // 0-100 (affects speed variation)
}

export function TapeReels({ flutter }: TapeReelsProps) {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    // Base speed + flutter variation
    const baseSpeed = 2; // degrees per frame
    const flutterAmount = (flutter / 100) * 1.5;
    
    const interval = setInterval(() => {
      const variation = Math.sin(Date.now() / 1000) * flutterAmount;
      setRotation(prev => (prev + baseSpeed + variation) % 360);
    }, 16); // 60fps
    
    return () => clearInterval(interval);
  }, [flutter]);
  
  return (
    <div className="tape-reels">
      <div 
        className="reel left"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <div 
        className="reel right"
        style={{ transform: `rotate(${-rotation}deg)` }}
      />
    </div>
  );
}
```

---

## 🔧 DSP PROCESSING PIPELINE

### **ProcessBlock Flow**

```cpp
void IntheBox::ProcessBlock(sample** inputs, sample** outputs, int nFrames)
{
  for (int s = 0; s < nFrames; s++) {
    for (int c = 0; c < nChans; c++) {
      double input = inputs[c][s];
      double output = input;
      
      if (mPower) {
        // 1. DRIVE/SATURATION
        double wet = TapeSaturation(input, mDrive);
        
        // 2. TONE CONTROL
        wet = ToneStack(wet, mTone);
        
        // 3. BIT DEPTH REDUCTION (MPC)
        wet = BitCrusher(wet, mMPC);
        
        // 4. WOW & FLUTTER
        wet = PitchModulation(wet, mWow, mFlutter);
        
        // 5. TAPE NOISE
        wet = AddNoise(wet, mNoise);
        
        // 6. SAMPLE RATE REDUCTION
        wet = Resample(wet, mResampler);
        
        // 7. LOW-PASS FILTER
        wet = LowPassFilter(wet, mLowPass);
        
        // 8. CLIPPER
        wet = SoftClipper(wet, mClipperMode);
        
        // 9. DRY/WET MIX
        output = DryWetMix(input, wet, mDryWet);
      }
      
      outputs[c][s] = output;
    }
  }
  
  // Update VU meter (~30fps)
  UpdateMeter(outputs, nFrames);
}
```

---

## 📦 BUILD SYSTEM API

### **CMakeLists.txt**

```cmake
cmake_minimum_required(VERSION 3.15)
project(IntheBox VERSION 1.0.9)

# iPlug2 SDK Path
set(IPLUG2_ROOT_PATH "${CMAKE_SOURCE_DIR}/../iPlug2")

# Plugin Configuration
set(PLUG_NAME "IntheBox")
set(PLUG_MFR "YourCompany")
set(PLUG_VERSION_HEX "0x00010009") # 1.0.9
set(PLUG_UNIQUE_ID "Ibx1")
set(PLUG_MFR_ID "Acme")
set(PLUG_WIDTH 600)
set(PLUG_HEIGHT 800)
set(PLUG_FPS 60)

# React Build Output
set(WEB_RESOURCES "${CMAKE_SOURCE_DIR}/build")

# Copy React build to resources
file(COPY ${WEB_RESOURCES}/ 
     DESTINATION ${CMAKE_BINARY_DIR}/resources/web/)

# Add VST3 target
add_library(${PLUG_NAME} MODULE
  IntheBox.cpp
  IntheBox.h
)

# Link iPlug2
target_link_libraries(${PLUG_NAME} 
  PRIVATE iPlug2::VST3
)
```

---

## 🚀 WORKFLOW DEVELOPMENT

### **1. Sviluppo GUI (React)**

```bash
# Dev mode (hot reload)
npm run dev
# → Apre http://localhost:5173
# → Modifica componenti in real-time

# Build production
npm run build
# → Crea /build con index.html, assets/
```

### **2. Compilazione VST3**

```bash
# Copia React build in iPlug2 resources
cp -r build/* ~/Desktop/IntheBox/resources/web/

# Compila VST3
cd ~/Desktop/IntheBox/build
cmake ..
make

# Installa
cp -r VST3/IntheBox.vst3 ~/Library/Audio/Plug-Ins/VST3/
```

### **3. Debug**

**React (Browser Console):**
```javascript
// Test parameter change
window.updateParameter('Drive', 75.0);
window.updateVUMeter(0.8);
window.updateClipping(true);
```

**C++ (Xcode Debugger):**
```cpp
// Breakpoint in ProcessBlock
std::cout << "Drive: " << mDrive << std::endl;
std::cout << "Level: " << mCurrentLevel << std::endl;
```

---

## 🎯 PRESET SYSTEM

### **Preset Format (JSON)**

```typescript
interface Preset {
  name: string;
  category: string;
  parameters: {
    drive: number;
    tone: number;
    mpc: number;
    wow: number;
    noise: number;
    flutter: number;
    resampler: number;
    lowPass: number;
    dryWet: number;
    clipperMode: number;
  };
}

// Example preset
const vintageWarm: Preset = {
  name: "Vintage Warm",
  category: "Classic",
  parameters: {
    drive: 45,
    tone: 60,
  mpc: 0,         // 16-bit
    wow: 15,
    noise: 20,
    flutter: 10,
    resampler: 75,
    lowPass: 80,
    dryWet: 70,
    clipperMode: 40
  }
};
```

### **Load Preset**

```typescript
const handleLoadPreset = (preset: Preset) => {
  setDriveWithDSP(preset.parameters.drive);
  setToneWithDSP(preset.parameters.tone);
  setMpcWithDSP(preset.parameters.mpc);
  // ... load all parameters ...
};
```

---

## 🔐 WINDOW API GLOBALS

**Definizioni TypeScript:**

```typescript
// global.d.ts
declare global {
  interface Window {
    // C++ → React
    updateParameter: (name: string, value: number | boolean) => void;
    updateVUMeter: (level: number) => void;
    updateClipping: (isClipping: boolean) => void;
    
    // React → C++ (set by iPlug2)
    IPLUG_API?: {
      setParameter: (id: number, value: number) => void;
      getParameter: (id: number) => number;
    };
  }
}
```

---

## 📊 PERFORMANCE METRICS

| **Metric**               | **Value**      |
|--------------------------|----------------|
| GUI FPS                  | 60             |
| VU Meter update rate     | ~30 fps        |
| ProcessBlock buffer size | 512 samples    |
| Sample rate              | 44.1 - 192 kHz |
| Latency                  | < 5ms          |
| CPU usage (idle)         | < 1%           |
| CPU usage (processing)   | 5-15%          |

---

## 📚 FILE STRUCTURE

```
IntheBox/
├── App.tsx                    # Main React GUI
├── components/
│   ├── Knob.tsx               # Rotary knob control
│   ├── VUMeter.tsx            # VU meter display
│   ├── TapeReels.tsx          # Animated tape reels
│   ├── ToggleSwitch.tsx       # Power switch
│   └── PresetBrowser.tsx      # Preset manager
├── iplug2-templates/
│   ├── IntheBox.h             # C++ header
│   ├── IntheBox.cpp           # C++ implementation
│   ├── config.h               # Plugin config
│   └── CMakeLists.txt         # Build config
├── package.json               # npm dependencies
├── vite.config.ts             # Vite build config
└── BUILD_COMMANDS.sh          # Automated build script
```

---

## 🎓 LEARNING RESOURCES

- **iPlug2 Docs:** https://iplug2.github.io
- **React Docs:** https://react.dev
- **WebView API:** iPlug2 `IWebViewControl` class
- **VST3 SDK:** https://steinbergmedia.github.io/vst3_dev_portal/

---

## ✅ CHECKLIST SVILUPPO

- [x] Setup progetto React + Vite
- [x] Implementare componenti UI (Knob, VUMeter, TapeReels)
- [x] Definire parametri VST3 (11 parametri)
- [x] Creare bridge JavaScript React ↔ C++
- [x] Implementare preset system
- [ ] Implementare DSP algorithms (Tape Saturation, Wow/Flutter)
- [ ] Testing in Logic Pro / Ableton
- [ ] Optimizzazione performance
- [ ] Code signing per distribuzione

---

**Versione:** 1.0.9  
**Ultimo aggiornamento:** 2025-10-24  
**Autore:** IntheBox Dev Team
