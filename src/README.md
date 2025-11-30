# IntheBox - Lo-Fi Tape Saturator GUI

A vintage-inspired lo-fi tape saturation plugin interface built with **React**, **TypeScript**, and **Tailwind CSS v4**.

## ✨ Features

- 🎨 **Vintage 1970s aesthetic** - Wood chassis, beige panel, bakelite knobs
- 📊 **VU Meter** - Real-time level monitoring
- 🎞️ **Animated Tape Reels** - Speed responds to Flutter parameter
- 💡 **Glowing Vent Slits** - Light intensity follows Drive level
- 🔌 **Power Toggle** - Hardware-style switch with LED indicator
- 📐 **Resizable GUI** - 75% or 100% zoom with smooth transitions
- 💾 **16 Factory Presets** - Instant lo-fi character

## 🎛️ Controls

- **Drive** - Tape saturation and harmonic distortion
- **Tone** - Frequency shaping
- **MPC** - Bit depth reduction (16 down to 4-bit)
- **Wow & Flutter** - Tape speed modulation
- **Noise** - Tape hiss generator
- **Low Pass Filter** - Frequency roll-off
- **Resampler** - Sample rate reduction
- **Dry/Wet** - Parallel processing blend
- **Clipper** - 3 modes: Soft, Moderate, Hard

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the interface.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **100% Hand-coded** - No Figma exports, pure CSS gradients & SVG

## 📐 Default Parameters (v1.0.9)

The plugin opens in a clean state for transparent starting point:

| Parameter | Default | Note |
|-----------|---------|------|
| **GUI Scale** | 75% | Comfortable laptop size |
| **Drive** | 0% | Clean start |
| **Tone** | 0% | Neutral EQ |
| **MPC** | 16-bit | Baseline resolution (turn right for crunch) |
| **Wow** | 0% | No pitch variation |
| **Noise** | 0% | Silent tape |
| **Flutter** | 0% | Stable speed |
| **Tape Power** | OFF | Tape stopped |
| **Dry/Wet** | 50% | Balanced mix |

## 🎨 Design Philosophy

**"Start clean, add character as needed"**

The interface combines authentic vintage hardware aesthetics with modern React development:
- Procedural CSS gradients for realistic wood grain
- SVG-based knobs with rotation animations
- Real-time visual feedback (VU meter, glowing vents)
- Smooth 600ms transitions for GUI scaling

## 🎨 Figma Assets

Complete design system documentation available in `/figma-assets/`:
- **Design Tokens** (JSON) - Colors, spacing, typography
- **Color Palette** - Complete vintage color system
- **Component Specs** - Exact dimensions and styling
- **Gradients Reference** - All CSS gradients with Figma conversion tips
- **Typography Guide** - Font styles and text effects

Perfect for recreating the design in Figma or sharing the design system!

## 📦 Project Structure

```
├── App.tsx              # Main component
├── main.tsx             # React entry point
├── index.html           # HTML entry
├── components/          # React components
│   ├── Knob.tsx
│   ├── VUMeter.tsx
│   ├── TapeReels.tsx
│   ├── ToggleSwitch.tsx
│   ├── PresetBrowser.tsx
│   ├── ResizeControl.tsx
│   └── ui/              # Shadcn components
├── styles/
│   └── globals.css      # Tailwind v4 + Design tokens
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎯 Usage

### Standalone Mode
```tsx
import App from './App';

function MyApp() {
  return <App />;
}
```

### With Initial Parameters
```tsx
<App 
  initialParameters={{
    drive: 50,
    tone: 30,
    isPowerOn: true
  }}
/>
```

### With DSP Integration (Optional)
```tsx
<App 
  dsp={{
    onParameterChange: (id, value) => {
      console.log(`Parameter ${id} changed to ${value}`);
    }
  }}
/>
```

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start dev server with hot reload |
| `build` | `npm run build` | Build for production |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | Check TypeScript errors |

## 🎨 Customization

Edit design tokens in `/styles/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  /* ...more tokens */
}
```

## 📄 License

MIT

---

**Version:** 1.0.9  
**Built with:** React + TypeScript + Tailwind CSS v4  
**Website:** [www.itbblog.com](https://www.itbblog.com)
