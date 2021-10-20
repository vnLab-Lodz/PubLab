import { createTheme } from '@mui/material';
import HKGroteskWoff2 from './fonts/HKGrotesk/HKGrotesk-Black.woff2';
import HKGroteskItalicWoff2 from './fonts/HKGrotesk/HKGrotesk-Italic.woff2';
import HKGroteskExtraBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-ExtraBold.woff2';

const hkgrotesk = {
  fontFamily: 'HK Grotesk',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'normal',
  src: `
  local('HK Grotesk Regular'),
  local('HKGrotesk-Regular'),
    url(${HKGroteskWoff2}) format('woff2')
  `,
};

const hkgroteskItalic = {
  fontFamily: 'HK Grotesk',
  fontStyle: 'italic',
  fontDisplay: 'swap',
  fontWeight: 'normal',
  src: `
  local('HK Grotesk Italic'), local('HKGrotesk-Italic'),
    url(${HKGroteskItalicWoff2}) format('woff2')
  `,
};

const hkgroteskExtraBold = {
  fontFamily: 'HK Grotesk',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 800,
  src: `
  local('HK Grotesk ExtraBold'), local('HKGrotesk-ExtraBold'),
    url(${HKGroteskExtraBoldWoff2}) format('woff2')
  `,
};

export const theme = createTheme({
  typography: {
    fontFamily: 'HK Grotesk',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [hkgrotesk, hkgroteskItalic, hkgroteskExtraBold],
        },
      },
    },
  },
});
