import axios from 'axios';
import { Flashcard } from '../store/useResearchStore';

export async function explainTopicInLaymanTerms(text: string): Promise<string> {
  // Example using OpenAI API
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Explain the following topic in layman\'s terms.' },
      { role: 'user', content: text },
    ],
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.choices[0].message.content;
}

export async function generateFlashcardsFromText(text: string): Promise<Flashcard[]> {
  // Example using OpenAI API
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Generate flashcards (question and answer pairs) from the following text.' },
      { role: 'user', content: text },
    ],
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  // You would need to parse the response appropriately
  // For now, return mock data
  return [
    { question: 'What is the main idea?', answer: 'Sample answer.' },
  ];
}
