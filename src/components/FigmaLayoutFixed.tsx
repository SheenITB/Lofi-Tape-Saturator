/**
 * FigmaLayoutFinal - CORRECTED VERSION matching second screenshot exactly
 * With external wooden chassis and properly proportioned sections
 */

import React from 'react';
import { Knob } from './Knob';
import { VUMeter } from './VUMeter';
import { TapeReels } from './TapeReels';
import { ToggleSwitch } from './ToggleSwitch';

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
      background: 'radial-gradient(circle at 30% 30%, #a0a0a0, #505050)',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)',
      border: '0.5px solid #303030'
    }} />
  );

  return (
    // OUTER WOODEN CHASSIS
    <div className="relative" style={{
      width: '600px',
      height: '800px',
      background: 'linear-gradient(145deg, #3d2817 0%, #2d1810 100%)',
      border: '3px solid #2a1810',
      borderRadius: '6px',
      padding: '10px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.9), inset 0 2px 3px rgba(120,90,60,0.2)'
    }}>
      {/* Outer screws */}
      <div className="absolute" style={{top: '8px', left: '8px'}}><Screw /></div>
      <div className="absolute" style={{top: '8px', right: '8px'}}><Screw /></div>
      <div className="absolute" style={{bottom: '8px', left: '8px'}}><Screw /></div>
      <div className="absolute" style={{bottom: '8px', right: '8px'}}><Screw /></div>

      {/* INNER BEIGE PANEL */}
      <div className="relative w-full h-full" style={{
        background: 'linear-gradient(145deg, #e8d8c0 0%, #d8c8a8 50%, #c8b898 100%)',
        border: '2px solid #8a7050',
        borderRadius: '3px',
        padding: '14px',
        boxShadow: 'inset 0 2px 6px rgba(255,245,220,0.6), inset 0 -2px 6px rgba(100,80,50,0.6), 0 3px 10px rgba(0,0,0,0.4)'
      }}>
        {/* Inner screws */}
        <div className="absolute" style={{top: '6px', left: '6px'}}><Screw /></div>
        <div className="absolute" style={{top: '6px', right: '6px'}}><Screw /></div>
        <div className="absolute" style={{bottom: '6px', left: '6px'}}><Screw /></div>
        <div className="absolute" style={{bottom: '6px', right: '6px'}}><Screw /></div>

        {/* Wood grain texture */}
        <div className="absolute inset-0 pointer-events-none rounded opacity-8" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(100,70,40,0.25) 2px, rgba(100,70,40,0.25) 3px, transparent 3px, transparent 6px)'
        }} />

        <div className="flex flex-col gap-3 relative">
          
          {/* === HEADER: Title + 75% Badge === */}
          <div className="flex items-center justify-center gap-3" style={{marginBottom: '6px'}}>
            <div className="relative" style={{
              padding: '6px 20px',
              background: 'linear-gradient(180deg, #d4a574 0%, #c09560 50%, #a88850 100%)',
              boxShadow: 'inset 0 2px 3px rgba(255,230,190,0.9), inset 0 -2px 3px rgba(50,35,20,0.8), 0 3px 6px rgba(0,0,0,0.4)',
              border: '1px solid #8a6a40',
              borderRadius: '3px'
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '11px',
                color: '#2a1808',
                letterSpacing: '1.5px',
                textShadow: '1px 1px 0 rgba(255,240,200,0.9), -1px -1px 0 rgba(0,0,0,0.3)',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                LO-FI TAPE SATURATOR
              </div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '6px',
                color: '#3a2010',
                letterSpacing: '1px',
                textAlign: 'center',
                marginTop: '2px'
              }}>
                ★ ANALOG WARMTH PROCESSOR ★
              </div>
            </div>

            <div className="relative" style={{
              padding: '5px 12px',
              background: 'linear-gradient(180deg, #d4a574 0%, #c09560 50%, #a88850 100%)',
              boxShadow: 'inset 0 2px 3px rgba(255,230,190,0.9), inset 0 -2px 3px rgba(50,35,20,0.8), 0 3px 6px rgba(0,0,0,0.4)',
              border: '1px solid #8a6a40',
              borderRadius: '3px'
            }}>
              <div style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '10px',
                color: '#2a1808',
                fontWeight: 'bold',
                textShadow: '1px 1px 0 rgba(255,240,200,0.9)'
              }}>
                75%
              </div>
            </div>
          </div>

          {/* === TOP SECTION: PREAMP + DRIVE === */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* LEFT: PREAMP + VU Meter */}
            <div className="relative" style={{
              background: 'linear-gradient(145deg, #2a2218, #1a1410)',
              border: '2px solid #3a2a1a',
              borderRadius: '3px',
              padding: '10px',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9), 0 3px 8px rgba(0,0,0,0.5)'
            }}>
              <div className="absolute" style={{top: '4px', left: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              <div className="absolute" style={{top: '4px', right: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              <div className="absolute" style={{bottom: '4px', left: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              <div className="absolute" style={{bottom: '4px', right: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              
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
              
              <div className="flex justify-center items-center">
                <div style={{ transform: 'scale(1.05)' }}>
                  <VUMeter />
                </div>
              </div>
            </div>

            {/* RIGHT: DRIVE Section */}
            <div className="relative flex flex-col" style={{
              background: 'linear-gradient(145deg, #2a2218, #1a1410)',
              border: '2px solid #3a2a1a',
              borderRadius: '3px',
              padding: '10px',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9), 0 3px 8px rgba(0,0,0,0.5)'
            }}>
              <div className="absolute" style={{top: '4px', left: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              <div className="absolute" style={{top: '4px', right: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              <div className="absolute" style={{bottom: '4px', left: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              <div className="absolute" style={{bottom: '4px', right: '4px', transform: 'scale(0.7)'}}><Screw /></div>
              
              <div className="text-center mb-2" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '8px',
                color: '#d4a574',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0,0,0,0.9)'
              }}>
                DRIVE
              </div>
              
              <div className="flex justify-center mb-3">
                <div className="flex flex-col items-center">
                  <div style={{ transform: 'scale(1.3)' }}>
                    <Knob label="" value={drive} onChange={setDrive} size="medium" unit="%" />
                  </div>
                  <div className="mt-2" style={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: '#d4a574',
                    padding: '2px 8px',
                    background: 'rgba(212,165,116,0.15)',
                    borderRadius: '2px',
                    border: '1px solid rgba(212,165,116,0.3)'
                  }}>
                    {Math.round(drive)}%
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-3">
                <div className="flex flex-col items-center">
                  <ToggleSwitch
                    label=""
                    isOn={isPowerOn}
                    onToggle={() => setIsPowerOn(!isPowerOn)}
                    orientation="horizontal"
                  />
                  <div className="mt-1" style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '7px',
                    color: '#d4a574',
                    letterSpacing: '0.8px',
                    textShadow: '0 1px 1px rgba(0,0,0,0.8)',
                    textTransform: 'uppercase'
                  }}>
                    POWER
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-1" style={{padding: '0 12px'}}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{
                    height: '2px',
                    background: drive > (i * 12.5) 
                      ? `linear-gradient(90deg, rgba(255, 140, 40, ${0.4 + (drive / 150)}), rgba(255, 100, 20, ${0.4 + (drive / 150)}))`
                      : 'rgba(40, 30, 20, 0.6)',
                    borderRadius: '1px',
                    boxShadow: drive > (i * 12.5) ? `0 0 6px rgba(255, 120, 30, ${drive / 200})` : 'none',
                    transition: 'all 0.3s ease'
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
            padding: '10px',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9), 0 3px 8px rgba(0,0,0,0.5)'
          }}>
            <div className="absolute" style={{top: '4px', left: '4px', transform: 'scale(0.7)'}}><Screw /></div>
            <div className="absolute" style={{top: '4px', right: '4px', transform: 'scale(0.7)'}}><Screw /></div>
            <div className="absolute" style={{bottom: '4px', left: '4px', transform: 'scale(0.7)'}}><Screw /></div>
            <div className="absolute" style={{bottom: '4px', right: '4px', transform: 'scale(0.7)'}}><Screw /></div>
            
            <div className="text-center mb-2" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)'
            }}>
              TAPE DECK
            </div>
            
            <div style={{
              background: 'linear-gradient(145deg, #e8d8c0, #d0c0a0)',
              border: '2px solid #8a7a60',
              borderRadius: '3px',
              padding: '10px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}>
              <div className="text-center mb-2" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#4a3828',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>
                TAPE
              </div>
              
              <div className="flex justify-center mb-3">
                <div style={{ transform: 'scale(1.5)' }}>
                  <TapeReels />
                </div>
              </div>
              
              <div className="flex justify-center">
                <button style={{
                  background: 'linear-gradient(145deg, #4a4038, #2a2018)',
                  border: '2px solid #1a1410',
                  borderRadius: '3px',
                  padding: '5px 14px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  color: '#d4a574',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)',
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
            boxShadow: 'inset 0 1px 2px rgba(180,160,130,0.5), inset 0 -1px 2px rgba(40,30,20,0.7), 0 2px 3px rgba(0,0,0,0.4)'
          }}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.5) translateY(-50%)'}}><Screw /></div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.5) translateY(-50%)'}}><Screw /></div>
          </div>

          {/* === 8 KNOBS SECTION === */}
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 px-1">
            {/* Row 1 */}
            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>TONE</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={tone} onChange={setTone} size="medium" unit="%" />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{Math.round(tone)}%</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>MPC</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={mpc} onChange={setMpc} size="medium" unit="" displayValue={(v) => Math.round(v).toString()} />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{Math.round(mpc)}</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>RESAMPLER</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={resampler} onChange={setResampler} size="medium" unit="k" displayValue={(v) => `${(v * 44.1 / 100).toFixed(1)}`} />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{(resampler * 44.1 / 100).toFixed(1)}k</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>WOW</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={wow} onChange={setWow} size="medium" unit="%" />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{Math.round(wow)}%</div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>LOW PASS</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={lowPass} onChange={setLowPass} size="medium" unit="k" displayValue={(v) => `${(v * 20 / 100 + 1).toFixed(1)}`} />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{(lowPass * 20 / 100 + 1).toFixed(1)}k</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>NOISE</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={noise} onChange={setNoise} size="medium" unit="%" />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{Math.round(noise)}%</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>FLUTTER</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={flutter} onChange={setFlutter} size="medium" unit="%" />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{Math.round(flutter)}%</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '7px',
                color: '#5a3820',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}>DRY/WET</div>
              <div style={{ transform: 'scale(1.2)' }}>
                <Knob label="" value={dryWet} onChange={setDryWet} size="medium" unit="%" />
              </div>
              <div className="mt-2" style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#3a2010',
                padding: '2px 8px',
                background: 'rgba(200,180,160,0.4)',
                borderRadius: '2px',
                border: '1px solid rgba(140,120,100,0.4)',
                minWidth: '40px',
                textAlign: 'center'
              }}>{Math.round(dryWet)}%</div>
            </div>
          </div>

          {/* === WOODEN SEPARATOR BOTTOM === */}
          <div className="relative" style={{
            height: '8px',
            background: 'linear-gradient(145deg, #8a7560, #6a5540)',
            border: '1px solid #5a4530',
            borderRadius: '2px',
            boxShadow: 'inset 0 1px 2px rgba(180,160,130,0.5), inset 0 -1px 2px rgba(40,30,20,0.7), 0 2px 3px rgba(0,0,0,0.4)',
            marginTop: '2px'
          }}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.5) translateY(-50%)'}}><Screw /></div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{transform: 'scale(0.5) translateY(-50%)'}}><Screw /></div>
          </div>

          {/* === FOOTER === */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="relative" style={{
              padding: '4px 10px',
              background: 'linear-gradient(180deg, #d4a574, #a88850)',
              boxShadow: 'inset 0 1px 2px rgba(255,230,190,0.9), inset 0 -1px 2px rgba(50,35,20,0.8), 0 2px 4px rgba(0,0,0,0.4)',
              border: '1px solid #8a6a40',
              borderRadius: '2px'
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '8px',
                color: '#2a1808',
                fontWeight: 'bold',
                textShadow: '1px 1px 0 rgba(255,240,200,0.9)',
                lineHeight: '1.2'
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

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isPowerOn ? 'radial-gradient(circle, #ff8800, #cc6600)' : 'radial-gradient(circle, #2a1808, #1a0a00)',
                  boxShadow: isPowerOn ? '0 0 8px #ff8800' : 'none',
                  border: '0.5px solid #1a1410',
                  transition: 'all 0.2s ease'
                }} />
                <span style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '6px',
                  color: '#5a3820',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>POWER</span>
              </div>

              <button
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setClipperPanelOpen && setClipperPanelOpen(!clipperPanelOpen)}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isClipping ? 'radial-gradient(circle, #ff2200, #cc0000)' : 'radial-gradient(circle, #2a1808, #1a0a00)',
                  boxShadow: isClipping ? '0 0 8px #ff2200' : 'none',
                  border: '0.5px solid #1a1410',
                  transition: 'all 0.2s ease'
                }} />
                <span style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '6px',
                  color: '#5a3820',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>CLIP</span>
              </button>
            </div>

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
    </div>
  );
};
