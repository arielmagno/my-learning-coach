import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import PaperCard from '../components/PaperCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useResearchStore } from '../store/useResearchStore';
import { explainTopicInLaymanTerms, generateFlashcardsFromText } from '../services/aiService';

const ResultsScreen = () => {
  const papers = useResearchStore((s) => s.papers);
  const error = useResearchStore((s) => s.error);
  const setExplanation = useResearchStore((s) => s.setExplanation);
  const setFlashcards = useResearchStore((s) => s.setFlashcards);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleExplain = async (paperId: string) => {
    const paper = papers.find(p => p.id === paperId);
    if (!paper) return;
    const explanation = await explainTopicInLaymanTerms(paper.abstract || paper.title);
    setExplanation(explanation);
    const flashcards = await generateFlashcardsFromText(paper.abstract || paper.title);
    setFlashcards(flashcards);
    navigation.navigate('Details');
  };

  const [scaleAnim] = React.useState(new Animated.Value(1));
  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results:</Text>
      {error ? (
        <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text>
      ) : null}
      <FlatList
        data={papers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <PaperCard paper={item} onExplain={() => animateButton(() => handleExplain(item.id))} />
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => animateButton(() => handleExplain(item.id))}>
                <Text style={styles.buttonText}>Explain & Review</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, marginBottom: 12, fontFamily: 'Inter-Bold' },
  card: { backgroundColor: '#f9f9f9', padding: 12, marginBottom: 12, borderRadius: 16, elevation: 2 },
  paperTitle: { fontWeight: 'bold', fontSize: 16, fontFamily: 'Inter-Bold' },
  button: {
    backgroundColor: '#14b8a6',
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    elevation: 4,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
  shadowRadius: 8,
  paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
});

export default ResultsScreen;
