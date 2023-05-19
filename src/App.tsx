import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import { ThemeProvider, createTheme } from '@mui/material'
const theme = createTheme({
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
  // palette: {
  //   primary: {
  //     main: '#1976d2',
  //   },
  //   secondary: {
  //     main: '#dc004e',
  //   },
  // },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Greetings />
    </ThemeProvider>
  )
}
