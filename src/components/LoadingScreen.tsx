/**
 * LoadingScreen Component - Professional Loading with Animated Tape Reels
 * Sistema di caricamento professionale con design tokens e animazioni
 */

import React, { useEffect, useState } from 'react';
import { TapeReels } from './TapeReels';
import { usePreventFOUC } from '../hooks/usePreventFOUC';

interface LoadingScreenProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  error, 
  children 
}) => {
  const isStylesLoaded = usePreventFOUC();
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState<'tokens' | 'assets' | 'complete'>('tokens');
  
  const shouldShowLoading = isLoading || !isStylesLoaded;

  useEffect(() => {
    if (!shouldShowLoading) return;

    const tokenTimer = setTimeout(() => {
      setProgress(40);
      setLoadingStage('assets');
    }, 300);

    const assetTimer = setTimeout(() => {
      setProgress(80);
    }, 600);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      setLoadingStage('complete');
    }, 900);

    return () => {
      clearTimeout(tokenTimer);
      clearTimeout(assetTimer);
      clearTimeout(completeTimer);
    };
  }, [shouldShowLoading]);

  if (error) {
    return (
      <div className="loading-error">
        <div className="error-container">
          <h2>Errore nel caricamento</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Ricarica
          </button>
        </div>
        <style>{`
          .loading-error {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #2a1810, #1a1510);
            color: #d4a574;
            font-family: Georgia, serif;
          }
          .error-container {
            text-align: center;
            padding: 2rem;
            border: 2px solid #d4a574;
            border-radius: 8px;
            background: rgba(212, 165, 116, 0.1);
          }
          .error-container h2 {
            margin: 0 0 1rem;
            color: #ff8800;
          }
          .error-container button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: #d4a574;
            color: #2a1810;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          }
          .error-container button:hover {
            background: #c8a870;
          }
        `}</style>
      </div>
    );
  }

  if (shouldShowLoading) {
    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(145deg, #1a0d06 0%, #2a1810 50%, #1a0d06 100%)',
            zIndex: 9999,
            opacity: loadingStage === 'complete' && !shouldShowLoading ? 0 : 1,
            transition: 'opacity 500ms ease-out',
            pointerEvents: loadingStage === 'complete' && !shouldShowLoading ? 'none' : 'auto'
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              color: '#cda768',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              textShadow: '0 3px 12px rgba(205, 167, 104, 0.8), 0 0 40px rgba(205, 167, 104, 0.3)',
              fontWeight: 'bold',
              animation: 'fadeIn 600ms ease-out'
            }}
          >
            InTheBox
          </div>

          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '11px',
              color: '#a88850',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              marginBottom: '50px',
              opacity: 0.8,
              animation: 'fadeIn 800ms ease-out 200ms both'
            }}
          >
            Lo-Fi Tape Saturator
          </div>

          <div
            style={{
              transform: 'scale(2.4)',
              marginBottom: '70px',
              animation: 'pulse 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.8))'
            }}
          >
            <TapeReels />
          </div>

          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '13px',
              color: '#cda768',
              letterSpacing: '2.2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              minHeight: '20px',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              transition: 'all 300ms ease-out'
            }}
          >
            {loadingStage === 'tokens' && '⚙ Loading Design Tokens...'}
            {loadingStage === 'assets' && '🎨 Loading GUI Assets...'}
            {loadingStage === 'complete' && '✓ Ready!'}
          </div>

          <div
            style={{
              width: '360px',
              height: '6px',
              background: 'rgba(168, 136, 80, 0.15)',
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
              border: '1px solid rgba(205, 167, 104, 0.2)'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8a6830 0%, #a88850 50%, #cda768 100%)',
                borderRadius: '3px',
                transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 12px rgba(205, 167, 104, 0.7), inset 0 1px 2px rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shine 1.5s ease-in-out infinite'
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '10px',
              color: '#8a6830',
              letterSpacing: '1.5px',
              marginTop: '12px',
              fontWeight: 'bold'
            }}
          >
            {progress}%
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#6f5d48',
                letterSpacing: '1.8px',
                opacity: 0.7
              }}
            >
              v1.0.9 • Design System
            </div>
            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '8px',
                color: '#5a4830',
                letterSpacing: '1px',
                opacity: 0.5
              }}
            >
              100+ Design Tokens • Optimized Performance
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(2.4);
            }
            50% {
              opacity: 0.85;
              transform: scale(2.5);
            }
          }

          @keyframes shine {
            0% {
              left: -100%;
            }
            50%, 100% {
              left: 100%;
            }
          }
        `}</style>
      </>
    );
  }

  return <>{children}</>;
};
