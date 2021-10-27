import { createTheme, responsiveFontSizes } from '@mui/material';
import HKGroteskWoff2 from './fonts/HKGrotesk/HKGrotesk-Regular.woff2';
import HKGroteskItalicWoff2 from './fonts/HKGrotesk/HKGrotesk-Italic.woff2';
import HKGroteskBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-Bold.woff2';
import HKGroteskSemiBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-SemiBold.woff2';
import HKGroteskExtraBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-ExtraBold.woff2';

//for different font style variants in components use respective fontWeight/fontStyle
//defined here or in typoghraphy (fontWeightLight and fontWeightMedium)
//for reference see <Typography> componend defined in LoginComponent.tsx

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

const hkgroteskBold = {
  fontFamily: 'HK Grotesk',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'bold',
  src: `
    local('HK Grotesk Bold'), local('HKGrotesk-Bold'),
    url(${HKGroteskBoldWoff2}) format('woff2')
  `,
};

const hkgroteskSemiBold = {
  fontFamily: 'HK Grotesk',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `
    local('HK Grotesk SemiBold'), local('HKGrotesk-SemiBold'),
    url(${HKGroteskSemiBoldWoff2}) format('woff2')
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

export let theme = createTheme({
  palette: {
    text: {
      primary: '#DDDDDD',
      secondary: '#111111',
    },
    black: {
      main: '#111111', //black backgrounds
      contrastText: '#DDDDDD',
    },
    lightGray: {
      main: '#DDDDDD', //light backgrounds
      contrastText: '#111111',
    },
    gray: {
      main: '#d1d1d1',
      contrastText: '#111111',
    },
    darkGray: {
      main: '#505050',
      contrastText: '#DDDDDD',
    },
    lightPink: {
      main: '#FFD6EA', //light pink, eg. notifications background
      contrastText: '#111111',
    },
    lightRed: {
      main: '#ff8383',
      contrastText: '#DDDDDD',
    },
    green: {
      main: '#01D39F', //green, eg. button, switches when
      contrastText: '#111111',
    },
    lightGreen: {
      main: '#EBF8EA',
      contrastText: '#111111',
    },
    orange: {
      main: '#d89e01',
      contrastText: '#111111',
    },
    blue: {
      main: '#83aeff',
      contrastText: '#111111',
    },
  },
  typography: {
    fontFamily: 'HK Grotesk',
    fontWeightLight: 300,
    fontWeightMedium: 500,
    // set up the baseline for what value in pixels 1rem represents
    htmlFontSize: 10,
    h1: {
      fontSize: '2rem',
      color: 'red',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.3rem',
    },
    h5: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [
            hkgrotesk,
            hkgroteskItalic,
            hkgroteskBold,
            hkgroteskSemiBold,
            hkgroteskExtraBold,
          ],
        },
      },
    },
  },
});

// make the font sizes in the theme responsive to the breakpoint changes
theme = responsiveFontSizes(theme);
