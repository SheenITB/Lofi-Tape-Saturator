# 🚀 GUIDA RAPIDA - Build Windows VST3 con Installer

## ✅ Cosa è Stato Configurato

Il progetto ora è completamente configurato per:

1. ✅ **Build automatico** su GitHub Actions per Windows x64
2. ✅ **Creazione installer** professionale con Inno Setup
3. ✅ **Installazione automatica** in FL Studio e altre DAW
4. ✅ **Release automatiche** quando crei un tag version

## 🎯 Come Usarlo

### Metodo 1: Push Normale (Build Automatico)

```bash
# Fai commit delle tue modifiche
git add .
git commit -m "Update plugin"
git push origin main
```

**Risultato:** 
- GitHub Actions builderà automaticamente
- Troverai gli artifacts su GitHub → Actions

### Metodo 2: Creare Release Ufficiale

```bash
# Crea un tag version
git tag v1.0.10
git push origin v1.0.10
```

**Risultato:**
- Build automatico
- Release creata su GitHub
- Installer `.exe` allegato automaticamente
- Pronto per distribuzione pubblica!

## 📥 Dove Scaricare

### Per te (sviluppatore):

**GitHub Actions:**
1. Vai su: https://github.com/[tuo-username]/LOFI-TAPE/actions
2. Clicca sull'ultimo workflow completato (✓)
3. Scarica artifacts:
   - `LofiTapeSaturator-Installer-Windows-x64` → Installer .exe
   - `LofiTapeSaturator-VST3-Windows-x64` → Solo VST3 bundle

### Per utenti finali:

**Releases:**
1. Vai su: https://github.com/[tuo-username]/LOFI-TAPE/releases
2. Scarica `LofiTapeSaturator-*-Windows-x64-Setup.exe`
3. Distribuisci questo file!

## 📦 Cosa Fa l'Installer

L'installer creato automaticamente:

✅ Installa il VST3 in **3 posizioni**:
- `C:\Program Files\Common Files\VST3\` (standard)
- `%AppData%\Image-Line\FL Studio\Plugins\VST3\` (FL Studio)
- `Documents\VST3\` (alternativo)

✅ Rileva automaticamente se FL Studio è installato

✅ Crea collegamenti nel menu Start

✅ Aggiunge voce di disinstallazione in Windows

✅ Verifica che Windows sia 64-bit

✅ Mostra messaggi in Italiano e Inglese

## 📂 File Creati

```
LOFI TAPE/
├── .github/workflows/
│   └── build-windows-installer.yml      ← GitHub Actions workflow
├── installer/
│   └── windows/
│       ├── setup.iss                     ← Script Inno Setup
│       └── README.md                     ← Documentazione tecnica
├── INSTALLAZIONE-WINDOWS.md              ← Guida per utente finale
└── README.md                              ← README principale aggiornato
```

## 🔧 Personalizzazione

### Cambiare Version Number

**File:** [`IPlugWebUI/config.h`](IPlugWebUI/config.h)
```cpp
#define PLUG_VERSION_STR "1.0.10"  // ← Cambia qui
```

**File:** [`installer/windows/setup.iss`](installer/windows/setup.iss)
```inno
#define MyAppVersion "1.0.10"  // ← E qui
```

### Aggiungere Icona

1. Crea/converti un'icona `.ico` (256x256 consigliato)
2. Salva in: `IPlugWebUI/resources/icon.ico`
3. Decommentare in [`setup.iss`](installer/windows/setup.iss):
   ```inno
   SetupIconFile=..\..\IPlugWebUI\resources\icon.ico
   ```

### Modificare Percorsi Installazione

Modifica [`installer/windows/setup.iss`](installer/windows/setup.iss):
```inno
[Files]
; Aggiungi nuovi percorsi qui
Source: "..."; DestDir: "{tua-cartella}"; ...
```

## 🧪 Testare Localmente (Opzionale)

Se vuoi testare il build localmente su Windows:

1. Installa Visual Studio 2019+
2. Apri `IPlugWebUI/Lofi Tape Saturator.sln`
3. Build → Release → x64
4. Installa Inno Setup
5. Compila `installer/windows/setup.iss`

**Ma non è necessario!** GitHub Actions fa tutto automaticamente.

## ⚡ Prima Esecuzione

### Passo 1: Push del Codice

```bash
# Assicurati che tutto sia committato
git add .
git commit -m "Configure Windows installer and GitHub Actions"
git push origin main
```

### Passo 2: Verifica Build

1. Vai su GitHub → **Actions**
2. Dovresti vedere il workflow `Build Windows VST3 Installer` in esecuzione
3. Aspetta ~10-15 minuti per il completamento
4. Se verde (✓), tutto ok!

### Passo 3: Scarica e Testa

1. Clicca sul workflow completato
2. Scarica `LofiTapeSaturator-Installer-Windows-x64`
3. Estrai e testa l'installer su un PC Windows

### Passo 4: Crea Prima Release

Se il test è ok:
```bash
git tag v1.0.9
git push origin v1.0.9
```

Vai su **Releases** e troverai l'installer pronto per la distribuzione!

## 📋 Checklist Distribuzione

Prima di distribuire pubblicamente:

- [ ] Build completato con successo su GitHub Actions
- [ ] Installer testato su almeno un PC Windows
- [ ] Plugin appare correttamente in FL Studio
- [ ] Tutte le funzionalità del plugin funzionano
- [ ] README aggiornato con link corretti
- [ ] Version number aggiornato in tutti i file
- [ ] (Opzionale) Icona personalizzata aggiunta
- [ ] Release creata con tag version
- [ ] Note di release compilate

## 🎉 Fatto!

Il tuo plugin ora può essere:
- ✅ Buildato automaticamente su ogni push
- ✅ Distribuito con installer professionale
- ✅ Installato facilmente dagli utenti in FL Studio
- ✅ Rilasciato con sistema di versioning

## 🆘 Problemi?

### Build fallisce su GitHub

1. Controlla i logs in Actions
2. Verifica che il submodule iPlug2 sia inizializzato
3. Controlla che il file `.sln` sia corretto

### Installer non compila

1. Verifica sintassi in `setup.iss`
2. Controlla che i percorsi relativi siano corretti
3. Guarda i logs di Inno Setup in Actions

### Plugin non funziona dopo installazione

1. Verifica che tutte le risorse web siano copiate
2. Controlla i percorsi delle DLL
3. Testa il VST3 direttamente senza installer

## 📞 Supporto

- 📧 Email: support@itbblog.com
- 🌐 Website: https://www.itbblog.com
- 📖 Docs: [installer/windows/README.md](installer/windows/README.md)

---

**Pronto per fare il push? Vai! 🚀**

```bash
git add .
git commit -m "Add Windows installer configuration"
git push origin main
```
