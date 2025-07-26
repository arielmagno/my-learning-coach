import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3fcec',
      100: '#b2f7d4',
      200: '#7ff2bb',
      300: '#4ceca3',
      400: '#1ae78b',
      500: '#00ce72', // light green
      600: '#00a85c',
      700: '#008246',
      800: '#005c30',
      900: '#00361a',
    },
    secondary: {
      50: '#e3f6fc',
      100: '#b2e6f7',
      200: '#7fd6f2',
      300: '#4cc6ec',
      400: '#1ab6e7',
      500: '#00a0ce', // light blue
      600: '#0082a8',
      700: '#006482',
      800: '#00465c',
      900: '#002836',
    },
    background: {
      50: '#ffffff', // white
    },
  },
});
