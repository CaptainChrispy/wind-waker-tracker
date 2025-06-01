import React from 'react';
import styles from './TingleTuner.module.css';
import { useSaves } from '../context/SavesContext';

// Assuming you have image assets for statues and Tingle
// import TingleArtworkGC from '../assets/tingle-gc.png';
// import TingleArtworkHD from '../assets/tingle-hd.png';

const TINGLE_TUNER_ITEMS_GC = [
  { name: 'Tingle Tuner', description: 'Connect a Game Boy Advance (GBA) via a GBA Link Cable to Controller Port 2 of your GameCube. This unlocks a real-time second screen for additional features and interactions.', cost: 'N/A' },
  { name: 'Tingle Bomb', description: 'Use bombs via the Tingle Tuner. Tap the bomb icon on your GBA screen. Particularly useful for finding Tingle Statues. Each bomb detonates immediately on Link\'s position.', cost: '1 Rupee' },
  { name: 'Tingle Balloon', description: 'Summon a Tingle Balloon that allows Link to float upwards for a short period. Useful for reaching high ledges or crossing gaps.', cost: '5 Rupees' },
  { name: 'Tingle Shield', description: 'Creates a temporary shield around Link, protecting him from one instance of damage. Tap the shield icon on your GBA screen.', cost: '10 Rupees' },
  { name: 'Kooloo-Limpah', description: 'A random, often humorous, effect triggered by Tingle. Can restore some health, give rupees, or cause Link to stumble. Highly unpredictable!', cost: '10 Rupees' },
  { name: 'Tingle Hints', description: 'Ask Tingle for a hint about your current objective or puzzle. Knuckle will deliver the hint on your GBA screen.', cost: '20 Rupees' },
  { name: 'Tingle Maps', description: 'Reveal hidden secrets on your map, such as treasure chest locations, enemies, or specific points of interest. Specific maps can be purchased.', cost: '20 Rupees per map' },
];

const TINGLE_STATUES = [
  {
    name: 'Dragon Tingle Statue',
    location: 'Dragon Roost Cavern',
    hint: 'In the large room with the moving pot elevator, drop a bomb near the wall to the left of the entrance from the dungeon\'s second floor (before crossing the large gap to the boss door).',
    // imageUrl: '/path/to/dragon-statue-location.jpg'
  },
  {
    name: 'Forbidden Tingle Statue',
    location: 'Forbidden Woods',
    hint: 'In the room with the large spinning platforms and propeller plants, look for a bombable spot on the wall behind the giant flower that spits out Boko Babas.',
    // imageUrl: '/path/to/forbidden-statue-location.jpg'
  },
  {
    name: 'Goddess Tingle Statue',
    location: 'Tower of the Gods',
    hint: 'On the third floor, in the large room with multiple moving platforms and Beamos statues, there\'s a hidden spot on the wall near the entrance to the next room (where you typically push a block to reveal a path).',
    // imageUrl: '/path/to/goddess-statue-location.jpg'
  },
  {
    name: 'Earth Tingle Statue',
    location: 'Earth Temple',
    hint: 'In the dark room filled with coffins and Redeads, locate a bombable wall section, usually near the entrance from the central hub room.',
    // imageUrl: '/path/to/earth-statue-location.jpg'
  },
  {
    name: 'Wind Tingle Statue',
    location: 'Wind Temple',
    hint: 'In the room with the giant stone head (where you use the Hookshot to climb), look for a bombable wall section on the lower level, near the large fan.',
    // imageUrl: '/path/to/wind-statue-location.jpg'
  },
];

const TingleTuner = () => {
  const { saves, setSaves, activeSaveIndex, currentSave } = useSaves();
  const isHD = currentSave?.version === 'HD';
  const statuesFound = currentSave?.tingleStatues || Array(TINGLE_STATUES.length).fill(false);

  const handleToggleStatue = idx => {
    const updatedStatues = [...statuesFound];
    updatedStatues[idx] = !updatedStatues[idx];
    const updatedSaves = [...saves];
    updatedSaves[activeSaveIndex] = {
      ...currentSave,
      tingleStatues: updatedStatues,
    };
    setSaves(updatedSaves);
  };

  return (
    <>      <div className={styles['header-container']}>
        <header className={styles['figurine-header']}>
          <h1>Tingle Statues Guide</h1>
          <div className={styles['progress-bar']}>
            <div 
              className={styles['progress-fill']} 
              style={{width: `${(statuesFound.filter(Boolean).length / TINGLE_STATUES.length) * 100}%`}}
            ></div>
            <span className={styles['progress-text']}>
              {statuesFound.filter(Boolean).length} / {TINGLE_STATUES.length} Statues Found
            </span>
          </div>
        </header>
      </div>
      <div className={styles.tingleTunerWrapper}>
        <div className={styles.tunerContent}>
          <div className={styles.tingleStatuesChecklist}>
            <h2>Tingle Statues Checklist</h2>
            <p>Check off each statue as you find it:</p>
            <ul className={styles.statueChecklistList}>
              {TINGLE_STATUES.map((statue, idx) => (
                <li key={statue.name} className={styles.statueChecklistItem}>
                  <label className={styles.statueLabel}>
                    <input
                      type="checkbox"
                      checked={statuesFound[idx]}
                      onChange={() => handleToggleStatue(idx)}
                      className={styles.statueCheckbox}
                    />
                    <span className={styles.statueName}>{statue.name}</span>
                    <span className={styles.statueLocation}> ({statue.location})</span>
                  </label>
                  <div className={styles.statueHint}>{statue.hint}</div>
                </li>
              ))}
            </ul>
            <div className={styles.statueRewardMsg}>
              {statuesFound.every(Boolean)
                ? 'All statues found. Visit Tingle on Tingle Island for your reward and the Knuckle figurine.'
                : `You have found ${statuesFound.filter(Boolean).length} of 5 Tingle Statues.`}
            </div>
          </div>

          {isHD ? (
            <div className={styles.hdMessage}>
              <h2>HD Version</h2>
              <p>
                The Tingle Tuner is not in The Wind Waker HD, but you can still find the five Tingle Statues in dungeons. Use bombs to reveal them and bring all five to Tingle on Tingle Island for a big reward and the Knuckle figurine.
              </p>
            </div>
          ) : (
            <div className={styles.gcMessage}>
              <h2>GameCube Version</h2>
              <p>
                Use the Tingle Tuner and Tingle Bombs to find the five hidden Tingle Statues in dungeons. Bring all five to Tingle on Tingle Island for a big rupee reward and the Knuckle figurine.
              </p>
              <h3>Tingle Tuner Items</h3>
              <ul className={styles.tunerAbilitiesList}>
                {TINGLE_TUNER_ITEMS_GC.map(item => (
                  <li key={item.name} className={styles.tunerAbilityItem}>
                    <span className={styles.abilityName}>{item.name}:</span> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TingleTuner;