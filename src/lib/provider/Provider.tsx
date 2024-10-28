'use client';

import { AppContextProvider } from '@/context/AppContext';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return <AppContextProvider>{children}</AppContextProvider>;
}

export default Provider;
