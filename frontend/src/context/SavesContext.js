import React, { createContext, useContext, useState } from 'react';

const GAME_VERSIONS = ['GameCube', 'HD'];
const QUEST_TYPES = ['Normal', 'Second Quest'];

const DEFAULT_SAVES = [
  {
    name: 'Save 1',
    version: 'GameCube',
    quest: 'Normal',
    progress: 0,
    figurines: [],
  },
];

const SavesContext = createContext();

export const SavesProvider = ({ children }) => {
  const [saves, setSaves] = useState(DEFAULT_SAVES);
  const [activeSaveIndex, setActiveSaveIndex] = useState(0);
  const currentSave = saves[activeSaveIndex];

  return (
    <SavesContext.Provider value={{
      saves,
      setSaves,
      activeSaveIndex,
      setActiveSaveIndex,
      currentSave,
      GAME_VERSIONS,
      QUEST_TYPES,
    }}>
      {children}
    </SavesContext.Provider>
  );
};

export const useSaves = () => useContext(SavesContext);
