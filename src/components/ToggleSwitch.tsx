interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function ToggleSwitch({ isOn, onToggle, label, orientation = 'vertical' }: ToggleSwitchProps) {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center gap-1`}>
      {/* Toggle switch housing */}
      <button
        onClick={onToggle}
        className="relative transition-all cursor-pointer"
        style={{
          width: isHorizontal ? '40px' : '24px',
          height: isHorizontal ? '24px' : '40px',
          background: 'var(--gradient-bakelite)',
          boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.9),
            inset 0 -1px 2px rgba(255,255,255,0.1),
            0 2px 4px rgba(0,0,0,0.7)
          `,
          borderRadius: '2px',
          border: '1px solid var(--bakelite-dark)',
          padding: '3px'
        }}
      >
        {/* Inner slot/track */}
        <div
          className={`absolute rounded-sm ${isHorizontal ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'}`}
          style={isHorizontal ? {
            left: '4px',
            right: '4px',
            height: '10px',
            background: 'linear-gradient(90deg, #0a0a0a, #1a1a1a)',
            boxShadow: 'inset 2px 0 3px rgba(0,0,0,0.95)'
          } : {
            top: '4px',
            bottom: '4px',
            width: '10px',
            background: 'linear-gradient(180deg, #0a0a0a, #1a1a1a)',
            boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.95)'
          }}
        />

        {/* Contact indicators (ON/OFF marks on housing) */}
        <div
          className={isHorizontal ? 'absolute top-1/2 -translate-y-1/2' : 'absolute left-1/2 -translate-x-1/2'}
          style={isHorizontal ? {
            right: '2px',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: isOn ? 'var(--gradient-led-power)' : 'var(--gradient-led-off)',
            boxShadow: isOn ? '0 0 6px var(--glow-orange)' : 'inset 0 1px 1px rgba(0,0,0,0.9)'
          } : {
            top: '2px',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: isOn ? 'var(--gradient-led-power)' : 'var(--gradient-led-off)',
            boxShadow: isOn ? '0 0 6px var(--glow-orange)' : 'inset 0 1px 1px rgba(0,0,0,0.9)'
          }}
        />
        <div
          className={isHorizontal ? 'absolute top-1/2 -translate-y-1/2' : 'absolute left-1/2 -translate-x-1/2'}
          style={isHorizontal ? {
            left: '2px',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: !isOn ? 'var(--gradient-led-power)' : 'var(--gradient-led-off)',
            boxShadow: !isOn ? '0 0 6px var(--glow-orange)' : 'inset 0 1px 1px rgba(0,0,0,0.9)'
          } : {
            bottom: '2px',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: !isOn ? 'var(--gradient-led-power)' : 'var(--gradient-led-off)',
            boxShadow: !isOn ? '0 0 6px var(--glow-orange)' : 'inset 0 1px 1px rgba(0,0,0,0.9)'
          }}
        />

        {/* Toggle lever/paddle */}
        <div
          className={`absolute transition-all duration-200 ease-out rounded-sm ${isHorizontal ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'}`}
          style={isHorizontal ? {
            left: isOn ? '20px' : '5px',
            width: '14px',
            height: '16px',
            background: isOn ? 'var(--gradient-panel)' : 'linear-gradient(145deg, #b8a890, #a89878)',
            boxShadow: `
              0 2px 4px rgba(0,0,0,0.8),
              inset 0 1px 2px rgba(255,240,220,0.6),
              inset 0 -1px 2px rgba(80,50,30,0.4),
              0 0 0 1px var(--bronze-dark)
            `,
            border: '1px solid var(--text-secondary)'
          } : {
            top: isOn ? '5px' : '20px',
            width: '16px',
            height: '14px',
            background: isOn ? 'var(--gradient-panel)' : 'linear-gradient(145deg, #b8a890, #a89878)',
            boxShadow: `
              0 2px 4px rgba(0,0,0,0.8),
              inset 0 1px 2px rgba(255,240,220,0.6),
              inset 0 -1px 2px rgba(80,50,30,0.4),
              0 0 0 1px var(--bronze-dark)
            `,
            border: '1px solid var(--text-secondary)'
          }}
        >
          {/* Lever grip texture */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: isHorizontal 
                ? `repeating-linear-gradient(90deg,
                    transparent 0px,
                    transparent 1px,
                    rgba(0,0,0,0.15) 1px,
                    rgba(0,0,0,0.15) 2px
                  )`
                : `repeating-linear-gradient(180deg,
                    transparent 0px,
                    transparent 1px,
                    rgba(0,0,0,0.15) 1px,
                    rgba(0,0,0,0.15) 2px
                  )`
            }}
          />
          
          {/* Center grip line */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={isHorizontal ? {
              width: '1px',
              height: '10px',
              background: 'rgba(0,0,0,0.4)',
              boxShadow: '1px 0 0 rgba(255,240,220,0.3)'
            } : {
              width: '10px',
              height: '1px',
              background: 'rgba(0,0,0,0.4)',
              boxShadow: '0 1px 0 rgba(255,240,220,0.3)'
            }}
          />
        </div>

        {/* Mounting screws on housing */}
        <div
          className="absolute rounded-full"
          style={{
            top: '1px',
            left: '1px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a, #1a1a1a)',
            boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.3)'
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '1.5px',
              height: '0.3px',
              background: 'rgba(0,0,0,0.8)'
            }}
          />
        </div>
        <div
          className="absolute rounded-full"
          style={{
            top: '1px',
            right: '1px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a, #1a1a1a)',
            boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.3)'
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '1.5px',
              height: '0.3px',
              background: 'rgba(0,0,0,0.8)'
            }}
          />
        </div>
        <div
          className="absolute rounded-full"
          style={{
            bottom: '1px',
            left: '1px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a, #1a1a1a)',
            boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.3)'
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '1.5px',
              height: '0.3px',
              background: 'rgba(0,0,0,0.8)'
            }}
          />
        </div>
        <div
          className="absolute rounded-full"
          style={{
            bottom: '1px',
            right: '1px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a, #1a1a1a)',
            boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.3)'
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '1.5px',
              height: '0.3px',
              background: 'rgba(0,0,0,0.8)'
            }}
          />
        </div>
      </button>

      {/* Label */}
      {label && (
        <div
          className="text-center"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--font-size-label)',
            color: 'var(--text-muted)',
            letterSpacing: 'var(--letter-spacing-wide)',
            textTransform: 'uppercase'
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
