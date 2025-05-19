import React, { useState } from 'react';
import styles from './CompletionFooter.module.css';

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

const CompletionFooter = () => {
  const [saves, setSaves] = useState(DEFAULT_SAVES);
  const [activeSaveIndex, setActiveSaveIndex] = useState(0);
  const currentSave = saves[activeSaveIndex];

  const completion = (() => {
    if (!currentSave || !currentSave.figurines) return 0;
    const total = currentSave.figurines.length || 1;
    const obtained = currentSave.figurines.filter(f => f.obtained).length;
    return Math.round((obtained / total) * 100);
  })();

  const handleSaveChange = (e) => setActiveSaveIndex(Number(e.target.value));
  const handleVersionChange = (e) => {
    const updated = [...saves];
    updated[activeSaveIndex].version = e.target.value;
    setSaves(updated);
  };
  const handleQuestChange = (e) => {
    const updated = [...saves];
    updated[activeSaveIndex].quest = e.target.value;
    setSaves(updated);
  };
  const handleAddSave = () => {
    setSaves([
      ...saves,
      {
        name: `Save ${saves.length + 1}`,
        version: 'GameCube',
        quest: 'Normal',
        progress: 0,
        figurines: [],
      },
    ]);
    setActiveSaveIndex(saves.length);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.pill} tabIndex={0}>
        <span className={styles.completionText}>
          Completion: <b>{completion}%</b>
        </span>
        <div className={styles.controls}>
          <div className={styles.saveGroup}>
            <select
              className={styles.dropdown}
              value={activeSaveIndex}
              onChange={handleSaveChange}
              aria-label="Select save"
            >
              {saves.map((save, idx) => (
                <option key={idx} value={idx}>{save.name}</option>
              ))}
            </select>
            <button className={styles.addSave} onClick={handleAddSave} title="Add new save">＋</button>
          </div>
          <select
            className={styles.dropdown}
            value={currentSave.version}
            onChange={handleVersionChange}
            aria-label="Select game version"
          >
            {GAME_VERSIONS.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <select
            className={styles.dropdown}
            value={currentSave.quest}
            onChange={handleQuestChange}
            aria-label="Select quest type"
          >
            {QUEST_TYPES.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CompletionFooter;