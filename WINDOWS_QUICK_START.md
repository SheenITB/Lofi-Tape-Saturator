# 🪟 Quick Start - Windows Build

## 📦 File da trasferire su Windows

Copia l'intera cartella **"LOFI TAPE"** su Windows mantenendo la struttura completa:

```
LOFI TAPE/
├── IPlugWebUI/               ← Progetto plugin
├── iPlug2/                   ← Framework completo
├── BUILD_WINDOWS_VST3.md     ← Guida dettagliata
└── build_windows_vst3.bat    ← Script automatico
```

---

## ⚡ Build Veloce (3 metodi)

### **Metodo 1 - Script Automatico** (Consigliato)

1. Apri **"Developer Command Prompt for VS 2022"**
2. Naviga alla cartella:
   ```batch
   cd C:\Path\To\LOFI TAPE
   ```
3. Esegui lo script:
   ```batch
   build_windows_vst3.bat
   ```
4. Fatto! Il VST3 sarà in `C:\Program Files\Common Files\VST3\`

---

### **Metodo 2 - Visual Studio GUI**

1. Doppio click su `IPlugWebUI\IPlugWebUI.sln`
2. Seleziona **Release | x64** dalla barra strumenti
3. `Build` → `Build Solution` (o `Ctrl+Shift+B`)
4. Fatto!

---

### **Metodo 3 - Command Line Manuale**

Apri "Developer Command Prompt for VS" e esegui:

```batch
cd C:\Path\To\LOFI TAPE\IPlugWebUI
msbuild IPlugWebUI.sln /p:Configuration=Release /p:Platform=x64 /t:IPlugWebUI-vst3
```

---

## 📍 Dove trovare il VST3 buildato

**Installazione automatica:**
```
C:\Program Files\Common Files\VST3\Lofi Tape Saturator.vst3\
```

**Build folder locale:**
```
LOFI TAPE\IPlugWebUI\build-win\x64\Release\VST3\Lofi Tape Saturator.vst3\
```

---

## ✅ Verifica Build

Dopo il build, verifica che esista:

```
Lofi Tape Saturator.vst3/
└── Contents/
    └── x86_64-win/
        └── Lofi Tape Saturator.vst3  ← Binary 64-bit
```

---

## 🎯 Test in un DAW

### Ableton Live
1. `Options` → `Preferences` → `Plug-Ins`
2. Click **Rescan**
3. Trova "Lofi Tape Saturator" in Audio Effects → VST3

### FL Studio
1. `Options` → `Manage plugins`
2. **Find plugins** → **Start scan**
3. Trova in Plugin database → Effects → VST3

### Reaper
1. `Options` → `Preferences` → `VST`
2. Click **Re-scan**
3. Trova in FX browser → VST3

---

## 🆘 Problemi Comuni

### "MSBuild non trovato"
**Soluzione:** Usa **"Developer Command Prompt for VS"** invece del CMD normale

### "Cannot open include file"
**Soluzione:** Assicurati che la cartella `iPlug2` sia nella posizione corretta

### "VST3 non appare nel DAW"
**Soluzione:** 
1. Verifica che il build sia completato senza errori
2. Controlla che il file esista in `C:\Program Files\Common Files\VST3\`
3. Rescan plugins nel DAW

---

## 📝 Build Options

### Solo x64 (64-bit) - Veloce
```batch
msbuild IPlugWebUI.sln /p:Configuration=Release /p:Platform=x64 /t:IPlugWebUI-vst3
```

### x64 + x86 (Universal) - Completo
```batch
msbuild IPlugWebUI.sln /p:Configuration=Release /p:Platform=x64 /t:IPlugWebUI-vst3
msbuild IPlugWebUI.sln /p:Configuration=Release /p:Platform=Win32 /t:IPlugWebUI-vst3
```

---

## 📚 Documentazione Completa

Per istruzioni dettagliate, troubleshooting avanzato e configurazioni:
→ **Leggi `BUILD_WINDOWS_VST3.md`**

---

## 🎉 Fatto!

Dopo il build hai:
- ✅ **macOS**: VST3 + AU (Universal Binary arm64+x86_64)
- ✅ **Windows**: VST3 x64 (e opzionalmente x86)

Pronto per la distribuzione! 🚀
