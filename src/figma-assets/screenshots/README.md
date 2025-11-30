# 📸 Screenshots

Questa cartella contiene screenshot della GUI IntheBox per reference visivo.

## 🎯 Come Generare Screenshots

### 1. Avvia il Progetto
```bash
cd /path/to/IntheBox
npm run dev
```

### 2. Apri Browser
Naviga a: [http://localhost:5173](http://localhost:5173)

### 3. Screenshot Consigliati

#### GUI Full Size (100%)
- **Resolution**: 600×800px
- **Zoom Browser**: 100%
- **File Name**: `full-gui-100.png`

#### GUI 75% Size
- **Resolution**: 450×600px
- **Zoom Browser**: 100%
- **File Name**: `full-gui-75.png`

#### Componenti Individuali

| Component | Suggested Size | File Name |
|-----------|----------------|-----------|
| Knob | 80×100px | `knob-component.png` |
| VU Meter | 260×80px | `vu-meter.png` |
| Tape Reels | 220×140px | `tape-reels.png` |
| Toggle Switch | 80×60px | `toggle-switch.png` |
| LED Indicator | 30×30px | `led-indicator.png` |
| Screw Detail | 20×20px | `screw-detail.png` |
| Vent Slits | 90×100px | `vent-slits-glowing.png` |
| Logo Badge | 320×50px | `logo-badge.png` |

### 4. Screenshot Methods

#### Method 1: Browser DevTools
1. F12 → Open DevTools
2. `Ctrl+Shift+P` → "Capture node screenshot"
3. Click element to screenshot
4. Save in this folder

#### Method 2: Full Page Screenshot
1. Browser extension (e.g., "Awesome Screenshot")
2. Capture full page or selection
3. Save with descriptive name

#### Method 3: OS Screenshot Tool
- **Windows**: `Win+Shift+S`
- **Mac**: `Cmd+Shift+4`
- **Linux**: `PrtScr` or Flameshot

### 5. Recommended Settings

#### For Best Quality:
- **Format**: PNG (lossless)
- **Resolution**: Native (no upscaling)
- **Background**: Include chassis/panel
- **State**: Show both ON and OFF states

#### Different States to Capture:
1. **Power OFF**: Default startup state
2. **Power ON**: All LEDs lit
3. **High Drive**: Vent slits glowing
4. **Clip Active**: Red LED blinking
5. **Preset Browser Open**: Modal shown
6. **75% vs 100%**: Side-by-side comparison

---

## 📁 Suggested File Structure

```
screenshots/
├── full-gui-75.png              # Full GUI at 75%
├── full-gui-100.png             # Full GUI at 100%
├── full-gui-power-on.png        # GUI with power ON
├── full-gui-high-drive.png      # GUI with glowing vents
├── knob-component.png           # Single knob close-up
├── knob-rotations.png           # Knob at different rotations
├── vu-meter.png                 # VU meter component
├── vu-meter-active.png          # VU meter with needle moving
├── tape-reels.png               # Tape reels stopped
├── tape-reels-spinning.png      # Tape reels in motion
├── toggle-switch-off.png        # Switch OFF state
├── toggle-switch-on.png         # Switch ON state
├── led-power-off.png            # Power LED off
├── led-power-on.png             # Power LED on
├── led-clip-on.png              # Clip LED active
├── screw-detail.png             # Screw close-up
├── vent-slits-off.png           # Vents no glow
├── vent-slits-glowing.png       # Vents with glow effect
├── logo-badge.png               # Main logo badge
├── preset-browser.png           # Preset browser open
└── clipper-panel.png            # Clipper config panel
```

---

## 🎨 Post-Processing (Optional)

### For Documentation:
- Add annotations with arrows/labels
- Highlight specific areas
- Create comparison images (before/after)

### For Figma:
- Keep original resolution
- No compression
- Transparent background (if needed)

### Tools:
- **Figma**: Import directly for tracing
- **Photoshop**: Adjust levels/contrast
- **GIMP**: Free alternative

---

## 📊 Screenshot Checklist

Before sharing screenshots, verify:

- [ ] Resolution is correct (native size)
- [ ] Format is PNG (not JPG)
- [ ] File names are descriptive
- [ ] No sensitive data visible
- [ ] Colors are accurate (no color management issues)
- [ ] Both light and dark states captured (if applicable)
- [ ] Component is centered in frame
- [ ] Adequate padding around component

---

## 🔗 Usage

Screenshots in this folder can be used for:

1. **Design Reference**: Import into Figma for tracing
2. **Documentation**: Add to README or guides
3. **Presentation**: Show design to team/clients
4. **Testing**: Compare renders across browsers
5. **Archive**: Historical record of design iterations

---

## 📝 Notes

- **License**: Screenshots inherit project license (MIT)
- **Attribution**: Credit "IntheBox GUI" if sharing
- **Quality**: Prioritize accuracy over file size
- **Updates**: Re-capture after visual changes

---

**Last Updated**: 2024-10-21  
**Screenshots Status**: 📁 Empty (Add your own!)

*Run `npm run dev` and start capturing!* 📸
