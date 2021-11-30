import { altTheme, mainTheme } from '../src/renderer/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'main',
    toolbar: {
      icon: 'circlehollow',
      items: ['main', 'alt'],
      showName: true,
    },
  },
};

const themes = {
  main: mainTheme,
  alt: altTheme
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={themes[context.globals.theme]}>
      <CssBaseline/>
      {Story()}
    </ThemeProvider>
  ),
];