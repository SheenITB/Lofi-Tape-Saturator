/**
 * TestFigmaLayout - Test component per confrontare layout attuale vs Figma
 */

import React from 'react';
import App from './App';
import { FigmaLayout } from './components/FigmaLayout';

export default function TestFigmaLayout() {
  // Test state per il componente Figma
  const [drive, setDrive] = React.useState(0);
  const [tone, setTone] = React.useState(0);
  // Default MPC set to 0 => 16-bit
  const [mpc, setMpc] = React.useState(0);
  const [wow, setWow] = React.useState(0);
  const [noise, setNoise] = React.useState(0);
  const [flutter, setFlutter] = React.useState(0);
  const [resampler, setResampler] = React.useState(100);
  const [lowPass, setLowPass] = React.useState(100);
  // Default Dry/Wet set to 100 => fully wet
  const [dryWet, setDryWet] = React.useState(100);
  const [isPowerOn, setIsPowerOn] = React.useState(false);

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh',
      background: 'var(--color-wood-dark, #2a1810)'
    }}>
      {/* Layout Attuale */}
      <div style={{ 
        width: '50%', 
        overflow: 'auto',
        borderRight: '4px solid var(--color-bronze-dark, #a88850)'
      }}>
        <div style={{
          background: 'white',
          color: 'black',
          padding: '8px',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          borderBottom: '2px solid #333'
        }}>
          LAYOUT ATTUALE
        </div>
        <App />
      </div>
      
      {/* Layout Figma */}
      <div style={{ 
        width: '50%',
        padding: '20px',
        background: 'var(--color-wood-dark, #2a1810)'
      }}>
        <div style={{
          background: 'var(--color-bronze-light, #d4a574)',
          color: 'var(--color-text-primary, #3a2010)',
          padding: '8px',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          marginBottom: '20px',
          borderRadius: '2px'
        }}>
          LAYOUT FIGMA SPECS
        </div>
        
        {/* Container per il layout Figma */}
        <div style={{
          width: '600px',
          height: '800px',
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          background: 'var(--gradient-wood-chassis, linear-gradient(145deg, #3d2817, #2d1810))',
          boxShadow: 'var(--shadow-chassis)',
          borderRadius: '4px',
          border: '2px solid var(--color-wood-dark)',
          padding: '6px'
        }}>
          {/* Panel Figma */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--gradient-panel, linear-gradient(145deg, #e8d8c0 0%, #d4c4a8 50%, #c0b090 100%))',
            boxShadow: 'var(--shadow-panel)',
            border: '2px solid var(--color-bronze-dark)',
            borderRadius: '2px'
          }}>
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
              setDrive={setDrive}
              setTone={setTone}
              setMpc={setMpc}
              setWow={setWow}
              setNoise={setNoise}
              setFlutter={setFlutter}
              setResampler={setResampler}
              setLowPass={setLowPass}
              setDryWet={setDryWet}
              isPowerOn={isPowerOn}
              setIsPowerOn={setIsPowerOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}