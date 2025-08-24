import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useResearchStore } from '../store/useResearchStore';

const ProfileScreen = () => {
  // Example stats, replace with real state later
  const streak = 3;
  const xp = 120;
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(callback);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.avatar}>👤</Text>
      <Text style={styles.streak}>🔥 Streak: {streak} days</Text>
      <Text style={styles.xp}>⭐ XP: {xp}</Text>
      <Text style={styles.badge}>🏅 Badges: 2</Text>
      <View style={styles.buttonRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => animateButton(() => {})}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, fontFamily: 'Inter-Bold' },
  avatar: { fontSize: 48, marginBottom: 16 },
  streak: { fontSize: 18, color: '#14b8a6', marginBottom: 8 },
  xp: { fontSize: 18, color: '#7c3aed', marginBottom: 8 },
  badge: { fontSize: 18, color: '#22223b', marginBottom: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%', marginTop: 24 },
  button: {
    flex: 1,
    backgroundColor: '#7c3aed',
    borderRadius: 999,
    height: 56,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  elevation: 4,
  shadowColor: '#7c3aed',
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

export default ProfileScreen;
