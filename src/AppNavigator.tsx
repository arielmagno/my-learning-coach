import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailsScreen from './screens/DetailsScreen';
import QuizScreen from './screens/QuizScreen';
import ProfileScreen from './screens/ProfileScreen';
import FlashcardReviewScreen from './screens/FlashcardReviewScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="FlashcardReview" component={FlashcardReviewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
