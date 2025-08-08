import axios from 'axios';
import { Paper } from '../store/useResearchStore';

export async function searchPapers(topic: string): Promise<Paper[]> {
  // Example using Semantic Scholar API
  const response = await axios.get(`https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(topic)}&limit=5&fields=title,authors,abstract,url`);
  return response.data.data.map((item: any) => ({
    id: item.paperId,
    title: item.title,
    authors: item.authors?.map((a: any) => a.name) || [],
    abstract: item.abstract || '',
    url: item.url || '',
  }));
}
