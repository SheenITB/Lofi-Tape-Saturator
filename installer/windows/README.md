# Lofi Tape Saturator - Windows Build & Installer

Questo progetto è configurato per buildare automaticamente il plugin VST3 per Windows x64 e creare un installer professionale tramite GitHub Actions.

## 🚀 Come Funziona

### Build Automatico su GitHub

1. **Push su main branch**: Ogni volta che fai push sul branch `main`, GitHub Actions compilerà automaticamente il plugin e creerà l'installer
2. **Release con tag**: Crea un tag version (es. `v1.0.9`) per creare una release ufficiale con l'installer allegato

### Cosa Viene Creato

1. **VST3 Bundle (x64)**: Il plugin compilato per Windows 64-bit
2. **Installer (.exe)**: Un installer professionale che installa automaticamente il plugin

## 📦 Struttura Installer

L'installer installa il plugin in queste posizioni:

1. **`C:\Program Files\Common Files\VST3\`** - Posizione standard per VST3
2. **`%AppData%\Image-Line\FL Studio\Plugins\VST3\`** - Specifica per FL Studio (se rilevato)
3. **`Documents\VST3\`** - Cartella alternativa

## 🔧 Come Usare

### Metodo 1: Push Automatico

```bash
# Fai le tue modifiche
git add .
git commit -m "Update plugin"
git push origin main
```

GitHub Actions builderà automaticamente. Vai su:
- **GitHub** → **Actions** → Seleziona l'ultimo workflow
- Scarica gli artifacts:
  - `LofiTapeSaturator-VST3-Windows-x64` (solo VST3)
  - `LofiTapeSaturator-Installer-Windows-x64` (installer)

### Metodo 2: Creare una Release

```bash
# Crea un tag version
git tag v1.0.9
git push origin v1.0.9
```

L'installer verrà automaticamente allegato alla release su GitHub!

## 📋 Requisiti per l'Utente Finale

### Per Usare l'Installer:
- Windows 10 o superiore (64-bit)
- Privilegi di amministratore
- DAW compatibile VST3 (FL Studio, Ableton, Studio One, ecc.)

### Installazione:
1. Scarica `LofiTapeSaturator-1.0.9-Windows-x64-Setup.exe`
2. Esegui come Amministratore
3. Segui la procedura guidata
4. Riavvia la DAW
5. Il plugin apparirà nella lista dei VST3

## 🛠️ Personalizzazione

### Modificare il Nome del Plugin

Modifica [`IPlugWebUI/config.h`](../IPlugWebUI/config.h):

```cpp
#define PLUG_NAME "Lofi Tape Saturator"
#define PLUG_VERSION_STR "1.0.9"
```

### Modificare l'Installer

Modifica [`installer/windows/setup.iss`](setup.iss):

- Cambia icona: `SetupIconFile=`
- Aggiungi/rimuovi destinazioni di installazione
- Personalizza messaggi in italiano/inglese

### Aggiungere un'Icona

Crea un file `.ico` in `IPlugWebUI/resources/icon.ico` (dimensioni consigliate: 256x256)

## 📊 Workflow GitHub Actions

Il workflow completo ([`.github/workflows/build-windows-installer.yml`](../../.github/workflows/build-windows-installer.yml)) esegue:

1. ✅ Checkout del codice
2. ✅ Inizializzazione submodules (iPlug2)
3. ✅ Clone VST3 SDK
4. ✅ Setup MSBuild e NuGet
5. ✅ Build VST3 x64 Release
6. ✅ Copia risorse web nel bundle
7. ✅ Installazione Inno Setup
8. ✅ Compilazione installer
9. ✅ Upload artifacts
10. ✅ Creazione release automatica (se tag)

## 🐛 Troubleshooting

### L'installer non installa in FL Studio

Verifica che FL Studio sia installato in:
`%AppData%\Image-Line\FL Studio`

### Il plugin non appare nella DAW

1. Controlla che la DAW supporti VST3
2. Verifica i percorsi VST3 nelle impostazioni della DAW:
   - `C:\Program Files\Common Files\VST3\`
   - `Documents\VST3\`
3. Riavvia completamente la DAW
4. Esegui una scansione dei plugin

### Build fallito su GitHub

- Controlla i log in **Actions**
- Verifica che il submodule iPlug2 sia aggiornato
- Assicurati che il file `.sln` sia corretto

## 📞 Supporto

Per problemi o domande:
- Email: support@itbblog.com
- Website: https://www.itbblog.com

## 📄 Licenza

Copyright 2025 itbblog
