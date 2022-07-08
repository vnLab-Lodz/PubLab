import { PaletteColorOptions } from '@mui/material/styles/createPalette';

// overwrite typography variants to match available to requirements, false means
// excluding the value, true including it as a variant option for Typography component
// own variants could not be introduced as they do not work with responsiveFontSizes()
declare module '@mui/material/Typography' {
  export interface TypographyPropsVariantOverrides {
    h1: true; // lg
    h2: true; // md
    h3: true; // sm
    h4: true; // xs
    h5: true; // xss
    h6: false;
    subtitle1: true;
    subtitle2: false;
    body1: true;
    body2: true;
    button: false;
    caption: true;
    overline: false;
  }
}

declare module '@mui/material/styles' {
  export interface Palette {
    black: PaletteColor;
    gray: PaletteColor;
    pink: PaletteColor;
    red: PaletteColor;
    green: PaletteColor;
    paleGreen: PaletteColor;
    orange: PaletteColor;
    blue: PaletteColor;
    salmon: PaletteColor;
  }
  export interface PaletteOptions {
    gray?: PaletteColorOptions;
    black?: PaletteColorOptions;
    pink?: PaletteColorOptions;
    red?: PaletteColorOptions;
    green?: PaletteColorOptions;
    paleGreen: PaletteColorOptions;
    orange?: PaletteColorOptions;
    blue?: PaletteColorOptions;
    salmon?: PaletteColorOptions;
  }
}

// * IMPORTANT - this step needs to be repeated for all MUI components that are to be styled with those colors

declare module '@mui/material/Button' {
  // for Button's color to accept custom palette colors
  export interface ButtonPropsColorOverrides {
    gray: true;
    lightGray: true;
    black: true;
    lightPink: true;
    lightRed: true;
    green: true;
    lightGreen: true;
    orange: true;
    darkGray: true;
    blue: true;
  }
}

declare module '@mui/material/TextField' {
  export interface OurTextArea {
    black: true;
    lightRed: true;
    lightGray: true;
  }
}
