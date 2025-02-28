import { useState, useEffect } from 'react';
import { DAO } from '../types';
import { mockDaos } from '../utils/mockData';

export const useDaos = () => {
  const [daos, setDaos] = useState<DAO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDaos = async () => {
      try {
        // In a real implementation, this would fetch from an API or blockchain
        // For now, we'll use mock data
        setDaos(mockDaos);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchDaos();
  }, []);

  return { daos, loading, error };
};

export const useFeaturedDaos = () => {
  const { daos, loading, error } = useDaos();
  
  // In a real implementation, this would have specific logic for featured DAOs
  // For now, we'll just return the first 4 DAOs
  const featuredDaos = daos.slice(0, 4);
  
  return { featuredDaos, loading, error };
};