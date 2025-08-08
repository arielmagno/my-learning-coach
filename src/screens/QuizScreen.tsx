import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useResearchStore } from '../store/useResearchStore';
import FlashcardList from '../components/FlashcardList';

const QuizScreen = () => {
  const flashcards = useResearchStore((s) => s.flashcards);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  if (flashcards.length === 0) {
    return <View style={styles.container}><Text>No flashcards available for quiz.</Text></View>;
  }

  const handleCheck = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % flashcards.length);
    setAnswer('');
    setShowAnswer(false);
  };

  const card = flashcards[current];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Q: {card.question}</Text>
      <TextInput
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Your answer"
      />
      <Button title="Check Answer" onPress={handleCheck} disabled={showAnswer} />
      {showAnswer && (
        <Text style={styles.answer}>Correct Answer: {card.answer}</Text>
      )}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  question: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
  answer: { color: 'green', marginBottom: 16 },
});

export default QuizScreen;
