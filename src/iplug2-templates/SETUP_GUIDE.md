# 🎛️ Guida Setup iPlug2 per IntheBox

## Prerequisiti

### 1. Installa Xcode (macOS)
```bash
xcode-select --install
```

### 2. Installa CMake
```bash
# Con Homebrew
brew install cmake

# Verifica installazione
cmake --version  # Deve essere >= 3.15
```

### 3. Scarica iPlug2
```bash
cd ~/Documents
git clone https://github.com/iPlug2/iPlug2.git --recursive
cd iPlug2
```

---

## 📦 STEP 1: Crea il progetto IntheBox

### Opzione A: Usando iPlug2 Project Generator (consigliato)

```bash
cd ~/Documents/iPlug2
python3 Scripts/makedist-mac.py IntheBox ~/Desktop/IntheBox
```

Quando richiesto:
- **Plugin Name:** IntheBox
- **Manufacturer:** IntheBox Audio
- **Type:** Effect (VST3)
- **GUI:** WebView

### Opzione B: Setup manuale

```bash
# Crea struttura cartelle
mkdir -p ~/Desktop/IntheBox
cd ~/Desktop/IntheBox

mkdir -p resources/web
mkdir -p resources/img

# Copia i file template da questo progetto Figma Make
# (I file .cpp, .h, config.h che ho creato in /iplug2-templates/)
```

---

## 📋 STEP 2: Copia i file template

### Dal progetto Figma Make → Progetto iPlug2

```bash
# Assumi che il progetto React sia in ~/Desktop/IntheBox-GUI
# E il progetto iPlug2 sia in ~/Desktop/IntheBox

cd ~/Desktop/IntheBox

# Copia i file C++ template
cp ~/Desktop/IntheBox-GUI/iplug2-templates/IntheBox.h ./
cp ~/Desktop/IntheBox-GUI/iplug2-templates/IntheBox.cpp ./
cp ~/Desktop/IntheBox-GUI/iplug2-templates/config.h ./

# Copia il build React
cp -r ~/Desktop/IntheBox-GUI/build/* ./resources/web/
```

---

## 🔧 STEP 3: Crea CMakeLists.txt

Crea il file **`CMakeLists.txt`** nella root del progetto iPlug2:

```cmake
cmake_minimum_required(VERSION 3.15)
project(IntheBox)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Path to iPlug2
set(IPLUG2_ROOT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/../iPlug2" CACHE PATH "iPlug2 root directory")

# Include iPlug2
add_subdirectory(${IPLUG2_ROOT_PATH} ${CMAKE_BINARY_DIR}/iPlug2)

# Plugin sources
set(PLUG_SOURCES
  IntheBox.cpp
  IntheBox.h
  config.h
)

# Create VST3 plugin
iplug_target_add(IntheBox VST3 "${PLUG_SOURCES}")

# Copy resources
add_custom_command(TARGET IntheBox POST_BUILD
  COMMAND ${CMAKE_COMMAND} -E copy_directory
    ${CMAKE_SOURCE_DIR}/resources
    $<TARGET_FILE_DIR:IntheBox>/../Resources
)
```

---

## 🏗️ STEP 4: Build del plugin

```bash
cd ~/Desktop/IntheBox

# Crea cartella build
mkdir build && cd build

# Configura con CMake
cmake ..

# Compila
make

# Il VST3 sarà in:
# ~/Desktop/IntheBox/build/VST3/IntheBox.vst3
```

---

## 📁 Struttura finale del progetto

```
IntheBox/
├── IntheBox.cpp              ← Implementazione DSP
├── IntheBox.h                ← Header
├── config.h                  ← Configurazione plugin
├── CMakeLists.txt            ← Build configuration
├── resources/
│   ├── web/                  ← GUI React buildata
│   │   ├── index.html
│   │   └── assets/
│   │       ├── index-[hash].css
│   │       └── index-[hash].js
│   └── img/
│       └── icon.png          ← Icona plugin (opzionale)
└── build/
    └── VST3/
        └── IntheBox.vst3     ← Plugin finale!
```

---

## 🎯 STEP 5: Installa il plugin

### macOS

```bash
# Copia il VST3 nella cartella di sistema
cp -r ~/Desktop/IntheBox/build/VST3/IntheBox.vst3 \
      ~/Library/Audio/Plug-Ins/VST3/

# Oppure nella cartella locale (per testing)
mkdir -p ~/.vst3
cp -r ~/Desktop/IntheBox/build/VST3/IntheBox.vst3 ~/.vst3/
```

### Riavvia il DAW

Dopo aver copiato il plugin:
1. Chiudi il DAW (Logic, Ableton, Reaper, etc.)
2. Riavvia il DAW
3. Scansiona i nuovi plugin
4. Cerca "IntheBox" nella lista effetti

---

## 🐛 Troubleshooting

### Problema: "cmake: command not found"

```bash
brew install cmake
```

### Problema: "IPLUG2_ROOT_PATH not found"

Modifica `CMakeLists.txt`:
```cmake
set(IPLUG2_ROOT_PATH "/percorso/completo/a/iPlug2")
```

### Problema: GUI non si carica

1. Verifica che `resources/web/index.html` esista
2. Controlla Console.app per errori WebView
3. Verifica path in `IntheBox.cpp`:
   ```cpp
   pGraphics->LoadWebView("web/index.html");
   ```

### Problema: Parametri non sincronizzati

Aggiungi in `App.tsx` (React):
```typescript
// Listener per cambi parametri da iPlug2
window.updateParameter = (name: string, value: number) => {
  console.log(`iPlug2 → React: ${name} = ${value}`);
  // Aggiorna lo stato React
};
```

### Problema: VU Meter non si aggiorna

Aggiungi in `App.tsx`:
```typescript
window.updateVUMeter = (level: number) => {
  setVuLevel(level);
};
```

---

## 🚀 Sviluppo iterativo

### Workflow consigliato:

1. **Modifica GUI React:**
   ```bash
   cd ~/Desktop/IntheBox-GUI
   npm run dev  # Sviluppo con hot-reload
   ```

2. **Quando la GUI è pronta:**
   ```bash
   npm run build
   cp -r build/* ~/Desktop/IntheBox/resources/web/
   ```

3. **Rebuilda il VST3:**
   ```bash
   cd ~/Desktop/IntheBox/build
   make
   cp -r VST3/IntheBox.vst3 ~/Library/Audio/Plug-Ins/VST3/
   ```

4. **Testa nel DAW**

---

## 📚 Risorse

- **iPlug2 Docs:** https://iplug2.github.io/
- **iPlug2 Examples:** https://github.com/iPlug2/iPlug2/tree/master/Examples
- **iPlug2 Forum:** https://forum.cockos.com/forumdisplay.php?f=32

---

## ✅ Checklist Setup

- [ ] Xcode installato
- [ ] CMake installato (>= 3.15)
- [ ] iPlug2 clonato da GitHub
- [ ] Progetto IntheBox creato
- [ ] File template (.cpp, .h, config.h) copiati
- [ ] Build React copiato in `resources/web/`
- [ ] CMakeLists.txt creato
- [ ] Build eseguito con successo
- [ ] VST3 installato in ~/Library/Audio/Plug-Ins/VST3/
- [ ] Plugin caricato nel DAW
- [ ] GUI React visibile nel plugin
- [ ] Parametri sincronizzati GUI ↔ DSP

---

**Data:** 23 Ottobre 2025  
**Versione GUI:** 1.0.9  
**Framework:** React + iPlug2 + WebView
