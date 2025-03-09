import { useState, useEffect } from 'react';
import { DAO } from '../types';
import { mockDaos } from '../utils/mockData';
import { DaosService } from '../services/DaosService';
import { DAO as ApiDAO } from '../core/modules/dao-api';

// Initialize the DAOs service
const daosService = new DaosService();

// Function to adapt API DAO type to our application DAO type
const adaptApiDaoToAppDao = (apiDao: ApiDAO): DAO => {
  // If daoId is available, use it, otherwise generate a random 9-digit number
  let id = '';
  
  if (apiDao.daoId !== undefined && apiDao.daoId !== null) {
    id = apiDao.daoId.toString();
  } else {
    // Generate a random 9-digit number for the ID
    id = Math.floor(Math.random() * 900000000 + 100000000).toString();
  }
  
  return {
    id: id,
    name: apiDao.name,
    description: apiDao.description,
    logo: undefined, // API doesn't provide this
    members: apiDao.members?.length || 0,
    proposals: 0, // API doesn't provide this yet
    treasury: [] // API doesn't provide this yet
  };
};

// Get BWEN DAO from mock data
const getBwenDao = (): DAO | undefined => {
  return mockDaos.find(dao => dao.name === 'BWEN DAO');
};

export const useDaos = () => {
  const [daos, setDaos] = useState<DAO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDaos = async () => {
      try {
        // Try to fetch DAOs from the API
        try {
          const apiDaos = await daosService.getAllDaos();
          if (apiDaos && apiDaos.length > 0) {
            // Convert API DAOs to application DAOs
            const adaptedDaos = apiDaos.map(adaptApiDaoToAppDao);
            
            // Check if BWEN DAO exists in the API response
            const bwenDaoExists = adaptedDaos.some(dao => 
              dao.name === 'BWEN DAO'
            );
            
            // If BWEN DAO doesn't exist in API response, add it from mock data
            if (!bwenDaoExists) {
              const bwenDao = getBwenDao();
              if (bwenDao) {
                adaptedDaos.unshift(bwenDao);
              }
            }
            
            setDaos(adaptedDaos);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.warn('Failed to fetch DAOs from API, falling back to mock data:', apiError);
        }

        // Fallback to mock data if API fails or returns empty
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

// Hook to get only featured DAOs
export const useFeaturedDaos = () => {
  const { daos, loading, error } = useDaos();
  
  // BWEN DAO is always featured
  const featuredDaos = daos.filter(dao => 
    dao.name === 'BWEN DAO' || dao.name.toLowerCase().includes('featured')
  );
  
  return { daos: featuredDaos, loading, error };
};