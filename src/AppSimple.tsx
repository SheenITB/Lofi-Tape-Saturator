/**
 * IntheBox - Lo-Fi Tape Saturator
 * ✅ Design System: Tokens centralizzati e riutilizzabili
 * ✅ Performance: Caricamento ottimizzato
 * ✅ Maintainability: Codice modulare e documentato
 * ✅ User Experience: Loading professionale con tape reels animati
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { PresetBrowser, Preset } from './components/PresetBrowser';
import { LoadingScreen } from './components/LoadingScreen';
import { useDesignTokens } from './hooks/useDesignTokens';
import { FigmaLayoutFinal as FigmaLayout } from './components/FigmaLayoutProfessional';

const PLUGIN_BASE_WIDTH = 680;
const PLUGIN_BASE_HEIGHT = 1050;
const PLUGIN_BASE_SCALE = 0.8;
const CM_TO_PX = 37.7952755906;
const UI_MARGIN_CM = 1;
const UI_MARGIN_PX = Math.round(CM_TO_PX * UI_MARGIN_CM);
const PLUGIN_TARGET_WIDTH = Math.round(PLUGIN_BASE_WIDTH * PLUGIN_BASE_SCALE);
const PLUGIN_TARGET_HEIGHT = Math.round(PLUGIN_BASE_HEIGHT * PLUGIN_BASE_SCALE);
const PLUGIN_CONTAINER_WIDTH = PLUGIN_TARGET_WIDTH + UI_MARGIN_PX * 2;
const PLUGIN_CONTAINER_HEIGHT = PLUGIN_TARGET_HEIGHT + UI_MARGIN_PX * 2;
const GUI_SCALE_VERSION = '9';
const GUI_SCALE_DEFAULT = 1;
const GUI_SCALE_MIN = 0.5;

const PARAM_INDEX = Object.freeze({
  drive: 0,           // kParamDriveGain
  // tone: 1,         // kParamDriveVU (VU meter, auto)
  toneLow: 2,         // kParamToneLowGain
  toneHigh: 3,        // kParamToneHighGain
  toneMidQ: 4,        // kParamToneMidQ
  mpc: 5,             // kParamMpcBits
  resampler: 6,       // kParamResampleRatio
  wow: 7,             // kParamWowAmount
  wowRate: 8,         // kParamWowRate
  flutter: 9,         // kParamFlutterAmount
  flutterRate: 10,    // kParamFlutterRate
  noise: 11,          // kParamNoiseLevel
  lowPass: 12,        // kParamLowPassCutoff
  lowPassRes: 13,     // kParamLowPassResonance
  output: 14,         // kParamOutputGain (-12 to +12 dB)
  clipThreshold: 15,  // kParamClipThreshold
  clipperMode: 16,    // kParamClipMode
  clipSlope: 17,      // kParamClipSlope
  power: 18           // kParamPower
});

// DSP Integration Interface (optional - for backend integration)
export interface DSPInterface {
  onParameterChange?: (parameterId: string, value: number | boolean) => void;
  onMeterUpdate?: (level: number) => void;
  getClippingState?: () => boolean;
}

interface AppProps {
  dsp?: DSPInterface;
  initialParameters?: {
    drive?: number;
    tone?: number;
    mpc?: number;
    wow?: number;
    noise?: number;
    flutter?: number;
    resampler?: number;
    lowPass?: number;
    outputGain?: number;
    clipperEnabled?: boolean;
    isPowerOn?: boolean;
    clipperMode?: number;
    antiAlias?: boolean;
  };
}

export default function App({ dsp, initialParameters }: AppProps = {}) {
  // 🎨 Design Tokens Integration - Caricamento automatico da Figma
  const designTokensState = useDesignTokens();

  const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  const missingBridgeWarning = useRef(false);

  const sendParamToPlugin = (paramIndex: number, normalizedValue?: number, absoluteValue?: number) => {
    const normalized = typeof normalizedValue === 'number' ? clamp(normalizedValue) : undefined;

    if (typeof window.IPlugSendMsg === 'function' && typeof normalized === 'number') {
      const msg = window.IPlugSendMsg;
      msg({ msg: 'BPCFUI', paramIdx: paramIndex });
      msg({ msg: 'SPVFUI', paramIdx: paramIndex, value: normalized });
      msg({ msg: 'EPCFUI', paramIdx: paramIndex });
      return;
    }

    const pluginAPI = window.IPLUG;
    if (!pluginAPI) {
      if (!missingBridgeWarning.current) {
        missingBridgeWarning.current = true;
        console.warn('[LoFiTape] IPlug bridge not detected. UI parameter changes will not reach the DSP.');
      }
      return;
    }

    const normalizedSetter = pluginAPI.setParameterValueNormalized ?? pluginAPI.setParameterNormalizedValue;
    const absoluteSetter = pluginAPI.setParameterValue;
    const beginGesture = pluginAPI.beginParameterChangeGesture;
    const endGesture = pluginAPI.endParameterChangeGesture;

    if (typeof beginGesture === 'function') {
      beginGesture(paramIndex);
    }

    let dispatched = false;

    if (typeof normalizedSetter === 'function' && typeof normalized === 'number') {
      normalizedSetter.call(pluginAPI, paramIndex, normalized);
      dispatched = true;
    }
    else if (typeof absoluteSetter === 'function' && typeof absoluteValue === 'number') {
      absoluteSetter.call(pluginAPI, paramIndex, absoluteValue);
      dispatched = true;
    }

    if (dispatched && typeof endGesture === 'function') {
      endGesture(paramIndex);
    }
  };

  // State management for all parameters
  const [drive, setDrive] = useState(initialParameters?.drive ?? 0);
  const [tone, setTone] = useState(initialParameters?.tone ?? 0);
  // Default MPC set to 0 (maps to 16-bit)
  const [mpc, setMpc] = useState(initialParameters?.mpc ?? 0);
  const [wow, setWow] = useState(initialParameters?.wow ?? 0);
  const [noise, setNoise] = useState(initialParameters?.noise ?? 0);
  const [flutter, setFlutter] = useState(initialParameters?.flutter ?? 0);
  const [resampler, setResampler] = useState(initialParameters?.resampler ?? 100);
  const [lowPass, setLowPass] = useState(initialParameters?.lowPass ?? 100); // 100 -> 20 kHz (fully open)
  // Output gain defaults to 0 dB (parameter value 67)
  const [outputGain, setOutputGain] = useState(initialParameters?.outputGain ?? 67);
  const [isPowerOn, setIsPowerOn] = useState(initialParameters?.isPowerOn ?? true);
  const [clipperEnabled, setClipperEnabled] = useState(initialParameters?.clipperEnabled ?? false);
  const [clipperMode, setClipperMode] = useState(initialParameters?.clipperMode ?? 50);
  const [antiAlias, setAntiAlias] = useState(initialParameters?.antiAlias ?? false);
  const [presetBrowserOpen, setPresetBrowserOpen] = useState(false);
  const [clipperPanelOpen, setClipperPanelOpen] = useState(false);
  const [isClipping, setIsClipping] = useState(false);
  const [guiScale] = useState(() => {
    const version = localStorage.getItem('inthebox-gui-scale-version');

    if (version !== GUI_SCALE_VERSION) {
      localStorage.setItem('inthebox-gui-scale', GUI_SCALE_DEFAULT.toString());
      localStorage.setItem('inthebox-gui-scale-version', GUI_SCALE_VERSION);
      return GUI_SCALE_DEFAULT;
    }

    const saved = localStorage.getItem('inthebox-gui-scale');
    if (!saved) {
      return GUI_SCALE_DEFAULT;
    }

    const parsed = parseFloat(saved);
    return parsed === GUI_SCALE_MIN ? GUI_SCALE_MIN : GUI_SCALE_DEFAULT;
  });
  const [anchorVersion, setAnchorVersion] = useState(0);

  useEffect(() => {
    localStorage.setItem('inthebox-gui-scale', guiScale.toString());
  }, [guiScale]);

  const pluginContainerRef = useRef<HTMLDivElement | null>(null);
  const presetAnchorRef = useRef<HTMLButtonElement | null>(null);

  const handlePresetAnchorChange = useCallback((node: HTMLButtonElement | null) => {
    const previous = presetAnchorRef.current;
    presetAnchorRef.current = node;
    if (previous !== node) {
      setAnchorVersion(count => count + 1);
    }
  }, [setAnchorVersion]);

  // Helper function to notify DSP of parameter changes
  const notifyDSP = (parameterId: 'Drive' | 'Tone' | 'MPC' | 'Wow' | 'Noise' | 'Flutter' | 'Resampler' | 'LowPass' | 'OutputGain' | 'Power' | 'ClipperEnabled' | 'ClipperMode' | 'AntiAlias', value: number | boolean) => {
    dsp?.onParameterChange?.(parameterId, value);

    switch (parameterId) {
      case 'Drive': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.drive, normalized, value);
        break;
      }
      case 'Tone': {
        if (typeof value !== 'number') break;
        // TODO: Map single tone value to Low/High/MidQ parameters
        // For now, just use it for toneLow
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.toneLow, normalized, value);
        break;
      }
      case 'MPC': {
        if (typeof value !== 'number') break;
        // Invert mapping: 0% = 16-bit (1.0), 100% = 4-bit (0.2)
        // Formula: map 0-100 to 16-4 bits, then normalize to 0-1 range
        const bitDepth = 16 - (value / 100) * 12; // 16 to 4 bits
        const normalized = clamp((bitDepth - 1) / 15); // Convert to 0-1 range (1-16 → 0-1)
        sendParamToPlugin(PARAM_INDEX.mpc, normalized, value);
        break;
      }
      case 'Wow': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.wow, normalized, value);
        break;
      }
      case 'Noise': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.noise, normalized, value);
        break;
      }
      case 'Flutter': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.flutter, normalized, value);
        break;
      }
      case 'Resampler': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.resampler, normalized, value);
        break;
      }
      case 'LowPass': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.lowPass, normalized, value);
        break;
      }
      case 'OutputGain': {
        if (typeof value !== 'number') break;
        // Convert 0-100 slider to -12 to +12 dB
        const dbValue = (value / 100) * 24 - 12;  // 0->-12, 50->0, 100->+12
        const normalized = (dbValue + 12) / 24;    // Normalize to 0-1
        sendParamToPlugin(PARAM_INDEX.output, normalized, dbValue);
        break;
      }
      case 'ClipperMode': {
        if (typeof value !== 'number') break;
        const normalized = clamp(value / 100);
        sendParamToPlugin(PARAM_INDEX.clipperMode, normalized, value);
        break;
      }
      case 'ClipperEnabled': {
        // TODO: Use clipThreshold instead
        // const enabled = Boolean(value);
        // const normalized = enabled ? 1 : 0;
        // sendParamToPlugin(PARAM_INDEX.clipperEnabled, normalized, normalized);
        break;
      }
      case 'AntiAlias': {
        // TODO: AntiAlias not in VST yet
        // const enabled = Boolean(value);
        // const normalized = enabled ? 1 : 0;
        // sendParamToPlugin(PARAM_INDEX.antiAlias, normalized, normalized);
        break;
      }
      case 'Power': {
        // Power switch: true = ON (right), false = OFF (left/bypass)
        const isOn = Boolean(value);
        const normalized = isOn ? 1 : 0;
        sendParamToPlugin(PARAM_INDEX.power, normalized, normalized);
        break;
      }
    }
  };

  // Wrapped setters that notify DSP
  const setDriveWithDSP = (value: number) => {
    setDrive(value);
    notifyDSP('Drive', value);
  };

  const setToneWithDSP = (value: number) => {
    setTone(value);
    notifyDSP('Tone', value);
  };

  const setMpcWithDSP = (value: number) => {
    setMpc(value);
    notifyDSP('MPC', value);
  };

  const setWowWithDSP = (value: number) => {
    setWow(value);
    notifyDSP('Wow', value);
  };

  const setNoiseWithDSP = (value: number) => {
    setNoise(value);
    notifyDSP('Noise', value);
  };

  const setFlutterWithDSP = (value: number) => {
    setFlutter(value);
    notifyDSP('Flutter', value);
  };

  const setResamplerWithDSP = (value: number) => {
    setResampler(value);
    notifyDSP('Resampler', value);
  };

  const setLowPassWithDSP = (value: number) => {
    setLowPass(value);
    notifyDSP('LowPass', value);
  };

  const setOutputGainWithDSP = (value: number) => {
    setOutputGain(value);
    notifyDSP('OutputGain', value);
  };

  const setIsPowerOnWithDSP = (value: boolean) => {
    setIsPowerOn(value);
    notifyDSP('Power', value);
  };

  const setClipperModeWithDSP = (value: number) => {
    setClipperMode(value);
    notifyDSP('ClipperMode', value);
  };

  const setClipperEnabledWithDSP = (value: boolean) => {
    setClipperEnabled(value);
    notifyDSP('ClipperEnabled', value);
  };

  const setAntiAliasWithDSP = (value: boolean) => {
    setAntiAlias(value);
    notifyDSP('AntiAlias', value);
  };

  useEffect(() => {
    const handleParameterUpdate = (name: string, value: number | boolean) => {
      switch (name) {
        case 'Drive':
          setDrive(typeof value === 'number' ? value : Number(value));
          break;
        case 'Tone':
          setTone(typeof value === 'number' ? value : Number(value));
          break;
        case 'MPC':
          setMpc(typeof value === 'number' ? value : Number(value));
          break;
        case 'Wow':
          setWow(typeof value === 'number' ? value : Number(value));
          break;
        case 'Noise':
          setNoise(typeof value === 'number' ? value : Number(value));
          break;
        case 'Flutter':
          setFlutter(typeof value === 'number' ? value : Number(value));
          break;
        case 'Resampler':
          setResampler(typeof value === 'number' ? value : Number(value));
          break;
        case 'LowPass':
          setLowPass(typeof value === 'number' ? value : Number(value));
          break;
        case 'Output':
          setOutputGain(typeof value === 'number' ? value : Number(value));
          break;
        case 'Power':
          setIsPowerOn(Boolean(value));
          break;
        case 'ClipperMode':
          setClipperMode(typeof value === 'number' ? value : Number(value));
          break;
        case 'ClipperEnabled':
          setClipperEnabled(Boolean(value));
          break;
        case 'AntiAlias':
          setAntiAlias(Boolean(value));
          break;
        default:
          break;
      }
    };

    const handleClippingUpdate = (flag: boolean) => {
      setIsClipping(Boolean(flag));
    };

    const handleVUMeterUpdate = (level: number) => {
      if (typeof window.__updateDriveVU === 'function') {
        window.__updateDriveVU(level);
      }
    };

    window.updateParameter = handleParameterUpdate;
    window.updateClipping = handleClippingUpdate;
    window.updateVUMeter = handleVUMeterUpdate;

    return () => {
      if (window.updateParameter === handleParameterUpdate) {
        delete window.updateParameter;
      }
      if (window.updateClipping === handleClippingUpdate) {
        delete window.updateClipping;
      }
      if (window.updateVUMeter === handleVUMeterUpdate) {
        delete window.updateVUMeter;
      }
    };
  }, []);

  // Preset handling
  const handleLoadPreset = (preset: Preset) => {
    setDriveWithDSP(preset.parameters.drive);
    setToneWithDSP(preset.parameters.tone);
    setMpcWithDSP(preset.parameters.mpc);
    setWowWithDSP(preset.parameters.wow);
    setNoiseWithDSP(preset.parameters.noise);
    setFlutterWithDSP(preset.parameters.flutter);
    setResamplerWithDSP(preset.parameters.resampler);
    setLowPassWithDSP(preset.parameters.lowPass);
    const presetOutputGain = typeof preset.parameters.outputGain === 'number'
      ? preset.parameters.outputGain
      : 100;
    setOutputGainWithDSP(presetOutputGain);
  const clipperEngaged = typeof preset.parameters.clipperEnabled === 'boolean' ? preset.parameters.clipperEnabled : false;
    setClipperEnabledWithDSP(clipperEngaged);
    setClipperModeWithDSP(preset.parameters.clipperMode);
  const antiAliasEnabled = typeof preset.parameters.antiAlias === 'boolean' ? preset.parameters.antiAlias : false;
    setAntiAliasWithDSP(antiAliasEnabled);
  };

  // 📊 Log Design Tokens quando caricati
  useEffect(() => {
    if (designTokensState.isLoaded) {
      console.log(`✅ App pronta con ${designTokensState.tokensCount} design tokens`);
    }
    if (designTokensState.error) {
      console.error('❌ Errore design tokens:', designTokensState.error);
    }
  }, [designTokensState]);

  return (
    <LoadingScreen 
      isLoading={!designTokensState.isLoaded} 
      error={designTokensState.error}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${PLUGIN_CONTAINER_WIDTH}px`,
          height: `${PLUGIN_CONTAINER_HEIGHT}px`,
          padding: `${UI_MARGIN_PX}px`,
          boxSizing: 'border-box',
          background: 'var(--color-wood-dark, linear-gradient(180deg, #4a3428 0%, #2a1810 100%))',
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255,200,150,0.05) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h30v30H0z' fill='%23000' fill-opacity='0.05'/%3E%3C/svg%3E")
          `,
          borderRadius: '12px',
          overflow: 'hidden',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none'
        }}
      >
        {/* Floating controls: presets */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
          <div className="relative">
            <button
              onClick={() => setPresetBrowserOpen(true)}
              className="px-3 py-1"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#2a1810',
                background: 'linear-gradient(180deg, #c8a870, #a88850)',
                boxShadow: 'inset 0 1px 2px rgba(255,220,180,0.7), inset 0 -2px 3px rgba(60,40,20,0.6), 0 2px 6px rgba(0,0,0,0.4)',
                border: '1px solid #8a6830',
                borderRadius: '3px',
                cursor: 'pointer',
                textShadow: '0.5px 0.5px 0 rgba(255,240,200,0.8)'
              }}
            >
              PRESETS
            </button>
          </div>
        </div>

        <div
          className="relative"
          ref={pluginContainerRef}
          style={{
            transform: `scale(${guiScale * PLUGIN_BASE_SCALE})`,
            transformOrigin: 'center center',
            transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <FigmaLayout
            drive={drive}
            tone={tone}
            mpc={mpc}
            wow={wow}
            noise={noise}
            flutter={flutter}
            resampler={resampler}
            lowPass={lowPass}
            outputGain={outputGain}
            setDrive={setDriveWithDSP}
            setTone={setToneWithDSP}
            setMpc={setMpcWithDSP}
            setWow={setWowWithDSP}
            setNoise={setNoiseWithDSP}
            setFlutter={setFlutterWithDSP}
            setResampler={setResamplerWithDSP}
            setLowPass={setLowPassWithDSP}
            setOutputGain={setOutputGainWithDSP}
            isPowerOn={isPowerOn}
            setIsPowerOn={setIsPowerOnWithDSP}
            clipperEnabled={clipperEnabled}
            setClipperEnabled={setClipperEnabledWithDSP}
            clipperMode={clipperMode}
            setClipperMode={setClipperModeWithDSP}
            clipperPanelOpen={clipperPanelOpen}
            setClipperPanelOpen={setClipperPanelOpen}
            isClipping={isClipping}
            antiAlias={antiAlias}
            setAntiAlias={setAntiAliasWithDSP}
            presetBrowserOpen={presetBrowserOpen}
            setPresetBrowserOpen={setPresetBrowserOpen}
            presetAnchorRef={presetAnchorRef}
            onPresetAnchorChange={handlePresetAnchorChange}
          />
          {presetBrowserOpen && (
            <PresetBrowser
              isOpen={presetBrowserOpen}
              onClose={() => setPresetBrowserOpen(false)}
              anchorRef={presetAnchorRef}
              fallbackAnchorRef={pluginContainerRef}
              anchorVersion={anchorVersion}
              currentParameters={{
                drive,
                tone,
                mpc,
                wow,
                noise,
                flutter,
                resampler,
                lowPass,
                outputGain,
                clipperEnabled,
                clipperMode,
                antiAlias
              }}
              onLoadPreset={handleLoadPreset}
            />
          )}
        </div>
      </div>
    </LoadingScreen>
  );
}