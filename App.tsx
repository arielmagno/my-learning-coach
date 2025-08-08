
import React, { useEffect } from 'react';
import AppNavigator from './src/AppNavigator';
import { useResearchStore } from './src/store/useResearchStore';
import { getSavedFlashcards, getSavedExplanations } from './src/services/storageService';

export default function App() {
  const setFlashcards = useResearchStore((s) => s.setFlashcards);
  const setExplanation = useResearchStore((s) => s.setExplanation);

  useEffect(() => {
    (async () => {
      const savedFlashcards = await getSavedFlashcards();
      setFlashcards(savedFlashcards);
      const savedExplanation = await getSavedExplanations();
      setExplanation(savedExplanation);
    })();
  }, []);

  return <AppNavigator />;
}
