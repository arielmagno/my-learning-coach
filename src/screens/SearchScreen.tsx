import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useResearchStore } from '../store/useResearchStore';

const SearchScreen = () => {
  const [topic, setTopicInput] = useState('');
  const setTopic = useResearchStore((s) => s.setTopic);
  const setPapers = useResearchStore((s) => s.setPapers);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSearch = () => {
    setTopic(topic);
    // Mock papers
    setPapers([
      { id: '1', title: 'AI in Education', authors: ['Alice'], abstract: 'Abstract 1', url: 'https://example.com/1' },
      { id: '2', title: 'Machine Learning Basics', authors: ['Bob'], abstract: 'Abstract 2', url: 'https://example.com/2' },
    ]);
    navigation.navigate('Results');
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
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, marginBottom: 12 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
});

export default SearchScreen;
