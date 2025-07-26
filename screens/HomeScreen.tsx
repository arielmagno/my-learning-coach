import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useOpenAI } from '../hooks/useOpenAI';

const HomeScreen = () => {
  const [input, setInput] = useState('');
  const { askAI, reply, loading } = useOpenAI();

  return (
    <View>
      <TextInput value={input} onChangeText={setInput} />
      <Button title="Ask" onPress={() => askAI(input)} disabled={loading} />
      <Text>{loading ? 'Thinking...' : reply}</Text>
    </View>
  );
};

export default HomeScreen;