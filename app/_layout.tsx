// app/_layout.tsx
import { Tabs } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { theme } from '../theme';

export default function Layout() {
  return (
    <NativeBaseProvider theme={theme}>
      <Tabs>
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="learn" options={{ title: "Learn" }} />
        <Tabs.Screen name="flashcards" options={{ title: "Flashcards" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </NativeBaseProvider>
  );
}
