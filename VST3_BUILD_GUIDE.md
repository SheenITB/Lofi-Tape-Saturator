# LOFI TAPE SATURATOR - VST3 Build Guide

## Overview

This plugin is currently a **web application** (React + TypeScript + Web Audio API). To use it as a **VST3 plugin** in your DAW, we need to wrap it in a native plugin framework.

## Build Options

### Option 1: JUCE Framework (Recommended) ⭐

**Best for**: Professional VST3 with full DAW integration

#### Pros:
- ✅ Industry standard for audio plugins
- ✅ Cross-platform (macOS, Windows, Linux)
- ✅ Full VST3/AU/AAX support
- ✅ Built-in GUI framework
- ✅ Excellent documentation
- ✅ Used by major plugin companies

#### Cons:
- ⚠️ Requires C++ knowledge
- ⚠️ DSP must be ported from TypeScript to C++
- ⚠️ GUI must be rebuilt (cannot use React)
- ⚠️ Time-intensive: ~2-4 weeks for full port

#### Steps:
1. Install JUCE (free for personal use)
2. Create new Audio Plugin project
3. Port DSP from `src/audio/AudioProcessor.ts` to C++
4. Recreate GUI using JUCE Components
5. Build VST3 with Projucer/CMake
6. Test in DAW

---

### Option 2: WebView Plugin (Hybrid Approach)

**Best for**: Reusing existing React GUI

#### Pros:
- ✅ Keeps current React frontend
- ✅ No GUI rewrite needed
- ✅ Faster development
- ✅ Modern web tech in plugin

#### Cons:
- ⚠️ Still requires C++ wrapper
- ⚠️ Higher CPU usage (browser overhead)
- ⚠️ Larger plugin size (~50MB)
- ⚠️ Some DAWs may have issues with WebView

#### Implementation:
```cpp
// Main plugin wraps a Chrome Embedded Framework (CEF) view
// DSP in C++ <-> JavaScript bridge <-> React GUI
```

#### Steps:
1. Build React app: `npm run build`
2. Create JUCE plugin project
3. Embed WebView component
4. Create JavaScript bridge for parameters
5. Port DSP to C++ (still required for audio thread)
6. Compile VST3

---

### Option 3: DPF (DISTRHO Plugin Framework)

**Best for**: Lightweight, open-source solution

#### Pros:
- ✅ Simpler than JUCE
- ✅ Fully open-source (MIT license)
- ✅ Smaller binary size
- ✅ Good for simple plugins

#### Cons:
- ⚠️ Less documentation than JUCE
- ⚠️ Still requires C++ DSP port
- ⚠️ Limited GUI options

---

## Recommended Build Path: JUCE

### Phase 1: Setup (1 day)
```bash
# Install JUCE
cd ~/Desktop
git clone https://github.com/juce-framework/JUCE.git
cd JUCE
open Projucer.app

# Create new project:
# - Audio Plugin
# - Name: "LoFi Tape Saturator"
# - Company: "ITB Audio"
# - Plugin Formats: VST3, AU
```

### Phase 2: DSP Port (1-2 weeks)

**Files to port**:
- `src/audio/AudioProcessor.ts` → `Source/PluginProcessor.cpp`
- `src/audio/effects/*.ts` → C++ classes

**Key conversions**:

#### JavaScript → C++
```typescript
// TypeScript (current)
class DriveProcessor {
  process(buffer: Float32Array, amount: number) {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.tanh(buffer[i] * (1 + amount * 9));
    }
  }
}
```

```cpp
// C++ (JUCE)
class DriveProcessor {
public:
    void process(juce::AudioBuffer<float>& buffer, float amount) {
        for (int channel = 0; channel < buffer.getNumChannels(); ++channel) {
            auto* data = buffer.getWritePointer(channel);
            for (int sample = 0; sample < buffer.getNumSamples(); ++sample) {
                data[sample] = std::tanh(data[sample] * (1.0f + amount * 9.0f));
            }
        }
    }
};
```

### Phase 3: GUI Recreation (1 week)

**Convert React components to JUCE**:
```cpp
// FigmaLayoutProfessional.tsx → PluginEditor.cpp

class LoFiTapeEditor : public juce::AudioProcessorEditor {
private:
    // Knobs from your GUI
    juce::Slider driveKnob;
    juce::Slider toneKnob;
    juce::Slider mpcKnob;
    // ... 8 knobs total
    
    // Custom components
    VUMeter vuMeter;
    TapeReels tapeReels;
    ClipIndicator clipLED;
    
public:
    void paint(juce::Graphics& g) override {
        // Draw vintage hardware background
        g.fillAll(juce::Colour(0xff2b1810)); // Dark brown
        
        // Draw sections like current design
        drawVUMeterSection(g);
        drawTapeSection(g);
        drawKnobsSection(g);
        drawMasterSection(g);
    }
};
```

