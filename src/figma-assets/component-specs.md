# 📐 Component Specifications

Specifiche dettagliate di tutti i componenti GUI con dimensioni esatte, spacing e stili.

---

## 🎛️ GUI Container

### Full Size (100%)
- **Dimensions**: 600×800px
- **Background**: Wood grain gradient
- **Border Radius**: 0px (sharp edges for retro look)

### Small Size (75%)
- **Dimensions**: 450×600px
- **Scaling**: CSS `transform: scale(0.75)`
- **Transition**: 600ms cubic-bezier(0.4, 0, 0.2, 1)

---

## 🪵 Wooden Chassis

### Dimensions
- **Width**: 540px
- **Height**: 760px
- **Padding**: 6px
- **Border**: 2px solid #2a1810
- **Border Radius**: 4px

### Styling
```css
background: linear-gradient(145deg, #3d2817, #2d1810);
box-shadow: 
  0 30px 80px rgba(0,0,0,0.9),
  inset 0 2px 1px rgba(255,200,150,0.1);
```

### Wood Grain Texture
```css
background: repeating-linear-gradient(90deg,
  transparent, transparent 2px,
  rgba(139,69,19,0.3) 2px, rgba(139,69,19,0.3) 3px,
  transparent 3px, transparent 8px
);
opacity: 0.2;
```

---

## 📄 Front Panel

### Dimensions
- **Width**: 100% of chassis (minus padding)
- **Padding**: 10px 12px 16px 12px
- **Border**: 2px solid #8a7050
- **Border Radius**: 2px

### Styling
```css
background: linear-gradient(145deg, 
  #e8d8c0 0%, 
  #d4c4a8 50%, 
  #c0b090 100%
);
box-shadow: 
  0 16px 48px rgba(0,0,0,0.8),
  inset 0 2px 4px rgba(255,240,220,0.6),
  inset 0 -2px 6px rgba(80,50,30,0.3),
  0 0 0 2px #a89070;
```

---

## 🎚️ Knob Component

### Medium Knob
- **Diameter**: 60px
- **Total Height**: ~85px (including label)

### Small Knob
- **Diameter**: 50px
- **Total Height**: ~75px (including label)

### Structure
```
┌─────────────────┐
│     Label       │ ← 7px font, 2px margin-bottom
├─────────────────┤
│   ┌─────────┐   │
│   │  Knob   │   │ ← 60px diameter circle
│   │  Body   │   │
│   └─────────┘   │
├─────────────────┤
│  Value Display  │ ← 10px font, 2px margin-top
└─────────────────┘
```

### Knob Body
```css
width: 60px;
height: 60px;
border-radius: 50%;
background: linear-gradient(145deg, #2a2218, #1a1510);
box-shadow: 
  0 4px 12px rgba(0,0,0,0.8),
  inset 0 2px 4px rgba(0,0,0,0.9),
  inset 0 -1px 2px rgba(80,60,40,0.2);
```

### Rotation Marker
- **Width**: 3px
- **Height**: 18px
- **Position**: Top center of knob
- **Color**: #d4a574 (bronze)
- **Transform**: `rotate(Xdeg)` based on value
- **Rotation Range**: -140deg to +140deg (280deg total)

### Label
```css
font-family: Georgia, serif;
font-size: 7px;
text-transform: uppercase;
letter-spacing: 0.12em;
color: #5a3820;
```

### Value Display
```css
font-family: monospace;
font-size: 10px;
font-weight: bold;
color: #3a2010;
padding: 2px 6px;
background: rgba(200,180,160,0.3);
border-radius: 1px;
```

---

## 📊 VU Meter

### Dimensions
- **Width**: 240px
- **Height**: 60px

### Structure
```
┌─────────────────────────────────┐
│        Scale Markings           │ ← dB scale (-20 to +3)
├─────────────────────────────────┤
│  ╱╲ Needle (animated)           │ ← Rotating needle
├─────────────────────────────────┤
│        "VU" Label               │
└─────────────────────────────────┘
```

### Background
```css
background: linear-gradient(145deg, #2a2218, #1a1510);
border: 1px solid #4a3828;
border-radius: 1px;
```

### Needle
- **Width**: 2px
- **Height**: 30px
- **Color**: #ff8800 (orange)
- **Transform Origin**: bottom center
- **Rotation Range**: -45deg to +45deg
- **Shadow**: `0 0 4px rgba(255,136,0,0.6)`

