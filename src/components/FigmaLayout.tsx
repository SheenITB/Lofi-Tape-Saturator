/**
 * FigmaLayout Component - Layout preciso secondo le specifiche Figma
 * Implementa il layout esatto come definito nelle specifiche del design
 */

import React from 'react';
import { Knob } from './Knob';
import { VUMeter } from './VUMeter';
import { TapeReels } from './TapeReels';
import { ToggleSwitch } from './ToggleSwitch';

interface FigmaLayoutProps {
  // Knobs parameters
  drive: number;
  tone: number;
  mpc: number;
  wow: number;
  noise: number;
  flutter: number;
  resampler: number;
  lowPass: number;
  dryWet: number;
  
  // Setters
  setDrive: (value: number) => void;
  setTone: (value: number) => void;
  setMpc: (value: number) => void;
  setWow: (value: number) => void;
  setNoise: (value: number) => void;
  setFlutter: (value: number) => void;
  setResampler: (value: number) => void;
  setLowPass: (value: number) => void;
  setDryWet: (value: number) => void;
  
  // Toggle states
  isPowerOn: boolean;
  setIsPowerOn: (value: boolean) => void;
  
  // Clipper
  clipperMode?: number;
  setClipperMode?: (value: number) => void;
  clipperPanelOpen?: boolean;
  setClipperPanelOpen?: (value: boolean) => void;
  isClipping?: boolean;
}

