import { create } from 'zustand';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  url: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}


interface ResearchState {
  topic: string;
  papers: Paper[];
  explanation: string;
  flashcards: Flashcard[];
  error: string;
  setTopic: (topic: string) => void;
  setPapers: (papers: Paper[]) => void;
  setExplanation: (text: string) => void;
  setFlashcards: (cards: Flashcard[]) => void;
  setError: (error: string) => void;
}

export const useResearchStore = create<ResearchState>((set) => ({
  topic: '',
  papers: [],
  explanation: '',
  flashcards: [],
  error: '',
  setTopic: (topic: string) => set({ topic }),
  setPapers: (papers: Paper[]) => set({ papers }),
  setExplanation: (explanation: string) => set({ explanation }),
  setFlashcards: (flashcards: Flashcard[]) => set({ flashcards }),
  setError: (error: string) => set({ error }),
}));
