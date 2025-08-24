
import React, { useEffect, useState } from 'react';
import AppNavigator from './src/AppNavigator';
import { useResearchStore } from './src/store/useResearchStore';
import { getSavedFlashcards, getSavedExplanations } from './src/services/storageService';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import { useColorScheme } from 'react-native';
import { LightTheme, DarkThemeCustom } from './src/theme';

export default function App() {
  const setFlashcards = useResearchStore((s) => s.setFlashcards);
  const setExplanation = useResearchStore((s) => s.setExplanation);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Inter: require('./assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        Manrope: require('./assets/fonts/Manrope-Regular.ttf'),
      });
      setFontsLoaded(true);
      const savedFlashcards = await getSavedFlashcards();
      setFlashcards(savedFlashcards);
      const savedExplanation = await getSavedExplanations();
      setExplanation(savedExplanation);
    })();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={colorScheme === 'dark' ? DarkThemeCustom : LightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}