### Phase 4: Build & Test (2-3 days)

```bash
# Build in Projucer
open ~/Desktop/JUCE/LoFiTape.jucer

# Or use CMake
cd ~/Desktop/JUCE/LoFiTape
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build

# Output will be:
# ~/Library/Audio/Plug-Ins/VST3/LoFi Tape Saturator.vst3
# ~/Library/Audio/Plug-Ins/Components/LoFi Tape Saturator.component (AU)
```

**Test in DAWs**:
- Logic Pro
- Ableton Live
- FL Studio
- Studio One
- Reaper

### Phase 5: Distribution

```bash
# Create installer (macOS)
pkgbuild --root ~/Library/Audio/Plug-Ins \
         --identifier com.itbaudio.lofitape \
         --version 1.0.0 \
         --install-location /Library/Audio/Plug-Ins \
         LoFiTapeSaturator-macOS.pkg

# Code signing (requires Apple Developer account)
codesign --force --sign "Developer ID Application: Your Name" \
         "LoFi Tape Saturator.vst3"

# Notarization for Gatekeeper
xcrun notarytool submit LoFiTapeSaturator-macOS.pkg \
         --apple-id your@email.com \
         --password app-specific-password \
         --team-id TEAMID
```

---

## Quick Start Option: Use Existing Templates

We already have a template in `src/iplug2-templates/`:

```bash
cd src/iplug2-templates
cat README.md  # Read setup instructions
cat SETUP_GUIDE.md  # Detailed build guide
```

This template uses **iPlug2** (similar to JUCE but simpler):
- Already configured for VST3
- Includes basic DSP structure
- Has GUI framework
- Just needs DSP logic added

### Build with iPlug2 Template:
```bash
cd src/iplug2-templates

# Follow SETUP_GUIDE.md steps:
# 1. Install dependencies
# 2. Configure CMakeLists.txt
# 3. Add DSP code to IntheBox.cpp
# 4. Build with CMake

cmake -B build
cmake --build build --config Release

# Output: build/VST3/LoFiTape.vst3
```

---

## Time Estimates

| Approach | Time Required | Difficulty | Result Quality |
|----------|--------------|------------|----------------|
| **JUCE Full Port** | 2-4 weeks | ⭐⭐⭐⭐⭐ | Professional |
| **JUCE + WebView** | 1-2 weeks | ⭐⭐⭐⭐ | Good |
| **iPlug2 Template** | 3-5 days | ⭐⭐⭐ | Good |
| **DPF** | 1-2 weeks | ⭐⭐⭐⭐ | Decent |

---

## Current Status

### ✅ Web Version Complete
- Full DSP chain implemented
- Professional GUI design
- Real-time parameter control
- Works in browser at http://localhost:3001

### ⏳ VST3 Build Required
- Choose framework (JUCE recommended)
- Port DSP to C++
- Recreate GUI
- Compile plugin binary
- Test in DAW
- Code sign & notarize

---

## Recommended Next Steps

### Option A: Professional Build (Best Quality)
1. Learn JUCE basics: https://juce.com/learn/tutorials
2. Port DSP algorithms to C++
3. Build GUI with JUCE Components
4. Compile VST3
5. **Time**: 2-4 weeks

### Option B: Quick Prototype (Fastest)
1. Use `src/iplug2-templates/` template
2. Copy DSP logic into `IntheBox.cpp`
3. Build with CMake
4. **Time**: 3-5 days

### Option C: Hybrid Approach
1. Build with JUCE + WebView
2. Embed React GUI
3. Port DSP only
4. **Time**: 1-2 weeks

---

## Resources

### JUCE
- Official Site: https://juce.com
- Tutorials: https://docs.juce.com/master/tutorial_create_projucer_basic_plugin.html
- Forum: https://forum.juce.com

### iPlug2
- GitHub: https://github.com/iPlug2/iPlug2
- Examples: https://github.com/iPlug2/iPlug2/tree/master/Examples

### Audio DSP References
- DSP Guide: https://www.dspguide.com
- JUCE DSP Module: https://docs.juce.com/master/group__juce__dsp.html

---

## Questions?

**Need help choosing a build approach?**
- For **professional release** → JUCE
- For **quick testing** → iPlug2 template
- For **keeping React GUI** → WebView approach

**Want to hire a developer?**
- Average cost: $2,000-$5,000 for full VST3 port
- Timeframe: 4-8 weeks
- Skills needed: C++, JUCE, DSP programming

---

**Current Status**: ✅ Ready for VST3 build
**Recommended Path**: JUCE framework with full C++ port
**Estimated Time**: 2-4 weeks (DIY) or hire a developer
