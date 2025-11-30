# 🎨 IntheBox - Figma Design Assets

Questa cartella contiene tutti gli asset, specifiche di design e risorse per replicare o ispirare design basati sulla GUI IntheBox.

## 📦 Contenuto

```
figma-assets/
├── README.md                      # Questo file
├── design-tokens.json             # Design tokens (colori, spacing, typography)
├── color-palette.json             # Palette colori completa
├── component-specs.md             # Specifiche dimensioni componenti
├── gradients-reference.md         # Tutti i gradient CSS usati
├── typography.md                  # Font e text styles
└── screenshots/                   # Screenshot componenti
    ├── full-gui-75.png           # (placeholder - aggiungi screenshot)
    ├── full-gui-100.png          # (placeholder - aggiungi screenshot)
    ├── knob-component.png        # (placeholder)
    ├── vu-meter.png              # (placeholder)
    └── tape-reels.png            # (placeholder)
```

## 🎯 Come Usare

### Per Designer Figma

1. **Importa Design Tokens**: Usa il file `design-tokens.json` per creare variabili in Figma
2. **Riferimento Colori**: Consulta `color-palette.json` per la palette completa
3. **Gradients**: I gradients CSS in `gradients-reference.md` possono essere approssimati in Figma con multiple stops
4. **Componenti**: Le specifiche in `component-specs.md` forniscono dimensioni esatte

### Per Developer

1. **CSS Variables**: I design tokens sono già implementati in `/styles/globals.css`
2. **Componenti React**: Vedi `/components/` per implementazione completa
3. **Gradients Procedurali**: Tutti i gradients sono CSS puro, no immagini

## 🎨 Design System

### Palette Principale

- **Wood Chassis**: `#4a3428` → `#2a1810` (gradient)
- **Beige Panel**: `#e8d8c0` → `#c0b090` (gradient)
- **Bakelite Knobs**: `#1a1510` (dark brown-black)
- **Bronze Accents**: `#d4a574` (vintage gold)
- **LED Orange**: `#ff8800` (power on)
- **LED Red**: `#ff2200` (clip indicator)

### Typography

- **Logo/Titles**: Georgia, serif
- **Labels**: Georgia, serif (uppercase, tracking: 0.12em)
- **Body**: Arial, sans-serif

### Key Measurements

- **GUI Full Size**: 600×800px
- **GUI 75% Scale**: 450×600px
- **Knob Size**: 60×60px (medium), 50×50px (small)
- **VU Meter**: 240×60px
- **Tape Reels**: 200×120px

## 📸 Screenshots

Per aggiungere screenshot:

```bash
# Avvia il progetto
npm run dev

# Apri http://localhost:5173
# Usa browser DevTools per screenshot:
# - Full GUI at 75%: 450×600px
# - Full GUI at 100%: 600×800px
# - Individual components
```

Salva gli screenshot in `/figma-assets/screenshots/`

## 🔄 Export da React a Figma

### Opzione 1: Screenshot Method
1. Avvia dev server
2. Screenshot componenti
3. Importa in Figma come reference

### Opzione 2: CSS to Figma Plugin
1. Usa plugin come "CSS to Figma"
2. Copia CSS da `/styles/globals.css` o inline styles
3. Converti in Figma variables/styles

### Opzione 3: Manual Recreation
1. Usa `component-specs.md` per dimensioni
2. Usa `gradients-reference.md` per styling
3. Ricrea componenti in Figma con Auto Layout

## 📝 Note

- **Gradients**: Molti gradients sono `repeating-linear-gradient` - in Figma approssima con texture o pattern
- **Wood Grain**: È procedurale CSS - in Figma usa una texture image
- **Knob Rotation**: In React è `transform: rotate()` - in Figma crea variants per angoli diversi
- **Animations**: Le animazioni CSS non sono trasferibili - documenta solo stati (on/off, rotazioni)

## 🎓 Design Philosophy

**IntheBox usa un approccio "100% code-based":**
- Zero asset grafici esterni
- Gradients CSS procedurali
- SVG inline per forme
- Tutto controllato da codice

**Per Figma:**
- Usa questi asset come "reference"
- Ricrea componenti con Figma native tools
- Mantieni stesso design system (colori, spacing, typography)

## 🔗 Risorse

- **Live Demo**: `npm run dev` → http://localhost:5173
- **Source Code**: `/App.tsx` e `/components/`
- **Tailwind Config**: `/styles/globals.css`
- **README Progetto**: `/README.md`

---

**Version**: 1.0.9  
**Last Updated**: 2024-10-21  
**Design System**: Vintage 1970s Hardware

*Per domande o suggerimenti, consulta il README principale del progetto.*