### Scale Text
```css
font-family: Arial, sans-serif;
font-size: 5px;
color: #d4a574;
```

---

## 🎞️ Tape Reels

### Dimensions
- **Container Width**: 200px
- **Container Height**: 120px
- **Reel Diameter**: 50px each
- **Gap Between Reels**: 60px

### Reel Structure
```
    ┌──────┐         ┌──────┐
    │ Reel │         │ Reel │
    │  L   │ ←60px→  │  R   │
    └──────┘         └──────┘
       50px             50px
```

### Reel Styling
```css
width: 50px;
height: 50px;
border-radius: 50%;
background: radial-gradient(circle,
  #3a2818 0%,
  #2a1810 60%,
  #1a0a00 100%
);
border: 2px solid #4a3828;
```

### Spokes (6 per reel)
- **Width**: 2px
- **Height**: 20px
- **Color**: #8a6850
- **Rotation**: 60deg apart
- **Animation**: Continuous rotation when power on

### Tape Connection
```css
/* Horizontal line between reels */
width: 60px;
height: 1px;
background: linear-gradient(90deg,
  transparent 0%,
  #2a1810 10%,
  #2a1810 90%,
  transparent 100%
);
```

---

## 🔌 Toggle Switch (Power)

### Dimensions
- **Total Width**: 60px
- **Total Height**: 40px
- **Switch Body Width**: 36px
- **Switch Body Height**: 16px

### Structure
```
┌──────────────┐
│    POWER     │ ← Label (6px font)
├──────────────┤
│  ┌────────┐  │
│  │░░░░░▓▓▓│  │ ← Switch body
│  └────────┘  │
└──────────────┘
```

### Switch Body
```css
width: 36px;
height: 16px;
border-radius: 8px;
background: linear-gradient(180deg, #2a1810, #1a1510);
border: 1px solid #4a3828;
```

### Switch Handle
```css
width: 14px;
height: 14px;
border-radius: 50%;
background: radial-gradient(circle, #8a6850, #5a4830);
box-shadow: 0 2px 4px rgba(0,0,0,0.8);
transition: transform 200ms ease;

/* Position when OFF */
transform: translateX(1px);

/* Position when ON */
transform: translateX(21px);
```

---

## 🔩 Screw Component

### Dimensions
- **Diameter**: 8px

### Structure
```
     ┌───┐
     │ + │  ← Crosshair (Phillips head)
     └───┘
      8px
```

### Styling
```css
width: 8px;
height: 8px;
border-radius: 50%;
background: radial-gradient(circle at 30% 30%, #8a8a8a, #2a2a2a);
box-shadow: 
  inset 0 1px 2px rgba(255,255,255,0.4),
  inset 0 -1px 2px rgba(0,0,0,0.8),
  0 1px 2px rgba(0,0,0,0.5);
```

### Crosshair Lines
```css
/* Horizontal line */
width: 5px;
height: 0.5px;
background: #000;
opacity: 0.7;

/* Vertical line */
width: 0.5px;
height: 5px;
background: #000;
opacity: 0.7;
```

---

## 💡 LED Indicator

### Dimensions
- **Diameter**: 6px (visible)
- **Total with glow**: ~12px

### LED OFF
```css
width: 6px;
height: 6px;
border-radius: 50%;
background: radial-gradient(circle, #2a1808, #0a0000);
box-shadow: inset 0 1px 2px rgba(0,0,0,0.9);
border: 0.5px solid #1a0a00;
```

### LED ON (Power - Orange)
```css
background: radial-gradient(circle, #ff8800, #cc5500);
box-shadow: 
  0 0 8px #ff8800,
  inset 0 1px 2px rgba(255,200,100,0.5);
```

### LED ON (Clip - Red)
```css
background: radial-gradient(circle, #ff2200, #aa0000);
box-shadow: 
  0 0 8px #ff2200,
  inset 0 1px 2px rgba(255,100,50,0.5);
```

---

## 🔥 Vent Slits (Glowing)

### Container
- **Width**: 70px
- **Height**: Variable (14 slits with gaps)
- **Background**: Dark inset

### Single Slit
- **Width**: 100% (70px)
- **Height**: 3px
- **Gap Between Slits**: 2px
- **Border Radius**: 0.5px

