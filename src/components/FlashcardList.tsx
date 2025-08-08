import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Flashcard } from '../store/useResearchStore';

interface FlashcardListProps {
  flashcards: Flashcard[];
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards }) => (
  <FlatList
    data={flashcards}
    keyExtractor={(_, idx) => idx.toString()}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.question}>Q: {item.question}</Text>
        <Text style={styles.answer}>A: {item.answer}</Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#e9e9e9', padding: 10, marginBottom: 8, borderRadius: 6 },
  question: { fontWeight: 'bold' },
  answer: { marginLeft: 8 },
});

export default FlashcardList;
