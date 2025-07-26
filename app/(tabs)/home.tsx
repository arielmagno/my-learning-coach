import { useOpenAI } from '@/hooks/useOpenAI';
import { useState } from 'react';
import { Box, Input, Button, Text, VStack, Heading, Spinner, Center, HStack, Icon, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [input, setInput] = useState('');
  const { askAI, reply, loading } = useOpenAI();
  // Simple keyword highlighting (for demo)
  const highlightKeywords = (text: string) => {
    if (!text) return null;
    // Example: highlight 'AI', 'answer', 'important', 'learn', 'coach'
    const keywords = ['AI', 'answer', 'important', 'learn', 'coach'];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return parts.map((part, i) =>
      keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
        <Text key={i} color="primary.500" fontWeight="bold">{part}</Text>
      ) : (
        <Text key={i}>{part}</Text>
      )
    );
  };

  return (
    <Box flex={1} bg="background.50" px={6} py={8} safeArea>
      <Center>
        <Heading size="xl" color="primary.500" mb={2}>
          My Learning Coach
        </Heading>
        <Text fontSize="md" color="secondary.500" mb={8}>
          Ask anything and get instant AI-powered answers.
        </Text>
      </Center>
      <VStack space={6} alignItems="center" w="100%">
        <Input
          placeholder="Type your question..."
          value={input}
          onChangeText={setInput}
          borderColor="primary.500"
          fontSize="md"
          w="100%"
          bg="white"
          borderRadius={10}
          shadow={1}
        />
        <Button
          colorScheme="primary"
          onPress={() => askAI(input)}
          isLoading={loading}
          w="100%"
          borderRadius={10}
          leftIcon={<Icon as={MaterialIcons} name="send" size="sm" color="white" />}
        >
          Ask AI
        </Button>
        <Box w="100%" minH={24} bg="white" borderRadius={12} p={5} mt={2} shadow={2}>
          {loading ? (
            <Center>
              <Spinner color="primary.500" size="lg" />
              <Text mt={2} color="primary.500">Thinking...</Text>
            </Center>
          ) : reply ? (
            <VStack space={4}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="lg" color="primary.700" fontWeight="bold">Response</Text>
                <Pressable onPress={() => setInput('')}> {/* Clear input */}
                  <Icon as={MaterialIcons} name="clear" size="sm" color="secondary.500" />
                </Pressable>
              </HStack>
              <Box bg="background.50" borderRadius={8} p={3}>
                <Text fontSize="md">
                  {highlightKeywords(reply)}
                </Text>
              </Box>
            </VStack>
          ) : (
            <Text fontSize="md" color="secondary.400">Your answer will appear here.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default HomeScreen;