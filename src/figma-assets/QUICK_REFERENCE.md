# ⚡ Quick Reference - IntheBox Design System

Fast lookup for most common values and specifications.

---

## 🎨 Core Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Wood | `#2a1810` | Chassis shadows |
| Medium Wood | `#3d2817` | Chassis main |
| Light Beige | `#e8d8c0` | Panel highlights |
| Dark Beige | `#c0b090` | Panel shadows |
| Bakelite | `#1a1510` | Knobs, insets |
| Bronze | `#d4a574` | Labels, accents |
| Orange LED | `#ff8800` | Power indicator |
| Red LED | `#ff2200` | Clip indicator |

---

## 📏 Key Dimensions

| Element | Size |
|---------|------|
| GUI (100%) | 600×800px |
| GUI (75%) | 450×600px |
| Chassis | 540×760px |
| Knob (medium) | 60×60px |
| Knob (small) | 50×50px |
| VU Meter | 240×60px |
| Tape Reels | 200×120px |
| LED | 6px diameter |
| Screw | 8px diameter |

---

## 📝 Typography

| Element | Font | Size | Transform |
|---------|------|------|-----------|
| Logo | Georgia | 12px | UPPERCASE |
| Labels | Georgia | 7px | UPPERCASE |
| Values | Monospace | 10px | - |

---

## 🎨 Most Used Gradients

### Wood Chassis
```css
linear-gradient(145deg, #3d2817, #2d1810)
```

### Beige Panel
```css
linear-gradient(145deg, #e8d8c0 0%, #d4c4a8 50%, #c0b090 100%)
```

### Bakelite (Knobs)
```css
linear-gradient(145deg, #2a2218, #1a1510)
```

### Bronze Badge
```css
linear-gradient(180deg, #c8a870, #a88850)
```

---

## 🔧 Spacing

| Name | Value |
|------|-------|
| Gap (small) | 2px |
| Gap (medium) | 8px |
| Gap (large) | 12px |
| Panel padding | 10-16px |

---

## ✨ Effects

### Embossed Text
```css
text-shadow: 
  1px 1px 0 rgba(255,240,200,0.8),
  -1px -1px 0 rgba(0,0,0,0.3);
```

### Glowing Text (On Dark)
```css
text-shadow: 
  0 1px 2px rgba(0,0,0,0.8),
  0 0 6px rgba(212,165,116,0.4);
```

### LED Glow
```css
box-shadow: 0 0 8px #ff8800;
```

---

## 📐 Component Grid

### Knob Grid (4 columns)
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 8px;
```

### Section Grid (2 columns)
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 8px;
```

---

## 🎯 Rotation Values

### Knob Rotation
- **Min**: -140deg (value 0)
- **Max**: +140deg (value 100)
- **Range**: 280deg total

### Rotation Formula
```javascript
rotation = -140 + (value / 100) * 280
```

---

## 🔗 File References

| Need | File |
|------|------|
| All colors | `color-palette.json` |
| All dimensions | `component-specs.md` |
| All gradients | `gradients-reference.md` |
| Typography | `typography.md` |
| Design tokens | `design-tokens.json` |

---

## 💡 Quick Tips

1. **In Figma**: Use Auto Layout with 8px gap
2. **Gradients**: Set angle 145deg for diagonal
3. **Shadows**: Layer multiple box-shadows for depth
4. **Text**: Always uppercase labels with 0.12em spacing
5. **Screws**: Place at corners + midpoints
6. **LEDs**: Use radial gradient + glow shadow

---

**Version**: 1.0.9  
**For Full Specs**: See individual reference files

*This is a quick lookup - refer to detailed docs for complete information.*
