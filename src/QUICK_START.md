# 🚀 Quick Start

## Installazione

```bash
npm install
```

## Sviluppo

```bash
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173)

## Build Produzione

```bash
npm run build
```

Il build sarà in `dist/`

## Struttura Progetto

```
├── App.tsx              # Componente principale
├── components/          # Componenti React
│   ├── Knob.tsx        # Manopola con rotazione
│   ├── VUMeter.tsx     # VU meter animato
│   ├── TapeReels.tsx   # Bobine tape animate
│   └── ...
├── styles/
│   └── globals.css     # Tailwind v4 + design tokens
└── package.json
```

## Controlli Default

- **GUI Scale:** 75% (comoda per laptop)
- **Drive:** 0% (clean start)
- **Tone:** 0% (neutro)
- **MPC:** 16-bit (knob parked at 0% for max fidelity)
- **Tutti gli effetti:** 0% (aggiungi come serve) / Dry/Wet: 100% wet di default
- **Tape:** STOP (premi POWER per attivare)

## Customizzazione

Modifica i design tokens in `/styles/globals.css`:

```css
:root {
  --background: #ffffff;
  --primary: #030213;
  /* ... */
}
```

## Features

- ✅ 100% responsive (75% / 100% zoom)
- ✅ Smooth transitions (600ms)
- ✅ 16 preset factory
- ✅ VU meter real-time
- ✅ Tape reels animation
- ✅ Glowing vent slits (reagiscono al Drive)
- ✅ Power LED indicator

## 🎨 Figma Assets

Design system completo disponibile in `/figma-assets/`:

- Design tokens (JSON)
- Color palette
- Component specifications
- Gradients reference
- Typography guide

Vedi `FIGMA_ASSETS_INFO.md` per dettagli!

---

**Happy coding!** 🎸✨
