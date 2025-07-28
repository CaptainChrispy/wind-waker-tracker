# Inventory System Documentation

The Inventory System allows players to track all items, equipment, and collectibles from The Legend of Zelda: The Wind Waker HD and GameCube versions with comprehensive version support and interactive features.

## Features

### Version Support
- **GameCube Original**: Complete item tracking for the original release
- **Wii U HD**: Includes HD-exclusive items like Swift Sail and Tingle Bottle
- **Automatic Filtering**: Content adapts based on selected save file version

### Item Categories

#### Quest Items
Essential story progression items:
- Wind Waker - Control wind direction for sailing
- Hero's Charm - Shows enemy health bars
- Power Bracelets - Lift heavy objects
- Magic Armor - Uses magic power to prevent damage
- Iron Boots - Resist strong winds
- Magic Meter - Enables magical item usage
- Various bags (Bait, Delivery, HD-exclusive Tingle Bottle)
- HD-exclusive Swift Sail for faster sailing

#### Equipment
Combat and exploration tools:
- Telescope - See distant objects
- Grappling Hook - Swing across gaps
- Master Sword with upgrade progression (3 levels)
- Shield system (Hero's Shield → Mirror Shield)
- Empty Bottles (4 total) - Store potions and items
- Bow and magical arrows (Fire, Ice, Light)

#### Upgrades
Expandable inventory items with multiple levels:
- **Quiver**: 30 → 60 → 99 arrows
- **Bomb Bag**: 30 → 60 → 99 bombs  
- **Wallet**: 200 → 1,000 → 5,000 rupees

#### Songs
Wind Waker melodies for various abilities:
- Wind's Requiem - Change wind direction
- Ballad of Gales - Warp between islands
- Command Melody - Control sage companions
- Earth God's Lyric & Wind God's Aria - Temple access
- Song of Passing - Change day/night cycle

#### Charts
Navigation and treasure hunting:
- Treasure Charts (numbered, version-specific locations)
- Special Charts for key locations
- **Map Integration**: "View on Map" button links to Sea Chart view

#### Goddess Pearls
The three sacred pearls needed for story progression:
- Din's Pearl, Farore's Pearl, Nayru's Pearl

#### Triforce Shards
Interactive visual representation:
- All 8 Triforce Shard positions displayed as puzzle pieces
- Real-time collection status with grayscale overlay
- Visual assembly matching in-game Triforce of Courage

## User Interface

### Smart Item Management
- **Checkbox System**: Click checkboxes to mark items as collected
- **Upgrade Progression**: Visual level indicators for upgradable items
- **Interactive Details**: Click any item to view description and location hints
- **Version-Aware Content**: Different item numbers/locations based on game version

### Item Details Panel
When selecting an item, displays:
- Item name and description
- Collection status and upgrade level
- Location hints that change based on current upgrade level
- Upgrade controls for multi-level items
- Map integration for chart items

### Progress Tracking
- **Completion Percentage**: Real-time calculation of collected vs total items
- **Visual Progress Bar**: Header shows overall completion status
- **Category Tabs**: Quick navigation between item types

## Implementation Details

### Data Structure
- Items organized by category with unique identifiers
- Version-specific fields for GameCube vs HD differences
- Upgrade paths defined with level progression and requirements
- Location hints that adapt based on current item state

### Integration Points
- **Save System**: Links with SavesContext for version detection
- **Map Integration**: Chart items connect to Sea Chart view
- **Local Storage**: Automatic persistence of all inventory state
- **Routing**: Supports deep linking via `?select=ITEM_ID` query parameters