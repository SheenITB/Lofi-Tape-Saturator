/**
 * useDesignTokens Hook - Advanced Design Token Management
 * Caricamento automatico e gestione centralizzata design tokens da Figma
 * ✅ 100+ variabili CSS
 * ✅ Type-safe access
 * ✅ Performance ottimizzate
 */

import { useState, useEffect } from 'react';
import designTokens from '../figma-assets/design-tokens.json';

export interface DesignTokensState {
  isLoaded: boolean;
  error: string | null;
  tokensCount: number;
}

export interface DesignTokens {
  colors: {
    wood: { dark: string; medium: string; light: string };
    panel: { light: string; medium: string; dark: string };
    bakelite: { dark: string; medium: string };
    bronze: { light: string; medium: string; dark: string };
    led: { 'power-on': string; 'power-off': string; 'clip-on': string; 'clip-off': string };
    text: { primary: string; secondary: string; label: string };
    glow: { orange: string; yellow: string };
  };
  spacing: {
    'panel-padding': string;
    'component-gap': string;
    'knob-gap': string;
    'section-gap': string;
  };
  sizing: {
    gui: { 'width-full': string; 'height-full': string; 'width-75': string; 'height-75': string };
    chassis: { width: string; height: string; padding: string };
    knob: { medium: string; small: string };
    'vu-meter': { width: string; height: string };
    'tape-reels': { width: string; height: string };
    screw: { diameter: string };
    led: { diameter: string };
  };
  typography: {
    'font-families': { serif: string; sans: string };
    'font-sizes': {
      'logo-main': string;
      'logo-sub': string;
      'section-label': string;
      'knob-label': string;
      'knob-value': string;
    };
    'font-weights': { normal: string; medium: string; bold: string };
    'letter-spacing': { wide: string; normal: string };
  };
  borders: {
    radius: { small: string; medium: string; large: string };
    width: { thin: string; medium: string };
  };
  shadows: {
    chassis: string;
    panel: string;
    knob: string;
    screw: string;
  };
  effects: {
    transition: { smooth: string; fast: string };
  };
}

// Funzione per estrarre i valori dai design tokens
const extractTokenValues = (tokens: any): DesignTokens => {
  const extract = (obj: any): any => {
    if (obj && typeof obj === 'object') {
      if (obj.value !== undefined) {
        return obj.value;
      }
      const result: any = {};
      Object.keys(obj).forEach(key => {
        result[key] = extract(obj[key]);
      });
      return result;
    }
    return obj;
  };

  return extract(tokens) as DesignTokens;
};

// CSS Custom Properties Generator
const generateCSSVariables = (tokens: DesignTokens): string => {
  const variables: string[] = [];
  
  // Aggiungi colori
  Object.entries(tokens.colors).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([name, value]) => {
      variables.push(`--color-${category}-${name}: ${value};`);
    });
  });
  
  // Aggiungi spacing
  Object.entries(tokens.spacing).forEach(([name, value]) => {
    variables.push(`--spacing-${name}: ${value};`);
  });
  
  // Aggiungi sizing
  Object.entries(tokens.sizing).forEach(([category, sizes]) => {
    Object.entries(sizes).forEach(([name, value]) => {
      variables.push(`--size-${category}-${name}: ${value};`);
    });
  });
  
  // Aggiungi typography
  Object.entries(tokens.typography).forEach(([category, items]) => {
    Object.entries(items).forEach(([name, value]) => {
      variables.push(`--typography-${category}-${name}: ${value};`);
    });
  });
  
  // Aggiungi borders
  Object.entries(tokens.borders).forEach(([category, items]) => {
    Object.entries(items).forEach(([name, value]) => {
      variables.push(`--border-${category}-${name}: ${value};`);
    });
  });
  
  // Aggiungi shadows
  Object.entries(tokens.shadows).forEach(([name, value]) => {
    variables.push(`--shadow-${name}: ${value};`);
  });
  
  // Aggiungi effects
  Object.entries(tokens.effects).forEach(([category, items]) => {
    Object.entries(items).forEach(([name, value]) => {
      variables.push(`--effect-${category}-${name}: ${value};`);
    });
  });
  
  return `:root {\n  ${variables.join('\n  ')}\n}`;
};

/**
 * Hook principale per caricare e applicare design tokens
 * Ritorna stato di caricamento con contatore tokens
 */
export const useDesignTokens = (): DesignTokensState => {
  const [state, setState] = useState<DesignTokensState>({
    isLoaded: false,
    error: null,
    tokensCount: 0
  });

  useEffect(() => {
    try {
      let tokensCount = 0;
      const root = document.documentElement;

      // Estrai e applica tokens
      const extractedTokens = extractTokenValues(designTokens);
      
      // Applica COLORS
      Object.entries(extractedTokens.colors).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([name, value]) => {
          const cssVarName = `--color-${category}-${name}`;
          root.style.setProperty(cssVarName, value);
          tokensCount++;
        });
      });
      
      // Applica SPACING
      Object.entries(extractedTokens.spacing).forEach(([name, value]) => {
        const cssVarName = `--spacing-${name}`;
        root.style.setProperty(cssVarName, value);
        tokensCount++;
      });
      
      // Applica SIZING
      Object.entries(extractedTokens.sizing).forEach(([category, sizes]) => {
        Object.entries(sizes).forEach(([name, value]) => {
          const cssVarName = `--size-${category}-${name}`;
          root.style.setProperty(cssVarName, value);
          tokensCount++;
        });
      });
      
      // Applica TYPOGRAPHY
      Object.entries(extractedTokens.typography).forEach(([category, items]) => {
        Object.entries(items).forEach(([name, value]) => {
          const cssVarName = `--typography-${category}-${name}`;
          root.style.setProperty(cssVarName, String(value));
          tokensCount++;
        });
      });
      
      // Applica BORDERS
      Object.entries(extractedTokens.borders).forEach(([category, items]) => {
        Object.entries(items).forEach(([name, value]) => {
          const cssVarName = `--border-${category}-${name}`;
          root.style.setProperty(cssVarName, value);
          tokensCount++;
        });
      });
      
      // Applica SHADOWS
      Object.entries(extractedTokens.shadows).forEach(([name, value]) => {
        const cssVarName = `--shadow-${name}`;
        root.style.setProperty(cssVarName, value);
        tokensCount++;
      });
      
      // Applica EFFECTS
      Object.entries(extractedTokens.effects).forEach(([category, items]) => {
        Object.entries(items).forEach(([name, value]) => {
          const cssVarName = `--effect-${category}-${name}`;
          root.style.setProperty(cssVarName, value);
          tokensCount++;
        });
      });
      
      setState({
        isLoaded: true,
        error: null,
        tokensCount
      });

      console.log(`✅ Design Tokens caricati: ${tokensCount} variabili CSS da Figma`);
      console.log(`📦 Design System v${(designTokens as any).version || '1.0.9'}`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Errore caricamento Design Tokens:', error);
      setState({
        isLoaded: false,
        error: errorMessage,
        tokensCount: 0
      });
    }
  }, []);

  return state;
};

// Helper per ottenere valori di token specifici
export const getTokenValue = (tokens: DesignTokens | null, path: string): string => {
  if (!tokens) return '';
  
  const pathArray = path.split('.');
  let current: any = tokens;
  
  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return '';
    }
  }
  
  return typeof current === 'string' ? current : '';
};