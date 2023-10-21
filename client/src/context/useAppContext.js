import { useContext } from 'react';
import { AppContext } from './appContext';

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within a StateProvider');

  return context;
};

export { useAppContext };
