
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import React from 'react';
import darkTheme from '@/theme/darkTheme';
import lightTheme from '@/theme/lightTheme';
import Header from '@/components/header';
import Layout from '@/components/layout';
import Footer from '@/components/footer';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


// Workaround for `self` reference error
if (typeof window !== 'undefined') {
  global.self = window; 
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const { session, ...PageProps } = pageProps;



  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }),
    [],
  );

  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme
      }),
    [mode],
  );
  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [mode],
  );

  


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>
        <SessionProvider session={session}>
          <CssBaseline />
          <Header ColorModeContext={ColorModeContext} />
          <Layout>
          <Component {...PageProps} />
          </Layout>
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
