
import axios from 'axios';
import { Flashcard, useResearchStore } from '../store/useResearchStore';

export async function explainTopicInLaymanTerms(text: string): Promise<string> {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Explain the following topic in layman\'s terms.' },
        { role: 'user', content: text },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    useResearchStore.getState().setError('');
    return response.data.choices[0].message.content;
  } catch (error) {
    useResearchStore.getState().setError('AI generation failed. Please try again.');
    return '';
  }
}

export async function generateFlashcardsFromText(text: string): Promise<Flashcard[]> {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Generate flashcards (question and answer pairs) from the following text. Return the result as a JSON array of objects with `question` and `answer` fields.' },
        { role: 'user', content: text },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    useResearchStore.getState().setError('');
    const raw = response.data.choices[0].message.content;
    try {
      return JSON.parse(raw);
    } catch {
      useResearchStore.getState().setError('Could not parse flashcards from AI response.');
      return [];
    }
  } catch (error) {
    useResearchStore.getState().setError('AI generation failed. Please try again.');
    return [];
  }
}
