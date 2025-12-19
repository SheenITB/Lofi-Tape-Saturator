# Lofi Tape Saturator

Un plugin VST3 professionale di saturazione tape per Windows e macOS.

Progetto originale Figma: https://www.figma.com/design/bAuCBzhvIeVylT21ynaiTf/LOFI-TAPE

## 📦 Download Installer Windows

### Release Automatiche

Ogni push su `main` e ogni tag version creano automaticamente:
- **VST3 Bundle** per Windows x64
- **Installer .exe** professionale

#### Come Scaricare:

1. **Da GitHub Actions** (build automatici):
   - Vai su [Actions](../../actions)
   - Seleziona l'ultimo workflow completato
   - Scarica `LofiTapeSaturator-Installer-Windows-x64`

2. **Da Releases** (versioni ufficiali):
   - Vai su [Releases](../../releases)
   - Scarica l'installer `.exe` dalla release più recente

### Installazione su Windows

1. Scarica `LofiTapeSaturator-*-Windows-x64-Setup.exe`
2. Esegui come Amministratore
3. Segui la procedura guidata
4. Riavvia FL Studio (o la tua DAW)
5. Il plugin apparirà nei tuoi VST3

L'installer installa automaticamente in:
- `C:\Program Files\Common Files\VST3\` (standard)
- `%AppData%\Image-Line\FL Studio\Plugins\VST3\` (FL Studio)
- `Documents\VST3\` (alternativo)

## 🚀 Build Automatico

### Creare un Build

```bash
# Push automatico
git add .
git commit -m "Update plugin"
git push origin main
```

### Creare una Release

```bash
# Crea tag version
git tag v1.0.10
git push origin v1.0.10
```

Il sistema builderà automaticamente e creerà la release!

## 📁 Struttura Progetto

```
LOFI TAPE/
├── .github/workflows/
│   └── build-windows-installer.yml  # GitHub Actions per build Windows
├── installer/
│   └── windows/
│       ├── setup.iss                # Script Inno Setup
│       └── README.md                # Documentazione installer
├── IPlugWebUI/                      # Codice sorgente plugin
│   ├── config.h                     # Configurazione plugin
│   ├── IPlugWebUI.cpp               # Codice principale
│   └── resources/                   # Risorse (UI web, icone)
└── iPlug2/                          # Framework iPlug2 (submodule)
```

## 🛠️ Sviluppo

### Requisiti

- Visual Studio 2019 o superiore (Windows)
- Xcode (macOS)
- iPlug2 framework (incluso come submodule)

### Setup Locale

```bash
# Clone con submodules
git clone --recurse-submodules <repository-url>

# O se già clonato
git submodule update --init --recursive
```

### Build Manuale

#### Windows:
1. Apri `IPlugWebUI/Lofi Tape Saturator.sln`
2. Seleziona `Release` e `x64`
3. Build → Build Solution

#### macOS:
1. Apri `IPlugWebUI/projects/Lofi Tape Saturator.xcodeproj`
2. Seleziona schema VST3
3. Product → Build

## 📋 Configurazione

### Modificare Informazioni Plugin

Modifica [`IPlugWebUI/config.h`](IPlugWebUI/config.h):

```cpp
#define PLUG_NAME "Lofi Tape Saturator"
#define PLUG_VERSION_STR "1.0.9"
#define PLUG_MFR "itbblog"
```

### Personalizzare UI Web

Le risorse UI sono in [`IPlugWebUI/resources/web/`](IPlugWebUI/resources/web/):

```bash
cd IPlugWebUI/resources/web
npm install
npm run dev      # Development
npm run build    # Production
```

## 📖 Documentazione Completa

- [Windows Installer Guide](installer/windows/README.md) - Guida completa per installer Windows
- [iPlug2 Documentation](iPlug2/Documentation/) - Documentazione framework

## 🐛 Troubleshooting

### Plugin non appare in FL Studio

1. Verifica installazione in `%AppData%\Image-Line\FL Studio\Plugins\VST3\`
2. Riavvia completamente FL Studio
3. Controlla le impostazioni VST in FL Studio
4. Prova a scansionare manualmente i plugin

### Build fallito

- Controlla che il submodule iPlug2 sia inizializzato
- Verifica che VST3 SDK sia presente
- Controlla i log in GitHub Actions

## 📞 Supporto

- Email: support@itbblog.com
- Website: https://www.itbblog.com

## 📄 Licenza

Copyright 2025 itbblog
  