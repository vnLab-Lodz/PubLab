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
  export interface PaletteOptions {
    lightGray?: PaletteColorOptions;
    veryDarkGray?: PaletteColorOptions;
    lightPink?: PaletteColorOptions;
    darkPink?: PaletteColorOptions;
    green?: PaletteColorOptions;
    orange?: PaletteColorOptions;
    beige?: PaletteColorOptions;
    gray?: PaletteColorOptions;
    darkGray?: PaletteColorOptions;
    blue?: PaletteColorOptions;
  }
}

// * IMPORTANT - this step needs to be repeated for all MUI components that are to be styled with those colors

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
    gray: true;
    darkGray: true;
    blue: true;
  }
}
