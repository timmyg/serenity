declare module '@mui/material/styles' {
  interface Theme {
    status: {
      active: string;
      inactive: string;
      unknown: string;
    };
  }

  // Allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      active?: string;
      inactive?: string;
      unknown?: string;
    };
  }
}
