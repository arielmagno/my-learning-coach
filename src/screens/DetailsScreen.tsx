import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useResearchStore } from '../store/useResearchStore';

const DetailsScreen = () => {
  const explanation = useResearchStore((s) => s.explanation);
  const flashcards = useResearchStore((s) => s.flashcards);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explanation:</Text>
      <Text style={styles.explanation}>{explanation}</Text>
      <Text style={styles.title}>Flashcards:</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, marginBottom: 8 },
  explanation: { marginBottom: 16 },
  card: { backgroundColor: '#e9e9e9', padding: 10, marginBottom: 8, borderRadius: 6 },
  question: { fontWeight: 'bold' },
  answer: { marginLeft: 8 },
});

export default DetailsScreen;
