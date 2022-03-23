import { createTheme } from '@mui/material';
import HKGroteskWoff2 from './fonts/HKGrotesk/HKGrotesk-Regular.woff2';
import HKGroteskItalicWoff2 from './fonts/HKGrotesk/HKGrotesk-Italic.woff2';
import HKGroteskBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-Bold.woff2';
import HKGroteskSemiBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-SemiBold.woff2';
import HKGroteskExtraBoldWoff2 from './fonts/HKGrotesk/HKGrotesk-ExtraBold.woff2';

// for different font style variants in components use respective fontWeight/fontStyle
// defined here or in typoghraphy (fontWeightLight and fontWeightMedium)
// for reference see <Typography> componend defined in LoginComponent.tsx

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

const commonColors = {
  black: '#111111',
  lightGray: '#DDDDDD',
};

export const mainTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: commonColors.black,
      secondary: commonColors.lightGray,
      disabled: '#9e9e9e',
    },
    background: {
      default: commonColors.lightGray,
    },
    primary: {
      main: commonColors.black,
      contrastText: commonColors.lightGray,
    },
    secondary: {
      main: commonColors.lightGray,
      contrastText: commonColors.black,
    },
    black: {
      main: commonColors.black,
      contrastText: commonColors.lightGray,
    },
    gray: {
      light: commonColors.lightGray,
      main: '#d1d1d1',
      dark: '#505050',
      contrastText: commonColors.black,
    },
    pink: {
      main: '#FFD6EA', // light pink, eg. notifications background
      dark: '#B13372',
      contrastText: commonColors.black,
    },
    error: {
      main: '#ff8383',
      contrastText: commonColors.lightGray,
    },
    info: {
      main: '#FFD6EA',
    },
    warning: {
      main: '#FFD86D',
    },
    success: {
      main: '#C7FFF1',
    },
    red: {
      main: '#ff8383',
      contrastText: commonColors.lightGray,
    },
    green: {
      light: '#33B150',
      main: '#01D39F', // green, eg. button, switches when
      dark: '#33B150',
      contrastText: commonColors.black,
    },
    orange: {
      main: '#d89e01',
      contrastText: commonColors.black,
    },
    blue: {
      main: '#83aeff',
      dark: '#3346B1',
      contrastText: commonColors.black,
    },
    salmon: {
      main: '#E89671',
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
      lineHeight: '2.5rem',
      fontWeight: 700,
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
    subtitle1: {
      fontSize: '2rem',
      lineHeight: '2.5rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.5rem',
      lineHeight: '2.5rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1.3rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
    },
  },
  spacing: [0, '1rem', '2.7rem', '5.5rem', '9rem'],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          body: {
            boxSizing: 'border-box',
          },
        },

        '@font-face': hkgrotesk,
        // weird fallbacks usage due to the bug described here: https://github.com/mui-org/material-ui/issues/24966
        fallbacks: [
          { '@font-face': hkgroteskItalic },
          { '@font-face': hkgroteskBold },
          { '@font-face': hkgroteskSemiBold },
          { '@font-face': hkgroteskExtraBold },
        ],
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'span',
          body1: 'span',
          body2: 'span',
          caption: 'span',
        },
      },
    },
  },
});
export const altTheme = createTheme({
  ...mainTheme,
  palette: {
    ...mainTheme.palette,
    mode: 'dark',
    text: {
      primary: mainTheme.palette.text.secondary,
      secondary: mainTheme.palette.text.primary,
      disabled: mainTheme.palette.gray.dark,
    },
    background: { default: commonColors.black },
    primary: mainTheme.palette.secondary,
    secondary: mainTheme.palette.primary,
  },
});
