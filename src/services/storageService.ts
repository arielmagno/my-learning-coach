import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '../store/useResearchStore';

export const saveFlashcards = async (flashcards: Flashcard[]) => {
  await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
};

export const getSavedFlashcards = async (): Promise<Flashcard[]> => {
  const data = await AsyncStorage.getItem('flashcards');
  return data ? JSON.parse(data) : [];
};

export const saveExplanation = async (text: string) => {
  await AsyncStorage.setItem('explanation', text);
};

export const getSavedExplanations = async (): Promise<string> => {
  const data = await AsyncStorage.getItem('explanation');
  return data || '';
};
