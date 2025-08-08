
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import FlashcardList from '../components/FlashcardList';
import { useResearchStore } from '../store/useResearchStore';
import { saveFlashcards, saveExplanation } from '../services/storageService';

const DetailsScreen = () => {
  const explanation = useResearchStore((s) => s.explanation);
  const flashcards = useResearchStore((s) => s.flashcards);
  const error = useResearchStore((s) => s.error);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
      {error ? (
        <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text>
      ) : null}
      <Text style={styles.explanation}>{explanation}</Text>
      <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} disabled={saving} />
      <Text style={styles.title}>Flashcards:</Text>
      <FlashcardList flashcards={flashcards} />
      <Button title="Quiz Mode" onPress={() => navigation.navigate('Quiz')} />
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
