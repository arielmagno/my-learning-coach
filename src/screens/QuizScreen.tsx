import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
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

  const [scaleAnim] = useState(new Animated.Value(1));
  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  const handleCheck = () => {
    animateButton(() => setShowAnswer(true));
  };

  const handleNext = () => {
    animateButton(() => {
      setCurrent((prev) => (prev + 1) % flashcards.length);
      setAnswer('');
      setShowAnswer(false);
    });
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
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleCheck} disabled={showAnswer}>
            <Text style={styles.buttonText}>Check Answer</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {showAnswer && (
        <Text style={styles.answer}>Correct Answer: {card.answer}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  question: { fontWeight: 'bold', fontSize: 18, marginBottom: 12, fontFamily: 'Inter-Bold' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4, fontFamily: 'Inter-Regular' },
  answer: { color: 'green', marginBottom: 16, fontFamily: 'Inter-Regular' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%', marginBottom: 12 },
  button: {
    flex: 1,
    backgroundColor: '#14b8a6',
    borderRadius: 999,
    height: 56,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
  shadowRadius: 8,
  paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
});

export default QuizScreen;
