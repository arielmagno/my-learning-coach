import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Paper } from '../store/useResearchStore';

interface PaperCardProps {
  paper: Paper;
  onExplain: () => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, onExplain }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{paper.title}</Text>
    <Text>Authors: {paper.authors.join(', ')}</Text>
    <Text numberOfLines={2}>Abstract: {paper.abstract}</Text>
    <Button title="Explain" onPress={onExplain} />
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#f9f9f9', padding: 12, marginBottom: 12, borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 16 },
});

export default PaperCard;
