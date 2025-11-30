# 🚀 GitHub Actions - Auto Build Windows VST3

## ✅ Creato Workflow Automatico!

Il workflow GitHub Actions è configurato per buildare automaticamente il VST3 Windows.

---

## 📋 Setup GitHub (Una Tantum)

### 1. Crea Repository GitHub

```bash
cd "/Users/endrinhysa/Desktop/LOFI TAPE"

# Inizializza git (se non già fatto)
git init

# Aggiungi remote
git remote add origin https://github.com/TUO_USERNAME/lofi-tape-saturator.git

# Crea .gitignore
cat > .gitignore << 'EOF'
# Build folders
build-mac/
build-win/
*.xcworkspace/xcuserdata/
*.xcodeproj/xcuserdata/

# macOS
.DS_Store
*.dSYM

# Visual Studio
*.user
*.suo
*.sdf
*.opensdf
*.obj
*.pdb
*.ilk
*.log
[Dd]ebug/
[Rr]elease/
x64/
x86/
[Bb]in/
[Oo]bj/

# Temporary
*.tmp
*.bak
*~
EOF

# Commit tutto
git add .
git commit -m "Initial commit - Lofi Tape Saturator v1.0.9"

# Push su GitHub
git branch -M main
git push -u origin main
```

---

## 🎯 Come Usare il Workflow

### **Metodo 1: Push Automatico**

Ogni volta che fai push su GitHub, il workflow si attiva automaticamente:

```bash
# Dopo modifiche al codice
git add .
git commit -m "Updated DSP processing"
git push
```

→ GitHub builda automaticamente VST3 x64 e x86!

---

### **Metodo 2: Build Manuale**

1. Vai su GitHub → Repository
2. Tab **"Actions"**
3. Seleziona **"Build VST3 Windows"**
4. Click **"Run workflow"** → **"Run workflow"**
5. Aspetta 5-10 minuti
6. Download artifacts!

---

## 📦 Download VST3 Buildato

### Dopo il build:

1. **Actions Tab** → Click sul workflow completato
2. Scroll giù → sezione **"Artifacts"**
3. Download:
   - `LofiTapeSaturator-VST3-Windows-x64` (64-bit)
   - `LofiTapeSaturator-VST3-Windows-Win32` (32-bit)
   - `LofiTapeSaturator-VST3-Windows-Complete` (Entrambi + istruzioni)

---

## 🔧 Cosa Fa il Workflow

### Build Matrix:
- ✅ **x64** (64-bit) - Windows moderno
- ✅ **Win32** (32-bit) - Windows vecchio/DAW 32-bit

### Steps:
1. Checkout codice
2. Setup MSBuild + Windows SDK
3. Restore NuGet packages
4. Build VST3 (x64 e Win32 in parallelo)
5. Package artifacts
6. Upload per download

### Artifacts Retention:
- Build normali: **30 giorni**
- Package completo: **90 giorni**

---

## 🏷️ Release Automatico (Opzionale)

Per creare release con versioning:

```bash
# Crea tag versione
git tag -a v1.0.9 -m "Release v1.0.9 - First public release"

# Push tag
git push origin v1.0.9
```

→ GitHub crea automaticamente una **Release** con gli ZIP allegati!

---

## ⚙️ Configurazione Repository

### Settings necessari:

1. **Actions** devono essere abilitati:
   - Settings → Actions → General
   - ✅ Allow all actions and reusable workflows

2. **Workflow permissions**:
   - Settings → Actions → General → Workflow permissions
   - ✅ Read and write permissions

---

## 🔍 Monitor Build

### Durante il build puoi vedere:

- **Real-time logs** (click sul workflow in corso)
- **Tempo stimato**: ~5-10 minuti
- **Status**: ✅ Success / ❌ Failed

### Se il build fallisce:

1. Click sul job fallito
2. Espandi lo step con errore
3. Leggi il log completo
4. Fix il problema nel codice
5. Push di nuovo

---

## 💡 Vantaggi

✅ **No Windows necessario** - Build nel cloud  
✅ **Gratis** - GitHub Actions free tier  
✅ **Automatico** - Build ad ogni push  
✅ **Parallel** - x64 e x86 in parallelo  
✅ **Artifacts** - Download immediato VST3  
✅ **Release** - Automatic release con tag  

---

## 📊 Limiti GitHub Free

- **2000 minuti/mese** di build (Windows)
- Ogni build: ~10 minuti
- **~200 builds/mese** disponibili

Per uso normale è più che sufficiente!

---

## 🆘 Troubleshooting

### "Workflow not found"
**Soluzione:** Assicurati di aver fatto push della cartella `.github/workflows/`

### "Build failed - Cannot find solution"
**Soluzione:** Verifica che `IPlugWebUI/IPlugWebUI.sln` esista nel repo

### "MSBuild error"
**Soluzione:** Controlla il log completo, potrebbe mancare qualche file

### "Artifacts not generated"
**Soluzione:** Il build potrebbe essere fallito, controlla il log del job

---

## 🎉 Pronto!

Ora hai:
- ✅ **macOS**: Build locale (Xcode)
- ✅ **Windows**: Build automatico (GitHub Actions)

**Nessun computer Windows necessario!** 🚀

---

## 📝 Quick Commands

```bash
# Setup iniziale
cd "/Users/endrinhysa/Desktop/LOFI TAPE"
git init
git remote add origin https://github.com/USERNAME/REPO.git
git add .
git commit -m "Initial commit"
git push -u origin main

# Dopo modifiche
git add .
git commit -m "Your changes"
git push

# Creare release
git tag -a v1.0.9 -m "Release v1.0.9"
git push origin v1.0.9
```

Ogni push attiva il build automatico Windows! 🎯
