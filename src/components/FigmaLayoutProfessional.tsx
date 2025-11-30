/**
 * FigmaLayoutProfessional - EXACT COPY from reference screenshot
 * Professional audio plugin GUI with pixel-perfect details
 * DSP Chain: INPUT → DRIVE → TONE → BIT REDUCTION → RESAMPLER → WOW → FLUTTER → LOW PASS → NOISE → OUTPUT GAIN → CLIPPER → OUTPUT
 */

import React, { useCallback, useEffect, useMemo } from 'react';
import { Knob } from './Knob';
import { VUMeter } from './VUMeter';
import { TapeReels } from './TapeReels';
import { ToggleSwitch } from './ToggleSwitch';
import { useAudioProcessor } from '../hooks/useAudioProcessor';
import { formatHz, mapLowPassParamToHz, formatLowPassParamToHz } from '../utils/parameterFormatters';

interface FigmaLayoutProfessionalProps {
  drive: number;
  tone: number;
  mpc: number;
  wow: number;
  noise: number;
  flutter: number;
  resampler: number;
  lowPass: number;
  outputGain: number;
  setDrive: (value: number) => void;
  setTone: (value: number) => void;
  setMpc: (value: number) => void;
  setWow: (value: number) => void;
  setNoise: (value: number) => void;
  setFlutter: (value: number) => void;
  setResampler: (value: number) => void;
  setLowPass: (value: number) => void;
  setOutputGain: (value: number) => void;
  isPowerOn: boolean;
  setIsPowerOn: (value: boolean) => void;
  clipperEnabled?: boolean;
  setClipperEnabled?: (value: boolean) => void;
  clipperMode?: number;
  setClipperMode?: (value: number) => void;
  clipperPanelOpen?: boolean;
  setClipperPanelOpen?: (value: boolean) => void;
  isClipping?: boolean;
  antiAlias?: boolean;
  setAntiAlias?: (value: boolean) => void;
  presetBrowserOpen?: boolean;
  setPresetBrowserOpen?: (value: boolean) => void;
  presetAnchorRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onPresetAnchorChange?: (node: HTMLButtonElement | null) => void;
}

type ClipperModeId = 'soft' | 'medium' | 'hard';

interface ClipperModeConfig {
  id: ClipperModeId;
  label: string;
  subtitle: string;
  description: string;
  value: number;
  accent: string;
}

const CLIPPER_MODES: ClipperModeConfig[] = [
  {
    id: 'soft',
    label: 'Soft Clip',
    subtitle: 'Triode Saturation',
    description: 'Smooth Lavry-style knee that eases transients and adds tape-like density without harshness.',
    value: 18,
    accent: '#c58b4e'
  },
  {
    id: 'medium',
    label: 'Lavry Classic',
    subtitle: 'Dual-Stage Curve',
    description: 'Signature Lavry Gold contour—transparent until pushed, then clamps peaks with musical precision.',
    value: 52,
    accent: '#8f9fd4'
  },
  {
    id: 'hard',
    label: 'Hard Limit',
    subtitle: 'Brickwall Control',
    description: 'Maximum crest-factor control. Keeps converters safe while preserving punchy low-end drive.',
    value: 86,
    accent: '#d77979'
  }
];

const getClosestClipperMode = (value: number): ClipperModeConfig => {
  return CLIPPER_MODES.reduce((closest, mode) => {
    const currentDiff = Math.abs(mode.value - value);
    const closestDiff = Math.abs(closest.value - value);
    return currentDiff < closestDiff ? mode : closest;
  }, CLIPPER_MODES[0]);
};

const mapMpcToBitDepth = (value: number): number => {
  const clamped = Math.min(100, Math.max(0, value));
  const bitDepth = 16 - (clamped / 100) * 12;
  return Math.max(4, Math.min(16, Math.round(bitDepth)));
};

const mapOutputGainToDb = (value: number): number => {
  const clamped = Math.min(100, Math.max(0, value));
  const normalized = clamped / 100;
  return -24 + normalized * 36; // -24 dB to +12 dB
};

