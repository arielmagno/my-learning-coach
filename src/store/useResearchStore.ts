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
  setTopic: (topic: string) => void;
  setPapers: (papers: Paper[]) => void;
  setExplanation: (text: string) => void;
  setFlashcards: (cards: Flashcard[]) => void;
}

export const useResearchStore = create<ResearchState>((set) => ({
  topic: '',
  papers: [],
  explanation: '',
  flashcards: [],
  setTopic: (topic) => set({ topic }),
  setPapers: (papers) => set({ papers }),
  setExplanation: (explanation) => set({ explanation }),
  setFlashcards: (flashcards) => set({ flashcards }),
}));
