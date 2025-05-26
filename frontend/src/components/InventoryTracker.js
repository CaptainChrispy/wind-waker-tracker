import React, { useState, useEffect } from 'react';
import styles from './InventoryTracker.module.css';
import { ITEM_CATEGORIES, ITEMS } from '../assets/data/itemsData';
import { useSaves } from '../context/SavesContext';

const InventoryTracker = () => {
  const [inventory, setInventory] = useState({});
  const [activeCategory, setActiveCategory] = useState(ITEM_CATEGORIES.QUEST_ITEMS);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const { currentSave } = useSaves();

  const gameVersion = currentSave?.version || 'GameCube';

  const getVersionedItems = () => {
    const items = JSON.parse(JSON.stringify(ITEMS));
    // Filter items by version property and by versioned fields
    return Object.fromEntries(
      Object.entries(items).filter(([_, item]) => {
        // Remove items that are not present in this version (for versioned fields)
        if (item.descriptions && !item.descriptions[gameVersion]) return false;
        if (item.numbers && !item.numbers[gameVersion]) return false;
        if (item.positions && !item.positions[gameVersion]) return false;
        if (item.locationHints && !item.locationHints[gameVersion]) return false;
        // Remove items with explicit version property that doesn't match
        if (item.version && item.version !== gameVersion) return false;
        return true;
      })
    );
  };
  const versionedItems = getVersionedItems();

  const getVersionedField = (item, field, fallbackField) => {
    if (item && item[field] && typeof item[field] === 'object') {
      return item[field][gameVersion] ?? '';
    }
    return item && item[fallbackField] ? item[fallbackField] : '';
  };

  useEffect(() => {
    const savedInventory = localStorage.getItem('windWakerInventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
    
    const savedCategory = localStorage.getItem('windWakerActiveCategory');
    if (savedCategory) {
      setActiveCategory(savedCategory);
    }
    
    const savedImageErrors = localStorage.getItem('windWakerImageErrors');
    if (savedImageErrors) {
      setImageErrors(JSON.parse(savedImageErrors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('windWakerInventory', JSON.stringify(inventory));
  }, [inventory]);
  
  useEffect(() => {
    localStorage.setItem('windWakerActiveCategory', activeCategory);
  }, [activeCategory]);
  
  useEffect(() => {
    localStorage.setItem('windWakerImageErrors', JSON.stringify(imageErrors));
  }, [imageErrors]);

  const handleImageError = (itemId) => {
    setImageErrors(prev => {
      const newErrors = {
        ...prev,
        [itemId]: true
      };
      localStorage.setItem('windWakerImageErrors', JSON.stringify(newErrors));
      return newErrors;
    });
  };

  const toggleItemCollected = (itemId, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    
    showItemDetails(itemId);
    
    setInventory(prev => {
      const item = ITEMS[itemId];
      let newInventory;
      
      if (item.upgrades) {
        const currentLevel = prev[itemId];

        if (currentLevel === undefined) {
          newInventory = {
            ...prev,
            [itemId]: 0
          };
        } else {
          const { [itemId]: _, ...rest } = prev;
          newInventory = rest;
        }
      } else {
        newInventory = {
          ...prev,
          [itemId]: !prev[itemId]
        };
        
        if (!newInventory[itemId]) {
          const { [itemId]: _, ...rest } = newInventory;
          newInventory = rest;
        }
      }
      
      localStorage.setItem('windWakerInventory', JSON.stringify(newInventory));
      
      setTimeout(() => {
        updateItemDetails(itemId, newInventory);
      }, 0);
      
      return newInventory;
    });
  };

  const upgradeItem = (itemId) => {
    setInventory(prev => {
      const item = ITEMS[itemId];
      let currentLevel = prev[itemId];
      let newInventory;
      
      if (currentLevel === undefined) {
        newInventory = {
          ...prev,
          [itemId]: 0
        };
      } else {
        const maxLevel = item.maxLevel - 1;
        
        if (currentLevel >= maxLevel) {
          newInventory = {
            ...prev,
            [itemId]: 0
          };
        } else {
          newInventory = {
            ...prev,
            [itemId]: currentLevel + 1
          };
        }
      }
      
      localStorage.setItem('windWakerInventory', JSON.stringify(newInventory));
      updateItemDetails(itemId, newInventory);
      
      return newInventory;
    });
  };

  const updateItemDetails = (itemId, currentInventory) => {
    if (!ITEMS[itemId]) return;
    const item = ITEMS[itemId];
    let details;

    // Handle versioned Triforce Shards/Charts
    const isVersioned = item.descriptions || item.numbers || item.positions || item.locationHints;

    if (item.upgrades) {
      const currentLevel = currentInventory[itemId];
      const isCollected = currentLevel !== undefined;
      
      if (!isCollected) {
        details = {
          name: item.name,
          description: item.description,
          locationHint: item.locationHint,
          isUpgradable: true,
          isCollected: false,
          baseLevel: item.upgrades[0],
          nextLevel: null,
          imageUrl: item.imageUrl
        };
      } else {        
        const upgradeInfo = item.upgrades[currentLevel];
        const isMaxLevel = currentLevel >= item.maxLevel - 1;
        const nextLevel = !isMaxLevel ? item.upgrades[currentLevel + 1] : item.upgrades[0];
        
        let locationHint;
        if (isMaxLevel) {
          locationHint = "You're at the maximum level. Click 'Reset to Level 1' to cycle back.";
        } else {
          locationHint = nextLevel.locationHint || "MissingNo";
        }
          details = {
          name: upgradeInfo.name,
          description: item.description,
          locationHint: locationHint,
          currentLevel: currentLevel + 1,
          maxLevel: item.maxLevel,
          isUpgradable: true,
          isCollected: true,
          isMaxLevel: isMaxLevel,
          nextLevel: nextLevel,
          imageUrl: upgradeInfo.imageUrl,
          additionalInfo: upgradeInfo.maxArrows ? `Holds up to ${upgradeInfo.maxArrows} arrows` : 
                         upgradeInfo.maxBombs ? `Holds up to ${upgradeInfo.maxBombs} bombs` :
                         upgradeInfo.maxRupees ? `Holds up to ${upgradeInfo.maxRupees} rupees` : ''
        };
      }
    } else if (isVersioned) {
      // For versioned Triforce Shards/Charts
      const isCollected = Boolean(currentInventory[itemId]);
      details = {
        name: item.name,
        description: getVersionedField(item, 'descriptions', 'description'),
        locationHint: getVersionedField(item, 'locationHints', 'locationHint'),
        isUpgradable: false,
        isCollected: isCollected,
        imageUrl: item.imageUrl,
        number: getVersionedField(item, 'numbers', 'number'),
        position: getVersionedField(item, 'positions', 'position'),
      };
    } else {
      // For regular items
      const isCollected = Boolean(currentInventory[itemId]);
      details = {
        name: item.name,
        description: item.description,
        locationHint: item.locationHint,
        isUpgradable: false,
        isCollected: isCollected,
        imageUrl: item.imageUrl
      };
    }
    
    setItemDetails(details);
  };

  const showItemDetails = (itemId) => {
    setSelectedItem(itemId);
    updateItemDetails(itemId, inventory);
    localStorage.setItem('windWakerSelectedItem', itemId);
  };

  const clearItemDetails = () => {
    setSelectedItem(null);
    setItemDetails(null);
    localStorage.removeItem('windWakerSelectedItem');
  };

  const getCompletionPercentage = () => {
    const totalItems = Object.keys(versionedItems)
      .filter(itemId => !itemId.includes('UPGRADE'))
      .length;
    const obtainedItems = Object.keys(inventory).length;
    return Math.floor((obtainedItems / totalItems) * 100);
  };

  const renderCategory = (category) => {
    const categoryItems = Object.entries(versionedItems)
      .filter(([_, item]) => item.category === category)
      // Filter out old upgrade items that were replaced
      .filter(([itemId, _]) => 
        !['QUIVER_UPGRADE_1', 'QUIVER_UPGRADE_2', 'BOMB_BAG_UPGRADE_1', 
          'BOMB_BAG_UPGRADE_2', 'WALLET_UPGRADE_1', 'WALLET_UPGRADE_2'].includes(itemId));
    
    return (
      <div key={category} className={styles.inventoryCategory}>
        <h3>{category}</h3>
        <div className={styles.itemsGrid}>
          {categoryItems.map(([itemId, item]) => {
            const hasItem = inventory[itemId] !== undefined;
            const itemLevel = item.upgrades ? (inventory[itemId] || 0) : 0;

            // Determine image URL based on item type and level
            let displayImageUrl = item.imageUrl;
            if (item.upgrades && hasItem && item.upgrades[itemLevel]) {
              displayImageUrl = item.upgrades[itemLevel].imageUrl;
            }
            if (imageErrors[itemId]) {
              displayImageUrl = '/assets/items/placeholder.png';
            }

            // For versioned Triforce Shards/Charts, dynamically change the name to include the number/position if present
            let displayName = item.name;
            if (item.descriptions || item.numbers || item.positions || item.locationHints) {
              const number = getVersionedField(item, 'numbers', 'number') || getVersionedField(item, 'positions', 'position');
              if (number && /\d+$/.test(item.name)) {
                // If the name already ends with a number, replace it
                displayName = item.name.replace(/\d+$/, String(number));
              } else if (number) {
                displayName = `${item.name.split('(')[0].trim()} ${number}`;
              }
            }

            return (
              <div 
                key={itemId}
                className={`${styles.inventoryItem} ${hasItem ? styles.obtained : ''} ${selectedItem === itemId ? styles.selected : ''}`}
                onClick={() => showItemDetails(itemId)}
              >
                <div className={styles.itemHeader}>
                  <input 
                    type="checkbox" 
                    className={styles.itemCheckbox}
                    checked={hasItem}
                    onChange={(e) => toggleItemCollected(itemId, e)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className={styles.itemImage}>
                  <img 
                    src={displayImageUrl} 
                    alt={item.name} 
                    className={!hasItem ? styles.grayscale : ''}
                    onError={() => handleImageError(itemId)}
                  />
                  {item.upgrades && (
                    <div className={styles.itemLevel}>
                      {Array.from({ length: item.maxLevel }).map((_, idx) => (
                        <span key={idx} className={hasItem && idx <= itemLevel ? styles.filled : styles.unfilled}></span>
                      ))}
                    </div>
                  )}
                </div>
                <span className={styles.itemName}>
                  {item.upgrades && hasItem ? item.upgrades[itemLevel].name : displayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTriforceChart = () => {
    const shardData = [
      { key: 'TRIFORCE_SHARD_8', x: 158, y: 0 },
      { key: 'TRIFORCE_SHARD_4', x: 235, y: 129 },
      { key: 'TRIFORCE_SHARD_5', x: 152, y: 136 },
      { key: 'TRIFORCE_SHARD_1', x: 85,  y: 75 },
      { key: 'TRIFORCE_SHARD_3', x: 75,  y: 200 },
      { key: 'TRIFORCE_SHARD_2', x: 0,   y: 259 },
      { key: 'TRIFORCE_SHARD_6', x: 171, y: 275 },
      { key: 'TRIFORCE_SHARD_7', x: 322, y: 261 },
    ];

    // Calculate container size (max x/y + 300)
    const maxX = Math.max(...shardData.map(s => s.x)) + 300;
    const maxY = Math.max(...shardData.map(s => s.y)) + 300;

    return (
      <div className={styles.triforceContainer}>
        <h3>Triforce of Courage</h3>
        <div
          className={styles.triforceChart}
          style={{ position: 'relative', width: maxX, height: maxY }}
        >
          {shardData.map(({ key, x, y }, idx) => {
            const collected = inventory[key] !== undefined;
            return (
              <img
                key={key + idx}
                src={`/assets/items/${key.toLowerCase()}.png`}
                alt={`Triforce Shard ${key.split('_').pop()}`}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 300,
                  height: 300,
                  pointerEvents: 'none',
                  zIndex: shardData.length - idx,
                  filter: collected ? 'none' : 'grayscale(100%) opacity(0.5)',
                  transition: 'filter 0.2s',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };
  
  const categoryTabs = Object.values(ITEM_CATEGORIES).map(category => (
    <button 
      key={category}
      className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
      onClick={() => setActiveCategory(category)}
    >
      {category}
    </button>  ));
  
  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.mainHeader}>Inventory Tracker</h1>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${getCompletionPercentage()}%` }}></div>
          <span className={styles.progressText}>{getCompletionPercentage()}% Complete</span>
        </div>
      </div>
      
      <div className={styles.inventoryTracker}>
        <div className={styles.mainContent}>
          <div className={styles.categoryTabs}>
            {categoryTabs}
          </div>
          <div className={styles.inventoryDisplay}>
            {activeCategory === ITEM_CATEGORIES.TRIFORCE && renderTriforceChart()}
            {renderCategory(activeCategory)}
          </div>

          <div className={styles.itemDetails}>
          {itemDetails ? (
            <div className={styles.detailBox}>
              <h3>{itemDetails.name}</h3>
              <p className={styles.detailDescription}>{itemDetails.description}</p>
              
              {itemDetails.additionalInfo && (
                <p className={styles.detailAdditional}>{itemDetails.additionalInfo}</p>
              )}
              
              {itemDetails.isUpgradable && (
                <div className={styles.upgradeInfo}>
                  {itemDetails.isCollected && (
                    <p>Level {itemDetails.currentLevel} of {itemDetails.maxLevel}</p>
                  )}                  <button 
                    className={styles.upgradeButton} 
                    onClick={() => upgradeItem(selectedItem)}
                    disabled={!itemDetails.isCollected}
                    title={!itemDetails.isCollected ? "Check the box above the item to collect it first" : ""}
                  >
                    {!itemDetails.isCollected ? 'Collect to Upgrade' : 
                      itemDetails.isMaxLevel ? 'Reset to Level 1' : 'Upgrade'}
                  </button>
                  {!itemDetails.isCollected && (
                    <span className={styles.disabledHint}>Check the box to collect first</span>
                  )}
                </div>
              )}              <h4>
                {!itemDetails.isCollected ? 'Where to find:' : 
                 (itemDetails.isUpgradable ? 
                   (itemDetails.isMaxLevel ? 'After reset to level 1:' : 'How to get next upgrade:') : 
                   'Where to find:')}
              </h4>
              <p className={itemDetails.isCollected && itemDetails.isUpgradable ? styles.upgradeHint : styles.locationHint}>
                {itemDetails.locationHint || "Unknown location"}
              </p>
            </div>
          ) : (
            <div className={styles.beginnerHelp}>
              <h4>Tips for New Players</h4>
              <ul>
                <li>Check the box above an item to mark it as collected</li>
                <li>Click on an item to see its description and location hints</li>
                <li>For upgradable items like quiver, use the upgrade button in the details panel</li>
                <li>Charts are essential for finding treasures and Triforce Shards</li>
                <li>Collect all three Goddess Pearls to unlock the Tower of the Gods</li>
              </ul>
            </div>          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryTracker;