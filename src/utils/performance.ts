/**
 * Performance Optimization Utils
 * Utility per ottimizzare il caricamento e le performance dell'applicazione
 */

import React from 'react';

// CSS critico inline per evitare FOUC durante il caricamento iniziale
export const injectCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS per evitare FOUC */
    body {
      margin: 0;
      font-family: Georgia, serif;
      background: #2a1810;
      color: #d4a574;
      overflow: hidden;
    }
    
    * {
      box-sizing: border-box;
    }
    
    #root {
      width: 100vw;
      height: 100vh;
    }
  `;
  
  const styleEl = document.createElement('style');
  styleEl.innerHTML = criticalCSS;
  styleEl.id = 'critical-css';
  document.head.insertBefore(styleEl, document.head.firstChild);
};

// Lazy loading per componenti pesanti
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc);
};

// Debounce per resize events
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Preconnect semplificato (solo se necessario)
export const preconnectToExternalResources = () => {
  // Con Vite locale, non sono necessari preconnect
  // Questa funzione è mantenuta per compatibilità
};

// Resource hints semplificati per Vite
export const addResourceHints = () => {
  // Vite gestisce automaticamente le ottimizzazioni
  // Questa funzione è mantenuta per compatibilità
};

export default {
  injectCriticalCSS,
  lazyLoadComponent,
  debounce,
  preconnectToExternalResources,
  addResourceHints
};