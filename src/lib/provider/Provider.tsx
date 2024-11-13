'use client';

import { AppContextProvider } from '@/context/AppContext';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return (
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <AppContextProvider>
        <CssBaseline />
        {children}
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default Provider;
