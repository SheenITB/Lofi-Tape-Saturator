# Files Created for Windows x64 Installer Build

## Summary

This configuration enables automatic building of Windows x64 VST3 plugin with professional installer through GitHub Actions.

## Files Created/Modified

### 1. GitHub Actions Workflow
- **File:** `.github/workflows/build-windows-installer.yml`
- **Purpose:** Automated build pipeline for Windows x64
- **What it does:**
  - Builds VST3 plugin for Windows 64-bit
  - Creates professional Windows installer using Inno Setup
  - Uploads artifacts (VST3 + Installer)
  - Creates GitHub releases automatically on version tags

### 2. Inno Setup Script
- **File:** `installer/windows/setup.iss`
- **Purpose:** Installer configuration
- **What it does:**
  - Defines installation paths (Common Files, FL Studio, Documents)
  - Configures installer UI (Italian + English)
  - Handles 64-bit detection
  - Creates uninstaller

### 3. Documentation Files
- **File:** `installer/windows/README.md`
  - Technical documentation for installer
  - Build instructions
  - Customization guide

- **File:** `INSTALLAZIONE-WINDOWS.md`
  - End-user installation guide (Italian)
  - Troubleshooting steps
  - FL Studio specific instructions

- **File:** `START-HERE.md`
  - Quick start guide for developers
  - First-time setup instructions
  - Distribution checklist

- **File:** `README.md` (updated)
  - Main project documentation
  - Links to all guides
  - Build and installation overview

## How to Use

### Automatic Build (on every push)
```bash
git push origin main
```
- Go to GitHub Actions
- Download artifacts from completed workflow

### Create Release (with version tag)
```bash
git tag v1.0.9
git push origin v1.0.9
```
- Installer automatically attached to GitHub Release
- Ready for public distribution

## What Users Get

Users download: `LofiTapeSaturator-1.0.9-Windows-x64-Setup.exe`

The installer:
1. Installs VST3 to 3 locations:
   - `C:\Program Files\Common Files\VST3\`
   - `%AppData%\Image-Line\FL Studio\Plugins\VST3\`
   - `Documents\VST3\`
2. Auto-detects FL Studio
3. Creates Start Menu shortcuts
4. Adds Windows uninstaller entry

## Installation Paths

| Path | Purpose | Auto-detected by |
|------|---------|------------------|
| `C:\Program Files\Common Files\VST3\` | Standard VST3 location | All DAWs |
| `%AppData%\Image-Line\FL Studio\Plugins\VST3\` | FL Studio specific | FL Studio |
| `%UserProfile%\Documents\VST3\` | User folder | Alternative scanners |

## Customization

### Change Version
1. Edit `IPlugWebUI/config.h`: `PLUG_VERSION_STR`
2. Edit `installer/windows/setup.iss`: `MyAppVersion`

### Add Custom Icon
1. Create `IPlugWebUI/resources/icon.ico`
2. Uncomment in `setup.iss`: `SetupIconFile=...`

### Modify Install Locations
Edit `[Files]` section in `setup.iss`

## Build Process Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Developer pushes code to GitHub                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. GitHub Actions starts workflow                          │
│    - Checkout code                                          │
│    - Initialize iPlug2 submodule                            │
│    - Clone VST3 SDK                                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Build VST3 Plugin (Windows x64 Release)                 │
│    - Setup MSBuild + NuGet                                  │
│    - Compile with Visual Studio                             │
│    - Copy web resources into bundle                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Create Installer                                         │
│    - Install Inno Setup                                     │
│    - Compile setup.iss script                               │
│    - Generate .exe installer                                │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Upload Artifacts                                         │
│    - VST3 bundle (for development)                          │
│    - Installer .exe (for distribution)                      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. (If tag) Create GitHub Release                          │
│    - Attach installer to release                            │
│    - Ready for public download                              │
└─────────────────────────────────────────────────────────────┘
```

## Testing Locally (Optional)

Not required - GitHub Actions handles everything!

But if needed:
1. Install Visual Studio 2019+
2. Open `Lofi Tape Saturator.sln`
3. Build → Release → x64
4. Install Inno Setup
5. Compile `setup.iss`

## Requirements

### For GitHub Actions Build:
- None! Everything is automatic

### For End Users:
- Windows 10+ (64-bit)
- VST3-compatible DAW (FL Studio, Ableton, etc.)

## Troubleshooting

### Build fails in Actions
- Check submodule initialization
- Verify .sln file paths
- Review Actions logs

### Installer doesn't compile
- Check setup.iss syntax
- Verify relative paths
- Review Inno Setup logs

### Plugin not found after install
- Check VST3 paths in DAW settings
- Restart DAW completely
- Verify installation in Program Files

## Support

- Email: support@itbblog.com
- Website: https://www.itbblog.com
- Issues: GitHub Issues tab

## Next Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Windows installer"
   git push origin main
   ```

2. **Wait for build** (~10-15 minutes)

3. **Download and test** installer from Actions

4. **Create release:**
   ```bash
   git tag v1.0.9
   git push origin v1.0.9
   ```

5. **Distribute** from GitHub Releases!

---

**Configuration complete! Ready to build. 🚀**
