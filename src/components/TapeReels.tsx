import { useEffect, useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';

interface TapeReelsProps {
  flutter?: number; // 0-100, higher values = slower rotation
}

export function TapeReels({ flutter = 0 }: TapeReelsProps) {
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Calculate interval based on flutter parameter
    // Base interval: 50ms (fast)
    // Max interval: 200ms (slow, at flutter=100)
    // Formula: baseInterval + (flutter / 100) * (maxInterval - baseInterval)
    const baseInterval = 50;
    const maxInterval = 200;
    const flutterInterval = baseInterval + (flutter / 100) * (maxInterval - baseInterval);
    
    const interval = setInterval(() => {
      if (isPlaying) {
        setRotation(prev => (prev + 1) % 360);
      }
    }, flutterInterval);

    return () => clearInterval(interval);
  }, [isPlaying, flutter]);

  const Reel = ({ rotation: rot, direction, tapeAmount }: { rotation: number; direction: number; tapeAmount: number }) => (
    <div className="relative w-[75px] h-[75px]">
      {/* Aluminum/Metal reel outer ring */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, #c8c8c8, #a0a0a0, #808080, #606060)
          `,
          boxShadow: `
            0 5px 15px rgba(0,0,0,0.85),
            inset 0 2px 5px rgba(255,255,255,0.5),
            inset 0 -3px 8px rgba(0,0,0,0.7)
          `,
          border: '1px solid #505050'
        }}
      >
        {/* Metal rim edge - more pronounced */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `
              inset 0 2px 3px rgba(255,255,255,0.7),
              inset 0 -2px 3px rgba(0,0,0,0.9)
            `
          }}
        />

        {/* Inner tape area with spokes (rotating) */}
        <div 
          className="absolute rounded-full overflow-hidden"
          style={{
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
            background: '#0a0a0a',
            boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.98)'
          }}
        >
          {/* Rotating hub assembly */}
          <div 
            className="absolute inset-0"
            style={{
              transform: `rotate(${rot * direction}deg)`,
              transition: 'transform 0.05s linear'
            }}
          >
            {/* Aluminum spokes - 5 spokes like classic Ampex reels */}
            {[0, 72, 144, 216, 288].map((angle) => (
              <div
                key={angle}
                className="absolute"
                style={{
                  width: '6.5px',
                  height: '28px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-15px)`,
                  transformOrigin: 'center center',
                  background: 'linear-gradient(180deg, #b0b0b0, #909090, #707070, #606060)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255,255,255,0.4),
                    inset 0 -2px 3px rgba(0,0,0,0.7),
                    2px 0 3px rgba(0,0,0,0.6)
                  `,
                  borderRadius: '1px'
                }}
              />
            ))}

            {/* Tape wound on reel - multiple realistic layers based on tapeAmount */}
            {Array.from({ length: 16 }).map((_, layerIndex) => {
              const innerRadius = 16;
              const maxLayers = 16;
              const visibleLayers = Math.floor((tapeAmount / 100) * maxLayers);
              
              if (layerIndex >= visibleLayers) return null;
              
              const radius = innerRadius + layerIndex * 1.7;
              const segments = Math.floor(32 + layerIndex * 4.5);
              
              return (
                <div key={layerIndex} className="absolute inset-0">
                  {Array.from({ length: segments }).map((_, i) => {
                    const angle = (360 / segments) * i;
                    const angleOffset = (layerIndex * 11.25) % 360;
                    
                    // Varied brown oxide tape colors for realism
                    const tapeColors = [
                      'linear-gradient(90deg, #3a2412, #2a1408)',
                      'linear-gradient(90deg, #2a1810, #1a0a00)',
                      'linear-gradient(90deg, #4a2815, #3a1810)',
                      'linear-gradient(90deg, #251510, #150a08)'
                    ];
                    
                    return (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          width: '2.3px',
                          height: `${3.8 + layerIndex * 0.35}px`,
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle + angleOffset}deg) translateY(-${radius}px)`,
                          transformOrigin: 'center center',
                          background: tapeColors[i % 4],
                          boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,0.95), 0 0.5px 1px rgba(90,60,40,0.2)',
                          opacity: 0.88 + (layerIndex * 0.012)
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Tape surface lighting and shine */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 28% 22%, 
                    rgba(100,70,45,0.35) 0%,
                    transparent 20%,
                    rgba(0,0,0,0.45) 65%
                  )
                `
              }}
            />

            {/* Center aluminum hub with Ampex-style detailing */}
            <div 
              className="absolute rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '22px',
                height: '22px',
                background: `
                  radial-gradient(circle at 28% 28%, #d8d8d8, #a8a8a8, #707070, #484848)
                `,
                boxShadow: `
                  inset 0 2px 4px rgba(255,255,255,0.6),
                  inset 0 -3px 5px rgba(0,0,0,0.85),
                  0 3px 5px rgba(0,0,0,0.75)
                `,
                border: '1px solid #585858'
              }}
            >
              {/* Center spindle hole */}
              <div 
                className="absolute rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '9px',
                  height: '9px',
                  background: 'radial-gradient(circle, #000, #0a0a0a)',
                  boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,1), 0 0 1px rgba(255,255,255,0.2)'
                }}
              />

              {/* Hub grip slots - more detailed */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <div
                  key={angle}
                  className="absolute"
                  style={{
                    width: '1.6px',
                    height: '6.5px',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-7.5px)`,
                    transformOrigin: 'center center',
                    background: 'linear-gradient(to bottom, #404040, #202020, #101010)',
                    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.95), 0.5px 0 0.5px rgba(255,255,255,0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Outer rim highlight - more metallic */}
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '1px',
            left: '1px',
            right: '1px',
            bottom: '1px',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderBottomColor: 'rgba(0,0,0,0.5)'
          }}
        />

        {/* Bottom shadow on rim for depth */}
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: 0,
            background: 'linear-gradient(165deg, transparent 40%, rgba(0,0,0,0.35) 100%)'
          }}
        />
      </div>
    </div>
  );

  return (
    <div 
      className="relative rounded-sm w-full max-w-[200px]"
      style={{
        background: 'var(--gradient-panel)',
        boxShadow: `
          inset 0 2px 4px rgba(255,240,220,0.6),
          inset 0 -2px 6px rgba(80,50,30,0.3),
          0 3px 8px rgba(0,0,0,0.3)
        `,
        border: '3px solid var(--panel-dark)',
        padding: '8px'
      }}
    >
      {/* TAPE label */}
      <div 
        className="text-center mb-1.5"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--font-size-label)',
          color: 'var(--text-primary)',
          letterSpacing: 'var(--letter-spacing-wide)',
          textShadow: '1px 1px 0 rgba(255,240,220,0.8)',
          textTransform: 'uppercase'
        }}
      >
        TAPE
      </div>

      {/* Rectangular window showing tape mechanism inside */}
      <div 
        className="relative rounded overflow-hidden h-[115px]"
        style={{
          background: 'var(--gradient-bakelite)',
          boxShadow: `
            inset 0 4px 12px rgba(0,0,0,0.95),
            inset 0 -2px 8px rgba(0,0,0,0.9),
            0 2px 4px rgba(0,0,0,0.6)
          `,
          border: '3px solid var(--bakelite-dark)',
          padding: '6px'
        }}
      >
        {/* Internal mechanism visible through window */}
        <div className="relative h-full flex items-center justify-center gap-2">
          {/* Left Reel (supply reel - empties as tape plays) */}
          <div className="flex flex-col items-center gap-0.5">
            <Reel rotation={rotation} direction={1} tapeAmount={60 - (rotation / 360) * 40} />
            <div 
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '6px',
                color: '#888',
                letterSpacing: '0.05em'
              }}
            >
              AMPEX
            </div>
          </div>

          {/* Center tape path with realistic 2-track configuration */}
          <div className="flex flex-col items-center justify-center gap-1">
            {/* Upper tape path */}
            <div className="flex items-center gap-0.5">
              {/* Left guide post */}
              <div 
                style={{
                  width: '2.5px',
                  height: '16px',
                  background: 'linear-gradient(90deg, #707070, #a0a0a0, #707070)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
                  borderRadius: '1.5px'
                }}
              />

              {/* Tape running horizontally - 2 tracks visible */}
              <div className="flex flex-col gap-[1px]">
                {/* Track 1 */}
                <div 
                  className="relative overflow-hidden w-[20px] h-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #7a5a3a 0%, #6a4a2a 50%, #7a5a3a 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.5)',
                    borderRadius: '0.5px'
                  }}
                >
                  {/* Animated texture showing tape movement */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
                      animation: isPlaying ? 'tape-scroll 0.5s linear infinite' : 'none'
                    }}
                  />
                </div>
                
                {/* Track 2 */}
                <div 
                  className="relative overflow-hidden w-[20px] h-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #6a4a2a 0%, #5a3a1a 50%, #6a4a2a 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.5)',
                    borderRadius: '0.5px'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
                      animation: isPlaying ? 'tape-scroll 0.5s linear infinite' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Tape heads - playback and record */}
              <div className="flex gap-0.5">
                {/* Playback head (metallic silver) */}
                <div 
                  style={{
                    width: '5px',
                    height: '16px',
                    background: 'radial-gradient(ellipse, #b0b0b0, #808080, #555)',
                    boxShadow: `
                      inset 0 1px 2px rgba(255,255,255,0.4),
                      inset 0 -2px 4px rgba(0,0,0,0.9),
                      0 1px 3px rgba(0,0,0,0.8)
                    `,
                    borderRadius: '1px',
                    border: '1px solid #404040'
                  }}
                />
                {/* Record head (copper/brass tone) */}
                <div 
                  style={{
                    width: '5px',
                    height: '16px',
                    background: 'radial-gradient(ellipse, #c8a870, #a88850, #887040)',
                    boxShadow: `
                      inset 0 1px 2px rgba(255,255,255,0.3),
                      inset 0 -2px 4px rgba(0,0,0,0.9),
                      0 1px 3px rgba(0,0,0,0.8)
                    `,
                    borderRadius: '1px',
                    border: '1px solid #6a5030'
                  }}
                />
              </div>

              {/* Continuing tape after heads */}
              <div className="flex flex-col gap-[1px]">
                <div 
                  className="relative overflow-hidden w-[20px] h-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #7a5a3a 0%, #6a4a2a 50%, #7a5a3a 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.5)',
                    borderRadius: '0.5px'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
                      animation: isPlaying ? 'tape-scroll 0.5s linear infinite' : 'none'
                    }}
                  />
                </div>
                <div 
                  className="relative overflow-hidden w-[20px] h-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #6a4a2a 0%, #5a3a1a 50%, #6a4a2a 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.5)',
                    borderRadius: '0.5px'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
                      animation: isPlaying ? 'tape-scroll 0.5s linear infinite' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Right guide post */}
              <div 
                style={{
                  width: '2.5px',
                  height: '16px',
                  background: 'linear-gradient(90deg, #707070, #a0a0a0, #707070)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
                  borderRadius: '1.5px'
                }}
              />
            </div>

            {/* Comprehensive mechanical system - cables, tension arms, capstan */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* Background mechanical plate */}
              <rect x="5" y="10" width="180" height="70" fill="url(#metalGradient)" opacity="0.15" rx="2"/>
              
              {/* Gradients for realistic materials */}
              <defs>
                <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6a6a6a" stopOpacity="1" />
                  <stop offset="50%" stopColor="#4a4a4a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2a2a2a" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="copperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d4a574" stopOpacity="1" />
                  <stop offset="50%" stopColor="#c89860" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a87850" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3a3a3a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Power cables from left reel motor */}
              <path d="M 18 12 Q 22 10, 28 15" stroke="url(#cableGradient)" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
              <path d="M 18 14 Q 24 12, 32 18" stroke="#8b4513" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
              
              {/* Ground wire */}
              <path d="M 22 18 L 22 24" stroke="#2a4a2a" strokeWidth="1.5" fill="none" opacity="0.5"/>
              
              {/* Capstan motor cables from right side */}
              <path d="M 172 14 Q 165 12, 158 18" stroke="url(#cableGradient)" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
              <path d="M 170 16 Q 162 15, 154 22" stroke="#c84500" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
              
              {/* Audio signal cables */}
              <path d="M 88 10 Q 92 8, 98 10" stroke="#4a4a6a" strokeWidth="1.5" fill="none" opacity="0.8" strokeLinecap="round"/>
              <path d="M 92 10 Q 96 8, 102 10" stroke="#6a4a4a" strokeWidth="1.5" fill="none" opacity="0.8" strokeLinecap="round"/>
              
              {/* Shielded audio cable */}
              <path d="M 95 12 L 95 75" stroke="url(#cableGradient)" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round"/>
              <path d="M 95 12 L 95 75" stroke="#3a3a3a" strokeWidth="1.5" fill="none" opacity="0.7" strokeDasharray="2,2"/>
              
              {/* Tension arm mechanism - left side */}
              <g opacity="0.6">
                {/* Arm pivot point */}
                <circle cx="35" cy="30" r="3" fill="url(#metalGradient)" stroke="#2a2a2a" strokeWidth="0.5"/>
                {/* Tension arm */}
                <line x1="35" y1="30" x2="45" y2="42" stroke="#707070" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Spring mechanism */}
                <path d="M 35 32 Q 38 36, 35 40 Q 32 44, 35 48" stroke="#888" strokeWidth="1" fill="none"/>
                {/* Roller at end */}
                <circle cx="45" cy="42" r="3.5" fill="url(#metalGradient)" stroke="#4a4a4a" strokeWidth="1"/>
                <circle cx="45" cy="42" r="2" fill="#2a2a2a"/>
              </g>
              
              {/* Tension arm mechanism - right side */}
              <g opacity="0.6">
                {/* Arm pivot point */}
                <circle cx="155" cy="30" r="3" fill="url(#metalGradient)" stroke="#2a2a2a" strokeWidth="0.5"/>
                {/* Tension arm */}
                <line x1="155" y1="30" x2="145" y2="42" stroke="#707070" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Spring mechanism */}
                <path d="M 155 32 Q 152 36, 155 40 Q 158 44, 155 48" stroke="#888" strokeWidth="1" fill="none"/>
                {/* Roller at end */}
                <circle cx="145" cy="42" r="3.5" fill="url(#metalGradient)" stroke="#4a4a4a" strokeWidth="1"/>
                <circle cx="145" cy="42" r="2" fill="#2a2a2a"/>
              </g>
              
              {/* Capstan and pinch roller assembly */}
              <g opacity="0.7">
                {/* Capstan shaft (drives tape) */}
                <ellipse cx="118" cy="45" rx="3.5" ry="16" fill="url(#metalGradient)" stroke="#5a5a5a" strokeWidth="0.5"/>
                <ellipse cx="118" cy="45" rx="2.5" ry="15" fill="#7a7a7a"/>
                {/* Capstan motor housing */}
                <rect x="114" y="60" width="8" height="12" fill="#3a3a3a" rx="1" opacity="0.8"/>
                
                {/* Pinch roller (rubber) */}
                <ellipse cx="108" cy="45" rx="3" ry="14" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="0.5"/>
                {/* Pinch roller arm */}
                <line x1="108" y1="32" x2="108" y2="22" stroke="#606060" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="108" cy="22" r="2.5" fill="url(#metalGradient)"/>
              </g>
              
              {/* Brake mechanism - left */}
              <g opacity="0.5">
                <rect x="28" y="68" width="12" height="4" fill="#4a4a4a" rx="1"/>
                <line x1="30" y1="68" x2="30" y2="62" stroke="#6a6a6a" strokeWidth="1.5"/>
                <circle cx="30" cy="62" r="2" fill="#888"/>
              </g>
              
              {/* Brake mechanism - right */}
              <g opacity="0.5">
                <rect x="150" y="68" width="12" height="4" fill="#4a4a4a" rx="1"/>
                <line x1="160" y1="68" x2="160" y2="62" stroke="#6a6a6a" strokeWidth="1.5"/>
                <circle cx="160" cy="62" r="2" fill="#888"/>
              </g>
              
              {/* Lower mechanical linkages */}
              <path d="M 40 72 L 60 72 L 62 68" stroke="#5a5a5a" strokeWidth="1.5" fill="none" opacity="0.6"/>
              <path d="M 150 72 L 130 72 L 128 68" stroke="#5a5a5a" strokeWidth="1.5" fill="none" opacity="0.6"/>
              
              {/* Control rods */}
              <line x1="70" y1="75" x2="120" y2="75" stroke="#808080" strokeWidth="2" opacity="0.4" strokeLinecap="round"/>
              
              {/* Electronic connectors */}
              <g opacity="0.6">
                {/* Left connector */}
                <rect x="12" y="70" width="8" height="6" fill="url(#copperGradient)" rx="0.5"/>
                <line x1="14" y1="73" x2="18" y2="73" stroke="#2a2a2a" strokeWidth="0.5"/>
                
                {/* Right connector */}
                <rect x="170" y="70" width="8" height="6" fill="url(#copperGradient)" rx="0.5"/>
                <line x1="172" y1="73" x2="176" y2="73" stroke="#2a2a2a" strokeWidth="0.5"/>
              </g>
              
              {/* Tape guide posts with mounting hardware */}
              <g opacity="0.7">
                {/* Left guide post detail */}
                <rect x="58" y="32" width="3" height="24" fill="url(#metalGradient)" rx="0.5"/>
                <circle cx="59.5" cy="30" r="1.5" fill="#888"/>
                <circle cx="59.5" cy="58" r="1.5" fill="#888"/>
                
                {/* Right guide post detail */}
                <rect x="129" y="32" width="3" height="24" fill="url(#metalGradient)" rx="0.5"/>
                <circle cx="130.5" cy="30" r="1.5" fill="#888"/>
                <circle cx="130.5" cy="58" r="1.5" fill="#888"/>
              </g>
              
              {/* Head assembly mounting screws */}
              <circle cx="88" cy="38" r="1.5" fill="#4a4a4a" opacity="0.6"/>
              <circle cx="100" cy="38" r="1.5" fill="#4a4a4a" opacity="0.6"/>
              <circle cx="88" cy="52" r="1.5" fill="#4a4a4a" opacity="0.6"/>
              <circle cx="100" cy="52" r="1.5" fill="#4a4a4a" opacity="0.6"/>
              
              {/* Cross-hatched mounting plate under heads */}
              <path d="M 82 36 L 106 36 L 106 54 L 82 54 Z" fill="none" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.3"/>
              <path d="M 82 36 L 106 54 M 106 36 L 82 54" stroke="#3a3a3a" strokeWidth="0.3" opacity="0.3"/>
              
              {/* Motor drive indicators (small LEDs) */}
              <circle cx="20" cy="25" r="1.2" fill="#ff4400" opacity="0.4"/>
              <circle cx="170" cy="25" r="1.2" fill="#00ff88" opacity="0.4"/>
              
              {/* Grounding points */}
              <circle cx="95" cy="78" r="2" fill="#6a6a4a" opacity="0.5"/>
              <path d="M 95 78 L 95 82 M 92 82 L 98 82 M 93 84 L 97 84 M 94 86 L 96 86" stroke="#6a6a4a" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>

          {/* Right Reel (take-up reel - fills as tape plays) */}
          <div className="flex flex-col items-center gap-0.5">
            <Reel rotation={rotation} direction={-1} tapeAmount={40 + (rotation / 360) * 40} />
            <div 
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '6px',
                color: '#888',
                letterSpacing: '0.05em'
              }}
            >
              Scotch
            </div>
          </div>
        </div>

        {/* Glass reflection on window for realism */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(140deg, rgba(255,255,255,0.08) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 100%)'
          }}
        />
      </div>

      {/* Transport control below window */}
      <div
        className="flex items-center justify-center gap-1 mt-2"
        style={{ transform: 'translateX(11.3px)' }}
      >
        <ToggleSwitch 
          isOn={isPlaying}
          onToggle={() => setIsPlaying(!isPlaying)}
          label="PLAY"
          orientation="horizontal"
        />
      </div>

      {/* CSS animation for tape movement */}
      <style>{`
        @keyframes tape-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