export const FigmaLayoutProfessional: React.FC<FigmaLayoutProfessionalProps> = ({
  drive, tone, mpc, wow, noise, flutter, resampler, lowPass, outputGain,
  setDrive, setTone, setMpc, setWow, setNoise, setFlutter,
  setResampler, setLowPass, setOutputGain,
  isPowerOn, setIsPowerOn,
  clipperEnabled = false,
  setClipperEnabled,
  clipperMode = 50,
  setClipperMode,
  clipperPanelOpen = false,
  setClipperPanelOpen,
  isClipping = false,
  antiAlias = false,
  setAntiAlias,
  presetBrowserOpen = false,
  setPresetBrowserOpen,
  presetAnchorRef,
  onPresetAnchorChange
}) => {
  const handlePresetAnchorRef = useCallback((node: HTMLButtonElement | null) => {
    if (presetAnchorRef) {
      presetAnchorRef.current = node;
    }
    if (onPresetAnchorChange) {
      onPresetAnchorChange(node);
    }
  }, [presetAnchorRef, onPresetAnchorChange]);

  const activeClipperMode = useMemo(() => getClosestClipperMode(clipperMode), [clipperMode]);
  const bitDepth = useMemo(() => mapMpcToBitDepth(mpc), [mpc]);
  const lowPassHz = useMemo(() => mapLowPassParamToHz(lowPass), [lowPass]);
  const outputGainDb = useMemo(() => mapOutputGainToDb(outputGain), [outputGain]);

  // Initialize DSP processor
  const audioProcessor = useAudioProcessor();

  // Sync GUI parameters with audio processor
  useEffect(() => {
    if (audioProcessor.isInitialized && isPowerOn) {
      audioProcessor.setDrive(drive / 100);
      audioProcessor.setTone(tone / 100);
      audioProcessor.setBitDepth(bitDepth);
      audioProcessor.setResampleRate(1 - (resampler / 100 * 0.9)); // 100% to 10%
      audioProcessor.setWow(wow / 100);
      audioProcessor.setFlutter(flutter / 100);
    audioProcessor.setLowPass(lowPassHz);
    audioProcessor.setOutputGainDb(outputGainDb);

      audioProcessor.setClipperMode(activeClipperMode.id);
      audioProcessor.setClipperEnabled(clipperEnabled);
      audioProcessor.setAntiAliasEnabled(antiAlias);
    }
  }, [drive, tone, bitDepth, resampler, wow, flutter, lowPassHz, outputGainDb, isPowerOn, audioProcessor, activeClipperMode.id, antiAlias, clipperEnabled]);

  // Log DSP status
  useEffect(() => {
    if (audioProcessor.isInitialized) {
      console.log('🎛️ DSP Chain Active:', {
        drive: `${drive}%`,
        tone: `${tone}%`,
        bitDepth: `${bitDepth} bits`,
        resampleRate: `${Math.round((1 - (resampler / 100 * 0.9)) * 100)}%`,
        wow: `${wow}%`,
        flutter: `${flutter}%`,
  lowPass: formatHz(lowPassHz),
        outputGain: `${outputGainDb.toFixed(1)} dB`,
        clipperMode: activeClipperMode.label.toUpperCase(),
        clipperEnabled: clipperEnabled ? 'ENGAGED' : 'BYPASSED',
        antiAlias: antiAlias ? 'ENABLED' : 'BYPASSED'
      });
    }
  }, [audioProcessor.isInitialized, drive, tone, bitDepth, resampler, wow, flutter, lowPassHz, outputGainDb, activeClipperMode.label, clipperEnabled, antiAlias]);

  const handleClipperModeSelect = useCallback((mode: ClipperModeConfig) => {
    if (!clipperEnabled && setClipperEnabled) {
      setClipperEnabled(true);
    }
    if (!clipperEnabled && audioProcessor.isInitialized) {
      audioProcessor.setClipperEnabled(true);
    }
    if (setClipperMode) {
      setClipperMode(mode.value);
    }
    if (audioProcessor.isInitialized) {
      audioProcessor.setClipperMode(mode.id);
    }
    if (setClipperPanelOpen) {
      setClipperPanelOpen(false);
    }
  }, [audioProcessor, clipperEnabled, setClipperEnabled, setClipperMode, setClipperPanelOpen]);

  const toggleAntiAlias = useCallback(() => {
    if (setAntiAlias) {
      setAntiAlias(!antiAlias);
    }
    if (audioProcessor.isInitialized) {
      audioProcessor.setAntiAliasEnabled(!antiAlias);
    }
  }, [antiAlias, audioProcessor, setAntiAlias]);

  const toggleClipperEnabled = useCallback(() => {
    const next = !clipperEnabled;
    if (setClipperEnabled) {
      setClipperEnabled(next);
    }
    if (audioProcessor.isInitialized) {
      audioProcessor.setClipperEnabled(next);
    }
  }, [audioProcessor, clipperEnabled, setClipperEnabled]);


  const Screw = ({ size = 8 }: { size?: number }) => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #8a8a8a, #3a3a3a, #1a1a1a)',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 3px rgba(0,0,0,0.8)',
      border: '0.5px solid #0a0a0a',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '1px',
        background: '#2a2a2a'
      }} />
    </div>
  );

  return (
    // OUTER WOODEN CHASSIS - Dark brown wood
    <div className="flex items-center justify-center" style={{
      width: '100%',
      minHeight: '100vh',
      background: '#2a1a10',
      padding: '40px'
    }}>
      <div className="relative" style={{
        width: '680px',
        height: '1050px',
        background: 'linear-gradient(180deg, #1a0d06 0%, #2a1810 40%, #1a0d06 100%)',
        border: '5px solid #0a0500',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 50px 100px rgba(0,0,0,0.98), inset 0 3px 6px rgba(80,50,30,0.25), inset 0 -3px 6px rgba(0,0,0,0.9)',
        position: 'relative'
      }}>
        
        {/* Wood grain texture overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-lg opacity-20" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(60,40,20,0.3) 1px, rgba(60,40,20,0.3) 2px)',
          mixBlendMode: 'overlay'
        }} />

        {/* Outer corner screws */}
        <div className="absolute" style={{top: '10px', left: '10px'}}><Screw size={10} /></div>
        <div className="absolute" style={{top: '10px', right: '10px'}}><Screw size={10} /></div>
        <div className="absolute" style={{bottom: '10px', left: '10px'}}><Screw size={10} /></div>
        <div className="absolute" style={{bottom: '10px', right: '10px'}}><Screw size={10} /></div>

        {/* INNER BEIGE PANEL with subtle linen texture */}
        <div className="relative w-full h-full" style={{
          background: '#ddd0bb',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(140,120,100,0.08) 1px, rgba(140,120,100,0.08) 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, rgba(140,120,100,0.08) 1px, rgba(140,120,100,0.08) 2px)
          `,
          backgroundSize: '4px 4px',
          border: '4px solid #7a5f42',
          borderRadius: '8px',
          padding: '24px 24px 12px',
          boxShadow: 'inset 0 4px 12px rgba(255,250,245,0.5), inset 0 -4px 12px rgba(80,60,40,0.6), 0 6px 20px rgba(0,0,0,0.6)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Linen texture pattern */}
          <div className="absolute inset-0 pointer-events-none rounded opacity-15" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(100,80,60,0.12) 4px, rgba(100,80,60,0.12) 5px),
              repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(100,80,60,0.12) 4px, rgba(100,80,60,0.12) 5px)
            `
          }} />

          {/* Inner corner screws */}
          <div className="absolute" style={{top: '10px', left: '10px'}}><Screw size={8} /></div>
          <div className="absolute" style={{top: '10px', right: '10px'}}><Screw size={8} /></div>
          <div className="absolute" style={{bottom: '10px', left: '10px'}}><Screw size={8} /></div>
          <div className="absolute" style={{bottom: '10px', right: '10px'}}><Screw size={8} /></div>

          <div className="flex flex-col relative" style={{flex: 1, gap: '12px'}}>
            
            {/* === HEADER: Title Badge + 75% Badge === */}
            <div className="relative flex items-center justify-center" style={{marginBottom: '8px'}}>
              {/* Main title badge - clickable for preset menu */}
              <button 
                ref={handlePresetAnchorRef}
                onClick={() => setPresetBrowserOpen && setPresetBrowserOpen(!presetBrowserOpen)}
                className="relative cursor-pointer hover:brightness-105 transition-all"
                style={{
                  padding: '10px 42px 12px',
                  background: 'linear-gradient(180deg, #d4af72 0%, #c29a58 50%, #a8803e 100%)',
                  boxShadow: 'inset 0 3px 6px rgba(255,245,210,0.95), inset 0 -3px 5px rgba(40,30,20,0.85), 0 5px 12px rgba(0,0,0,0.6)',
                  border: '2.5px solid #8a6530',
                  borderRadius: '5px'
                }}
              >
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  color: '#1f0e03',
                  letterSpacing: '2px',
                  textShadow: '1.5px 1.5px 1.5px rgba(255,248,225,0.95), -0.5px -0.5px 0 rgba(0,0,0,0.4)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  lineHeight: '1.1'
                }}>
                  LO-FI TAPE SATURATOR
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '7.5px',
                  color: '#3d2614',
                  letterSpacing: '1.6px',
                  textAlign: 'center',
                  marginTop: '4px',
                  textShadow: '0.5px 0.5px 0 rgba(255,245,220,0.7)'
                }}>
                  ★ ANALOG WARMTH PROCESSOR ★
                </div>
              </button>

            </div>

          {/* Top grid: VU METER (Left) + DRIVE (Right) */}
          <div className="grid grid-cols-2 gap-4" style={{marginBottom: '12px'}}>
            
            {/* LEFT: VU METER Section */}
            <div className="relative flex flex-col" style={{
              background: 'linear-gradient(145deg, #1c1612 0%, #0e0b08 100%)',
              border: '3.5px solid #2d2318',
              borderRadius: '5px',
              padding: '14px 12px',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.98), 0 5px 15px rgba(0,0,0,0.75)'
            }}>
              <div className="absolute" style={{top: '8px', left: '8px'}}><Screw size={6} /></div>
              <div className="absolute" style={{top: '8px', right: '8px'}}><Screw size={6} /></div>
              <div className="absolute" style={{bottom: '8px', left: '8px'}}><Screw size={6} /></div>
              <div className="absolute" style={{bottom: '8px', right: '8px'}}><Screw size={6} /></div>
              
              <div className="text-center" style={{marginBottom: '10px'}}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '9px',
                  color: '#cda768',
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 4px rgba(0,0,0,0.95)'
                }}>
                  PREAMP
                </div>
              </div>
              
              {/* VU Meter - legge solo il DRIVE */}
              <div className="flex justify-center" style={{marginBottom: '8px'}}>
                <div style={{
                  width: '100%',
                  '--vu-meter-width': '100%',
                  '--vu-meter-height': '90px',
                  '--led-size': '6px'
                } as React.CSSProperties}>
                  <VUMeter />
                </div>
              </div>
              
              {/* Cassette Display compatto */}
              <div style={{
                background: 'linear-gradient(145deg, #ddd0bb 0%, #d0c3ae 100%)',
                border: '2px solid #8a7860',
                borderRadius: '3px',
                padding: '12px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ transform: 'scale(1.0)', transformOrigin: 'center' }}>
                  <TapeReels />
                </div>
              </div>
            </div>

            {/* RIGHT: DRIVE Section */}
            <div className="relative flex flex-col" style={{
              background: 'linear-gradient(145deg, #1c1612 0%, #0e0b08 100%)',
              border: '3.5px solid #2d2318',
              borderRadius: '5px',
              padding: '14px 12px',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.98), 0 5px 15px rgba(0,0,0,0.75)'
            }}>
              <div className="absolute" style={{top: '8px', left: '8px'}}><Screw size={6} /></div>
              <div className="absolute" style={{top: '8px', right: '8px'}}><Screw size={6} /></div>
              <div className="absolute" style={{bottom: '8px', left: '8px'}}><Screw size={6} /></div>
              <div className="absolute" style={{bottom: '8px', right: '8px'}}><Screw size={6} /></div>
              
              <div className="text-center" style={{marginBottom: '10px'}}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '9px',
                  color: '#cda768',
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 4px rgba(0,0,0,0.95)'
                }}>
                  DRIVE
                </div>
              </div>
              
              {/* Drive Knob */}
              <div className="flex justify-center" style={{marginBottom: '12px'}}>
                <div className="flex flex-col items-center">
                  <div style={{ transform: 'scale(1.15)' }}>
                    <Knob label="" value={drive} onChange={setDrive} size="large" unit="" />
                  </div>
                  <div className="mt-2" style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '9.5px',
                    color: '#8a7860',
                    padding: '2px 8px',
                    background: 'rgba(200,168,112,0.14)',
                    borderRadius: '3px',
                    border: '1px solid rgba(200,168,112,0.28)',
                    minWidth: '42px',
                    textAlign: 'center'
                  }}>
                    {Math.round(drive)}%
                  </div>
                </div>
              </div>

              {/* Power Toggle */}
              <div className="flex justify-center" style={{marginBottom: '12px'}}>
                <div className="flex flex-col items-center">
                  <ToggleSwitch
                    label=""
                    isOn={isPowerOn}
                    onToggle={() => setIsPowerOn(!isPowerOn)}
                    orientation="horizontal"
                  />
                  <div className="mt-2" style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '7.5px',
                    color: '#8a7860',
                    letterSpacing: '1.2px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.95)',
                    textTransform: 'uppercase'
                  }}>
                    POWER
                  </div>
                </div>
              </div>
              
              {/* Clip LED - clickable */}
              <div className="flex justify-center" style={{marginBottom: '12px'}}>
                <button
                  className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
                  style={{gap: '7px'}}
                  onClick={() => setClipperPanelOpen && setClipperPanelOpen(!clipperPanelOpen)}
                >
                  <div style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: isClipping 
                      ? 'radial-gradient(circle, #ff3300, #dd1100)' 
                      : 'radial-gradient(circle, #1a1008, #0a0500)',
                    boxShadow: isClipping 
                      ? '0 0 12px #ff3300, 0 0 7px #ff3300, inset 0 1px 2px rgba(255,100,50,0.4)' 
                      : 'inset 0 1px 2px rgba(0,0,0,0.95)',
                    border: '1px solid #0a0500',
                    transition: 'all 0.2s ease'
                  }} />
                  <span style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '7.5px',
                    color: '#8a7860',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}>CLIP</span>
                </button>
              </div>

              {/* Illuminated Air Vents */}
              <div className="mt-auto flex flex-col" style={{gap: '3.5px', padding: '0 18px'}}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    height: '3px',
                    background: drive > (i * 16.67) 
                      ? `linear-gradient(90deg, 
                          rgba(255, 140, 40, ${0.5 + (drive / 150)}), 
                          rgba(255, 100, 20, ${0.5 + (drive / 150)}), 
                          rgba(255, 140, 40, ${0.5 + (drive / 150)})
                        )`
                      : 'rgba(30, 22, 18, 0.85)',
                    borderRadius: '1.5px',
                    boxShadow: drive > (i * 16.67) 
                      ? `0 0 10px rgba(255, 120, 30, ${drive / 180}), 0 0 5px rgba(255, 140, 40, ${drive / 150})` 
                      : 'inset 0 1px 2px rgba(0,0,0,0.95)',
                    border: `0.5px solid ${drive > (i * 16.67) ? 'rgba(255,140,40,0.35)' : 'rgba(20,15,12,0.85)'}`,
                    transition: 'all 0.3s ease'
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* === WOODEN SEPARATOR BAR TOP === */}
          <div className="relative" style={{
            height: '12px',
            background: 'linear-gradient(145deg, #7a5f42 0%, #624a30 55%, #4a3520 100%)',
            border: '2.5px solid #3a2510',
            borderRadius: '4px',
            boxShadow: 'inset 0 3px 4px rgba(150,130,100,0.5), inset 0 -3px 4px rgba(20,15,10,0.85), 0 4px 8px rgba(0,0,0,0.5)',
            margin: '14px -8px 10px'
          }}>
            <div className="absolute left-8 top-1/2 -translate-y-1/2"><Screw size={6} /></div>
            <div className="absolute inset-x-0 top-1/2 flex justify-center -translate-y-1/2"><Screw size={6} /></div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2"><Screw size={6} /></div>
          </div>

          {/* === 8 KNOBS GRID (2 rows x 4 columns) === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            rowGap: '28px',
            columnGap: '16px',
            padding: '14px 22px',
            justifyItems: 'center'
          }}>
            {/* Row 1 */}
            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>TONE</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob label="" value={tone} onChange={setTone} size="medium" unit="%" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>MPC</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob label="" value={mpc} onChange={setMpc} size="medium" unit="" displayValue={(v) => mapMpcToBitDepth(v).toString()} />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>RESAMPLER</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob label="" value={resampler} onChange={setResampler} size="medium" unit="k" displayValue={(v) => `${(v * 44.1 / 100).toFixed(1)}`} />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>WOW</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob label="" value={wow} onChange={setWow} size="medium" unit="%" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>LOW PASS</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob
                  label=""
                  value={lowPass}
                  onChange={setLowPass}
                  size="medium"
                  displayValue={(v) => formatLowPassParamToHz(v)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>NOISE</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob label="" value={noise} onChange={setNoise} size="medium" unit="%" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>FLUTTER</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob label="" value={flutter} onChange={setFlutter} size="medium" unit="%" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#2a1808',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                width: '100%',
                textAlign: 'center'
              }}>OUTPUT GAIN</div>
              <div style={{ transform: 'scale(1.3)', display: 'flex', justifyContent: 'center' }}>
                <Knob
                  label=""
                  value={outputGain}
                  onChange={setOutputGain}
                  size="medium"
                  unit="dB"
                  displayValue={(v) => mapOutputGainToDb(v).toFixed(1)}
                />
              </div>
            </div>
          </div>

          {/* === WOODEN SEPARATOR BAR BOTTOM === */}
          <div className="relative" style={{
            height: '12px',
            background: 'linear-gradient(145deg, #7a5f42 0%, #624a30 55%, #4a3520 100%)',
            border: '2.5px solid #3a2510',
            borderRadius: '4px',
            boxShadow: 'inset 0 3px 4px rgba(150,130,100,0.5), inset 0 -3px 4px rgba(20,15,10,0.85), 0 4px 8px rgba(0,0,0,0.5)',
            margin: '12px -8px 6px'
          }}>
            <div className="absolute left-8 top-1/2 -translate-y-1/2"><Screw size={6} /></div>
            <div className="absolute inset-x-0 top-1/2 flex justify-center -translate-y-1/2"><Screw size={6} /></div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2"><Screw size={6} /></div>
          </div>

          {/* === FOOTER === */}
          <div className="flex items-center justify-between" style={{paddingTop: '6px'}}>
              {/* INTHEBOX Badge moved near former power LED location */}
            <a
              href="https://www.itbblog.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="relative" style={{
                padding: '7px 16px',
                background: 'linear-gradient(180deg, #d4af72 0%, #c29a58 50%, #a8803e 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,245,210,0.9), inset 0 -2px 4px rgba(40,30,20,0.9), 0 4px 8px rgba(0,0,0,0.55)',
                border: '2.5px solid #8a6530',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '10.5px',
                  color: '#1f0e03',
                  fontWeight: 'bold',
                  textShadow: '1.5px 1.5px 1.5px rgba(255,248,225,0.95)',
                  lineHeight: '1.2'
                }}>
                  INTHEBOX
                </div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '7.5px',
                  color: '#3d2614',
                  textAlign: 'center'
                }}>
                  VST3
                </div>
              </div>
            </a>

            {/* Since 2024 + DSP Status */}
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '7.5px',
              color: '#4a3820',
              fontStyle: 'italic',
              textShadow: '0 1px 1px rgba(255,255,255,0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px'
            }}>
              <span>Since 2024</span>
              {audioProcessor.isInitialized && (
                <span style={{
                  fontSize: '6px',
                  color: isPowerOn ? '#2d5a2d' : '#5a4a3a',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}>
                  {isPowerOn ? '● DSP ACTIVE' : '○ DSP STANDBY'}
                </span>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>

      {clipperPanelOpen && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(8, 6, 4, 0.82)',
            backdropFilter: 'blur(4px)',
            zIndex: 50,
            padding: '32px'
          }}
        >
          <div
            style={{
              width: '540px',
              background: 'linear-gradient(160deg, #1a130d 0%, #0e0b08 65%, #1b1410 100%)',
              border: '3px solid #413228',
              borderRadius: '10px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.85), inset 0 2px 8px rgba(255,220,180,0.08)',
              padding: '26px',
              position: 'relative'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '18px',
                gap: '16px'
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '18px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#d5b48c'
                  }}
                >
                  Lavry Gold Clipper Modes
                </div>
                <div
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '11px',
                    color: '#9d8970',
                    marginTop: '4px'
                  }}
                >
                  Choose how the saturation cell rounds or controls transients.
                </div>
              </div>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <button
                  type="button"
                  onClick={toggleClipperEnabled}
                  style={{
                    border: '1px solid rgba(210,190,160,0.4)',
                    background: clipperEnabled
                      ? 'linear-gradient(180deg, #d5b48c 0%, #9f7a50 80%)'
                      : 'linear-gradient(180deg, rgba(60,48,36,0.9) 0%, rgba(30,24,20,0.95) 100%)',
                    color: clipperEnabled ? '#2a1a08' : '#b59c7c',
                    fontFamily: 'Georgia, serif',
                    fontSize: '11px',
                    letterSpacing: '1.1px',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    boxShadow: clipperEnabled
                      ? '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,240,220,0.4)'
                      : '0 6px 12px rgba(0,0,0,0.4)',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {clipperEnabled ? 'Clipper: On' : 'Clipper: Off'}
                </button>
                <button
                  type="button"
                  onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)}
                  style={{
                    border: 'none',
                    background: 'rgba(210,180,140,0.12)',
                    color: '#d5b48c',
                    fontSize: '12px',
                    letterSpacing: '1.2px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                marginBottom: '18px'
              }}
            >
              {CLIPPER_MODES.map((mode) => {
                const isActive = mode.id === activeClipperMode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleClipperModeSelect(mode)}
                    disabled={!clipperEnabled}
                    style={{
                      background: isActive
                        ? `linear-gradient(180deg, ${mode.accent} 0%, rgba(10,10,10,0.9) 60%)`
                        : 'linear-gradient(180deg, rgba(40,32,24,0.9) 0%, rgba(18,14,10,0.95) 100%)',
                      border: isActive ? `2px solid ${mode.accent}` : '2px solid rgba(90,75,60,0.6)',
                      borderRadius: '8px',
                      padding: '14px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '6px',
                      cursor: clipperEnabled ? 'pointer' : 'not-allowed',
                      boxShadow: isActive
                        ? '0 12px 22px rgba(0,0,0,0.55), inset 0 2px 6px rgba(255,245,230,0.3)'
                        : '0 10px 18px rgba(0,0,0,0.45)',
                      transition: 'all 0.18s ease',
                      opacity: clipperEnabled ? 1 : 0.55
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '13px',
                        color: isActive ? '#0d0906' : '#d5b48c',
                        letterSpacing: '1.4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {mode.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '11px',
                        color: isActive ? '#120c08' : '#9d8970'
                      }}
                    >
                      {mode.subtitle}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '10px',
                        color: isActive ? '#1a120c' : '#74614c',
                        lineHeight: 1.3
                      }}
                    >
                      {mode.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(155, 135, 110, 0.35)',
                paddingTop: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#8f7a62'
                }}
              >
                {clipperEnabled ? (
                  <>
                    Active curve:
                    <span style={{ color: activeClipperMode.accent, fontWeight: 600, marginLeft: '6px' }}>
                      {activeClipperMode.label}
                    </span>
                  </>
                ) : (
                  <span style={{ color: '#b39a7c', fontWeight: 600 }}>
                    Clipper bypassed
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '10px',
                  letterSpacing: '1.4px',
                  color: '#6f5a44',
                  textTransform: 'uppercase'
                }}
              >
                Lavry Reference • Crest Guard
              </div>
              <button
                type="button"
                onClick={toggleAntiAlias}
                style={{
                  border: '1px solid rgba(210,190,160,0.4)',
                  background: antiAlias
                    ? 'linear-gradient(180deg, #d5b48c 0%, #9f7a50 80%)'
                    : 'linear-gradient(180deg, rgba(60,48,36,0.9) 0%, rgba(30,24,20,0.95) 100%)',
                  color: antiAlias ? '#2a1a08' : '#b59c7c',
                  fontFamily: 'Georgia, serif',
                  fontSize: '10px',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: antiAlias
                    ? '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,240,220,0.4)'
                    : '0 6px 12px rgba(0,0,0,0.4)',
                  transition: 'all 0.18s ease'
                }}
              >
                {antiAlias ? 'HQ ANTI-ALIAS: ON' : 'HQ ANTI-ALIAS: OFF'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export { FigmaLayoutProfessional as FigmaLayoutFinal };
