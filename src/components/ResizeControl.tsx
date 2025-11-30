/**
 * ResizeControl Component
 * Simple click-to-cycle zoom button (100% ↔ 75%).
 */

import { useState, useEffect } from 'react';

interface ResizeControlProps {
  onScaleChange?: (scale: number) => void;
  baseScale?: number;
}

const ZOOM_VALUES = [1, 0.75] as const;

export function ResizeControl({ onScaleChange, baseScale = 1 }: ResizeControlProps) {
  const [scale, setScale] = useState(() => {
    const version = localStorage.getItem('inthebox-gui-scale-version');
    const currentVersion = '8'; // bump to reset after previous 50% stage

    if (version !== currentVersion) {
      localStorage.setItem('inthebox-gui-scale', '1');
      localStorage.setItem('inthebox-gui-scale-version', currentVersion);
      return 1;
    }

    const saved = localStorage.getItem('inthebox-gui-scale');
    return saved ? parseFloat(saved) : 1;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem('inthebox-gui-scale', scale.toString());
    onScaleChange?.(scale);
  }, [scale, onScaleChange]);

  // Cycle to next zoom level with smooth transition feedback
  const cycleZoom = () => {
    const currentIndex = ZOOM_VALUES.findIndex(value => value === scale);
    const nextIndex = (currentIndex + 1) % ZOOM_VALUES.length;
    const nextValue = ZOOM_VALUES[nextIndex];
    
    // Visual feedback during transition
    setIsTransitioning(true);
    setScale(nextValue);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 650); // Slightly longer than transition duration (600ms)
  };

  const formatLabel = (value: number) => {
    const normalized = (value * baseScale) / (ZOOM_VALUES[0] * baseScale);
    return `${Math.round(normalized * 100)}%`;
  };

  const title = `Click to cycle zoom: ${ZOOM_VALUES.map(formatLabel).join(' ↔ ')}`;

  return (
    <button
      onClick={cycleZoom}
      className="px-1.5 py-0.5 relative overflow-hidden flex items-center gap-1"
      style={{
        background: 'linear-gradient(180deg, #c8a870, #a88850)',
        boxShadow: `
          inset 0 1px 2px rgba(255,220,180,0.6),
          inset 0 -2px 3px rgba(60,40,20,0.4),
          0 2px 4px rgba(0,0,0,0.4)
        `,
        border: '1px solid #8a6830',
        borderRadius: '2px',
        fontSize: '7px',
        fontWeight: 'bold',
        color: '#3a2010',
        textShadow: '0.5px 0.5px 0 rgba(255,240,200,0.8)',
        cursor: isTransitioning ? 'wait' : 'pointer',
        userSelect: 'none',
        letterSpacing: '0.05em',
        fontFamily: 'Georgia, serif',
        opacity: isTransitioning ? 0.8 : 1,
        transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        filter: isTransitioning ? 'brightness(0.95)' : 'brightness(1)',
        pointerEvents: isTransitioning ? 'none' : 'auto'
      }}
      onMouseEnter={(e) => {
        if (!isTransitioning) {
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = isTransitioning ? 'brightness(0.95)' : 'brightness(1)';
      }}
      onMouseDown={(e) => {
        if (!isTransitioning) {
          e.currentTarget.style.filter = 'brightness(0.95)';
        }
      }}
      onMouseUp={(e) => {
        if (!isTransitioning) {
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      title={title}
      disabled={isTransitioning}
    >
      <svg 
        width="8" 
        height="8" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isTransitioning ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)'
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <span
        style={{
          transition: 'opacity 200ms ease-in-out',
          opacity: isTransitioning ? 0.6 : 1
        }}
      >
        {formatLabel(scale)}
      </span>
    </button>
  );
}