### Glow Effect (Drive-responsive)
```css
/* Base slit (no glow) */
background: linear-gradient(90deg,
  rgba(0,0,0,0.95) 0%,
  rgba(10,8,5,0.9) 50%,
  rgba(0,0,0,0.95) 100%
);

/* Glowing slit (high drive) */
background: linear-gradient(90deg,
  rgba(0,0,0,0.95) 0%,
  rgba(255,180,50,0.5) 50%,
  rgba(0,0,0,0.95) 100%
);
box-shadow: 
  0 0 4px rgba(255,136,0,0.8),
  0 0 8px rgba(255,136,0,0.6);
```

### Ambient Glow (container level)
```css
/* Visible at drive > 15% */
background: radial-gradient(ellipse at center,
  rgba(255,200,50,0.35) 0%,
  rgba(255,140,0,0.2) 40%,
  transparent 75%
);
filter: blur(8px);
```

---

## 🏷️ Logo Badge

### Dimensions
- **Width**: ~300px (responsive)
- **Height**: 28px
- **Border**: 1.5px solid #8a6830
- **Border Radius**: 2px

### Styling
```css
background: linear-gradient(180deg, #c8a870, #a88850);
box-shadow: 
  inset 0 2px 3px rgba(255,220,180,0.8),
  inset 0 -2px 4px rgba(60,40,20,0.6),
  0 3px 6px rgba(0,0,0,0.4);
```

### Text
```css
/* Main text */
font-family: Georgia, serif;
font-size: 12px;
font-weight: bold;
color: #3a2010;
letter-spacing: 0.12em;
text-shadow: 
  1px 1px 0 rgba(255,240,200,0.8),
  -1px -1px 0 rgba(0,0,0,0.3),
  1px 2px 3px rgba(0,0,0,0.3);

/* Subtitle */
font-size: 6px;
color: #5a3820;
letter-spacing: 0.18em;
```

---

## 📏 Wooden Divider Bar

### Dimensions
- **Height**: 10px
- **Width**: Variable (flex-1)
- **Border**: 1px solid #2a1810
- **Border Radius**: 1px

### Styling
```css
background: 
  linear-gradient(145deg, #3d2817, #2d1810),
  repeating-linear-gradient(90deg,
    transparent, transparent 3px,
    rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px
  );
box-shadow: 
  0 4px 8px rgba(0,0,0,0.8),
  inset 0 2px 3px rgba(0,0,0,0.9),
  inset 0 -1px 2px rgba(100,80,60,0.2);
```

### Screws
- **Count**: 4 (left, left-center, right-center, right)
- **Spacing**: Evenly distributed
- **Size**: 8px diameter (standard screw)

---

## 📱 Preset Browser Panel

### Dimensions
- **Width**: 360px
- **Max Height**: 500px
- **Padding**: 16px
- **Border Radius**: 2px

### Background
```css
background: linear-gradient(145deg, #2a2218, #1a1510);
box-shadow: 
  0 24px 64px rgba(0,0,0,0.95),
  inset 0 3px 8px rgba(0,0,0,0.8);
border: 2px solid #4a3828;
```

### Preset Item
- **Height**: 48px
- **Padding**: 8px 12px
- **Border Bottom**: 1px solid rgba(212,165,116,0.2)
- **Hover**: brightness(110%)
- **Active**: brightness(95%)

---

## 🎛️ Clipper Panel (Modal)

### Dimensions
- **Width**: 340px
- **Padding**: 12px 16px
- **Position**: Centered (absolute)
- **z-index**: 50

### Backdrop
```css
background: rgba(0,0,0,0.7);
backdrop-filter: blur(2px);
```

### Panel Styling
Same as preset browser with corner screws

---

## 📊 Grid Layouts

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

## 🎨 Color Usage Summary

| Element | Primary Color | Accent Color |
|---------|--------------|--------------|
| Chassis | #3d2817 (wood) | - |
| Panel | #e8d8c0 (beige) | #c0b090 (shadow) |
| Knobs | #1a1510 (bakelite) | #d4a574 (marker) |
| Text Labels | #d4a574 (bronze) | - |
| LEDs | #ff8800 / #ff2200 | - |
| Screws | #8a8a8a (metal) | #2a2a2a (shadow) |

---

## 📐 Spacing System

| Space | Value | Usage |
|-------|-------|-------|
| xs | 2px | Minimal gap |
| sm | 4px | Tight spacing |
| md | 8px | Standard gap |
| lg | 12px | Section spacing |
| xl | 16px | Large spacing |

---

**Version**: 1.0.9  
**Last Updated**: 2024-10-21

*Use these specs to recreate components in Figma with pixel-perfect accuracy.*
