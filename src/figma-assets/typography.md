# 📝 Typography Specifications

Complete typography system used in IntheBox GUI.

---

## 🎨 Font Families

### Primary: Georgia (Serif)
```css
font-family: Georgia, serif;
```
**Usage**: Logo, titles, labels, vintage text  
**Characteristics**: Classic serif, elegant, vintage feel  
**Fallback**: System serif font

**Where Used**:
- Main logo text
- Section labels (PREAMP, TAPE DECK, DRIVE, etc.)
- Knob labels
- Badge text
- Indicator labels (POWER, CLIP)

---

### Secondary: Arial (Sans-Serif)
```css
font-family: Arial, sans-serif;
```
**Usage**: Small descriptions, helper text  
**Characteristics**: Clean, readable  
**Fallback**: System sans-serif

**Where Used**:
- Clipper mode descriptions
- VU meter scale markings
- Small instructional text

---

### Monospace (Value Display)
```css
font-family: monospace;
```
**Usage**: Knob value displays  
**Characteristics**: Fixed-width, technical look  
**Note**: System monospace font

**Where Used**:
- Knob numeric displays (0-100%, Hz, bit depth)

---

## 📏 Font Sizes

### Logo & Titles

#### Main Logo Text
```css
font-size: 12px;
font-weight: bold;
letter-spacing: 0.12em;
```
**Text**: "LO-FI TAPE SATURATOR"  
**Case**: UPPERCASE  
**Color**: #3a2010  
**Shadow**: Multi-layer for embossed effect

---

#### Sub Logo Text
```css
font-size: 6px;
letter-spacing: 0.18em;
```
**Text**: "★ ANALOG WARMTH PROCESSOR ★"  
**Case**: UPPERCASE  
**Color**: #5a3820  
**Shadow**: Subtle light shadow

---

### Labels

#### Section Labels
```css
font-size: 7px;
font-weight: normal;
letter-spacing: 0.12em;
text-transform: uppercase;
```
**Examples**: "PREAMP", "TAPE DECK", "DRIVE"  
**Color**: #d4a574 (bronze on dark) or #5a3820 (dark on light)  
**Shadow**: Glow effect on dark backgrounds

---

#### Knob Labels
```css
font-size: 7px;
letter-spacing: 0.12em;
text-transform: uppercase;
```
**Examples**: "Tone", "Drive", "Flutter"  
**Color**: #5a3820  
**Shadow**: Subtle light shadow

---

#### Small Labels
```css
font-size: 6px;
letter-spacing: 0.12em;
```
**Examples**: "POWER", "CLIP", "Since 2024"  
**Color**: Varies (bronze/brown tones)

---

### Values & Numbers

#### Knob Value Display
```css
font-size: 10px;
font-weight: bold;
font-family: monospace;
```
**Examples**: "50%", "24bit", "12kHz"  
**Color**: #3a2010  
**Background**: rgba(200,180,160,0.3)  
**Padding**: 2px 6px

---

#### Small Values
```css
font-size: 8px;
font-family: Georgia, serif;
```
**Examples**: "VST3", brand name  
**Color**: #4a2818

---

## 🎨 Text Styles

### Logo Style (Main)
```css
.logo-main {
  font-family: Georgia, serif;
  font-size: 12px;
  font-weight: bold;
  color: #3a2010;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: 
    1px 1px 0px rgba(255,240,200,0.8),
    -1px -1px 0px rgba(0,0,0,0.3),
    1px 2px 3px rgba(0,0,0,0.3);
}
```
**Effect**: Embossed, raised appearance

---

### Logo Style (Subtitle)
```css
.logo-subtitle {
  font-family: Georgia, serif;
  font-size: 6px;
  color: #5a3820;
  letter-spacing: 0.18em;
  text-shadow: 1px 1px 0px rgba(255,240,200,0.6);
}
```
**Effect**: Subtle emboss

---

### Section Label (On Dark)
```css
.section-label-dark {
  font-family: Georgia, serif;
  font-size: 7px;
  color: #d4a574;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: 
    0 1px 2px rgba(0,0,0,0.8),
    0 0 6px rgba(212,165,116,0.4);
}
```
**Effect**: Glowing bronze text on dark background

---

### Knob Label (On Light)
```css
.knob-label {
  font-family: Georgia, serif;
  font-size: 7px;
  color: #5a3820;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: 0 1px 1px rgba(255,240,220,0.5);
}
```
**Effect**: Subtle shadow on beige panel

---

### Value Display
```css
.value-display {
  font-family: monospace;
  font-size: 10px;
  font-weight: bold;
  color: #3a2010;
  background: rgba(200,180,160,0.3);
  border-radius: 1px;
  padding: 2px 6px;
  text-shadow: 0 1px 0 rgba(255,240,220,0.5);
}
```
**Effect**: Inset display panel look

---

### Small Helper Text
```css
.helper-text {
  font-family: Arial, sans-serif;
  font-size: 6px;
  color: #8a7050;
  line-height: 1.6;
}
```
**Effect**: Readable small text

