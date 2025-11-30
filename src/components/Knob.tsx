import { useState, useRef, useEffect } from 'react';

interface KnobProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  unit?: string;
  displayValue?: (value: number) => string;
  steps?: number; // Number of discrete steps (if defined, knob will snap to steps)
}

export function Knob({ label, value, onChange, min = 0, max = 100, size = 'medium', unit = '', displayValue, steps }: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const sizes = {
    small: { outer: 50, inner: 44, indicator: 18 },
    medium: { outer: 60, inner: 54, indicator: 22 },
    large: { outer: 100, inner: 92, indicator: 36 }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startValue.current = value;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = startY.current - e.clientY;
    const sensitivity = 0.5;
    let newValue = Math.min(max, Math.max(min, startValue.current + deltaY * sensitivity));
    
    // If steps are defined, snap to nearest step
    if (steps !== undefined && steps > 0) {
      const range = max - min;
      const stepSize = range / (steps - 1);
      const stepIndex = Math.round((newValue - min) / stepSize);
      newValue = min + stepIndex * stepSize;
    }
    
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const rotation = ((value - min) / (max - min)) * 270 - 135;
  const { outer, inner, indicator } = sizes[size];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Knob body - Bakelite with realistic vintage look */}
      <div
        className="rounded-full cursor-pointer relative select-none"
        onMouseDown={handleMouseDown}
        style={{ 
          width: `${outer}px`,
          height: `${outer}px`,
          background: 'var(--gradient-bakelite)',
          boxShadow: 'var(--shadow-knob)',
        }}
      >
        {/* Top highlight for dimension */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(100,80,60,0.3) 0%, transparent 60%)`
          }}
        />

        {/* Inner knob with rotation */}
        <div 
          className="absolute inset-0 rounded-full flex items-start justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 100ms ease-out',
            padding: '6px'
          }}
        >
          {/* Indicator line/dot (white mark on black bakelite) */}
          <div 
            style={{
              width: '3px',
              height: `${indicator}px`,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(200,200,200,0.7))',
              borderRadius: '2px',
              boxShadow: `
                0 1px 2px rgba(0,0,0,0.5),
                inset 0 0.5px 0.5px rgba(255,255,255,0.5)
              `
            }}
          />
        </div>

        {/* Center cap (optional metallic detail) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: `${outer * 0.15}px`,
            height: `${outer * 0.15}px`,
            background: 'radial-gradient(circle at 40% 40%, #6a6a6a, #2a2a2a)',
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.3),
              inset 0 -1px 1px rgba(0,0,0,0.8),
              0 1px 2px rgba(0,0,0,0.5)
            `
          }}
        />
      </div>

      {/* Label */}
      <div 
        className="text-center select-none"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--font-size-label)',
          letterSpacing: 'var(--letter-spacing-wide)',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          textShadow: '0 0.5px 1px rgba(255,255,255,0.3)'
        }}
      >
        {label}
      </div>

      {/* Value display */}
      <div 
        className="text-center select-none px-2 py-0.5 rounded"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          color: 'var(--text-secondary)',
          background: 'rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.15)',
          minWidth: '36px'
        }}
      >
        {displayValue ? displayValue(value) : `${Math.round(value)}${unit}`}
      </div>
    </div>
  );
}
