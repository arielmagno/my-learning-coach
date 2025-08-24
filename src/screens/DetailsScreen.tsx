import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import FlashcardList from '../components/FlashcardList';
import { useResearchStore } from '../store/useResearchStore';
import { saveFlashcards, saveExplanation } from '../services/storageService';
import * as Speech from 'expo-speech';

const DetailsScreen = () => {
  const explanation = useResearchStore((s) => s.explanation);
  const flashcards = useResearchStore((s) => s.flashcards);
  const error = useResearchStore((s) => s.error);
  const [saving, setSaving] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [explanation]);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  const handleSave = async () => {
    animateButton(async () => {
      setSaving(true);
      await saveExplanation(explanation);
      await saveFlashcards(flashcards);
      setSaving(false);
      Alert.alert('Saved', 'Explanation and flashcards have been saved.');
    });
  };

  const handleSpeak = () => {
    animateButton(() => Speech.speak(explanation));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explanation:</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.explanation}>{explanation}</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSave} disabled={saving}>
            <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save'}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSpeak}>
            <Text style={styles.buttonText}>Read Explanation</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Text style={styles.title}>Flashcards:</Text>
      <FlashcardList flashcards={flashcards} />
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={[styles.button, styles.quizButton]} activeOpacity={0.8} onPress={() => animateButton(() => navigation.navigate('Quiz'))}>
            <Text style={styles.buttonText}>Quiz Mode</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 20, marginBottom: 8, fontFamily: 'Inter-Bold', color: '#14b8a6' },
  error: { color: 'red', marginBottom: 12, fontFamily: 'Inter-Regular' },
  explanation: {
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#e0f7fa',
    borderRadius: 16,
    padding: 16,
    color: '#22223b',
    elevation: 2,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%', marginBottom: 12 },
  button: {
    flex: 1,
    backgroundColor: '#14b8a6',
    borderRadius: 999,
    height: 48,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  quizButton: {
    backgroundColor: '#7c3aed',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
});

export default DetailsScreen;
