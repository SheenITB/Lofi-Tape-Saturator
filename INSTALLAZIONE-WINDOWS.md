# 🎵 Lofi Tape Saturator - Installazione Windows

## Download e Installazione Rapida

### 1️⃣ Scarica l'Installer

#### Opzione A: Ultima Build (Automatica)
1. Vai su GitHub → [**Actions**](../../actions)
2. Clicca sull'ultimo workflow verde (✓)
3. Scorri in basso fino a **Artifacts**
4. Scarica `LofiTapeSaturator-Installer-Windows-x64`
5. Estrai il file `.exe` dall'archivio ZIP

#### Opzione B: Release Ufficiale
1. Vai su GitHub → [**Releases**](../../releases)
2. Scarica `LofiTapeSaturator-*-Windows-x64-Setup.exe`

### 2️⃣ Installa il Plugin

1. **Esegui** l'installer scaricato
2. Quando Windows chiede conferma, clicca **"Sì"** (serve i permessi di amministratore)
3. Segui la procedura guidata:
   - Clicca **"Next"**
   - Accetta i termini
   - Conferma l'installazione
4. L'installer copierà automaticamente il plugin nelle cartelle giuste
5. Clicca **"Finish"** quando completato

### 3️⃣ Usa il Plugin in FL Studio

1. **Chiudi completamente** FL Studio (se aperto)
2. **Riavvia** FL Studio
3. Il plugin apparirà automaticamente in:
   - **Mixer** → Slot effetti → Cerca "Lofi Tape Saturator"
   - **Plugin Database** → VST3 → "Lofi Tape Saturator"

## 📍 Dove Viene Installato

L'installer mette il plugin in queste cartelle:

| Cartella | Scopo |
|----------|-------|
| `C:\Program Files\Common Files\VST3\` | 🌟 Standard VST3 (tutte le DAW) |
| `%AppData%\Image-Line\FL Studio\Plugins\VST3\` | 🎹 Specifico per FL Studio |
| `%UserProfile%\Documents\VST3\` | 📂 Alternativo |

## ✅ Requisiti di Sistema

- ✔️ Windows 10 o superiore
- ✔️ Versione a 64-bit (x64)
- ✔️ DAW compatibile VST3:
  - FL Studio 20+
  - Ableton Live 10+
  - Studio One 5+
  - Reaper
  - Cubase/Nuendo
  - Altri...

## ❓ Problemi?

### Il plugin non appare in FL Studio

**Soluzione 1: Verifica percorsi VST**
1. FL Studio → **Options** → **File settings**
2. Controlla che questi percorsi siano inclusi:
   - `C:\Program Files\Common Files\VST3`
   - `%AppData%\Image-Line\FL Studio\Plugins\VST3`
3. Clicca **"Rescan"** se necessario

**Soluzione 2: Riavvio completo**
1. Chiudi **completamente** FL Studio
2. Controlla Task Manager che non ci siano processi FL Studio attivi
3. Riavvia FL Studio

**Soluzione 3: Verifica installazione**
1. Apri Esplora File
2. Vai in `C:\Program Files\Common Files\VST3\`
3. Controlla che esista la cartella `Lofi Tape Saturator.vst3`

### Windows Defender blocca l'installer

Questo è normale per plugin non firmati digitalmente.

**Soluzione:**
1. Clicca **"Maggiori informazioni"**
2. Clicca **"Esegui comunque"**

### Errore "Requires 64-bit Windows"

Il tuo Windows è a 32-bit. Serve Windows 10/11 a 64-bit.

**Verifica:**
1. Tasto destro su **"Questo PC"**
2. **Proprietà**
3. Controlla **"Tipo sistema"**

## 🔄 Aggiornare il Plugin

Per installare una nuova versione:

1. **Non serve disinstallare** la vecchia versione
2. Scarica il nuovo installer
3. Esegui l'installer
4. Sovrascriverà automaticamente la versione precedente

## 🗑️ Disinstallare

### Metodo 1: Programma di disinstallazione
1. **Impostazioni Windows** → **App**
2. Cerca **"Lofi Tape Saturator"**
3. Clicca → **Disinstalla**

### Metodo 2: Manuale
Elimina la cartella:
```
C:\Program Files\Common Files\VST3\Lofi Tape Saturator.vst3
```

## 📞 Supporto

Hai ancora problemi?

- 📧 Email: **support@itbblog.com**
- 🌐 Website: **https://www.itbblog.com**
- 💬 Issues: [GitHub Issues](../../issues)

---

**Made with ❤️ by itbblog** | Version 1.0.9 | Copyright 2025
