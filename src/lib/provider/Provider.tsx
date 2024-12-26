'use client';

import { AppContextProvider } from '@/context/AppContext';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <CssBaseline />
          {children}
        </AppContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Provider;