export const FigmaLayout: React.FC<FigmaLayoutProps> = ({
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
    <div 
      style={{
        width: 'var(--size-screw-diameter)',
        height: 'var(--size-screw-diameter)',
        borderRadius: '50%',
        background: 'var(--gradient-screw)',
        boxShadow: 'var(--shadow-screw)'
      }}
    />
  );

  return (
    <div 
      className="flex flex-col gap-3"
      style={{
        width: '100%',
        height: '100%',
        padding: 'var(--spacing-panel-padding)'
      }}
    >
      {/* === TOP SECTION: PREAMP CONTROLS === */}
      <div 
        className="relative p-3"
        style={{
          background: 'var(--gradient-bakelite)',
          boxShadow: 'var(--shadow-knob)',
          border: `var(--border-width-medium) solid var(--color-bakelite-medium)`,
          borderRadius: 'var(--border-radius-small)'
        }}
      >
        {/* Corner screws */}
        <div className="absolute top-1 left-1"><Screw /></div>
        <div className="absolute top-1 right-1"><Screw /></div>
        <div className="absolute bottom-1 left-1"><Screw /></div>
        <div className="absolute bottom-1 right-1"><Screw /></div>
        
        {/* Section label */}
        <div 
          className="text-center mb-2"
          style={{
            fontFamily: 'var(--typography-font-families-serif)',
            fontSize: 'var(--typography-font-sizes-section-label)',
            color: 'var(--color-text-label)',
            letterSpacing: 'var(--typography-letter-spacing-wide)',
            textTransform: 'uppercase',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)'
          }}
        >
          PREAMP
        </div>
        
        {/* VU Meter and Clipper Container */}
        <div className="flex items-center justify-between px-4">
          {/* Left spacer */}
          <div style={{ width: '60px' }} />
          
          {/* Center: VU Meter */}
          <div className="flex justify-center">
            <VUMeter />
          </div>
          
          {/* Right: Clipper Panel Button */}
          <div className="flex flex-col items-center gap-1">
            <button 
              className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => setClipperPanelOpen && setClipperPanelOpen(!clipperPanelOpen)}
              title="Click to configure clipper"
            >
              <div 
                className="w-2 h-2 rounded-full transition-all"
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
                className="text-[8px]"
                style={{ 
                  fontFamily: 'var(--typography-font-families-serif)',
                  color: 'var(--color-text-label)',
                  textShadow: '0 1px 1px rgba(0,0,0,0.8)'
                }}
              >
                CLIP {clipperPanelOpen ? '▼' : '▶'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* === MIDDLE SECTION: MAIN CONTROLS === */}
      <div 
        className="grid grid-cols-3 gap-2"
        style={{
          minHeight: '200px'
        }}
      >
        {/* Left Column: DRIVE controls */}
        <div 
          className="relative p-3"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-medium) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)'
          }}
        >
          <div className="absolute top-1 left-1"><Screw /></div>
          <div className="absolute top-1 right-1"><Screw /></div>
          <div className="absolute bottom-1 left-1"><Screw /></div>
          <div className="absolute bottom-1 right-1"><Screw /></div>
          
          <div 
            className="text-center mb-2"
            style={{
              fontFamily: 'var(--typography-font-families-serif)',
              fontSize: 'var(--typography-font-sizes-section-label)',
              color: 'var(--color-text-label)',
              letterSpacing: 'var(--typography-letter-spacing-wide)',
              textTransform: 'uppercase'
            }}
          >
            DRIVE
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Knob 
              label="DRIVE"
              value={drive}
              onChange={setDrive}
              size="medium"
              unit="%"
            />
            <Knob 
              label="TONE"
              value={tone}
              onChange={setTone}
              size="medium"
              unit="%"
            />
          </div>
        </div>

        {/* Center Column: TAPE DECK */}
        <div 
          className="relative p-3"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-medium) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)'
          }}
        >
          <div className="absolute top-1 left-1"><Screw /></div>
          <div className="absolute top-1 right-1"><Screw /></div>
          <div className="absolute bottom-1 left-1"><Screw /></div>
          <div className="absolute bottom-1 right-1"><Screw /></div>
          
          <div 
            className="text-center mb-2"
            style={{
              fontFamily: 'var(--typography-font-families-serif)',
              fontSize: 'var(--typography-font-sizes-section-label)',
              color: 'var(--color-text-label)',
              letterSpacing: 'var(--typography-letter-spacing-wide)',
              textTransform: 'uppercase'
            }}
          >
            TAPE DECK
          </div>
          
          <div className="flex justify-center">
            <TapeReels flutter={flutter} />
          </div>
        </div>

        {/* Right Column: MASTER controls */}
        <div 
          className="relative p-3"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-medium) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)'
          }}
        >
          <div className="absolute top-1 left-1"><Screw /></div>
          <div className="absolute top-1 right-1"><Screw /></div>
          <div className="absolute bottom-1 left-1"><Screw /></div>
          <div className="absolute bottom-1 right-1"><Screw /></div>
          
          <div 
            className="text-center mb-2"
            style={{
              fontFamily: 'var(--typography-font-families-serif)',
              fontSize: 'var(--typography-font-sizes-section-label)',
              color: 'var(--color-text-label)',
              letterSpacing: 'var(--typography-letter-spacing-wide)',
              textTransform: 'uppercase'
            }}
          >
            MASTER
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Knob 
              label="DRY/WET"
              value={dryWet}
              onChange={setDryWet}
              size="medium"
              unit="%"
            />
            <ToggleSwitch 
              isOn={isPowerOn}
              onToggle={() => setIsPowerOn(!isPowerOn)}
              label="POWER"
            />
          </div>
        </div>
      </div>

      {/* === BOTTOM SECTION: TAPE CONTROLS === */}
      <div 
        className="grid grid-cols-4 gap-2"
      >
        {/* WOW section */}
        <div 
          className="relative p-2"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-thin) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)',
            minHeight: '100px'
          }}
        >
          <div className="absolute top-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute top-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          
          <div className="flex justify-center">
            <Knob 
              label="WOW"
              value={wow}
              onChange={setWow}
              size="small"
              unit="%"
            />
          </div>
        </div>

        {/* NOISE section */}
        <div 
          className="relative p-2"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-thin) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)',
            minHeight: '100px'
          }}
        >
          <div className="absolute top-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute top-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          
          <div className="flex justify-center">
            <Knob 
              label="NOISE"
              value={noise}
              onChange={setNoise}
              size="small"
              unit="%"
            />
          </div>
        </div>

        {/* FLUTTER section */}
        <div 
          className="relative p-2"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-thin) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)',
            minHeight: '100px'
          }}
        >
          <div className="absolute top-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute top-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          
          <div className="flex justify-center">
            <Knob 
              label="FLUTTER"
              value={flutter}
              onChange={setFlutter}
              size="small"
              unit="%"
            />
          </div>
        </div>

        {/* LOW PASS section */}
        <div 
          className="relative p-2"
          style={{
            background: 'var(--gradient-bakelite)',
            boxShadow: 'var(--shadow-knob)',
            border: `var(--border-width-thin) solid var(--color-bakelite-medium)`,
            borderRadius: 'var(--border-radius-small)',
            minHeight: '100px'
          }}
        >
          <div className="absolute top-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute top-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 left-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          <div className="absolute bottom-0.5 right-0.5" style={{transform: 'scale(0.6)'}}><Screw /></div>
          
          <div className="flex justify-center">
            <Knob 
              label="LOW PASS"
              value={lowPass}
              onChange={setLowPass}
              size="small"
              unit="Hz"
              displayValue={(value) => `${Math.round(value * 200 + 1000)}`}
            />
          </div>
        </div>
      </div>
      
      {/* Clipper Panel - Modal Overlay */}
      {clipperPanelOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 transition-opacity"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(2px)'
            }}
            onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)}
          />
          
          {/* Clipper Panel - Centered */}
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all"
            style={{
              width: '340px',
              background: 'var(--gradient-bakelite)',
              boxShadow: `
                0 16px 48px rgba(0,0,0,0.95),
                inset 0 3px 8px rgba(0,0,0,0.8),
                inset 0 -2px 4px rgba(100,80,60,0.3)
              `,
              border: '2px solid var(--color-bakelite-dark)',
              borderRadius: 'var(--border-radius-small)',
              padding: '12px 16px'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setClipperPanelOpen && setClipperPanelOpen(false)}
              className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full transition-all hover:brightness-125"
              style={{
                background: 'var(--gradient-bronze)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.8)',
                color: 'var(--color-text-primary)',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>
            
            {/* Title */}
            <div 
              className="text-center mb-3"
              style={{ 
                fontFamily: 'var(--typography-font-families-serif)',
                fontSize: 'var(--typography-font-sizes-section-label)',
                color: 'var(--color-text-label)',
                letterSpacing: 'var(--typography-letter-spacing-wide)',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)'
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
                label="CLIPPER MODE"
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

              {/* Description text */}
              <div 
                className="max-w-[160px]"
                style={{
                  fontFamily: 'var(--typography-font-families-sans)',
                  fontSize: 'var(--typography-font-sizes-body-small)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.4'
                }}
              >
                <div className="mb-1">
                  <span style={{ color: 'var(--color-text-label)', fontWeight: 'bold' }}>SOFT:</span> Gentle saturation with smooth transitions
                </div>
                <div className="mb-1">
                  <span style={{ color: 'var(--color-text-label)', fontWeight: 'bold' }}>MODERATE:</span> Balanced warmth and harmonics
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-label)', fontWeight: 'bold' }}>HARD:</span> Aggressive clipping with pronounced character
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};