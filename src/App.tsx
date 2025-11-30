/**
 * IntheBox - Lo-Fi Tape Saturator
 * Main GUI Component
 * 
 * Vintage-inspired tape saturation interface built with React.
 * Can work standalone or with optional DSP backend integration.
 */

import { useState, useEffect } from 'react';
import { Knob } from './components/Knob';
import { VUMeter } from './components/VUMeter';
import { TapeReels } from './components/TapeReels';
import { ToggleSwitch } from './components/ToggleSwitch';
import { PresetBrowser, Preset } from './components/PresetBrowser';
import { ResizeControl } from './components/ResizeControl';
import { LoadingScreen } from './components/LoadingScreen';
import { useDesignTokens } from './hooks/useDesignTokens';
import { FigmaLayout } from './components/FigmaLayout';
import { AudioInputDemo } from './components/AudioInputDemo';

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
    dryWet?: number;
    isPowerOn?: boolean;
    clipperMode?: number;
  };
}

import AppSimple from './AppSimple';

export default AppSimple;
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, #8b6914 2px, #8b6914 3px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, #8b6914 2px, #8b6914 3px)
              `
            }}
          />

          {/* Corner screws */}
          <div className="absolute top-2 left-2"><Screw /></div>
          <div className="absolute top-2 right-2"><Screw /></div>
          <div className="absolute bottom-2 left-2"><Screw /></div>
          <div className="absolute bottom-2 right-2"><Screw /></div>
          
          {/* Additional screws for realism */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2"><Screw /></div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2"><Screw /></div>
          
          {/* Side vents */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <VentHoles />
            <VentHoles />
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <VentHoles />
            <VentHoles />
          </div>

          {/* Vintage Logo/Title with Resize Control */}
          <div className="relative flex items-center justify-between" style={{ marginTop: '8px', marginBottom: '12px' }}>
            {/* Left spacer for balance */}
            <div style={{ width: '80px' }} />
            
            {/* Center: Clickable Title */}
            <button
              onClick={() => setPresetBrowserOpen(true)}
              className="text-center relative flex-1 cursor-pointer transition-all hover:brightness-110 active:brightness-95"
              title="Click to open Preset Browser"
            >
              {/* Vintage badge background */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm pointer-events-none"
                style={{
                  width: 'calc(100% - 100px)',
                  maxWidth: '300px',
                  height: '28px',
                  background: 'var(--gradient-bronze)',
                  boxShadow: `
                    inset 0 2px 3px rgba(255,220,180,0.8),
                    inset 0 -2px 4px rgba(60,40,20,0.6),
                    0 3px 6px rgba(0,0,0,0.4)
                  `,
                  border: '1.5px solid var(--bronze-shadow)'
                }}
              />
              
              <h1 
                className="relative"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--font-size-logo)',
                  color: 'var(--text-primary)',
                  textShadow: `
                    1px 1px 0px rgba(255,240,200,0.8),
                    -1px -1px 0px rgba(0,0,0,0.3),
                    1px 2px 3px rgba(0,0,0,0.3)
                  `,
                  letterSpacing: 'var(--letter-spacing-normal)',
                  fontWeight: 'bold'
                }}
              >
                LO-FI TAPE SATURATOR
              </h1>
              <div 
                className="relative"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--font-size-label)',
                  color: 'var(--text-secondary)',
                  textShadow: '1px 1px 0px rgba(255,240,200,0.6)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  marginTop: '-2px'
                }}
              >
                ★ ANALOG WARMTH PROCESSOR ★
              </div>
            </button>
            
            {/* Right: Resize Control */}
            <div 
              className="relative"
              style={{ 
                width: '80px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: '4px'
              }}
            >
              <ResizeControl onScaleChange={setGuiScale} />
            </div>
          </div>

          {/* Preset Browser Dropdown */}
          <PresetBrowser
            isOpen={presetBrowserOpen}
            onClose={() => setPresetBrowserOpen(false)}
            currentParameters={{
              drive,
              tone,
              mpc,
              wow,
              noise,
              flutter,
              resampler,
              lowPass,
              dryWet,
              clipperMode
            }}
            onLoadPreset={handleLoadPreset}
          />

          {/* LAYOUT CORRETTO SECONDO FIGMA */}
          <FigmaLayout
            drive={drive}
            tone={tone}
            mpc={mpc}
            wow={wow}
            noise={noise}
            flutter={flutter}
            resampler={resampler}
            lowPass={lowPass}
            dryWet={dryWet}
            setDrive={setDriveWithDSP}
            setTone={setToneWithDSP}
            setMpc={setMpcWithDSP}
            setWow={setWowWithDSP}
            setNoise={setNoiseWithDSP}
            setFlutter={setFlutterWithDSP}
            setResampler={setResamplerWithDSP}
            setLowPass={setLowPassWithDSP}
            setDryWet={setDryWetWithDSP}
            isPowerOn={isPowerOn}
            setIsPowerOn={setIsPowerOnWithDSP}
          />

          {/* 
          LAYOUT VECCHIO RIMOSSO - ERA QUESTO IL PROBLEMA!
          <div className="grid grid-cols-2 gap-2 mb-2">
            {/* Left column: PREAMP + TAPE DECK */}
            <div className="flex flex-col gap-2">
              {/* PREAMP Section */}
              <div 
                className="flex flex-col items-center p-2 relative"
                style={{
                  background: 'linear-gradient(145deg, #2a2218, #1a1510)',
                  boxShadow: `
                    inset 0 3px 8px rgba(0,0,0,0.8),
                    inset 0 -2px 4px rgba(100,80,60,0.3),
                    0 3px 6px rgba(0,0,0,0.5)
                  `,
                  border: '2px solid #4a3828',
                  borderRadius: '1px'
                }}
              >
                {/* Vintage corner brackets */}
                <div className="absolute top-1 left-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                <div className="absolute top-1 right-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                <div className="absolute bottom-1 left-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                <div className="absolute bottom-1 right-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                
                <div 
                  className="text-[7px] tracking-wider uppercase mb-1 relative"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    color: '#d4a574',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 6px rgba(212,165,116,0.4)'
                  }}
                >
                  PREAMP
                </div>
                <VUMeter />
              </div>

              {/* TAPE Section */}
              <div 
                className="flex flex-col items-center p-2 relative"
                style={{
                  background: 'linear-gradient(145deg, #2a2218, #1a1510)',
                  boxShadow: `
                    inset 0 3px 8px rgba(0,0,0,0.8),
                    inset 0 -2px 4px rgba(100,80,60,0.3),
                    0 3px 6px rgba(0,0,0,0.5)
                  `,
                  border: '2px solid #4a3828',
                  borderRadius: '1px'
                }}
              >
                {/* Vintage corner brackets */}
                <div className="absolute top-1 left-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                <div className="absolute top-1 right-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                <div className="absolute bottom-1 left-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                <div className="absolute bottom-1 right-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
                
                <div 
                  className="text-[7px] tracking-wider uppercase mb-1 relative"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    color: '#d4a574',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 6px rgba(212,165,116,0.4)'
                  }}
                >
                  TAPE DECK
                </div>
                <TapeReels flutter={flutter} />
              </div>
            </div>

            {/* Right column: DRIVE */}
            <div 
              className="flex flex-col items-center p-2 relative h-full"
              style={{
                background: 'linear-gradient(145deg, #2a2218, #1a1510)',
                boxShadow: `
                  inset 0 3px 8px rgba(0,0,0,0.8),
                  inset 0 -2px 4px rgba(100,80,60,0.3),
                  0 3px 6px rgba(0,0,0,0.5)
                `,
                border: '2px solid #4a3828',
                borderRadius: '1px'
              }}
            >
              {/* Vintage corner brackets */}
              <div className="absolute top-1 left-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
              <div className="absolute top-1 right-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
              <div className="absolute bottom-1 left-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
              <div className="absolute bottom-1 right-1" style={{ transform: 'scale(0.8)' }}><Screw /></div>
              <div 
                className="text-[7px] tracking-wider uppercase mb-1 relative"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#d4a574',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 6px rgba(212,165,116,0.4)'
                }}
              >
                DRIVE
              </div>
              <div className="flex flex-col items-center gap-2">
                <Knob 
                  label=""
                  value={drive}
                  onChange={setDriveWithDSP}
                  size="medium"
                  unit="%"
                />

                {/* Power Toggle Switch */}
                <ToggleSwitch 
                  isOn={isPowerOn}
                  onToggle={() => setIsPowerOnWithDSP(!isPowerOn)}
                  label="POWER"
                />

                {/* Air vents with glowing lines (light emits from slits) */}
                <div 
                  className="flex flex-col gap-2 mt-2 flex-1 relative"
                  style={{
                    width: '70px',
                    paddingBottom: '4px',
                    minHeight: '60px',
                    background: 'linear-gradient(145deg, #2a2218, #1a1510)',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9)',
                  }}
                >
                  {/* Vent lines (14 horizontal slits) */}
                  {Array.from({ length: 14 }).map((_, index) => {
                    // Calculate light intensity
                    const driveNorm = drive / 100;
                    const baseGlow = isPowerOn ? 0.2 + driveNorm * 0.8 : 0;
                    
                    // Add slight random variation per line
                    const variation = 1 + (Math.sin(index * 0.7) * 0.1);
                    const lineGlow = baseGlow * variation;
                    
                    // Color shifts from yellow to orange with drive
                    const glowR = 255;
                    const glowG = Math.round(180 - driveNorm * 60); // 180 → 120
                    const glowB = Math.round(50 - driveNorm * 30);  // 50 → 20
                    
                    return (
                      <div
                        key={index}
                        className="relative transition-all duration-200"
                        style={{
                          width: '100%',
                          height: '3px',
                          borderRadius: '0.5px',
                        }}
                      >
                        {/* Light glow layer (behind the slit) */}
                        {isPowerOn && lineGlow > 0.1 && (
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: `linear-gradient(90deg,
                                transparent 0%,
                                rgba(${glowR}, ${glowG}, ${glowB}, ${lineGlow * 0.3}) 10%,
                                rgba(${glowR}, ${glowG}, ${glowB}, ${lineGlow * 0.8}) 50%,
                                rgba(${glowR}, ${glowG}, ${glowB}, ${lineGlow * 0.3}) 90%,
                                transparent 100%
                              )`,
                              boxShadow: `
                                0 0 ${2 + lineGlow * 6}px rgba(${glowR}, ${glowG}, ${glowB}, ${lineGlow * 0.8}),
                                0 0 ${4 + lineGlow * 12}px rgba(${glowR}, ${glowG - 20}, ${glowB}, ${lineGlow * 0.5})
                              `,
                              filter: `blur(${0.5 + lineGlow * 1.5}px)`
                            }}
                          />
                        )}
                        
                        {/* Slit itself (dark with depth) */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: isPowerOn && lineGlow > 0.2
                              ? `linear-gradient(90deg,
                                  rgba(0,0,0,0.95) 0%,
                                  rgba(${Math.round(glowR * 0.15)}, ${Math.round(glowG * 0.15)}, ${Math.round(glowB * 0.15)}, ${0.8 - lineGlow * 0.4}) 50%,
                                  rgba(0,0,0,0.95) 100%
                                )`
                              : 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(10,8,5,0.9) 50%, rgba(0,0,0,0.95) 100%)',
                            boxShadow: isPowerOn && lineGlow > 0.2
                              ? `
                                inset 0 1px 2px rgba(0,0,0,0.95),
                                inset 0 -1px 2px rgba(0,0,0,0.9),
                                0 0 1px rgba(${glowR}, ${glowG}, ${glowB}, ${lineGlow * 0.4})
                              `
                              : `
                                inset 0 1px 2px rgba(0,0,0,0.95),
                                inset 0 -1px 2px rgba(0,0,0,0.9)
                              `,
                            border: isPowerOn && lineGlow > 0.3
                              ? `0.5px solid rgba(${glowR}, ${glowG}, ${glowB}, ${lineGlow * 0.2})`
                              : '0.5px solid #0a0a0a',
                            borderRadius: '0.5px'
                          }}
                        />
                        
                        {/* Bright inner glow (visible at high drive) */}
                        {isPowerOn && lineGlow > 0.4 && (
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: `linear-gradient(90deg,
                                transparent 0%,
                                transparent 20%,
                                rgba(255, 220, 100, ${lineGlow * 0.6}) 50%,
                                transparent 80%,
                                transparent 100%
                              )`,
                              filter: 'blur(1px)',
                              mixBlendMode: 'screen'
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Ambient glow from all lines combined */}
                  {isPowerOn && drive > 15 && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at center,
                          rgba(255, 200, 50, ${0.1 + (drive / 100) * 0.25}) 0%,
                          rgba(255, 140, 0, ${0.05 + (drive / 100) * 0.15}) 40%,
                          transparent 75%
                        )`,
                        filter: `blur(${5 + (drive / 100) * 8}px)`,
                        opacity: 0.5 + (drive / 100) * 0.5
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Wooden Divider Bar */}
          <div 
            className="relative my-3"
            style={{
              height: '10px',
              background: `
                linear-gradient(145deg, #3d2817, #2d1810),
                repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)
              `,
              backgroundBlendMode: 'normal',
              boxShadow: `
                0 4px 8px rgba(0,0,0,0.8),
                inset 0 2px 3px rgba(0,0,0,0.9),
                inset 0 -1px 2px rgba(100,80,60,0.2)
              `,
              borderRadius: '1px',
              border: '1px solid #2a1810'
            }}
          >
            {/* Wood grain texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none rounded opacity-30"
              style={{
                background: `
                  repeating-linear-gradient(90deg, 
                    transparent, transparent 2px,
                    rgba(139,69,19,0.4) 2px, rgba(139,69,19,0.4) 3px,
                    transparent 3px, transparent 7px
                  )
                `
              }}
            />
            
            {/* Mounting screws */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2">
              <Screw />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <Screw />
            </div>
            
            {/* Center mounting screws for stability */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/3">
              <Screw />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-1/3">
              <Screw />
            </div>
            
            {/* Edge highlight */}
            <div 
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(100,80,60,0.3) 50%, transparent)'
              }}
            />
            
            {/* Bottom shadow */}
            <div 
              className="absolute inset-x-0 bottom-0 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.6) 50%, transparent)'
              }}
            />
          </div>

        {/* Control Knobs Row 1 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <Knob label="Tone" value={tone} onChange={setToneWithDSP} unit="%" />
          <Knob 
            label="MPC" 
            value={mpc} 
            onChange={setMpcWithDSP} 
            unit="bit"
            displayValue={(val) => {
              const bitDepth = Math.round(4 + (val / 100) * 20);
              return `${bitDepth}`;
            }}
          />
          <Knob 
            label="Resampler" 
            value={resampler} 
            onChange={setResamplerWithDSP} 
            unit="Hz" 
            min={0}
            max={100}
            displayValue={(val) => {
              const minLog = Math.log(44);
              const maxLog = Math.log(44100);
              const scale = (maxLog - minLog) / 100;
              const hz = Math.exp(minLog + scale * val);
              
              if (hz >= 1000) {
                return `${(hz / 1000).toFixed(1)}k`;
              }
              return `${Math.round(hz)}`;
            }}
          />
          <Knob label="Wow" value={wow} onChange={setWowWithDSP} unit="%" />
        </div>

        {/* Control Knobs Row 2 */}
        <div className="grid grid-cols-4 gap-2 items-start">
          <div>
            <Knob 
              label="Low Pass" 
              value={lowPass} 
              onChange={setLowPassWithDSP} 
              unit="Hz" 
              displayValue={(val) => {
                const minLog = Math.log(20);
                const maxLog = Math.log(20000);
                const scale = (maxLog - minLog) / 100;
                const hz = Math.exp(minLog + scale * val);
                
                if (hz >= 1000) {
                  return `${(hz / 1000).toFixed(1)}k`;
                }
                return `${Math.round(hz)}`;
              }}
            />
          </div>
          <div>
            <Knob label="Noise" value={noise} onChange={setNoiseWithDSP} unit="%" />
          </div>
          <div>
            <Knob label="Flutter" value={flutter} onChange={setFlutterWithDSP} unit="%" />
          </div>
          <div>
            <Knob 
              label="Dry/Wet" 
              value={dryWet} 
              onChange={setDryWetWithDSP} 
              unit="%" 
            />
          </div>
        </div>

          {/* Vintage Branding with Wooden Divider */}
          <div className="flex justify-between items-center gap-3 relative" style={{ marginTop: '12px' }}>
            {/* Left side: Logo */}
            <div className="flex flex-col gap-1" style={{ marginLeft: '6px' }}>
              {/* Vintage Logo Plate - Clickable */}
              <a
                href="https://www.itbblog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 relative cursor-pointer transition-all hover:brightness-110 active:brightness-95"
                style={{
                  background: 'linear-gradient(180deg, #c8a870, #a88850)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255,220,180,0.7),
                    inset 0 -2px 3px rgba(60,40,20,0.5),
                    0 2px 4px rgba(0,0,0,0.4)
                  `,
                  border: '1.5px solid #8a6830',
                  borderRadius: '2px'
                }}
                title="Visit ITB Blog"
              >
                <div 
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    color: '#2a1808',
                    textShadow: '1px 1px 0 rgba(255,240,200,0.8), -1px -1px 0 rgba(0,0,0,0.3)',
                    letterSpacing: '0.12em'
                  }}
                >
                  IntheBox
                </div>
                <div 
                  className="text-center text-[5px] tracking-wider"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#4a2818',
                    textShadow: '0 1px 0 rgba(255,240,200,0.6)'
                  }}
                >
                  VST3
                </div>
              </a>
            </div>
            
            {/* Wooden Divider Bar - from logo center to right edge */}
            <div 
              className="relative flex-1 flex items-center justify-end"
              style={{
                height: '10px',
                background: `
                  linear-gradient(145deg, #3d2817, #2d1810),
                  repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)
                `,
                backgroundBlendMode: 'normal',
                boxShadow: `
                  0 4px 8px rgba(0,0,0,0.8),
                  inset 0 2px 3px rgba(0,0,0,0.9),
                  inset 0 -1px 2px rgba(100,80,60,0.2)
                `,
                borderRadius: '1px',
                border: '1px solid #2a1810',
                marginRight: '6px',
                paddingRight: '20px'
              }}
            >
              {/* Wood grain texture overlay */}
              <div 
                className="absolute inset-0 pointer-events-none rounded opacity-30"
                style={{
                  background: `
                    repeating-linear-gradient(90deg, 
                      transparent, transparent 2px,
                      rgba(139,69,19,0.4) 2px, rgba(139,69,19,0.4) 3px,
                      transparent 3px, transparent 7px
                    )
                  `
                }}
              />
              
              {/* Mounting screws */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <Screw />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2">
                <Screw />
              </div>
              
              {/* Center mounting screws for stability */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/3">
                <Screw />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-1/3">
                <Screw />
              </div>
              
              {/* Edge highlight */}
              <div 
                className="absolute inset-x-0 top-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(100,80,60,0.3) 50%, transparent)'
                }}
              />
              
              {/* Bottom shadow */}
              <div 
                className="absolute inset-x-0 bottom-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.6) 50%, transparent)'
                }}
              />
              
              {/* Since date text - inside wooden bar */}
              <div 
                className="text-[6px] tracking-wider relative z-10"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#d4a574',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 6px rgba(212,165,116,0.3)'
                }}
              >
                Since 2024
              </div>
            </div>
          </div>

        </div>
        
        {/* Bottom vintage panel */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-3 flex items-center justify-center gap-4"
          style={{
            background: 'linear-gradient(180deg, #2a1810, #3a2418)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)'
          }}
        >
          {/* Vintage indicator lights */}
          <div className="flex items-center gap-1.5">
            <div 
              className="w-1.5 h-1.5 rounded-full relative"
              style={{
                background: isPowerOn 
                  ? 'radial-gradient(circle, #ff8800, #cc5500)' 
                  : 'radial-gradient(circle, #2a1808, #0a0000)',
                boxShadow: isPowerOn 
                  ? '0 0 8px #ff8800, inset 0 1px 2px rgba(255,200,100,0.5)' 
                  : 'inset 0 1px 2px rgba(0,0,0,0.9)',
                border: '0.5px solid #1a0a00'
              }}
            />
            <span 
              className="text-[6px]"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#8a6850'
              }}
            >
              POWER
            </span>
          </div>
          <button 
            className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => setClipperPanelOpen(!clipperPanelOpen)}
            title="Click to configure clipper"
          >
            <div 
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background: isClipping
                  ? 'radial-gradient(circle, #ff2200, #aa0000)'
                  : 'radial-gradient(circle, #2a1808, #0a0000)',
                boxShadow: isClipping
                  ? '0 0 8px #ff2200, inset 0 1px 2px rgba(255,100,50,0.5)'
                  : 'inset 0 1px 2px rgba(0,0,0,0.9)',
                border: '0.5px solid #1a0a00'
              }}
            />
            <span 
              className="text-[6px]"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#8a6850'
              }}
            >
              CLIP {clipperPanelOpen ? '▼' : '▶'}
            </span>
          </button>
        </div>

        {/* Clipper Panel - Modal Overlay */}
        {clipperPanelOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 z-40 transition-opacity"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(2px)'
              }}
              onClick={() => setClipperPanelOpen(false)}
            />
            
            {/* Clipper Panel - Centered */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all"
              style={{
                width: '340px',
                background: 'linear-gradient(145deg, #2a2218, #1a1510)',
                boxShadow: `
                  0 16px 48px rgba(0,0,0,0.95),
                  inset 0 3px 8px rgba(0,0,0,0.8),
                  inset 0 -2px 4px rgba(100,80,60,0.3)
                `,
                border: '2px solid #4a3828',
                borderRadius: '2px',
                padding: '12px 16px'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setClipperPanelOpen(false)}
                className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full transition-all hover:brightness-125"
                style={{
                  background: 'radial-gradient(circle, #8a6850, #5a4830)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  color: '#2a1808',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}
              >
                ✕
              </button>
              
              {/* Title */}
              <div 
                className="text-center mb-3 text-[9px] tracking-wider uppercase"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#d4a574',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 6px rgba(212,165,116,0.4)'
                }}
              >
                CLIPPER CONFIGURATION
              </div>
              
              {/* Corner screws */}
              <div className="absolute top-2 left-2"><Screw /></div>
              <div className="absolute bottom-2 left-2"><Screw /></div>
              <div className="absolute bottom-2 right-2"><Screw /></div>
              
              <div className="flex items-center justify-center gap-6">
                <Knob 
                  label="Clipper Mode"
                  value={clipperMode}
                  onChange={setClipperModeWithDSP}
                  unit=""
                  steps={3}
                  displayValue={(val) => {
                    if (val === 0) return 'SOFT';
                    if (val === 50) return 'MODERATE';
                    return 'HARD';
                  }}
                />

                {/* Description text */}
                <div 
                  className="max-w-[160px] text-[6px] leading-relaxed"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    color: '#8a7050'
                  }}
                >
                  <div className="mb-0.5">
                    <span style={{ color: '#d4a574', fontWeight: 'bold' }}>SOFT:</span> Gentle saturation with smooth transitions
                  </div>
                  <div className="mb-0.5">
                    <span style={{ color: '#d4a574', fontWeight: 'bold' }}>MODERATE:</span> Balanced warmth and harmonics
                  </div>
                  <div>
                    <span style={{ color: '#d4a574', fontWeight: 'bold' }}>HARD:</span> Aggressive clipping with pronounced character
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* DSP Test Panel - Enable for audio testing */}
        <AudioInputDemo />
          </div>
        </div>
      </div>
    </LoadingScreen>
  );
}
