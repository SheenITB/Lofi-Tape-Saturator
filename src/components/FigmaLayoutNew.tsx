/**
 * FigmaLayout Component - Layout esatto secondo screenshot Figma
 * Implementa il layout orizzontale con disposizione 2x4 dei knobs
 */

import React from 'react';
import { Knob } from './Knob';
import { VUMeter } from './VUMeter';
import { TapeReels } from './TapeReels';

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
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #c0c0c0, #606060)',
        boxShadow: `
          inset 0 1px 1px rgba(255,255,255,0.6),
          inset 0 -1px 1px rgba(0,0,0,0.8),
          0 1px 2px rgba(0,0,0,0.4)
        `,
        border: '0.5px solid #404040'
      }}
    />
  );

  return (
    <div 
      className="relative w-full h-full"
      style={{
        background: 'linear-gradient(145deg, #f4e4c1 0%, #e8d4a3 25%, #d8c193 50%, #c8a983 75%, #b89773 100%)',
        border: '3px solid #8a6b47',
        borderRadius: '4px',
        padding: '14px',
        boxShadow: `
          inset 0 3px 6px rgba(255,240,200,0.6),
          inset 0 -3px 6px rgba(139,111,71,0.8),
          0 4px 12px rgba(0,0,0,0.4)
        `
      }}
    >
      {/* Corner screws */}
      <div className="absolute top-2 left-2"><Screw /></div>
      <div className="absolute top-2 right-2"><Screw /></div>
      <div className="absolute bottom-2 left-2"><Screw /></div>
      <div className="absolute bottom-2 right-2"><Screw /></div>

      {/* Wood grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none rounded opacity-15"
        style={{
          background: `
            repeating-linear-gradient(90deg, 
              transparent, transparent 1px,
              rgba(139,111,71,0.3) 1px, rgba(139,111,71,0.3) 2px,
              transparent 2px, transparent 5px
            )
          `
        }}
      />

      {/* === TOP SECTION: TITLE AND VU METER === */}
      <div className="mb-3">
        {/* Title Badge - Exact Figma Style */}
        <div className="flex justify-center mb-3">
          <div 
            className="relative px-4 py-1"
            style={{
              background: 'linear-gradient(145deg, #d4a574 0%, #b8925f 50%, #9d7a4a 100%)',
              boxShadow: `
                inset 0 2px 4px rgba(255,220,180,0.8),
                inset 0 -2px 4px rgba(60,40,20,0.6),
                0 2px 6px rgba(0,0,0,0.4)
              `,
              border: '1px solid #8a6b47',
              borderRadius: '2px',
              width: 'fit-content',
              maxWidth: '280px'
            }}
          >
            <div 
              className="text-center"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '11px',
                color: '#2a1808',
                letterSpacing: '1px',
                textShadow: '0 1px 1px rgba(255,240,200,0.8)',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              LO-FI TAPE SATURATOR
            </div>
          </div>
        </div>

        {/* VU Meter section with side controls */}
        <div 
          className="flex items-center justify-between mb-2"
          style={{
            background: 'linear-gradient(145deg, #2a2218, #1a1510)',
            border: '2px solid #4a3828',
            borderRadius: '3px',
            padding: '8px 12px',
            boxShadow: `
              inset 0 2px 4px rgba(0,0,0,0.8),
              inset 0 -1px 2px rgba(100,80,60,0.3),
              0 2px 6px rgba(0,0,0,0.4)
            `
          }}
        >
          {/* Left: PREAMP label */}
          <div 
            className="flex flex-col items-center"
            style={{ width: '60px' }}
          >
            <div 
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#d4a574',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                textShadow: '0 1px 1px rgba(0,0,0,0.8)'
              }}
            >
              PREAMP
            </div>
          </div>

          {/* Center: VU Meter - Made Much Larger */}
          <div 
            className="flex-1 flex justify-center"
            style={{ transform: 'scale(1.4)' }}
          >
            <VUMeter />
          </div>

          {/* Right: Power and Clip indicators */}
          <div 
            className="flex flex-col items-center gap-1"
            style={{ width: '60px' }}
          >
            {/* Power indicator */}
            <div className="flex items-center gap-1">
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: isPowerOn
                    ? 'radial-gradient(circle, #00ff00, #008800)'
                    : 'radial-gradient(circle, #2a1808, #0a0000)',
                  boxShadow: isPowerOn
                    ? '0 0 4px #00ff00'
                    : 'inset 0 1px 1px rgba(0,0,0,0.9)',
                  border: '0.5px solid #1a0a00'
                }}
              />
              <span 
                style={{ 
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  color: '#d4a574',
                  textShadow: '0 1px 1px rgba(0,0,0,0.8)'
                }}
              >
                POWER
              </span>
            </div>

            {/* Clip indicator */}
            <button 
              className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => setClipperPanelOpen && setClipperPanelOpen(!clipperPanelOpen)}
              title="Click to configure clipper"
            >
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: isClipping
                    ? 'radial-gradient(circle, #ff2200, #aa0000)'
                    : 'radial-gradient(circle, #2a1808, #0a0000)',
                  boxShadow: isClipping
                    ? '0 0 4px #ff2200'
                    : 'inset 0 1px 1px rgba(0,0,0,0.9)',
                  border: '0.5px solid #1a0a00'
                }}
              />
              <span 
                style={{ 
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  color: '#d4a574',
                  textShadow: '0 1px 1px rgba(0,0,0,0.8)'
                }}
              >
                CLIP
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* === MIDDLE SECTION: TAPE REELS === */}
      <div 
        className="flex justify-center mb-3"
        style={{
          background: 'linear-gradient(145deg, #2a2218, #1a1510)',
          border: '2px solid #4a3828',
          borderRadius: '3px',
          padding: '12px 20px',
          position: 'relative',
          minHeight: '120px'
        }}
      >
        <div className="absolute top-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
        <div className="absolute top-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
        <div className="absolute bottom-1 left-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
        <div className="absolute bottom-1 right-1" style={{transform: 'scale(0.5)'}}><Screw /></div>
        
        {/* Tape label */}
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '8px',
            color: '#d4a574',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            textShadow: '0 1px 1px rgba(0,0,0,0.8)'
          }}
        >
          TAPE
        </div>
        
        <div style={{ transform: 'scale(1.6)' }}>
          <TapeReels />
        </div>
      </div>

      {/* === BOTTOM SECTION: CONTROLS GRID === */}
      <div className="grid grid-cols-4 gap-4 px-2">
        {/* Row 1 */}
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={drive}
              onChange={setDrive}
              size="medium"
              unit="%"
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            DRIVE
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={wow}
              onChange={setWow}
              size="medium"
              unit="%"
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            WOW
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={resampler}
              onChange={setResampler}
              size="medium"
              unit="kHz"
              displayValue={(value) => `${(value * 44.1 / 100).toFixed(1)}`}
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            RESAMPLER
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={dryWet}
              onChange={setDryWet}
              size="medium"
              unit="%"
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            DRY/WET
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={tone}
              onChange={setTone}
              size="medium"
              unit="%"
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            TONE
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={noise}
              onChange={setNoise}
              size="medium"
              unit="%"
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            NOISE
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={flutter}
              onChange={setFlutter}
              size="medium"
              unit="%"
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            FLUTTER
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div style={{ transform: 'scale(1.3)' }}>
            <Knob 
              label=""
              value={lowPass}
              onChange={setLowPass}
              size="medium"
              unit="Hz"
              displayValue={(value) => `${Math.round(value * 200 + 1000)}`}
            />
          </div>
          <div 
            className="mt-1 text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8px',
              color: '#d4a574',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 1px rgba(0,0,0,0.8)'
            }}
          >
            LOW PASS
          </div>
        </div>
      </div>

      {/* === BOTTOM BRAND PANEL: IntheBox === */}
      <div 
        className="mt-3 flex justify-center"
      >
        <div 
          className="relative px-3 py-1"
          style={{
            background: 'linear-gradient(145deg, #d4a574 0%, #b8925f 50%, #9d7a4a 100%)',
            boxShadow: `
              inset 0 1px 2px rgba(255,220,180,0.8),
              inset 0 -1px 2px rgba(60,40,20,0.6),
              0 1px 3px rgba(0,0,0,0.4)
            `,
            border: '1px solid #8a6b47',
            borderRadius: '2px',
            width: 'fit-content'
          }}
        >
          <div 
            className="text-center"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '9px',
              color: '#2a1808',
              letterSpacing: '1px',
              textShadow: '0 1px 1px rgba(255,240,200,0.8)',
              fontWeight: 'bold'
            }}
          >
            IntheBox
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