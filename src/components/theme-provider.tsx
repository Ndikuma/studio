'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Ensure the component only renders on the client side where window is available
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // On the server, or before hydration, render children directly or a placeholder
    // This avoids hydration mismatch errors with next-themes
    return <>{children}</>; 
  }
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
