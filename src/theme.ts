import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#14b8a6', // teal accent
    background: '#f8fafc', // soft neutral
    surface: '#ffffff',
    onSurface: '#22223b',
    card: '#e2e8f0',
    accent: '#14b8a6',
  },
  roundness: 24,
};

export const DarkThemeCustom = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#7c3aed', // violet accent
    background: '#18181b', // deep gray
    surface: '#232336',
    onSurface: '#f3f4f6',
    card: '#232336',
    accent: '#7c3aed',
  },
  roundness: 24,
};
