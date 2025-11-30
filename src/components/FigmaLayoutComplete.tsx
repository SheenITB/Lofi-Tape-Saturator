/**
 * FigmaLayoutComplete - Layout ESATTO da specifiche Figma design-tokens.json
 * Basato su: 600x800px, design tokens v1.0.9
 */

import React from 'react';
import { Knob } from './Knob';
import { VUMeter } from './VUMeter';
import { TapeReels } from './TapeReels';
import { ToggleSwitch } from './ToggleSwitch';

interface FigmaLayoutCompleteProps {
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

export const FigmaLayoutComplete: React.FC<FigmaLayoutCompleteProps> = ({
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

  // Screw component - 8px diameter da design-tokens
  const Screw = () => (
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #909090, #404040)',
      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)',
      border: '0.5px solid #303030'
    }} />
  );

  return (
    // WOODEN CHASSIS: 540x760px con wood gradient da design-tokens
    <div className="relative" style={{
      width: '540px',
      height: '760px',
      background: 'linear-gradient(145deg, #3d2817, #2d1810)',
      border: '2px solid #2a1810',
      borderRadius: '4px',
      padding: '6px',
      boxShadow: '0 30px 80px rgba(0,0,0,0.9), inset 0 2px 1px rgba(255,200,150,0.1)'
    }}>
      {/* Wood grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.3) 2px, rgba(139,69,19,0.3) 3px, transparent 3px, transparent 8px)',
        opacity: 0.2,
        borderRadius: '4px'
      }} />

      {/* FRONT PANEL - beige gradient da design-tokens */}
      <div className="relative w-full h-full" style={{
        background: 'linear-gradient(145deg, #e8d8c0 0%, #d4c4a8 50%, #c0b090 100%)',
        border: '2px solid #8a7050',
        borderRadius: '2px',
        padding: '10px 12px 16px 12px',
        boxShadow: '0 16px 48px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,240,220,0.6), inset 0 -2px 6px rgba(80,50,30,0.3), 0 0 0 2px #a89070'
      }}>
        {/* Corner screws - 8px */}
        <div className="absolute" style={{ top: '6px', left: '6px' }}><Screw /></div>
        <div className="absolute" style={{ top: '6px', right: '6px' }}><Screw /></div>
        <div className="absolute" style={{ bottom: '6px', left: '6px' }}><Screw /></div>
        <div className="absolute" style={{ bottom: '6px', right: '6px' }}><Screw /></div>

        <div className="flex flex-col h-full" style={{ gap: '8px' }}>
          
          {/* === HEADER: Solo titolo centrale (UNA sola volta) === */}
          <div className="flex items-center justify-center" style={{ marginBottom: '4px' }}>
            <div className="relative" style={{
              padding: '6px 24px 4px 24px',
              background: 'linear-gradient(180deg, #c8a870, #a88850)',
              boxShadow: 'inset 0 1px 2px rgba(255,230,190,0.8), inset 0 -1px 2px rgba(40,25,15,0.6), 0 2px 4px rgba(0,0,0,0.3)',
              border: '1px solid #7a5a38',
              borderRadius: '2px'
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '12px',
                color: '#2a1808',
                letterSpacing: '0.18em',
                textShadow: '1px 1px 0 rgba(255,240,200,0.8), -1px -1px 0 rgba(0,0,0,0.3)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                lineHeight: '1.2'
              }}>
                SATURATORE DI NASTRI LO-FI
              </div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '6px',
                color: '#3a2010',
                letterSpacing: '0.12em',
                textAlign: 'center',
                marginTop: '1px'
              }}>
                ★ PROCESSORE DI CALORE ANALOGICO ★
              </div>
            </div>
          </div>

          {/* === TOP SECTION: PREAMP (Left) + DRIVE (Right) === */}
          <div className="grid grid-cols-2" style={{ gap: '8px' }}>
            
            {/* LEFT: PREAMP + VU Meter */}
            <div className="relative" style={{
              background: 'linear-gradient(145deg, #2a2218, #1a1510)',
              border: '1px solid #4a3828',
              borderRadius: '1px',
              padding: '8px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {/* PREAMP Label - 7px da design-tokens */}
              <div className="text-center" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#d4a574',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}>
                PREAMP
              </div>
              
              {/* VU Meter - 240x60px da design-tokens */}
              <div className="flex justify-center">
                <div style={{ width: '240px', height: '60px' }}>
                  <VUMeter />
                </div>
              </div>
            </div>

            {/* RIGHT: DRIVE Section */}
            <div className="relative flex flex-col items-center justify-between" style={{
              background: 'linear-gradient(145deg, #2a2218, #1a1510)',
              border: '1px solid #4a3828',
              borderRadius: '1px',
              padding: '8px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {/* DRIVE Label */}
              <div className="text-center" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#d4a574',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px'
              }}>
                DRIVE
              </div>
              
              {/* Drive Knob - 60px da design-tokens */}
              <div className="flex flex-col items-center">
                <div style={{ width: '60px', height: '60px' }}>
                  <Knob label="" value={drive} onChange={setDrive} size="medium" unit="%" />
                </div>
                <div className="mt-1" style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#3a2010',
                  padding: '2px 6px',
                  background: 'rgba(200,180,160,0.3)',
                  borderRadius: '1px'
                }}>
                  {Math.round(drive)}%
                </div>
              </div>

              {/* Power Switch */}
              <div className="flex flex-col items-center" style={{ marginTop: '6px' }}>
                <ToggleSwitch
                  label=""
                  isOn={isPowerOn}
                  onToggle={() => setIsPowerOn(!isPowerOn)}
                  orientation="vertical"
                />
                <div className="mt-1" style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  color: '#d4a574',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}>
                  POWER
                </div>
              </div>

              {/* Ventilation Grills */}
              <div className="flex flex-col" style={{ gap: '3px', width: '80%', marginTop: '8px' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    height: '2px',
                    background: drive > (i * 20)
                      ? `linear-gradient(90deg, rgba(255, 136, 0, ${0.5 + (drive / 150)}), rgba(255, 100, 0, ${0.5 + (drive / 150)}))`
                      : 'rgba(40, 30, 20, 0.5)',
                    borderRadius: '1px',
                    boxShadow: drive > (i * 20) ? `0 0 4px rgba(255, 136, 0, ${drive / 200})` : 'none',
                    transition: 'all 0.2s ease'
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* === TAPE DECK === */}
          <div className="relative" style={{
            background: 'linear-gradient(145deg, #2a2218, #1a1510)',
            border: '1px solid #4a3828',
            borderRadius: '1px',
            padding: '8px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)'
          }}>
            <div className="text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#d4a574',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              NASTRO
            </div>
            
            {/* Tape Window - beige background */}
            <div style={{
              background: 'linear-gradient(145deg, #e8d8c0, #d0c0a0)',
              border: '1px solid #8a7a60',
              borderRadius: '1px',
              padding: '8px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
            }}>
              {/* Tape Reels - 200x120px da design-tokens */}
              <div className="flex justify-center" style={{ marginBottom: '8px' }}>
                <div style={{ width: '200px', height: '120px' }}>
                  <TapeReels />
                </div>
              </div>
              
              {/* PLAY Button */}
              <div className="flex justify-center">
                <button style={{
                  background: 'linear-gradient(145deg, #4a4038, #2a2018)',
                  border: '1px solid #1a1410',
                  borderRadius: '2px',
                  padding: '4px 12px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  color: '#d4a574',
                  letterSpacing: '0.12em',
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
          </div>

          {/* === WOODEN SEPARATOR TOP === */}
          <div className="relative" style={{
            height: '8px',
            background: 'linear-gradient(145deg, #8a7560, #6a5540)',
            border: '1px solid #5a4530',
            borderRadius: '2px',
            boxShadow: 'inset 0 1px 2px rgba(180,160,130,0.4), inset 0 -1px 2px rgba(40,30,20,0.6), 0 1px 2px rgba(0,0,0,0.4)',
            margin: '2px 0'
          }}>
            <div className="absolute left-2 top-1/2 -translate-y-1/2"><Screw /></div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2"><Screw /></div>
          </div>

          {/* === 8 KNOBS GRID (2 rows x 4 columns) === */}
          <div className="grid grid-cols-4" style={{ gap: '8px', padding: '4px 0' }}>
            {/* Row 1 */}
            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>TONE</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={tone} onChange={setTone} size="medium" unit="%" />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{Math.round(tone)}%</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>MPC</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={mpc} onChange={setMpc} size="medium" unit="" displayValue={(v) => Math.round(v).toString()} />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{Math.round(mpc)}</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>RESAMPLER</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={resampler} onChange={setResampler} size="medium" unit="k" displayValue={(v) => `${(v * 44.1 / 100).toFixed(1)}`} />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{(resampler * 44.1 / 100).toFixed(1)}k</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>WOW</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={wow} onChange={setWow} size="medium" unit="%" />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{Math.round(wow)}%</div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>LOW PASS</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={lowPass} onChange={setLowPass} size="medium" unit="k" displayValue={(v) => `${(v * 20 / 100 + 1).toFixed(1)}`} />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{(lowPass * 20 / 100 + 1).toFixed(1)}k</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>NOISE</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={noise} onChange={setNoise} size="medium" unit="%" />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{Math.round(noise)}%</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>FLUTTER</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={flutter} onChange={setFlutter} size="medium" unit="%" />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{Math.round(flutter)}%</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>DRY/WET</div>
              <div style={{ width: '60px', height: '60px' }}>
                <Knob label="" value={dryWet} onChange={setDryWet} size="medium" unit="%" />
              </div>
              <div className="mt-1" style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#3a2010',
                padding: '2px 6px',
                background: 'rgba(200,180,160,0.3)',
                borderRadius: '1px'
              }}>{Math.round(dryWet)}%</div>
            </div>
          </div>

          {/* === WOODEN SEPARATOR BOTTOM === */}
          <div className="relative" style={{
            height: '8px',
            background: 'linear-gradient(145deg, #8a7560, #6a5540)',
            border: '1px solid #5a4530',
            borderRadius: '2px',
            boxShadow: 'inset 0 1px 2px rgba(180,160,130,0.4), inset 0 -1px 2px rgba(40,30,20,0.6), 0 1px 2px rgba(0,0,0,0.4)',
            margin: '2px 0'
          }}>
            <div className="absolute left-2 top-1/2 -translate-y-1/2"><Screw /></div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2"><Screw /></div>
          </div>

          {/* === FOOTER: Logo + Indicators === */}
          <div className="flex items-center justify-between mt-auto" style={{ paddingTop: '4px' }}>
            {/* Left: InTheBox Badge */}
            <div className="relative" style={{
              padding: '4px 8px',
              background: 'linear-gradient(180deg, #c8a870, #a88850)',
              boxShadow: 'inset 0 1px 2px rgba(255,230,190,0.8), inset 0 -1px 2px rgba(40,25,15,0.6), 0 2px 4px rgba(0,0,0,0.3)',
              border: '1px solid #7a5a38',
              borderRadius: '2px'
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '8px',
                color: '#2a1808',
                letterSpacing: '0.05em',
                textShadow: '1px 1px 0 rgba(255,240,200,0.8)',
                fontWeight: 'bold',
                lineHeight: '1.1'
              }}>
                InTheBox
              </div>
              <div style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '6px',
                color: '#3a2010',
                textAlign: 'center'
              }}>
                VST3
              </div>
            </div>

            {/* Center: POWER and CLIP LEDs - 6px diameter da design-tokens */}
            <div className="flex items-center" style={{ gap: '12px' }}>
              <div className="flex items-center" style={{ gap: '4px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isPowerOn
                    ? 'radial-gradient(circle, #ff8800, #cc6600)'
                    : 'radial-gradient(circle, #2a1808, #1a0a00)',
                  boxShadow: isPowerOn ? '0 0 8px #ff8800' : 'none',
                  border: '0.5px solid #1a1410',
                  transition: 'all 0.2s ease'
                }} />
                <span style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '6px',
                  color: '#5a3820',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>POWER</span>
              </div>

              <button
                className="flex items-center cursor-pointer"
                style={{ gap: '4px' }}
                onClick={() => setClipperPanelOpen && setClipperPanelOpen(!clipperPanelOpen)}
                title="Clipper configuration"
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isClipping
                    ? 'radial-gradient(circle, #ff2200, #cc0000)'
                    : 'radial-gradient(circle, #2a1808, #1a0a00)',
                  boxShadow: isClipping ? '0 0 8px #ff2200' : 'none',
                  border: '0.5px solid #1a1410',
                  transition: 'all 0.2s ease'
                }} />
                <span style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '6px',
                  color: '#5a3820',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>CLIP</span>
              </button>
            </div>

            {/* Right: Since 2024 */}
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '6px',
              color: '#5a3820',
              fontStyle: 'italic'
            }}>
              Since 2024
            </div>
          </div>
        </div>
      </div>

      {/* Clipper Panel Modal */}
      {clipperPanelOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(3px)'
          }} onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)} />
          
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50" style={{
            width: '320px',
            background: 'linear-gradient(145deg, #2a2218, #1a1510)',
            border: '2px solid #3a2a1a',
            borderRadius: '4px',
            padding: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
          }}>
            <button onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)}
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full hover:brightness-110"
              style={{
                background: 'radial-gradient(circle, #d4a574, #a07540)',
                color: '#2a1808',
                fontSize: '11px',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
              ✕
            </button>
            
            <div className="text-center mb-4" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '10px',
              color: '#d4a574',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              CLIPPER MODE
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <Knob
                label="MODE"
                value={clipperMode}
                onChange={setClipperMode || (() => {})}
                size="large"
                unit=""
                steps={3}
                displayValue={(val) => {
                  if (val <= 33) return 'SOFT';
                  if (val <= 66) return 'MODERATE';
                  return 'HARD';
                }}
              />
              
              <div style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '7px',
                color: '#a08c70',
                maxWidth: '140px',
                lineHeight: '1.4'
              }}>
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>SOFT:</span> Gentle saturation
                </div>
                <div style={{ marginBottom: '6px' }}>
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

  return (
    <div className="relative w-full h-full" style={{
      background: 'linear-gradient(145deg, #e8d8c0 0%, #d8c8a8 30%, #c8b898 60%, #b8a888 100%)',
      border: '3px solid #6a5840',
      borderRadius: '4px',
      padding: '14px',
      boxShadow: 'inset 0 3px 8px rgba(255,245,220,0.5), inset 0 -3px 8px rgba(100,80,50,0.7), 0 6px 16px rgba(0,0,0,0.6)'
    }}>
      {/* Corner screws */}
      <div className="absolute top-2 left-2"><Screw /></div>
      <div className="absolute top-2 right-2"><Screw /></div>
      <div className="absolute bottom-2 left-2"><Screw /></div>
      <div className="absolute bottom-2 right-2"><Screw /></div>

      {/* Wood grain texture subtle */}
      <div className="absolute inset-0 pointer-events-none rounded opacity-8" style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(100,70,40,0.25) 1px, rgba(100,70,40,0.25) 2px, transparent 2px, transparent 5px)'
      }} />

      <div className="flex flex-col gap-3 relative">
        
        {/* === HEADER: TITLE + ZOOM === */}
        <div className="flex items-center justify-between mb-2">
          {/* Left spacer */}
          <div style={{ width: '60px' }} />
          
          {/* Center: Title Badge */}
          <div className="flex flex-col items-center">
            <div className="relative px-8 py-1.5" style={{
              background: 'linear-gradient(145deg, #d4a574 0%, #c09560 30%, #b08550 60%, #a07540 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,230,190,0.9), inset 0 -2px 4px rgba(40,25,15,0.7), 0 3px 6px rgba(0,0,0,0.4)',
              border: '2px solid #7a5a38',
              borderRadius: '3px'
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '11px',
                color: '#2a1808',
                letterSpacing: '1.5px',
                textShadow: '0 1px 2px rgba(255,245,220,0.9), 0 -1px 1px rgba(0,0,0,0.3)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}>
                LO-FI TAPE SATURATOR
              </div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#3a2010',
                letterSpacing: '1px',
                textShadow: '0 1px 1px rgba(255,240,200,0.7)',
                fontWeight: 'normal',
                textAlign: 'center'
              }}>
                ★ ANALOG WARMTH PROCESSOR ★
              </div>
            </div>
          </div>
          
          {/* Right: Zoom indicator */}
          <div className="relative" style={{ width: '60px', display: 'flex', justifyContent: 'flex-end' }}>
            <div className="relative px-2 py-1" style={{
              background: 'linear-gradient(145deg, #d4a574, #b08550)',
              boxShadow: 'inset 0 1px 2px rgba(255,230,190,0.8), inset 0 -1px 2px rgba(40,25,15,0.6), 0 2px 4px rgba(0,0,0,0.3)',
              border: '1px solid #7a5a38',
              borderRadius: '2px'
            }}>
              <div className="absolute top-0.5 left-0.5" style={{transform: 'scale(0.3)'}}><Screw /></div>
              <div style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '9px',
                color: '#2a1808',
                fontWeight: 'bold',
                textShadow: '0 1px 1px rgba(255,240,200,0.8)'
              }}>
                75%
              </div>
            </div>
          </div>
        </div>

        {/* === TOP SECTION: PREAMP (Left) + DRIVE (Right) === */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* LEFT: PREAMP + VU Meter */}
          <div className="relative" style={{
            background: 'linear-gradient(145deg, #2a2218, #1a1410)',
            border: '2px solid #3a2a1a',
            borderRadius: '3px',
            padding: '12px',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4)'
          }}>
            <div className="absolute top-1.5 left-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute top-1.5 right-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1.5 left-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1.5 right-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            
            {/* PREAMP Label */}
            <div className="text-center mb-2" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '9px',
              color: '#d4a574',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)'
            }}>
              PREAMP
            </div>
            
            {/* VU Meter with black background */}
            <div className="flex justify-center" style={{
              background: '#000',
              border: '1px solid #0a0a0a',
              borderRadius: '2px',
              padding: '8px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)'
            }}>
              <div style={{ transform: 'scale(1.15)' }}>
                <VUMeter />
              </div>
            </div>
          </div>

          {/* RIGHT: DRIVE Section */}
          <div className="relative flex flex-col" style={{
            background: 'linear-gradient(145deg, #2a2218, #1a1410)',
            border: '2px solid #3a2a1a',
            borderRadius: '3px',
            padding: '12px',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4)'
          }}>
            <div className="absolute top-1.5 left-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute top-1.5 right-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1.5 left-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            <div className="absolute bottom-1.5 right-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
            
            {/* DRIVE Label */}
            <div className="text-center mb-2" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '9px',
              color: '#d4a574',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)'
            }}>
              DRIVE
            </div>
            
            {/* Drive Knob */}
            <div className="flex justify-center mb-3">
              <div className="flex flex-col items-center">
                <div style={{ transform: 'scale(1.4)' }}>
                  <Knob label="" value={drive} onChange={setDrive} size="large" unit="%" />
                </div>
                <div className="mt-2 px-3 py-1" style={{
                  background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
                  border: '1px solid #8a7a60',
                  borderRadius: '3px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  color: '#2a1808',
                  fontWeight: 'bold',
                  textShadow: '0 1px 1px rgba(255,240,200,0.8)',
                  minWidth: '45px',
                  textAlign: 'center'
                }}>
                  {Math.round(drive)}%
                </div>
              </div>
            </div>

            {/* Power Switch */}
            <div className="flex justify-center mb-3">
              <div className="flex flex-col items-center">
                <ToggleSwitch
                  label=""
                  isOn={isPowerOn}
                  onToggle={() => setIsPowerOn(!isPowerOn)}
                  orientation="vertical"
                />
                <div className="mt-2 text-center" style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '8px',
                  color: '#d4a574',
                  letterSpacing: '0.8px',
                  textShadow: '0 1px 1px rgba(0,0,0,0.8)',
                  textTransform: 'uppercase'
                }}>
                  POWER
                </div>
              </div>
            </div>

            {/* Ventilation Grills - Illuminated with drive */}
            <div className="mt-auto flex flex-col gap-1 px-4" style={{
              padding: '10px 20px',
              borderRadius: '2px'
            }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  height: '3px',
                  background: drive > (i * 20)
                    ? `linear-gradient(90deg, rgba(255, 140, 40, ${0.4 + (drive / 150)}), rgba(255, 100, 20, ${0.4 + (drive / 150)}))`
                    : 'rgba(40, 30, 20, 0.7)',
                  borderRadius: '1px',
                  boxShadow: drive > (i * 20)
                    ? `0 0 6px rgba(255, 120, 30, ${drive / 200}), inset 0 1px 1px rgba(255,200,100,0.3)`
                    : 'inset 0 1px 1px rgba(0,0,0,0.8)',
                  transition: 'all 0.3s ease',
                  border: '0.5px solid rgba(20, 15, 10, 0.5)'
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* === TAPE DECK SECTION === */}
        <div className="relative" style={{
          background: 'linear-gradient(145deg, #2a2218, #1a1410)',
          border: '2px solid #3a2a1a',
          borderRadius: '3px',
          padding: '12px',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4)'
        }}>
          <div className="absolute top-1.5 left-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
          <div className="absolute top-1.5 right-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
          <div className="absolute bottom-1.5 left-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
          <div className="absolute bottom-1.5 right-1.5" style={{transform: 'scale(0.5)'}}><Screw /></div>
          
          {/* TAPE DECK Label */}
          <div className="text-center mb-2" style={{
            fontFamily: 'Georgia, serif',
            fontSize: '9px',
            color: '#d4a574',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textShadow: '0 1px 2px rgba(0,0,0,0.9)'
          }}>
            TAPE DECK
          </div>
          
          {/* Tape Window with beige background */}
          <div style={{
            background: 'linear-gradient(145deg, #e8d8c0, #d0c0a0)',
            border: '2px solid #8a7a60',
            borderRadius: '3px',
            padding: '10px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {/* TAPE label above reels */}
            <div className="text-center mb-2" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              TAPE
            </div>
            
            {/* Tape Reels */}
            <div className="flex justify-center items-center mb-3">
              <div style={{ transform: 'scale(1.6)' }}>
                <TapeReels />
              </div>
            </div>
            
            {/* PLAY Button */}
            <div className="flex justify-center">
              <button style={{
                background: 'linear-gradient(145deg, #4a4038, #2a2018)',
                border: '2px solid #1a1410',
                borderRadius: '3px',
                padding: '6px 16px',
                fontFamily: 'Georgia, serif',
                fontSize: '8px',
                color: '#d4a574',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                ▶ PLAY
              </button>
            </div>
          </div>
        </div>

        {/* === WOODEN SEPARATOR BARS === */}
        <div className="flex flex-col gap-2 my-1">
          {/* Top bar */}
          <div className="relative h-2.5" style={{
            background: 'linear-gradient(145deg, #8a7560, #6a5540)',
            border: '1px solid #5a4530',
            borderRadius: '2px',
            boxShadow: 'inset 0 1px 2px rgba(180,160,130,0.4), inset 0 -1px 2px rgba(40,30,20,0.6), 0 1px 3px rgba(0,0,0,0.4)'
          }}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.35) translateY(-50%)'}}><Screw /></div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.35) translateY(-50%)'}}><Screw /></div>
          </div>
        </div>

        {/* === 8 KNOBS IN 2 ROWS === */}
        <div className="grid grid-cols-4 gap-x-4 gap-y-3 px-2 py-2">
          {/* Row 1 */}
          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={tone} onChange={setTone} size="medium" unit="%" />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              TONE
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {Math.round(tone)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={mpc} onChange={setMpc} size="medium" unit="" displayValue={(v) => Math.round(v).toString()} />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              MPC
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {Math.round(mpc)}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={resampler} onChange={setResampler} size="medium" unit="k" displayValue={(v) => `${(v * 44.1 / 100).toFixed(1)}`} />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              RESAMPLER
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {(resampler * 44.1 / 100).toFixed(1)}k
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={wow} onChange={setWow} size="medium" unit="%" />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              WOW
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {Math.round(wow)}%
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={lowPass} onChange={setLowPass} size="medium" unit="k" displayValue={(v) => `${(v * 20 / 100 + 1).toFixed(1)}`} />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              LOW PASS
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {(lowPass * 20 / 100 + 1).toFixed(1)}k
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={noise} onChange={setNoise} size="medium" unit="%" />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              NOISE
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {Math.round(noise)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={flutter} onChange={setFlutter} size="medium" unit="%" />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              FLUTTER
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {Math.round(flutter)}%
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(1.25)' }}>
              <Knob label="" value={dryWet} onChange={setDryWet} size="medium" unit="%" />
            </div>
            <div className="mt-2 text-center" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#4a3828',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              DRY/WET
            </div>
            <div className="px-3 py-1" style={{
              background: 'linear-gradient(145deg, #d8c8a8, #c0b090)',
              border: '1px solid #8a7a60',
              borderRadius: '2px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '9px',
              color: '#2a1808',
              fontWeight: 'normal',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {Math.round(dryWet)}%
            </div>
          </div>
        </div>

        {/* === BOTTOM WOODEN BAR === */}
        <div className="relative h-2.5 mb-1" style={{
          background: 'linear-gradient(145deg, #8a7560, #6a5540)',
          border: '1px solid #5a4530',
          borderRadius: '2px',
          boxShadow: 'inset 0 1px 2px rgba(180,160,130,0.4), inset 0 -1px 2px rgba(40,30,20,0.6), 0 1px 3px rgba(0,0,0,0.4)'
        }}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.35) translateY(-50%)'}}><Screw /></div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.35) translateY(-50%)'}}><Screw /></div>
        </div>

        {/* === FOOTER: Logo + Indicators + Since === */}
        <div className="flex items-center justify-between px-1">
          {/* Left: InTheBox Logo */}
          <div className="relative px-3 py-1" style={{
            background: 'linear-gradient(145deg, #d4a574 0%, #b08550 50%, #9a7540 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,230,190,0.8), inset 0 -1px 2px rgba(40,25,15,0.6), 0 2px 4px rgba(0,0,0,0.3)',
            border: '1px solid #7a5a38',
            borderRadius: '2px'
          }}>
            <div className="absolute top-0.5 left-0.5" style={{transform: 'scale(0.25)'}}><Screw /></div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#2a1808',
              letterSpacing: '0.5px',
              textShadow: '0 1px 1px rgba(255,240,200,0.9)',
              fontWeight: 'bold'
            }}>
              InTheBox
            </div>
            <div style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '6px',
              color: '#3a2010',
              letterSpacing: '0.3px',
              textAlign: 'center',
              marginTop: '-2px'
            }}>
              VST3
            </div>
          </div>

          {/* Center: POWER and CLIP indicators */}
          <div className="flex items-center gap-4">
            {/* POWER LED */}
            <div className="flex items-center gap-1">
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isPowerOn
                  ? 'radial-gradient(circle, #00ff00, #00aa00)'
                  : 'radial-gradient(circle, #2a1a10, #1a0a00)',
                boxShadow: isPowerOn
                  ? '0 0 6px #00ff00, inset 0 1px 1px rgba(150,255,150,0.5)'
                  : 'inset 0 1px 1px rgba(0,0,0,0.9)',
                border: '0.5px solid #1a1410',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '7px',
                color: '#6a5a48',
                letterSpacing: '0.3px',
                textTransform: 'uppercase'
              }}>
                POWER
              </span>
            </div>

            {/* CLIP LED */}
            <button
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setClipperPanelOpen && setClipperPanelOpen(!clipperPanelOpen)}
              title="Click to configure clipper"
            >
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isClipping
                  ? 'radial-gradient(circle, #ff3300, #cc0000)'
                  : 'radial-gradient(circle, #2a1a10, #1a0a00)',
                boxShadow: isClipping
                  ? '0 0 6px #ff3300, inset 0 1px 1px rgba(255,150,100,0.5)'
                  : 'inset 0 1px 1px rgba(0,0,0,0.9)',
                border: '0.5px solid #1a1410',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '7px',
                color: '#6a5a48',
                letterSpacing: '0.3px',
                textTransform: 'uppercase'
              }}>
                CLIP
              </span>
            </button>
          </div>

          {/* Right: Since 2024 */}
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '7px',
            color: '#6a5a48',
            fontStyle: 'italic',
            letterSpacing: '0.3px'
          }}>
            Since 2024
          </div>
        </div>
      </div>

      {/* Clipper Panel Modal */}
      {clipperPanelOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(3px)'
          }} onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)} />
          
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50" style={{
            width: '360px',
            background: 'linear-gradient(145deg, #2a2218, #1a1410)',
            border: '3px solid #3a2a1a',
            borderRadius: '4px',
            padding: '16px 20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), inset 0 2px 6px rgba(0,0,0,0.8)'
          }}>
            <button onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)}
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full hover:brightness-110 transition-all"
              style={{
                background: 'radial-gradient(circle, #d4a574, #a07540)',
                color: '#2a1808',
                fontSize: '11px',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
              ✕
            </button>
            
            <div className="text-center mb-4" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '10px',
              color: '#d4a574',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)'
            }}>
              CLIPPER CONFIGURATION
            </div>
            
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <Knob
                  label="MODE"
                  value={clipperMode}
                  onChange={setClipperMode || (() => {})}
                  size="large"
                  unit=""
                  steps={3}
                  displayValue={(val) => {
                    if (val <= 33) return 'SOFT';
                    if (val <= 66) return 'MODERATE';
                    return 'HARD';
                  }}
                />
              </div>
              
              <div className="max-w-[170px]" style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '8px',
                color: '#a08c70',
                lineHeight: '1.6'
              }}>
                <div className="mb-2">
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>SOFT:</span> Gentle saturation with smooth harmonic transitions
                </div>
                <div className="mb-2">
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>MODERATE:</span> Balanced warmth and natural harmonics
                </div>
                <div>
                  <span style={{ color: '#d4a574', fontWeight: 'bold' }}>HARD:</span> Aggressive clipping with pronounced character
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
