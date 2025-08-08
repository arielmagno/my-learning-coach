
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useResearchStore } from '../store/useResearchStore';
import { saveFlashcards, saveExplanation } from '../services/storageService';

const DetailsScreen = () => {
  const explanation = useResearchStore((s) => s.explanation);
  const flashcards = useResearchStore((s) => s.flashcards);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await saveExplanation(explanation);
    await saveFlashcards(flashcards);
    setSaving(false);
    Alert.alert('Saved', 'Explanation and flashcards have been saved.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explanation:</Text>
      <Text style={styles.explanation}>{explanation}</Text>
      <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} disabled={saving} />
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
