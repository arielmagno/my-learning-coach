import React from 'react';
import { useResearchStore } from '../store/useResearchStore';
import FlashcardReview from '../components/FlashcardReview';

const FlashcardReviewScreen = () => {
  const flashcards = useResearchStore((s) => s.flashcards);
  return <FlashcardReview flashcards={flashcards} />;
};

export default FlashcardReviewScreen;
