import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import { useRadioPlayer } from '~/hooks/use-radio-player';

const MediaContext = createContext<{
  play: () => Promise<void>;
  pause: () => Promise<void>;
  isPlaying: boolean;
  isLoading: boolean;
  isReady: boolean;
  statusMessage: string | null;
} | null>(null);

export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const player = useRadioPlayer();

  return <MediaContext.Provider value={player}>{children}</MediaContext.Provider>;
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia deve ser usado dentro de um MediaProvider');
  }
  return context;
};
