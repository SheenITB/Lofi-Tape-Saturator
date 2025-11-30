# 📦 Template Files iPlug2 per IntheBox

Questa cartella contiene i **file template C++** pronti per creare il tuo progetto iPlug2.

---

## 📁 File inclusi

### 1. **IntheBox.h**
Header principale del plugin con:
- Dichiarazione classe `IntheBox`
- Enum parametri (`kParamDrive`, `kParamTone`, etc.)
- Metodi per GUI/DSP communication
- Variabili di stato DSP

### 2. **IntheBox.cpp**
Implementazione del plugin con:
- Inizializzazione parametri (valori default corretti)
- Setup WebView per React GUI
- Comunicazione bidirezionale GUI ↔ DSP
- ProcessBlock (DSP engine placeholder)
- VU Meter updates

### 3. **config.h**
Configurazione plugin con:
- Nome, versione, manufacturer
- Dimensioni finestra (450x600px per 75% zoom)
- Formati supportati (VST3, AU, AAX)
- Channel I/O configuration

### 4. **SETUP_GUIDE.md**
Guida completa step-by-step per:
- Installazione prerequisiti (Xcode, CMake, iPlug2)
- Creazione progetto da zero
- Build e installazione VST3
- Troubleshooting comuni

---

## 🚀 Come usare questi file

### STEP 1: Crea il progetto iPlug2

```bash
# Scarica iPlug2
cd ~/Documents
git clone https://github.com/iPlug2/iPlug2.git --recursive

# Crea cartella progetto
mkdir -p ~/Desktop/IntheBox
cd ~/Desktop/IntheBox
mkdir -p resources/web
```

### STEP 2: Copia i template

```bash
# Copia i file C++ (da questo progetto Figma Make)
cp IntheBox.h ~/Desktop/IntheBox/
cp IntheBox.cpp ~/Desktop/IntheBox/
cp config.h ~/Desktop/IntheBox/
```

### STEP 3: Copia il build React

```bash
# Dalla root del progetto React
npm run build

# Copia nella cartella iPlug2
cp -r build/* ~/Desktop/IntheBox/resources/web/
```

### STEP 4: Crea CMakeLists.txt

Vedi esempio completo in **SETUP_GUIDE.md**

### STEP 5: Build

```bash
cd ~/Desktop/IntheBox
mkdir build && cd build
cmake ..
make
```

---

## 🎛️ Valori di default parametri

Come richiesto, il plugin si apre con:

- **Drive:** 0%
- **Tone:** 0%
- **MPC:** 0 (16-bit)
- **Wow:** 0%
- **Noise:** 0%
- **Flutter:** 0%
- **Power:** OFF (STOP)
- **Resampler:** 100kHz
- **LowPass:** 100kHz
- **DryWet:** 50%

Questi valori sono configurati in `IntheBox.cpp` nel costruttore.

---

## 🔗 Comunicazione GUI ↔ DSP

### Da React a iPlug2 (GUI → DSP)

```typescript
// In App.tsx
if (window.IPLUG) {
  window.IPLUG.setParameterValue('Drive', 50.0);
}
```

### Da iPlug2 a React (DSP → GUI)

```cpp
// In IntheBox.cpp
void IntheBox::OnParamChange(int paramIdx) {
  // Invia a React
  GetUI()->GetWebView()->EvaluateJavaScript(
    "window.updateParameter('Drive', 50.0)"
  );
}
```

---

## ⚠️ Note importanti

1. **Dimensioni finestra:**
   - React GUI: 600x800px (100%)
   - VST window: 450x600px (75% zoom di default)
   - Configurato in `config.h` con `PLUG_WIDTH` e `PLUG_HEIGHT`

2. **Path WebView:**
   - Il file HTML deve essere in `resources/web/index.html`
   - Il path in C++ è `"web/index.html"` (relativo a resources)

3. **Build React:**
   - Ricordati di rifare `npm run build` ogni volta che modifichi la GUI
   - Poi ricopia in `resources/web/`

4. **DSP Placeholder:**
   - Il metodo `ProcessBlock()` è un pass-through
   - Implementa qui il tuo algoritmo di tape saturation

---

## 📚 Prossimi step

1. Leggi **SETUP_GUIDE.md** per setup completo
2. Segui **VST_HOST_INTEGRATION.md** per integrazione
3. Implementa il DSP engine in `ProcessBlock()`
4. Testa nel tuo DAW preferito

---

## ✅ Checklist

- [ ] File template copiati nel progetto iPlug2
- [ ] Build React copiato in `resources/web/`
- [ ] CMakeLists.txt creato
- [ ] Build completato senza errori
- [ ] VST3 installato e caricato nel DAW
- [ ] GUI React visibile
- [ ] Parametri sincronizzati
- [ ] VU Meter funzionante

---

**Versione:** 1.0.9  
**Data:** 23 Ottobre 2025  
**Framework:** React + iPlug2 WebView
