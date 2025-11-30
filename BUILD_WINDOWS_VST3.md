# 🪟 Build VST3 per Windows - Lofi Tape Saturator

## 📋 Requisiti

### Software necessario:
1. **Windows 10/11** (fisico o VM)
2. **Visual Studio 2019 o 2022** (Community Edition gratis)
   - Scarica: https://visualstudio.microsoft.com/downloads/
   - Durante installazione seleziona:
     - ✅ Desktop development with C++
     - ✅ Windows 10 SDK (almeno 10.0.17763.0)

3. **Git for Windows** (opzionale, per clonare il progetto)

---

## 📦 Preparazione File

### Trasferire su Windows:
Copia l'intera cartella `LOFI TAPE` su Windows, mantenendo la struttura:

```
LOFI TAPE/
├── IPlugWebUI/
│   ├── IPlugWebUI.sln          ← File Visual Studio
│   ├── IPlugWebUI.cpp
│   ├── IPlugWebUI.h
│   ├── config.h
│   ├── resources/
│   └── projects/
└── iPlug2/                      ← Framework iPlug2 completo
```

---

## 🔨 Build VST3

### 1. Aprire Visual Studio

- Doppio click su `IPlugWebUI.sln`
- Visual Studio caricherà il progetto

### 2. Configurare Build

**a) Seleziona Configuration:**
- Barra strumenti → Dropdown: **Release** (non Debug)

**b) Seleziona Platform:**
- Barra strumenti → Dropdown: **x64** (per Windows 64-bit)

### 3. Build VST3

**Opzione A - Menu:**
- `Build` → `Build Solution` (o premi `Ctrl+Shift+B`)

**Opzione B - Right-click:**
- Solution Explorer → Right-click su `VST3` → `Build`

### 4. Output Location

Dopo il build, il VST3 sarà in:

```
C:\Program Files\Common Files\VST3\Lofi Tape Saturator.vst3\
```

Oppure nella cartella build locale:
```
LOFI TAPE\IPlugWebUI\build-win\x64\Release\VST3\Lofi Tape Saturator.vst3\
```

---

## 🎯 Configurazioni Build

### Per Universal Binary (x86 + x64):

**Metodo 1 - Build entrambe:**
1. Build configuration: `Release | x64`
2. Cambia platform: `Release | Win32` (x86)
3. Build di nuovo

**Metodo 2 - Batch Configuration Manager:**
1. `Build` → `Configuration Manager`
2. Spunta entrambe le checkbox:
   - ✅ x64 Release
   - ✅ Win32 Release
3. `Build` → `Batch Build`

### Output finale:
- **x64**: `Lofi Tape Saturator.vst3` (64-bit)
- **x86**: `Lofi Tape Saturator.vst3` (32-bit)

---

## ⚙️ Configurazioni Avanzate (Opzionale)

### Modificare le impostazioni di build:

1. **Project Properties** (Right-click su VST3 → Properties):

   **General:**
   - Platform Toolset: `v142` (VS2019) o `v143` (VS2022)
   - Windows SDK Version: Latest installed
   - C++ Language Standard: `C++17`

   **C/C++ → Optimization:**
   - Optimization: `Maximum Optimization (/O2)`
   - Inline Function Expansion: `Any Suitable (/Ob2)`

   **Linker → General:**
   - Enable Incremental Linking: `No`
   - Link Time Code Generation: `Use Link Time Code Generation (/LTCG)`

---

## 🧪 Testing

### In un DAW Windows:

**Ableton Live:**
1. `Options` → `Preferences` → `Plug-Ins`
2. Click `Rescan`
3. Trova "Lofi Tape Saturator" in `Audio Effects` → `VST3`

**FL Studio:**
1. `Options` → `Manage plugins`
2. Click `Find plugins` → `Start scan`
3. Trova in `Plugin database` → `Effects` → `VST3`

**Reaper:**
1. `Options` → `Preferences` → `VST`
2. Click `Re-scan`
3. Trova in `FX browser` → `VST3`

---

## 🔍 Troubleshooting

### "Cannot open include file" errors:

**Soluzione:**
- Verifica che la cartella `iPlug2` sia nella posizione corretta
- Controlla `Project Properties` → `C/C++` → `Additional Include Directories`
- Dovrebbe contenere riferimenti relativi a `../../iPlug2/`

### "Unresolved external symbol" linker errors:

**Soluzione:**
- Verifica che tutte le librerie SDK siano installate
- `Project Properties` → `Linker` → `Input` → verifica le librerie

### VST3 non appare nel DAW:

**Soluzione 1 - Verifica percorso:**
```
C:\Program Files\Common Files\VST3\
```

**Soluzione 2 - Copia manuale:**
- Copia `Lofi Tape Saturator.vst3` nella cartella VST3 del DAW
- Esempio Ableton: `C:\ProgramData\Ableton\Live 11\Resources\`

**Soluzione 3 - Verifica architettura:**
- DAW 64-bit → usa VST3 x64
- DAW 32-bit → usa VST3 x86 (Win32)

---

## 📝 Build dalla Command Line (Avanzato)

Se preferisci build automatizzato:

```batch
:: Apri "Developer Command Prompt for VS 2022"

cd "C:\Path\To\LOFI TAPE\IPlugWebUI"

:: Build x64
msbuild IPlugWebUI.sln /p:Configuration=Release /p:Platform=x64 /t:VST3

:: Build x86 (opzionale)
msbuild IPlugWebUI.sln /p:Configuration=Release /p:Platform=Win32 /t:VST3
```

---

## 📦 Distribuzione

### Per distribuire il plugin:

1. **Copia la cartella completa:**
   ```
   Lofi Tape Saturator.vst3/
   ├── Contents/
   │   ├── x86_64-win/
   │   │   └── Lofi Tape Saturator.vst3
   │   └── Resources/
   │       └── web/
   ```

2. **Zip la cartella**:
   - Nome: `LofiTapeSaturator_v1.0.9_Windows_VST3.zip`

3. **Istruzioni per utenti**:
   ```
   1. Estrai la cartella
   2. Copia "Lofi Tape Saturator.vst3" in:
      C:\Program Files\Common Files\VST3\
   3. Rescan plugins nel tuo DAW
   ```

---

## ✅ Checklist Build Finale

Prima di distribuire, verifica:

- [ ] Build Release (non Debug)
- [ ] x64 per DAW moderni (minimo)
- [ ] x86 se vuoi supportare DAW vecchi
- [ ] Testato in almeno 2 DAW diversi
- [ ] Nessun crash all'apertura/chiusura
- [ ] Tutti i parametri funzionano correttamente
- [ ] Output gain -12dB a +12dB funziona
- [ ] Power switch bypass smooth
- [ ] Web UI si carica correttamente

---

## 🆘 Supporto

**Link utili:**
- iPlug2 Docs: https://iplug2.github.io/
- VST3 SDK: https://steinbergmedia.github.io/vst3_dev_portal/
- Forum iPlug2: https://forum.juce.com/

**Log build errors:**
- Visual Studio → `View` → `Error List`
- Copia errori completi per debug

---

## 🎉 Fine!

Dopo il build, hai il VST3 per Windows pronto per la distribuzione!

**Versioni create:**
- ✅ macOS: Universal Binary (arm64 + x86_64)
- ✅ Windows: x64 (e opzionalmente x86)

**Formati disponibili:**
- macOS: VST3 + AU (Audio Unit)
- Windows: VST3
