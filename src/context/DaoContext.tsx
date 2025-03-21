import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DAO } from '../types';

interface DaoContextType {
  currentDao: DAO | null;
  setCurrentDao: (dao: DAO | null) => void;
  followedDaos: string[];
  followDao: (daoId: string) => void;
  unfollowDao: (daoId: string) => void;
  daos: DAO[];
  addDao: (dao: DAO) => void;
}

const DaoContext = createContext<DaoContextType | undefined>(undefined);

export const DaoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDao, setCurrentDao] = useLocalStorage<DAO | null>('currentDao', null);
  const [followedDaos, setFollowedDaos] = useLocalStorage<string[]>('followedDaos', []);
  const [daos, setDaos] = useLocalStorage<DAO[]>('daos', []);

  const followDao = (daoId: string) => {
    if (!followedDaos.includes(daoId)) {
      setFollowedDaos([...followedDaos, daoId]);
    }
  };

  const unfollowDao = (daoId: string) => {
    setFollowedDaos(followedDaos.filter(id => id !== daoId));
  };

  const addDao = (dao: DAO) => {
    setDaos([...daos, dao]);
  };

  return (
    <DaoContext.Provider
      value={{
        currentDao,
        setCurrentDao,
        followedDaos,
        followDao,
        unfollowDao,
        daos,
        addDao,
      }}
    >
      {children}
    </DaoContext.Provider>
  );
};

export const useDao = (): DaoContextType => {
  const context = useContext(DaoContext);
  if (context === undefined) {
    throw new Error('useDao must be used within a DaoProvider');
  }
  return context;
};