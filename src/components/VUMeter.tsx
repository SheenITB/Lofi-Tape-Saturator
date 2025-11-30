import { useEffect, useRef, useState } from 'react';

export function VUMeter() {
  const [level, setLevel] = useState(0);
  const [peakHit, setPeakHit] = useState(false);
  const fallbackTimer = useRef<number | null>(null);

  useEffect(() => {
    // Fallback animation if plugin does not push values
    fallbackTimer.current = window.setInterval(() => {
      const target = Math.random() * 0.2;
      setLevel(prev => prev + (target - prev) * 0.15);
    }, 250);

    const handleUpdate = (value: number) => {
      if (fallbackTimer.current) {
        clearInterval(fallbackTimer.current);
        fallbackTimer.current = null;
      }

      const clamped = Math.min(Math.max(value, 0), 1);
      setLevel(prev => prev + (clamped - prev) * 0.35);

      if (clamped >= 0.9) {
        setPeakHit(true);
        window.setTimeout(() => setPeakHit(false), 200);
      }
    };

    // Expose globally for the native wrapper (iPlug) to call
    (window as any).__updateDriveVU = handleUpdate;

    return () => {
      if (fallbackTimer.current) {
        clearInterval(fallbackTimer.current);
      }
      if ((window as any).__updateDriveVU === handleUpdate) {
        delete (window as any).__updateDriveVU;
      }
    };
  }, []);

  // Map level to angle: -20dB to +3dB range
  // -45deg (left) to +45deg (right) = 90deg total range
  const rotation = level * 90 - 45;

  return (
    <div 
      className="rounded-sm relative"
      style={{
        width: 'var(--vu-meter-width)',
        height: 'var(--vu-meter-height)',
        background: 'var(--gradient-bakelite)',
        boxShadow: `
          inset 0 3px 8px rgba(0,0,0,0.95),
          inset 0 -2px 4px rgba(100,100,100,0.1),
          0 3px 8px rgba(0,0,0,0.8)
        `,
        border: '1px solid var(--bakelite-medium)',
        padding: '8px 10px'
      }}
    >
      {/* Vintage glass reflection */}
      <div 
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
        }}
      />

      {/* Peak indicator LED */}
      <div className="absolute top-1.5 right-2 flex items-center gap-1">
        <div 
          className="rounded-full transition-all duration-100"
          style={{
            width: 'var(--led-size)',
            height: 'var(--led-size)',
            background: peakHit 
              ? 'var(--gradient-led-clip)'
              : 'var(--gradient-led-off)',
            boxShadow: peakHit ? `0 0 8px var(--led-clip-on)` : 'inset 0 1px 2px rgba(0,0,0,0.9)'
          }}
        />
        <span 
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--font-size-label)',
            color: peakHit ? 'var(--led-clip-on)' : 'var(--text-muted)',
            letterSpacing: 'var(--letter-spacing-wide)',
            transition: 'color 100ms'
          }}
        >
          PEAK
        </span>
      </div>
      
      {/* Scale markings container */}
      <div className="relative h-9 mb-2">
        {/* Scale numbers */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-1">
          {['-20', '-10', '-7', '-5', '-3', '0', '+3', '+'].map((num, i) => (
            <div 
              key={i}
              className="flex flex-col items-center"
              style={{
                marginLeft: i === 0 ? '0' : undefined,
                marginRight: i === 7 ? '0' : undefined
              }}
            >
              <div 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--font-size-label)',
                  color: i >= 6 ? 'var(--led-clip-on)' : 'var(--text-label)',
                  fontWeight: i === 5 ? 'bold' : 'normal',
                  marginBottom: '2px'
                }}
              >
                {num}
              </div>
              {/* Tick mark */}
              <div 
                style={{ 
                  width: '1px',
                  height: i % 2 === 0 || i === 5 ? '8px' : '5px',
                  background: i >= 6 ? 'var(--led-clip-on)' : 'var(--text-label)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Needle pivot point - center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {/* Needle body */}
          <div
            className="origin-bottom transition-transform duration-75 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              width: '2px',
              height: '28px',
              background: 'linear-gradient(to top, rgba(255,220,100,0.4), rgba(255,220,100,0.9))',
              boxShadow: '0 0 4px rgba(255,136,0,0.6)',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              marginLeft: '-1px',
              borderRadius: '1px'
            }}
          />
          
          {/* Needle tip (orange) */}
          <div
            className="origin-bottom transition-transform duration-75 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              width: '0',
              height: '0',
              borderLeft: '3px solid transparent',
              borderRight: '3px solid transparent',
              borderBottom: '6px solid var(--glow-orange)',
              position: 'absolute',
              bottom: '28px',
              left: '50%',
              marginLeft: '-3px',
              filter: 'drop-shadow(0 0 2px rgba(255,136,0,0.8))'
            }}
          />
          
          {/* Center pivot screw */}
          <div 
            className="rounded-full"
            style={{
              width: '7px',
              height: '7px',
              background: 'radial-gradient(circle at 35% 35%, var(--metal-light), var(--metal-dark))',
              boxShadow: `
                0 1px 3px rgba(0,0,0,0.9),
                inset 0 1px 2px rgba(255,255,255,0.3),
                inset 0 -1px 1px rgba(0,0,0,0.6)
              `,
              position: 'absolute',
              bottom: '-3.5px',
              left: '50%',
              marginLeft: '-3.5px',
              border: '0.5px solid rgba(0,0,0,0.4)'
            }}
          />
        </div>
      </div>
      
      {/* VU label */}
      <div 
        className="text-center"
        style={{ 
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--font-size-value)',
          color: 'var(--text-label)',
          letterSpacing: 'var(--letter-spacing-wide)',
          marginTop: '4px',
          textShadow: '0 0 2px rgba(255,136,0,0.3)'
        }}
      >
        VU
      </div>
    </div>
  );
}
