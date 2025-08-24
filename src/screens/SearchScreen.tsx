import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useResearchStore } from '../store/useResearchStore';
import { searchPapers } from '../services/researchService';

const SearchScreen = () => {
  const [topic, setTopicInput] = useState('');
  const setTopic = useResearchStore((s) => s.setTopic);
  const setPapers = useResearchStore((s) => s.setPapers);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [scaleAnim] = useState(new Animated.Value(1));
  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  const handleSearch = async () => {
    animateButton(async () => {
      setTopic(topic);
      const papers = await searchPapers(topic);
      setPapers(papers);
      navigation.navigate('Results');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a research topic:</Text>
      <TextInput
        style={styles.input}
        value={topic}
        onChangeText={setTopicInput}
        placeholder="e.g. Artificial Intelligence"
      />
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, marginBottom: 12, fontFamily: 'Inter-Bold' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4, fontFamily: 'Inter-Regular' },
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

export default SearchScreen;
