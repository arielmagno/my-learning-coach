import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Flashcard } from '../store/useResearchStore';

interface FlashcardReviewProps {
  flashcards: Flashcard[];
}

const FlashcardReview: React.FC<FlashcardReviewProps> = ({ flashcards }) => {
  const [current, setCurrent] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  if (flashcards.length === 0) {
    return <View style={styles.empty}><Text style={styles.emptyText}>No flashcards yet! 🎉</Text></View>;
  }

  const card = flashcards[current];

  const [scaleAnim] = useState(new Animated.Value(1));

  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start(() => {
      setCurrent((prev) => (prev + 1) % flashcards.length);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}> 
        <Text style={styles.question}>Q: {card.question}</Text>
        <Text style={styles.answer}>A: {card.answer}</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.button, styles.gotIt]}
            activeOpacity={0.8}
            onPress={() => animateButton(handleNext)}
          >
            <Text style={styles.buttonText}>Got it 👍</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.button, styles.review]}
            activeOpacity={0.8}
            onPress={() => animateButton(handleNext)}
          >
            <Text style={styles.buttonText}>Review again 🔄</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 32,
    alignItems: 'center',
  },
  question: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#14b8a6', fontFamily: 'Inter-Bold' },
  answer: { fontSize: 18, color: '#22223b', marginBottom: 8, fontFamily: 'Inter' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, width: '90%' },
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
  gotIt: { backgroundColor: '#14b8a6' },
  review: { backgroundColor: '#7c3aed' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 20, color: '#7c3aed', fontFamily: 'Inter-Bold' },
});

export default FlashcardReview;
