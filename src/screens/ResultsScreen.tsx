import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PaperCard from '../components/PaperCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useResearchStore } from '../store/useResearchStore';

const ResultsScreen = () => {
  const papers = useResearchStore((s) => s.papers);
  const setExplanation = useResearchStore((s) => s.setExplanation);
  const setFlashcards = useResearchStore((s) => s.setFlashcards);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleExplain = (paperId: string) => {
    // Mock explanation and flashcards
    setExplanation('This is a layman explanation for the selected paper.');
    setFlashcards([
      { question: 'What is the main idea?', answer: 'Sample answer.' },
    ]);
    navigation.navigate('Details');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results:</Text>
      <FlatList
        data={papers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PaperCard paper={item} onExplain={() => handleExplain(item.id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, marginBottom: 12 },
  card: { backgroundColor: '#f9f9f9', padding: 12, marginBottom: 12, borderRadius: 6 },
  paperTitle: { fontWeight: 'bold', fontSize: 16 },
});

export default ResultsScreen;
