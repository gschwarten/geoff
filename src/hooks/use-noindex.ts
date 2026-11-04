import { useEffect } from 'react';

/** Adds <meta name="robots" content="noindex, follow"> while the page is mounted. */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);
}
