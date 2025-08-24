import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useResearchStore } from '../store/useResearchStore';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  // Example stats, replace with real state later
  const streak = 3;
  const xp = 120;
  const dailyGoal = 20;
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  const nav = (route: string) => () => animateButton(() => navigation.navigate(route));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Research Companion</Text>
      <Text style={styles.streak}>🔥 Streak: {streak} days</Text>
      <Text style={styles.xp}>⭐ XP: {xp}</Text>
      <Text style={styles.goal}>🎯 Daily Goal: {dailyGoal} XP</Text>
      <Text style={styles.motivation}>"Keep learning, you're doing great!"</Text>
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={nav('Quiz')}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={nav('FlashcardReview')}>
            <Text style={styles.buttonText}>Review Flashcards</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={nav('Search')}>
            <Text style={styles.buttonText}>Search Papers</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={nav('Profile')}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, fontFamily: 'Inter-Bold' },
  streak: { fontSize: 18, color: '#14b8a6', marginBottom: 8 },
  xp: { fontSize: 18, color: '#7c3aed', marginBottom: 8 },
  goal: { fontSize: 18, color: '#22223b', marginBottom: 8 },
  motivation: { fontSize: 16, fontStyle: 'italic', marginBottom: 24 },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', width: '90%', alignSelf: 'center', marginBottom: 12 },
  button: {
    flex: 1,
    backgroundColor: '#14b8a6',
    borderRadius: 999,
    height: 56,
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  paddingVertical: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
