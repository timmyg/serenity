import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import { ThemeProvider, createTheme } from '@mui/material'
const theme = createTheme({
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
