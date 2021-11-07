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
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

declare module '@mui/material/styles' {
  export interface Palette {
    black: PaletteColor;
    gray: PaletteColor;
    lightGray: PaletteColor;
    darkGray: PaletteColor;
    lightPink: PaletteColor;
    lightRed: PaletteColor;
    green: PaletteColor;
    lightGreen: PaletteColor;
    orange: PaletteColor;
    blue: PaletteColor;
  }
  export interface PaletteOptions {
    gray?: PaletteColorOptions;
    lightGray?: PaletteColorOptions;
    black?: PaletteColorOptions;
    lightPink?: PaletteColorOptions;
    lightRed?: PaletteColorOptions;
    green?: PaletteColorOptions;
    lightGreen?: PaletteColorOptions;
    orange?: PaletteColorOptions;
    darkGray?: PaletteColorOptions;
    blue?: PaletteColorOptions;
  }
}

// * IMPORTANT - this step needs to be repeated for all MUI components that are to be styled with those colors

declare module '@mui/material/MUIButton' {
  //for Button's color to accept custom palette colors
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
