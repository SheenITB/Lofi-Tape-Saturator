# 🎨 Gradients Reference

Complete reference of all CSS gradients used in IntheBox GUI. Use these to recreate the vintage hardware aesthetic in Figma or other design tools.

---

## 🪵 Wood & Chassis Gradients

### Main Chassis Background
```css
background: linear-gradient(180deg, #4a3428 0%, #2a1810 100%);
```
**Type**: Linear  
**Direction**: Top to bottom  
**Colors**: Light wood (#4a3428) → Dark wood (#2a1810)  
**Usage**: Outer container background

---

### Chassis Border
```css
background: linear-gradient(145deg, #3d2817, #2d1810);
```
**Type**: Linear  
**Angle**: 145deg (diagonal)  
**Colors**: Medium wood → Dark wood  
**Usage**: Wooden frame around panel

---

### Wood Grain Texture (Repeating)
```css
background: repeating-linear-gradient(90deg,
  transparent, transparent 2px,
  rgba(139,69,19,0.3) 2px, rgba(139,69,19,0.3) 3px,
  transparent 3px, transparent 8px
);
opacity: 0.2;
```
**Type**: Repeating Linear  
**Direction**: Horizontal (90deg)  
**Pattern**: 2px transparent, 1px brown, 5px transparent (repeat)  
**Usage**: Wood grain texture overlay  
**Note**: Apply with low opacity (0.2-0.3) over solid wood color

---

### Side Wood Panels (Left)
```css
background: linear-gradient(90deg, #2d1810 0%, #3d2817 100%);
box-shadow: inset -2px 0 4px rgba(0,0,0,0.8);
```
**Type**: Linear  
**Direction**: Left to right  
**Colors**: Dark wood → Medium wood  
**Usage**: Left side panel

---

### Side Wood Panels (Right)
```css
background: linear-gradient(90deg, #3d2817 0%, #2d1810 100%);
box-shadow: inset 2px 0 4px rgba(0,0,0,0.8);
```
**Type**: Linear  
**Direction**: Left to right (reversed)  
**Colors**: Medium wood → Dark wood  
**Usage**: Right side panel

---

## 📄 Front Panel Gradients

### Main Panel Background
```css
background: linear-gradient(145deg, 
  #e8d8c0 0%, 
  #d4c4a8 50%, 
  #c0b090 100%
);
```
**Type**: Linear  
**Angle**: 145deg (diagonal)  
**Stops**:
- 0%: Light beige (#e8d8c0)
- 50%: Medium beige (#d4c4a8)
- 100%: Dark beige (#c0b090)

**Usage**: Main front panel background  
**Note**: This gives the vintage cream/beige look

---

### Panel Texture (Repeating)
```css
background: repeating-linear-gradient(0deg,
  transparent, transparent 2px,
  #8b6914 2px, #8b6914 3px
),
repeating-linear-gradient(90deg,
  transparent, transparent 2px,
  #8b6914 2px, #8b6914 3px
);
opacity: 0.1;
```
**Type**: Two Repeating Linears (crosshatch)  
**Directions**: Vertical (0deg) + Horizontal (90deg)  
**Pattern**: Creates subtle grid texture  
**Usage**: Panel surface texture overlay

---

## 🎛️ Bakelite (Knobs & Insets)

### Bakelite Gradient
```css
background: linear-gradient(145deg, #2a2218, #1a1510);
```
**Type**: Linear  
**Angle**: 145deg  
**Colors**: Medium brown-black → Dark brown-black  
**Usage**: Knob bodies, inset sections  
**Characteristics**: Dark, slightly glossy appearance

---

### Knob Radial Highlight
```css
background: radial-gradient(circle at 30% 30%,
  rgba(100,80,60,0.3) 0%,
  transparent 60%
);
```
**Type**: Radial  
**Center**: 30% 30% (top-left)  
**Colors**: Subtle brown highlight → transparent  
**Usage**: Top highlight on knobs (combine with bakelite gradient)

---

## 🏅 Bronze/Gold Accents

### Bronze Badge Background
```css
background: linear-gradient(180deg, #c8a870, #a88850);
```
**Type**: Linear  
**Direction**: Top to bottom  
**Colors**: Light bronze → Dark bronze  
**Usage**: Logo badges, name plates

---

### Gold Metallic
```css
background: linear-gradient(145deg,
  #d4a574 0%,
  #c8a870 50%,
  #a88850 100%
);
```
**Type**: Linear  
**Angle**: 145deg  
**Colors**: Light gold → Medium bronze → Dark bronze  
**Usage**: Metallic accents, borders

---

## 💡 LED Indicators

### Power LED ON (Orange)
```css
background: radial-gradient(circle, #ff8800, #cc5500);
box-shadow: 0 0 8px #ff8800;
```
**Type**: Radial  
**Shape**: Circle (centered)  
**Colors**: Bright orange → Dark orange  
**Glow**: 8px blur, orange

---

### Clip LED ON (Red)
```css
background: radial-gradient(circle, #ff2200, #aa0000);
box-shadow: 0 0 8px #ff2200;
```
**Type**: Radial  
**Shape**: Circle (centered)  
**Colors**: Bright red → Dark red  
**Glow**: 8px blur, red

---

### LED OFF
```css
background: radial-gradient(circle, #2a1808, #0a0000);
box-shadow: inset 0 1px 2px rgba(0,0,0,0.9);
```
**Type**: Radial  
**Colors**: Dark brown → Black  
**Shadow**: Inset dark shadow

---

## 🔩 Screws (Metallic)

### Screw Surface
```css
background: radial-gradient(circle at 30% 30%, #8a8a8a, #2a2a2a);
box-shadow: 
  inset 0 1px 2px rgba(255,255,255,0.4),
  inset 0 -1px 2px rgba(0,0,0,0.8),
  0 1px 2px rgba(0,0,0,0.5);
```
**Type**: Radial  
**Center**: 30% 30% (top-left highlight)  
**Colors**: Light gray → Dark gray  
**Note**: Creates metallic appearance with highlight

---

## 🔥 Vent Slit Glow

### Slit Base (No Glow)
```css
background: linear-gradient(90deg,
  rgba(0,0,0,0.95) 0%,
  rgba(10,8,5,0.9) 50%,
  rgba(0,0,0,0.95) 100%
);
```
**Type**: Linear  
**Direction**: Horizontal  
**Colors**: Black → Very dark brown → Black  
**Usage**: Slit when no drive/power

---

### Slit Glowing (Drive Active)
```css
background: linear-gradient(90deg,
  rgba(0,0,0,0.95) 0%,
  rgba(255,180,50,0.3) 10%,
  rgba(255,220,100,0.8) 50%,
  rgba(255,180,50,0.3) 90%,
  rgba(0,0,0,0.95) 100%
);
box-shadow: 
  0 0 4px rgba(255,136,0,0.8),
  0 0 8px rgba(255,140,0,0.5);
```
**Type**: Linear  
**Direction**: Horizontal  
**Stops**:
- 0%: Black (edges)
- 10%, 90%: Orange glow (fade in/out)
- 50%: Bright yellow-orange (center)

**Glow Effect**: Multiple box-shadows for light emission

---

### Ambient Glow (Container Level)
```css
background: radial-gradient(ellipse at center,
  rgba(255,200,50,0.35) 0%,
  rgba(255,140,0,0.2) 40%,
  transparent 75%
);
filter: blur(8px);
opacity: 0.5 + (drive/100) * 0.5;
```
**Type**: Radial  
**Shape**: Ellipse (vertical)  
**Colors**: Bright yellow → Orange → Transparent  
**Effect**: Blurred, drives-responsive opacity

---

## 🎨 VU Meter

### Meter Background
```css
background: linear-gradient(145deg, #2a2218, #1a1510);
border: 1px solid #4a3828;
```
Same as bakelite gradient

---

### Needle Glow
```css
box-shadow: 0 0 4px rgba(255,136,0,0.6);
```
**Type**: Single glow shadow  
**Color**: Orange (semi-transparent)  
**Blur**: 4px

---

## 🎞️ Tape Reel

### Reel Surface
```css
background: radial-gradient(circle,
  #3a2818 0%,
  #2a1810 60%,
  #1a0a00 100%
);
```
**Type**: Radial  
**Shape**: Circle (centered)  
**Stops**:
- 0%: Medium brown (center)
- 60%: Dark brown
- 100%: Very dark brown/black (edge)

---

### Tape Strip
```css
background: linear-gradient(90deg,
  transparent 0%,
  #2a1810 10%,
  #2a1810 90%,
  transparent 100%
);
```
**Type**: Linear  
**Direction**: Horizontal  
**Colors**: Transparent edges, solid dark brown center  
**Usage**: Tape connecting the reels

---

## 🚪 Wooden Divider Bar

### Bar Background
```css
background: 
  linear-gradient(145deg, #3d2817, #2d1810),
  repeating-linear-gradient(90deg,
    transparent, transparent 3px,
    rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px
  );
```
**Type**: Layered (solid + repeating)  
**Layer 1**: Wood gradient (145deg)  
**Layer 2**: Subtle vertical stripes  
**Usage**: Horizontal divider bars

---

### Bar Highlight (Top Edge)
```css
background: linear-gradient(90deg,
  transparent,
  rgba(100,80,60,0.3) 50%,
  transparent
);
height: 1px;
```
**Type**: Linear  
**Direction**: Horizontal  
**Colors**: Transparent → Brown highlight → Transparent  
**Position**: Top edge

---

### Bar Shadow (Bottom Edge)
```css
background: linear-gradient(90deg,
  transparent,
  rgba(0,0,0,0.6) 50%,
  transparent
);
height: 1px;
```
**Type**: Linear  
**Direction**: Horizontal  
**Colors**: Transparent → Black shadow → Transparent  
**Position**: Bottom edge

---

## 🎨 How to Use in Figma

### For Linear Gradients
1. Create shape in Figma
2. Add Fill → Gradient → Linear
3. Set angle (0° = top-to-bottom, 90° = left-to-right, 145° = diagonal)
4. Add color stops at specified positions
5. Match colors exactly using hex values

### For Radial Gradients
1. Create shape
2. Add Fill → Gradient → Radial
3. Position center (default center, or drag to 30% 30% for highlights)
4. Add color stops from center outward

### For Repeating Gradients
Figma doesn't have native repeating gradients. Options:
1. **Pattern Fill**: Create a small pattern and tile it
2. **Manual Recreation**: Create pattern elements manually
3. **Image Texture**: Export pattern as image, use as fill

### Combining Gradients
Figma allows multiple fills. Stack them like CSS:
1. Top fill: Texture/pattern (set low opacity)
2. Bottom fill: Base gradient

---

## 📊 Gradient Quick Reference Table

| Name | Type | Angle/Shape | Primary Colors | Usage |
|------|------|-------------|----------------|-------|
| Main Chassis | Linear | 180° | #4a3428 → #2a1810 | Container |
| Chassis Border | Linear | 145° | #3d2817 → #2d1810 | Frame |
| Front Panel | Linear | 145° | #e8d8c0 → #c0b090 | Panel |
| Bakelite | Linear | 145° | #2a2218 → #1a1510 | Knobs |
| Bronze Badge | Linear | 180° | #c8a870 → #a88850 | Badges |
| Power LED | Radial | Circle | #ff8800 → #cc5500 | LED on |
| Clip LED | Radial | Circle | #ff2200 → #aa0000 | LED on |
| Screw | Radial | Circle@30%30% | #8a8a8a → #2a2a2a | Screws |
| Tape Reel | Radial | Circle | #3a2818 → #1a0a00 | Reels |

---

## 🎨 Color Stop Format

For maximum accuracy, use this format in your design tool:

```
Position | Color     | Opacity
---------|-----------|--------
0%       | #color1   | 100%
50%      | #color2   | 100%
100%     | #color3   | 100%
```

For semi-transparent stops:
```
Position | Color     | Opacity
---------|-----------|--------
0%       | #color1   | 0%
50%      | #color2   | 80%
100%     | #color3   | 0%
```

---

**Version**: 1.0.9  
**Last Updated**: 2024-10-21

*All gradients are procedural CSS - no image assets required!*
