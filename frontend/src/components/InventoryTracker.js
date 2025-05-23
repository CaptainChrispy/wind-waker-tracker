import React, { useState, useEffect } from 'react';
import styles from './InventoryTracker.module.css';
import { ITEM_CATEGORIES, ITEMS } from '../assets/data/itemsData';

const InventoryTracker = () => {
  const [inventory, setInventory] = useState({});
  const [activeCategory, setActiveCategory] = useState(ITEM_CATEGORIES.QUEST_ITEMS);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

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
    const totalItems = Object.keys(ITEMS)
      .filter(itemId => !itemId.includes('UPGRADE')) // Don't count the old upgrade items? (probably no)
      .length;
    const obtainedItems = Object.keys(inventory).length;
    return Math.floor((obtainedItems / totalItems) * 100);
  };

  const renderCategory = (category) => {
    const categoryItems = Object.entries(ITEMS)
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
            
            // Use placeholder if there was a previous error loading this image
            if (imageErrors[itemId]) {
              displayImageUrl = '/assets/items/placeholder.png';
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
                  />                  {item.upgrades && (
                    <div className={styles.itemLevel}>
                      {Array.from({ length: item.maxLevel }).map((_, idx) => (
                        <span key={idx} className={hasItem && idx <= itemLevel ? styles.filled : styles.unfilled}></span>
                      ))}
                    </div>
                  )}
                </div>
                <span className={styles.itemName}>
                  {item.upgrades && hasItem ? item.upgrades[itemLevel].name : item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTriforceChart = () => {
    const pieces = Array.from({ length: 8 }).map((_, idx) => {
      const key = `TRIFORCE_SHARD_${idx + 1}`;
      return inventory[key] !== undefined;
    });
    
    return (
      <div className={styles.triforceContainer}>
        <h3>Triforce of Courage</h3>
        <div className={styles.triforceChart}>
          <div className={styles.triforceTop}>{pieces[0] && '▲'}</div>
          <div className={styles.triforceMiddle}>
            {pieces[1] && '▲'}{pieces[2] && '▲'}{pieces[3] && '▲'}
          </div>
          <div className={styles.triforceBottom}>
            {pieces[4] && '▲'}{pieces[5] && '▲'}{pieces[6] && '▲'}{pieces[7] && '▲'}
          </div>
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