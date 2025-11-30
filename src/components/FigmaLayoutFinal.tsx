/**
 * FigmaLayoutFinal - Layout IDENTICO al design Figma originale
 * Struttura: 3 colonne verticali (DRIVE | TAPE | MASTER) + knobs in basso
 */

import React from 'react';
import { Knob } from './Knob';
import { VUMeter } from './VUMeter';
import { TapeReels } from './TapeReels';
import { ToggleSwitch } from './ToggleSwitch';
import { formatLowPassParamToHz } from '../utils/parameterFormatters';

interface FigmaLayoutFinalProps {
  drive: number;
  tone: number;
  mpc: number;
  wow: number;
  noise: number;
  flutter: number;
  resampler: number;
  lowPass: number;
  dryWet: number;
  setDrive: (value: number) => void;
  setTone: (value: number) => void;
  setMpc: (value: number) => void;
  setWow: (value: number) => void;
  setNoise: (value: number) => void;
  setFlutter: (value: number) => void;
  setResampler: (value: number) => void;
  setLowPass: (value: number) => void;
  setDryWet: (value: number) => void;
  isPowerOn: boolean;
  setIsPowerOn: (value: boolean) => void;
  clipperMode?: number;
  setClipperMode?: (value: number) => void;
  clipperPanelOpen?: boolean;
  setClipperPanelOpen?: (value: boolean) => void;
  isClipping?: boolean;
}

