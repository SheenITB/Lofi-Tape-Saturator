/**
 * InTheBox - Main Entry Point
 * ✅ Design System: Caricamento automatico design tokens
 * ✅ Performance: FOUC prevention + ottimizzazioni
 * ✅ Professional: Loading screen animato
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './AppSimple.tsx'
import './styles/globals.css';
import { injectCriticalCSS } from './utils/performance';

// ⚡ Inject critical CSS per evitare FOUC (Flash of Unstyled Content)
injectCriticalCSS();

// 🎨 Mark root as loaded when React mounts
const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 📊 Mark app as fully loaded
setTimeout(() => {
  root.classList.add('loaded');
}, 100);

// 🎯 Console banner con info design system
console.log('%c✨ InTheBox Lo-Fi Tape Saturator', 'color: #cda768; font-size: 16px; font-weight: bold; font-family: Georgia, serif;');
console.log('%c🎨 Design System v1.0.9 - 100+ Design Tokens caricati', 'color: #a88850; font-size: 12px;');
console.log('%c⚡ Performance Optimized - FOUC Prevention Active', 'color: #8a6830; font-size: 11px;');
console.log('%c📦 Modular Architecture - TypeScript + React + Vite', 'color: #6f5d48; font-size: 10px;');

