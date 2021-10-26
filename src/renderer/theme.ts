import { createTheme, responsiveFontSizes } from '@mui/material';
import HKGroteskWoff2 from './fonts/HKGrotesk/HKGrotesk-Regular.woff2';
import HKGroteskItalicWoff2 from './fonts/HKGrotesk/HKGrotesk-Italic.woff2';
import HKGroteskBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-Bold.woff2';
import HKGroteskSemiBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-SemiBold.woff2';
import HKGroteskExtraBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-ExtraBold.woff2';
import { blue } from '@mui/material/colors';
import { palette } from '@mui/system';

//for different font style variants in components use respective fontWeight/fontStyle
//defined here or in typoghraphy (fontWeightLight and fontWeightMedium)
//for reference see <Typography> componend defined in LoginComponent.tsx

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    lightGray: PaletteColor;
    veryDarkGray: PaletteColor;
    lightPink: PaletteColor;
    darkPink: PaletteColor;
    green: PaletteColor;
    orange: PaletteColor;
    beige: PaletteColor;
    gray: PaletteColor;
    darkGray: PaletteColor;
    blue: PaletteColor;
  }
  interface PaletteOptions {
    lightGray: PaletteColorOptions;
    veryDarkGray: PaletteColorOptions;
    lightPink: PaletteColorOptions;
    darkPink: PaletteColorOptions;
    green: PaletteColorOptions;
    orange: PaletteColorOptions;
    beige: PaletteColorOptions;
    gray: PaletteColorOptions;
    darkGray: PaletteColorOptions;
    blue: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  //for Button's color to accept custom palette colors
  export interface ButtonPropsColorOverrides {
    lightGray: true;
    veryDarkGray: true;
    lightPink: true;
    darkPink: true;
    green: true;
    orange: true;
    beige: true;
    Gray: true;
    darkGray: true;
    blue: true;
  }
}
//IMPORTANT - this step needs to be repeated for all Material UI components that are to be styled with those colors

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

// overwrite typography variants to match available to requirements, false means
// excluding the value, true including it as a variant option for Typography component
// own variants could not be introduced as they do not work with responsiveFontSizes()
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true; // lg
    h2: true; // md
    h3: true; // sm
    h4: true; // xs
    h5: true; // xss
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

export let theme = createTheme({
  palette: {
    text: {
      primary: '#DDDDDD',
      secondary: '#111111',
    },
    lightGray: {
      main: '#111111', //black backgrounds
      contrastText: '#DDDDDD',
    },
    veryDarkGray: {
      main: '#DDDDDD', //light backgrounds
      contrastText: '#111111',
    },
    lightPink: {
      main: '#FFD6EA', //light pink, eg. notifications background
      contrastText: '#111111',
    },
    darkPink: {
      main: '#ff8383',
      contrastText: '#DDDDDD',
    },
    green: {
      main: '#01D39F', //green, eg. button, switches when
      contrastText: '#111111',
    },
    orange: {
      main: '#d89e01',
      contrastText: '#111111',
    },
    beige: {
      main: '#EBF8EA',
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