---

## 📐 Text Spacing

### Letter Spacing

| Style | Value | Usage |
|-------|-------|-------|
| Wide | 0.18em | Subtitle, decorative |
| Normal | 0.12em | Logo, labels |
| Tight | 0.08em | Body text |
| Default | 0 | Monospace values |

---

### Line Height

| Context | Value | Usage |
|---------|-------|-------|
| Logo | 1.2 | Compact multi-line logos |
| Labels | 1.0 | Single-line uppercase |
| Body | 1.6 | Readable paragraphs |
| Values | 1.0 | Numeric displays |

---

## 🎨 Text Colors

### On Light Backgrounds (Beige Panel)

```css
/* Primary text */
color: #3a2010;  /* Dark brown */

/* Secondary text */
color: #5a3820;  /* Medium brown */

/* Muted text */
color: #8a7050;  /* Light brown */
```

---

### On Dark Backgrounds (Bakelite, Insets)

```css
/* Labels */
color: #d4a574;  /* Bronze/gold */

/* Muted labels */
color: #a88850;  /* Dark bronze */

/* Very muted */
color: #8a6850;  /* Brown-gray */
```

---

## ✨ Text Shadow Effects

### Embossed (Raised)
```css
text-shadow: 
  1px 1px 0 rgba(255,240,200,0.8),    /* Light highlight */
  -1px -1px 0 rgba(0,0,0,0.3),        /* Dark shadow */
  1px 2px 3px rgba(0,0,0,0.3);        /* Soft drop shadow */
```
**Usage**: Logo on light backgrounds  
**Effect**: Text appears raised from surface

---

### Subtle Emboss
```css
text-shadow: 1px 1px 0 rgba(255,240,200,0.6);
```
**Usage**: Subtitles, small text on light backgrounds

---

### Glowing (On Dark)
```css
text-shadow: 
  0 1px 2px rgba(0,0,0,0.8),          /* Dark outline */
  0 0 6px rgba(212,165,116,0.4);      /* Bronze glow */
```
**Usage**: Labels on dark panels  
**Effect**: Soft glow around text

---

### Simple Drop Shadow
```css
text-shadow: 0 1px 1px rgba(255,240,220,0.5);
```
**Usage**: Labels on light panels  
**Effect**: Subtle depth

---

## 📋 Typography Usage Table

| Element | Font | Size | Weight | Color | Transform |
|---------|------|------|--------|-------|-----------|
| Main Logo | Georgia | 12px | Bold | #3a2010 | UPPERCASE |
| Subtitle | Georgia | 6px | Normal | #5a3820 | UPPERCASE |
| Section Label | Georgia | 7px | Normal | #d4a574 | UPPERCASE |
| Knob Label | Georgia | 7px | Normal | #5a3820 | UPPERCASE |
| Knob Value | Monospace | 10px | Bold | #3a2010 | - |
| Brand Name | Georgia | 8px | Bold | #2a1808 | - |
| Helper Text | Arial | 6px | Normal | #8a7050 | - |
| VU Scale | Arial | 5px | Normal | #d4a574 | - |

---

## 🎨 Text Transforms

### Uppercase
```css
text-transform: uppercase;
```
**Usage**: All labels, logo text  
**Reason**: Vintage hardware aesthetic

---

### Case Preservation
```css
text-transform: none;
```
**Usage**: Values, helper text  
**Reason**: Readability

---

## 📱 Responsive Typography

At 75% scale (450×600px), all text scales proportionally via:
```css
transform: scale(0.75);
```

No font-size adjustments needed - visual scaling handles everything.

---

## 🎓 Best Practices

### DO:
✅ Use Georgia for all vintage/hardware text  
✅ Apply UPPERCASE to labels  
✅ Use generous letter-spacing (0.12em+)  
✅ Add text-shadow for depth  
✅ Use monospace for numeric values  

### DON'T:
❌ Mix serif/sans randomly  
❌ Use modern sans-serif for main UI  
❌ Skip letter-spacing on uppercase  
❌ Use pure black or pure white text  
❌ Over-scale font sizes (keep vintage proportion)  

---

## 🔧 Implementation Tips

### In Figma:
1. Create Text Styles for each category
2. Name them: "Logo/Main", "Label/Section", etc.
3. Store in local styles library
4. Apply letter-spacing as character spacing
5. Use plugins for text-shadow effects

### In Code (CSS):
```css
/* All typography already implemented in components */
/* See /components/Knob.tsx, /App.tsx for examples */
```

---

## 📊 Font Loading

No custom fonts needed! All fonts are system defaults:
- **Georgia**: Pre-installed on all systems
- **Arial**: Universal system font
- **Monospace**: System default

**Advantage**: Zero load time, consistent across platforms

---

**Version**: 1.0.9  
**Last Updated**: 2024-10-21

*Typography is key to the vintage hardware aesthetic. Use consistently!*