export const FigmaLayoutFinal: React.FC<FigmaLayoutFinalProps> = ({
  drive, tone, mpc, wow, noise, flutter, resampler, lowPass, dryWet,
  setDrive, setTone, setMpc, setWow, setNoise, setFlutter,
  setResampler, setLowPass, setDryWet,
  isPowerOn, setIsPowerOn,
  clipperMode = 50,
  setClipperMode,
  clipperPanelOpen = false,
  setClipperPanelOpen,
  isClipping = false
}) => {

  const Screw = () => (
    <div style={{
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #c0c0c0, #606060)',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.4)',
      border: '0.5px solid #404040'
    }} />
  );

  return (
    <div className="relative w-full h-full" style={{
      background: 'linear-gradient(145deg, #e8d8b8 0%, #d4c4a4 25%, #c0ac90 50%, #b09c80 75%, #a08c70 100%)',
      border: '3px solid #6a5538',
      borderRadius: '4px',
      padding: '16px',
      boxShadow: 'inset 0 3px 6px rgba(255,240,200,0.4), inset 0 -3px 6px rgba(100,80,50,0.8), 0 4px 12px rgba(0,0,0,0.5)'
    }}>
      {/* Corner screws */}
      <div className="absolute top-2 left-2"><Screw /></div>
      <div className="absolute top-2 right-2"><Screw /></div>
      <div className="absolute bottom-2 left-2"><Screw /></div>
      <div className="absolute bottom-2 right-2"><Screw /></div>

      {/* Wood grain texture */}
      <div className="absolute inset-0 pointer-events-none rounded opacity-10" style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(100,70,40,0.4) 1px, rgba(100,70,40,0.4) 2px, transparent 2px, transparent 4px)'
      }} />

      {/* === TOP: TITLE BADGE + 75% BADGE === */}
      <div className="flex justify-center items-center gap-3 mb-3">
        {/* Title Badge */}
        <div className="relative px-6 py-1" style={{
          background: 'linear-gradient(145deg, #d4a574 0%, #c09560 50%, #a6804c 100%)',
          boxShadow: 'inset 0 2px 3px rgba(255,220,180,0.8), inset 0 -2px 3px rgba(50,35,20,0.7), 0 2px 5px rgba(0,0,0,0.4)',
          border: '1px solid #7a5a38',
          borderRadius: '2px'
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '10px',
            color: '#2a1808',
            letterSpacing: '1.2px',
            textShadow: '0 1px 1px rgba(255,240,200,0.9)',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            SATURATORE DI NASTRI LO-FI
          </div>
        </div>

        {/* 75% Badge */}
        <div className="relative px-3 py-1" style={{
          background: 'linear-gradient(145deg, #d4a574 0%, #c09560 50%, #a6804c 100%)',
          boxShadow: 'inset 0 2px 3px rgba(255,220,180,0.8), inset 0 -2px 3px rgba(50,35,20,0.7), 0 2px 5px rgba(0,0,0,0.4)',
          border: '1px solid #7a5a38',
          borderRadius: '2px'
        }}>
          <div style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            color: '#2a1808',
            fontWeight: 'bold',
            textShadow: '0 1px 1px rgba(255,240,200,0.9)'
          }}>
            75%
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex flex-col gap-3">
        
        {/* TOP SECTION: PREAMP (LEFT) + DRIVE/POWER (RIGHT) */}
        <div className="grid grid-cols-2 gap-3">
          
                    {/* LEFT: PREAMP with VU Meter - 183x148.5px */}
          <div className="relative" style={{
            width: '183px',
            height: '148.5px',
            background: 'linear-gradient(145deg, #1a1510, #0a0805)',
            border: '2px solid #3a2818',
            borderRadius: '3px',
            padding: '10px'
          }}>
            <div className="absolute top-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute top-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            
            {/* PREAMP Label */}
            <div className="text-center mb-2" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)'
            }}>
              PREAMP
            </div>
            
            {/* VU Meter - centrato e ridimensionato */}
            <div className="flex justify-center items-center" style={{ height: 'calc(100% - 24px)' }}>
              <div style={{ transform: 'scale(1.1)' }}>
                <VUMeter />
              </div>
            </div>
          </div>

          {/* RIGHT: DRIVE + POWER + Air Vents */}
          <div className="relative flex flex-col" style={{
            background: 'linear-gradient(145deg, #1a1510, #0a0805)',
            border: '2px solid #3a2818',
            borderRadius: '3px',
            padding: '10px'
          }}>
            <div className="absolute top-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute top-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
            
            {/* DRIVE Label */}
            <div className="text-center mb-3" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '9px',
              color: '#d4a574',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.8)'
            }}>
              DRIVE
            </div>
            
            {/* Drive Knob */}
            <div className="flex justify-center mb-3">
              <div style={{ transform: 'scale(1.3)' }}>
                <Knob
                  label=""
                  value={drive}
                  onChange={setDrive}
                  size="medium"
                  unit="%"
                />
              </div>
            </div>

            {/* Power Switch */}
            <div className="flex justify-center mb-3">
              <div className="flex flex-col items-center">
                <ToggleSwitch
                  label=""
                  isOn={isPowerOn}
                  onToggle={() => setIsPowerOn(!isPowerOn)}
                  orientation="horizontal"
                />
                <div className="mt-1 text-center" style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  color: '#d4a574',
                  letterSpacing: '0.5px',
                  textShadow: '0 1px 1px rgba(0,0,0,0.8)'
                }}>
                  POWER
                </div>
              </div>
            </div>

            {/* Air Vents - Illuminated based on drive level */}
            <div className="mt-auto flex flex-col gap-1" style={{
              padding: '8px',
              borderRadius: '2px'
            }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                  height: '2px',
                  background: drive > (i * 12.5) 
                    ? `linear-gradient(90deg, 
                        rgba(255, 150, 50, ${0.3 + (drive / 100) * 0.7}),
                        rgba(255, 100, 20, ${0.3 + (drive / 100) * 0.7})
                      )`
                    : 'rgba(50, 40, 30, 0.6)',
                  borderRadius: '1px',
                  boxShadow: drive > (i * 12.5)
                    ? `0 0 4px rgba(255, 120, 40, ${drive / 200})`
                    : 'none',
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: TAPE DECK - 352.5x124.88px con padding 8px */}
        <div className="relative" style={{
          background: 'linear-gradient(145deg, #1a1510, #0a0805)',
          border: '2px solid #3a2818',
          borderRadius: '3px',
          padding: '8px'
        }}>
          <div className="absolute top-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
          <div className="absolute top-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
          <div className="absolute bottom-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
          <div className="absolute bottom-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
          
          {/* TAPE Label */}
          <div className="text-center mb-2" style={{
            fontFamily: 'Georgia, serif',
            fontSize: '9px',
            color: '#d4a574',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)'
          }}>
            TAPE
          </div>
          
          {/* Tape Window - 352.5x124.88px con padding 8px */}
          <div style={{
            width: '352.5px',
            height: '124.88px',
            background: 'linear-gradient(145deg, #e8d8c0, #d0c0a8)',
            border: '1px solid #8a7050',
            borderRadius: '2px',
            padding: '8px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Tape Reels - scaled up to fill space */}
            <div style={{ transform: 'scale(1.4)', marginBottom: '8px' }}>
              <TapeReels />
            </div>
            
            {/* PLAY Button */}
            <button style={{
              background: 'linear-gradient(145deg, #4a4038, #2a2018)',
              border: '2px solid #1a1410',
              borderRadius: '3px',
              padding: '4px 12px',
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ▶ PLAY
            </button>
          </div>
        </div>

        {/* WOODEN SEPARATOR BARS */}
        <div className="flex flex-col gap-1">
          {/* Top wooden bar */}
          <div className="relative h-2" style={{
            background: 'linear-gradient(145deg, #d4c4a4, #b0a080)',
            border: '1px solid #8a7a60',
            borderRadius: '1px',
            boxShadow: 'inset 0 1px 1px rgba(255,240,200,0.3), inset 0 -1px 1px rgba(80,60,40,0.5)'
          }}>
            <div className="absolute left-2" style={{transform: 'scale(0.4) translateY(-50%)', top: '50%'}}><Screw /></div>
            <div className="absolute right-2" style={{transform: 'scale(0.4) translateY(-50%)', top: '50%'}}><Screw /></div>
          </div>
          
          {/* Bottom wooden bar */}
          <div className="relative h-2" style={{
            background: 'linear-gradient(145deg, #d4c4a4, #b0a080)',
            border: '1px solid #8a7a60',
            borderRadius: '1px',
            boxShadow: 'inset 0 1px 1px rgba(255,240,200,0.3), inset 0 -1px 1px rgba(80,60,40,0.5)'
          }}>
            <div className="absolute left-2" style={{transform: 'scale(0.4) translateY(-50%)', top: '50%'}}><Screw /></div>
            <div className="absolute right-2" style={{transform: 'scale(0.4) translateY(-50%)', top: '50%'}}><Screw /></div>
          </div>
        </div>

        {/* BOTTOM SECTION: 8 KNOBS IN 2 ROWS */}
        <div className="grid grid-cols-4 gap-4 px-1">
          {/* Row 1 */}
          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={tone} onChange={setTone} size="medium" unit="%" />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              TONE
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {Math.round(tone)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={wow} onChange={setWow} size="medium" unit="%" />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              WOW
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {Math.round(wow)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={resampler} onChange={setResampler} size="medium" unit="kHz" displayValue={(v) => `${(v * 44.1 / 100).toFixed(1)}`} />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              RESAMPLER
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {(resampler * 44.1 / 100).toFixed(1)} kHz
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={dryWet} onChange={setDryWet} size="medium" unit="%" />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              DRY/WET
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {Math.round(dryWet)}%
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={mpc} onChange={setMpc} size="medium" unit="Hz" displayValue={(v) => `${Math.round(v * 200 + 1000)}`} />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              MPC
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {Math.round(mpc * 200 + 1000)} Hz
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={noise} onChange={setNoise} size="medium" unit="%" />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              NOISE
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {Math.round(noise)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob label="" value={flutter} onChange={setFlutter} size="medium" unit="%" />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              FLUTTER
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {Math.round(flutter)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.15)' }}>
              <Knob
                label=""
                value={lowPass}
                onChange={setLowPass}
                size="medium"
                displayValue={(v) => formatLowPassParamToHz(v)}
              />
            </div>
            <div className="mt-1 px-2 py-0.5 text-center" style={{
              background: 'linear-gradient(145deg, #d4c4a4, #c0ac90)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#2a1808',
              letterSpacing: '0.3px',
              textShadow: '0 0.5px 0.5px rgba(255,240,200,0.8)'
            }}>
              LOW-PASS
            </div>
            <div className="mt-0.5 text-center" style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '8px',
              color: '#8a7a60',
              fontWeight: 'normal'
            }}>
              {formatLowPassParamToHz(lowPass)}
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT: IntheBox Brand */}
        <div className="flex justify-start">
          <div className="px-3 py-1" style={{
            background: 'linear-gradient(145deg, #d4a574 0%, #c09560 50%, #a6804c 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,220,180,0.8), inset 0 -1px 2px rgba(50,35,20,0.7), 0 1px 3px rgba(0,0,0,0.4)',
            border: '1px solid #7a5a38',
            borderRadius: '2px'
          }}>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#2a1808',
              letterSpacing: '0.8px',
              textShadow: '0 1px 1px rgba(255,240,200,0.9)',
              fontWeight: 'bold'
            }}>
              IntheBox
            </div>
          </div>
        </div>
      </div>

      {/* Clipper Panel Modal */}
      {clipperPanelOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(2px)'
          }} onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)} />
          
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50" style={{
            width: '340px',
            background: 'linear-gradient(145deg, #1a1510, #0a0805)',
            border: '2px solid #3a2818',
            borderRadius: '3px',
            padding: '12px 16px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.95)'
          }}>
            <button onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)}
              className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full"
              style={{
                background: 'radial-gradient(circle, #d4a574, #a6804c)',
                color: '#2a1808',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
              ✕
            </button>
            
            <div className="text-center mb-3" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '9px',
              color: '#d4a574',
              letterSpacing: '0.8px',
              textTransform: 'uppercase'
            }}>
              CLIPPER CONFIGURATION
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <Knob
                label="MODE"
                value={clipperMode}
                onChange={setClipperMode || (() => {})}
                unit=""
                steps={3}
                displayValue={(val) => {
                  if (val <= 33) return 'SOFT';
                  if (val <= 66) return 'MODERATE';
                  return 'HARD';
                }}
              />
              <div className="max-w-[160px]" style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '7px',
                color: '#a08c70',
                lineHeight: '1.4'
              }}>
                <div className="mb-1">
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>SOFT:</span> Gentle saturation
                </div>
                <div className="mb-1">
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>MODERATE:</span> Balanced warmth
                </div>
                <div>
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>HARD:</span> Aggressive clipping
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
