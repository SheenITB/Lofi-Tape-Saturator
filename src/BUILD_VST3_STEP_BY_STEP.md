# 🚀 BUILD VST3 - GUIDA COMPLETA PASSO-PASSO

**Data:** 23 Ottobre 2025  
**Versione:** 1.0.9  
**Plugin:** IntheBox - Lo-Fi Tape Saturator  
**Stack:** React GUI + iPlug2 VST3

---

## 📋 INDICE

1. [Prerequisiti](#prerequisiti)
2. [Step 1: Build GUI React](#step-1-build-gui-react)
3. [Step 2: Setup Progetto iPlug2](#step-2-setup-progetto-iplug2)
4. [Step 3: Copia File e Risorse](#step-3-copia-file-e-risorse)
5. [Step 4: Build VST3](#step-4-build-vst3)
6. [Step 5: Installazione e Test](#step-5-installazione-e-test)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 PREREQUISITI

### 1. Verifica Xcode Command Line Tools

```bash
# Installa se necessario
xcode-select --install

# Verifica installazione
xcode-select -p
# Deve mostrare: /Applications/Xcode.app/Contents/Developer
# o: /Library/Developer/CommandLineTools
```

### 2. Verifica CMake

```bash
# Controlla se esiste
cmake --version

# Se non esiste, installalo con Homebrew
brew install cmake

# Verifica nuovamente
cmake --version
# Deve essere >= 3.15
```

### 3. Installa iPlug2

```bash
# Vai nella cartella Documents
cd ~/Documents

# Clona iPlug2 (include tutti i submodules)
git clone https://github.com/iPlug2/iPlug2.git --recursive

# Verifica che sia stato clonato correttamente
ls -la ~/Documents/iPlug2
# Dovresti vedere cartelle come: IPlug, IGraphics, Dependencies, Examples, etc.
```

### 4. Verifica Node.js e npm

```bash
# Controlla versione
node --version  # >= 16.x
npm --version   # >= 8.x

# Se non ci sono, installa con Homebrew
brew install node
```

---

## 📦 STEP 1: BUILD GUI REACT

### 1.1 Vai nel progetto React corrente

```bash
# Il progetto React è qui (con lo spazio nel nome)
cd ~/Desktop/"LOFI TAPE "

# Verifica che sei nella cartella giusta
ls -la
# Dovresti vedere: App.tsx, components/, iplug2-templates/, package.json, etc.
```

### 1.2 Installa dipendenze (se non fatto)

```bash
# Installa o aggiorna dipendenze
npm install

# Verifica che non ci siano errori
npm list
```

### 1.3 Build per produzione

```bash
# Build ottimizzato per VST3
npm run build

# Verifica che il build sia stato creato
ls -la build/
# Dovresti vedere: index.html, assets/
```

✅ **Checkpoint:** Il build React è in `~/Desktop/LOFI TAPE /build/`

---

## 🏗️ STEP 2: SETUP PROGETTO IPLUG2

### 2.1 Crea la struttura del progetto

```bash
# Crea progetto IntheBox sul Desktop
mkdir -p ~/Desktop/IntheBox

# Crea cartelle per risorse
mkdir -p ~/Desktop/IntheBox/resources/web
mkdir -p ~/Desktop/IntheBox/resources/img

# Verifica struttura
ls -la ~/Desktop/IntheBox/
```

### 2.2 Verifica file template C++

```bash
# Torna al progetto React
cd ~/Desktop/"LOFI TAPE "

# Verifica che i template ci siano
ls -la iplug2-templates/
# Dovresti vedere: IntheBox.cpp, IntheBox.h, config.h, CMakeLists.txt
```

✅ **Checkpoint:** Progetto iPlug2 creato in `~/Desktop/IntheBox/`

---

## 📝 STEP 3: COPIA FILE E RISORSE

### 3.1 Copia i file C++

```bash
# Assicurati di essere nel progetto React
cd ~/Desktop/"LOFI TAPE "

# Copia i template C++
cp iplug2-templates/IntheBox.cpp ~/Desktop/IntheBox/
cp iplug2-templates/IntheBox.h ~/Desktop/IntheBox/
cp iplug2-templates/config.h ~/Desktop/IntheBox/
cp iplug2-templates/CMakeLists.txt ~/Desktop/IntheBox/

# Verifica che siano stati copiati
ls -la ~/Desktop/IntheBox/
# Dovresti vedere: IntheBox.cpp, IntheBox.h, config.h, CMakeLists.txt
```

### 3.2 Copia il build React

```bash
# Ancora dal progetto React
cd ~/Desktop/"LOFI TAPE "

# Copia TUTTO il contenuto del build React
cp -r build/* ~/Desktop/IntheBox/resources/web/

# Verifica che sia stato copiato
ls -la ~/Desktop/IntheBox/resources/web/
# Dovresti vedere: index.html, assets/
```

### 3.3 Verifica path iPlug2 nel CMakeLists.txt

```bash
# Vai nel progetto iPlug2
cd ~/Desktop/IntheBox

# Mostra il path di iPlug2 nel CMakeLists.txt
grep IPLUG2_ROOT_PATH CMakeLists.txt
# Dovrebbe mostrare: set(IPLUG2_ROOT_PATH "$ENV{HOME}/Documents/iPlug2" ...)

# Verifica che il path esista
ls -la ~/Documents/iPlug2
# Se non esiste, torna al prerequisito 3 e clona iPlug2
```

✅ **Checkpoint:** Tutti i file sono in `~/Desktop/IntheBox/`

```
IntheBox/
├── IntheBox.cpp              ✅
├── IntheBox.h                ✅
├── config.h                  ✅
├── CMakeLists.txt            ✅
└── resources/
    └── web/
        ├── index.html        ✅
        └── assets/           ✅
```

---

## 🔨 STEP 4: BUILD VST3

### 4.1 Configura con CMake

```bash
# Vai nel progetto iPlug2
cd ~/Desktop/IntheBox

# Crea cartella build (se non esiste)
mkdir -p build
cd build

# Configura il progetto con CMake
cmake ..

# ⚠️ CONTROLLA L'OUTPUT!
# Dovresti vedere:
# ✅ "iPlug2 path: /Users/.../Documents/iPlug2"
# ✅ "React GUI found at: .../resources/web/"
# ❌ Se vedi errori, FERMATI e leggi il messaggio
```

**Possibili errori in questa fase:**

- ❌ **"iPlug2 not found"** → Torna al prerequisito 3
- ❌ **"Web resources not found"** → Verifica Step 3.2
- ❌ **"cmake: command not found"** → Torna al prerequisito 2

### 4.2 Compila il VST3

```bash
# Assicurati di essere in ~/Desktop/IntheBox/build
pwd
# Deve mostrare: /Users/.../Desktop/IntheBox/build

# Compila (può richiedere 1-5 minuti)
make

# ⚠️ CONTROLLA L'OUTPUT!
# Dovresti vedere:
# [  25%] Building CXX object ...
# [  50%] Building CXX object ...
# [  75%] Linking CXX shared library ...
# [ 100%] Built target IntheBox
# ✅ Copying resources to plugin bundle...
```

**Possibili errori:**

- ❌ **Errori di compilazione C++** → Controlla che i file .cpp/.h siano corretti
- ❌ **"undefined reference"** → Verifica che iPlug2 sia stato clonato con `--recursive`

### 4.3 Verifica VST3 creato

```bash
# Il VST3 dovrebbe essere qui
ls -la ~/Desktop/IntheBox/build/VST3/

# Dovresti vedere
# IntheBox.vst3/  (è una cartella, non un file!)

# Controlla che la GUI sia stata copiata dentro
ls -la ~/Desktop/IntheBox/build/VST3/IntheBox.vst3/Contents/Resources/web/
# Dovresti vedere: index.html, assets/
```

✅ **Checkpoint:** VST3 compilato in `~/Desktop/IntheBox/build/VST3/IntheBox.vst3`

---

## 🎯 STEP 5: INSTALLAZIONE E TEST

### 5.1 Installa il VST3

```bash
# Copia il VST3 nella cartella di sistema
cp -r ~/Desktop/IntheBox/build/VST3/IntheBox.vst3 \
      ~/Library/Audio/Plug-Ins/VST3/

# Verifica che sia stato installato
ls -la ~/Library/Audio/Plug-Ins/VST3/
# Dovresti vedere: IntheBox.vst3/
```

### 5.2 Test in un DAW

1. **Chiudi** il DAW se è già aperto
2. **Riavvia** il DAW (Logic Pro, Ableton, Reaper, etc.)
3. **Scansiona** i nuovi plugin (dipende dal DAW)
4. **Carica** IntheBox su una traccia audio
5. **Verifica:**
   - ✅ La GUI React si apre
   - ✅ Le manopole sono interattive
   - ✅ Il VU meter si muove
   - ✅ I tape reel girano quando Power = ON
   - ✅ Il plugin elabora l'audio

### 5.3 Test parametri

Nel DAW, prova a:

1. **Muovere le manopole** nella GUI → Dovresti vedere i valori cambiare
2. **Automatizzare** i parametri dal DAW → La GUI dovrebbe aggiornarsi
3. **Salvare un preset** → I valori dovrebbero essere ricordati
4. **Ridimensionare** la GUI (75%, 100%, etc.) → Dovrebbe scalare correttamente

---

## 🐛 TROUBLESHOOTING

### ❌ "GUI non si carica (schermo nero)"

**Causa:** WebView non trova `index.html`

**Soluzione:**

```bash
# Verifica che index.html esista dentro il VST3
ls -la ~/Library/Audio/Plug-Ins/VST3/IntheBox.vst3/Contents/Resources/web/

# Se non c'è, rifai Step 3.2 e 4.2
```

---

### ❌ "Parametri non si muovono dalla GUI"

**Causa:** Comunicazione GUI → DSP non funziona

**Soluzione:** Verifica in `IntheBox.cpp` che ci sia:

```cpp
// Nella OnParamChangeUI()
switch(paramIdx) {
  case kParamDrive:
    mDrive = GetParam(kParamDrive)->Value();
    break;
  // ... etc
}
```

---

### ❌ "VU Meter non si muove"

**Causa:** DSP non invia i livelli alla GUI

**Soluzione:** In `IntheBox.cpp`, verifica che ProcessBlock() chiami:

```cpp
SendMeterLevel(mCurrentLevel);
```

---

### ❌ "Plugin si blocca/crasha"

**Cause possibili:**

1. **WebView non caricata** → Verifica risorse
2. **Errore nel DSP** → Controlla ProcessBlock()
3. **Parametri non inizializzati** → Verifica constructor

**Debug:**

```bash
# Apri Console.app su macOS
# Filtra per "IntheBox"
# Cerca errori mentre apri il plugin
```

---

### ❌ "DAW non trova il plugin"

**Soluzioni:**

```bash
# 1. Verifica che sia nella cartella giusta
ls -la ~/Library/Audio/Plug-Ins/VST3/IntheBox.vst3

# 2. Verifica che sia una cartella .vst3 valida
ls -la ~/Library/Audio/Plug-Ins/VST3/IntheBox.vst3/Contents/

# 3. Forza la scansione:
# - Logic Pro: Logic Pro > Preferences > Plug-In Manager > Reset & Rescan
# - Ableton: Preferences > Plug-Ins > Rescan
# - Reaper: Options > Preferences > VST > Re-scan
```

---

## 🔄 WORKFLOW MODIFICHE FUTURE

Quando modifichi la GUI React:

```bash
# 1. Modifica React
cd ~/Desktop/"LOFI TAPE "
npm run dev  # Sviluppo con hot-reload

# 2. Quando pronto, rebuild
npm run build

# 3. Copia nel progetto iPlug2
cp -r build/* ~/Desktop/IntheBox/resources/web/

# 4. Rebuild VST3
cd ~/Desktop/IntheBox/build
make

# 5. Reinstalla
cp -r VST3/IntheBox.vst3 ~/Library/Audio/Plug-Ins/VST3/

# 6. Testa nel DAW
```

Quando modifichi il DSP (C++):

```bash
# 1. Modifica IntheBox.cpp o IntheBox.h
cd ~/Desktop/IntheBox

# 2. Rebuild
cd build
make

# 3. Reinstalla
cp -r VST3/IntheBox.vst3 ~/Library/Audio/Plug-Ins/VST3/

# 4. Testa nel DAW
```

---

## ✅ CHECKLIST FINALE

Prima di procedere, verifica:

**Prerequisiti:**
- [ ] Xcode Command Line Tools installato
- [ ] CMake >= 3.15 installato
- [ ] iPlug2 clonato in `~/Documents/iPlug2`
- [ ] Node.js e npm installati

**Build React:**
- [ ] `npm install` eseguito
- [ ] `npm run build` completato
- [ ] `build/index.html` esiste

**Setup iPlug2:**
- [ ] Cartella `~/Desktop/IntheBox/` creata
- [ ] File C++ copiati (IntheBox.cpp, .h, config.h, CMakeLists.txt)
- [ ] Build React copiato in `resources/web/`
- [ ] `resources/web/index.html` esiste

**Build VST3:**
- [ ] `cmake ..` completato senza errori
- [ ] `make` completato senza errori
- [ ] `build/VST3/IntheBox.vst3/` esiste
- [ ] `build/VST3/IntheBox.vst3/Contents/Resources/web/` contiene la GUI

**Installazione:**
- [ ] VST3 copiato in `~/Library/Audio/Plug-Ins/VST3/`
- [ ] DAW riavviato
- [ ] Plugin caricato senza errori
- [ ] GUI visibile
- [ ] Parametri funzionanti

---

## 📞 AIUTO

Se riscontri problemi non elencati qui:

1. **Controlla Console.app** su macOS per errori
2. **Cerca su iPlug2 Forum:** https://forum.cockos.com/forumdisplay.php?f=32
3. **Verifica esempi iPlug2:** `~/Documents/iPlug2/Examples/`

---

**Buona fortuna con il build! 🎛️🚀**
