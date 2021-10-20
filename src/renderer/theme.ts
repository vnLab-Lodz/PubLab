import { createTheme } from '@mui/material';
import HKGrotesk from './fonts/HKGrotesk/HKGrotesk-SemiBold.woff2';

export const theme = createTheme({
  typography: {
    fontFamily: 'HK Grotesk',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'HK Grotesk';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('HK Grotesk SemiBold'), local('HKGrotesk-SemiBold'), url(${HKGrotesk}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});
