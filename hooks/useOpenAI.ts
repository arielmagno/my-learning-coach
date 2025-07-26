import { useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

export const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');

  const askAI = async (question: string) => {
    try {
      setLoading(true);
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      }, {
        headers: {
          Authorization: `Bearer ${Constants.expoConfig?.extra?.OPENAI_API_KEY || ''}`,
          'Content-Type': 'application/json',
        },
      });

      const content = res.data.choices[0].message.content;
      setReply(content);
    } catch (err) {
      setReply('Error: Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return { askAI, reply, loading };
};
