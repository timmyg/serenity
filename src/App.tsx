import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyle } from './styles/GlobalStyle';

import { Home } from './components/Home';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import {
  amber,
  deepOrange,
  grey,
  green,
  yellow,
  red,
} from '@mui/material/colors';
import { createContext, useMemo, useState } from 'react';
// import { ThemeSwitcher } from './components/ThemeSwitcher';

// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
//   typography: {
//     fontFamily: [
//       'Poppins',
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//   },
//   components: {
//     // Name of the component
//     MuiButtonBase: {
//       defaultProps: {
//         // The props to change the default for.
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//     },
//   },
//   // palette: {
//   //   primary: {
//   //     main: '#1976d2',
//   //   },
//   //   secondary: {
//   //     main: '#dc004e',
//   //   },
//   // },
// });

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export type ThemeMode = PaletteMode;

export function App() {
  const getDesignTokens = (mode: ThemeMode) => ({
    palette: {
      mode,
      status: {
        active: red[300],
        inactive: green[300],
        unknown: grey[300],
      },
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],

            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
    typography: {
      fontFamily: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  });

  const [mode, setMode] = useState<ThemeMode>('light');
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: ThemeMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <Home />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
