
import axios from 'axios';
import { Paper, useResearchStore } from '../store/useResearchStore';

export async function searchPapers(topic: string): Promise<Paper[]> {
  try {
    const response = await axios.get(`https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(topic)}&limit=5&fields=title,authors,abstract,url`);
    if (!response.data.data || response.data.data.length === 0) {
      useResearchStore.getState().setError('No results found.');
      return [];
    }
    useResearchStore.getState().setError('');
    return response.data.data.map((item: any) => ({
      id: item.paperId,
      title: item.title,
      authors: item.authors?.map((a: any) => a.name) || [],
      abstract: item.abstract || '',
      url: item.url || '',
    }));
  } catch (error) {
    useResearchStore.getState().setError('Failed to fetch papers. Please try again.');
    return [];
  }
}
