/**
 * usePreventFOUC Hook - Prevent Flash of Unstyled Content
 * Gestisce il caricamento progressivo per evitare il flash di contenuto
 */

import { useState, useEffect } from 'react';

export const usePreventFOUC = () => {
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);

  useEffect(() => {
    // Timeout breve per permettere al DOM di caricarsi
    const timer = setTimeout(() => {
      setIsStylesLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return isStylesLoaded;
};
