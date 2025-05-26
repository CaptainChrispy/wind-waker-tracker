const ITEM_CATEGORIES = {
  QUEST_ITEMS: 'Quest Items',
  EQUIPMENT: 'Equipment',
  UPGRADES: 'Upgrades',
  SONGS: 'Songs',
  CHARTS: 'Charts',
  PEARLS: 'Goddess Pearls',
  TRIFORCE: 'Triforce Shards'
};

const QUEST_ITEMS = {
  WIND_WAKER: { 
    name: 'Wind Waker', 
    category: ITEM_CATEGORIES.QUEST_ITEMS, 
    description: "Magical baton that lets you control the wind's direction", 
    imageUrl: '/assets/items/wind_waker.png',
    locationHint: "Obtained in Dragon Roost Cavern after meeting the dragon" 
  },
  HEROS_CHARM: { 
    name: "Hero's Charm", 
    category: ITEM_CATEGORIES.QUEST_ITEMS, 
    description: "Shows enemy health when worn", 
    imageUrl: '/assets/items/heros_charm.png',
    locationHint: "Complete the savage labyrinth on Outset Island" 
  },
  POWER_BRACELETS: { 
    name: "Power Bracelets", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Allows Link to lift heavy objects", 
    imageUrl: '/assets/items/power_bracelets.png',
    locationHint: "Found in Fire Mountain after cooling the lava with Ice Arrows" 
  },
  MAGIC_ARMOR: { 
    name: "Magic Armor", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Protects Link from damage by using magic power", 
    imageUrl: '/assets/items/magic_armor.png',
    locationHint: "Zunari's trading quest reward in Windfall Island" 
  },
  IRON_BOOTS: { 
    name: "Iron Boots", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Heavy boots that prevent Link from being blown away by strong winds", 
    imageUrl: '/assets/items/iron_boots.png',
    locationHint: "Found in Ice Ring Isle after melting the ice with Fire Arrows" 
  },
  MAGIC_METER: { 
    name: "Magic Meter", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Enables the use of magic for items like the Deku Leaf", 
    imageUrl: '/assets/items/magic_meter.png',
    locationHint: "Given by the Great Fairy on Northern Fairy Island" 
  },
  BAIT_BAG: { 
    name: "Bait Bag", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Stores bait for fish and Forest Fireflies", 
    imageUrl: '/assets/items/bait_bag.png',
    locationHint: "Purchase from Beedle's Shop Ship for 20 rupees" 
  },
  DELIVERY_BAG: { 
    name: "Delivery Bag", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Holds letters and packages for delivery", 
    imageUrl: '/assets/items/delivery_bag.png',
    locationHint: "Given by the Rito chieftain on Dragon Roost Island" 
  },
  TINGLE_BOTTLE: { 
    name: "Tingle Bottle", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Used to send and receive messages", 
    imageUrl: '/assets/items/tingle_bottle.png',
    locationHint: "Received on Windfall Island after freeing Tingle",
    version: 'HD'
  },
  SWIFT_SAIL: { 
    name: "Swift Sail", 
    category: ITEM_CATEGORIES.QUEST_ITEMS,
    description: "Sail that moves faster and automatically changes wind direction", 
    imageUrl: '/assets/items/swift_sail.png',
    locationHint: "Win the auction on Windfall Island",
    version: 'HD'
  },
};

const EQUIPMENT = {
  TELESCOPE: { 
    name: "Telescope", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Used to see distant objects", 
    imageUrl: '/assets/items/telescope.png',
    locationHint: "Given by Aryll at the beginning of the game" 
  },
  GRAPPLING_HOOK: { 
    name: "Grappling Hook", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Used to swing across gaps and steal items from enemies", 
    imageUrl: '/assets/items/grappling_hook.png',
    locationHint: "Found in Dragon Roost Cavern dungeon" 
  },
  BOOMERANG: { 
    name: "Boomerang", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Can hit multiple targets at once", 
    imageUrl: '/assets/items/boomerang.png',
    locationHint: "Found in the Forbidden Woods dungeon" 
  },
  DEKU_LEAF: { 
    name: "Deku Leaf", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Uses magic to glide or create gusts of wind", 
    imageUrl: '/assets/items/deku_leaf.png',
    locationHint: "Found inside the Great Deku Tree on Forest Haven" 
  },
  HOOKSHOT: { 
    name: "Hookshot", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Latches onto targets to pull Link across gaps", 
    imageUrl: '/assets/items/hookshot.png',
    locationHint: "Found in the Wind Temple dungeon" 
  },
  SKULL_HAMMER: { 
    name: "Skull Hammer", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Heavy hammer that can pound down posts", 
    imageUrl: '/assets/items/skull_hammer.png',
    locationHint: "Found in the Forsaken Fortress (second visit)" 
  },
  MASTER_SWORD: { 
    name: "Master Sword", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "The legendary blade of evil's bane", 
    imageUrl: '/assets/items/master_sword.png',
    locationHint: "Found at the bottom of Hyrule Castle after collecting all three Goddess Pearls",
    upgrades: [
      { level: 1, name: "Master Sword (Unpowered)", imageUrl: '/assets/items/master_sword.png' },
      { level: 2, name: "Master Sword (Half Power)", imageUrl: '/assets/items/master_sword_half.png', locationHint: "Awaken the Earth and Wind Sages" },
      { level: 3, name: "Master Sword (Full Power)", imageUrl: '/assets/items/master_sword_full.png', locationHint: "Complete prayers at Earth and Wind Temples" }
    ],
    maxLevel: 3
  },
  SHIELD: { 
    name: "Shield", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Protects Link from enemy attacks", 
    imageUrl: '/assets/items/heros_shield.png',
    locationHint: "Start with Hero's Shield from Outset Island",
    upgrades: [
      { level: 1, name: "Hero's Shield", imageUrl: '/assets/items/heros_shield.png', locationHint: "Given to you on Outset Island at the start of your journey" },
      { level: 2, name: "Mirror Shield", imageUrl: '/assets/items/mirror_shield.png', locationHint: "Found in Earth Temple" }
    ],
    maxLevel: 2
  },
  // Bottles
  BOTTLE1: { 
    name: "Empty Bottle", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Can store potions and other items", 
    imageUrl: '/assets/items/bottle.png',
    locationHint: "Trade with Medli on Dragon Roost Island" 
  },
  BOTTLE2: { 
    name: "Empty Bottle", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Can store potions and other items", 
    imageUrl: '/assets/items/bottle.png',
    locationHint: "Complete Korok ritual on Forest Haven" 
  },
  BOTTLE3: { 
    name: "Empty Bottle", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Can store potions and other items", 
    imageUrl: '/assets/items/bottle.png',
    locationHint: "Complete a side quest in Windfall Island" 
  },
  BOTTLE4: { 
    name: "Empty Bottle", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Can store potions and other items", 
    imageUrl: '/assets/items/bottle.png',
    locationHint: "Catch and deliver a letter in a bottle between two lovers" 
  },
  HEROES_BOW: { 
    name: "Hero's Bow", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Fires arrows at enemies and targets", 
    imageUrl: '/assets/items/bow.png',
    locationHint: "Found in the Tower of the Gods dungeon" 
  },
  FIRE_ARROWS: { 
    name: "Fire Arrows", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Magical arrows that can light torches and melt ice", 
    imageUrl: '/assets/items/fire_arrows.png',
    locationHint: "From the Queen of Fairies on Mother & Child Isles" 
  },
  ICE_ARROWS: { 
    name: "Ice Arrows", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Magical arrows that can freeze enemies and create ice platforms", 
    imageUrl: '/assets/items/ice_arrows.png',
    locationHint: "From the Queen of Fairies on Mother & Child Isles" 
  },
  LIGHT_ARROWS: { 
    name: "Light Arrows", 
    category: ITEM_CATEGORIES.EQUIPMENT, 
    description: "Sacred arrows that can defeat evil and activate certain mechanisms", 
    imageUrl: '/assets/items/light_arrows.png',
    locationHint: "From Zelda in Ganon's Tower" 
  },
};

const UPGRADES = {
  QUIVER: { 
    name: "Quiver", 
    category: ITEM_CATEGORIES.UPGRADES, 
    description: "Holds your arrows", 
    imageUrl: '/assets/items/bow.png',
    locationHint: "Start with basic quiver when you get the bow",
    upgrades: [
      { level: 1, name: "Quiver", maxArrows: 30, imageUrl: '/assets/items/bow.png' },
      { level: 2, name: "Larger Quiver", maxArrows: 60, imageUrl: '/assets/items/larger_quiver.png', locationHint: "From the fairy on Thorned Fairy Island" },
      { level: 3, name: "Largest Quiver", maxArrows: 99, imageUrl: '/assets/items/largest_quiver.png', locationHint: "From the fairy on Eastern Fairy Island" }
    ],
    maxLevel: 3
  },
  BOMB_BAG: { 
    name: "Bomb Bag", 
    category: ITEM_CATEGORIES.UPGRADES, 
    description: "Holds your bombs", 
    imageUrl: '/assets/items/bombs.png',
    locationHint: "Start with basic bomb bag when you get bombs",
    upgrades: [
      { level: 1, name: "Bomb Bag", maxBombs: 30, imageUrl: '/assets/items/bombs.png' },
      { level: 2, name: "Larger Bomb Bag", maxBombs: 60, imageUrl: '/assets/items/larger_bomb_bag.png', locationHint: "From the fairy on Southern Fairy Island" },
      { level: 3, name: "Largest Bomb Bag", maxBombs: 99, imageUrl: '/assets/items/largest_bomb_bag.png', locationHint: "From the fairy on Northern Fairy Island" }
    ],
    maxLevel: 3
  },
  WALLET: { 
    name: "Wallet", 
    category: ITEM_CATEGORIES.UPGRADES, 
    description: "Holds your rupees", 
    imageUrl: '/assets/items/wallet.png',
    locationHint: "Start with basic wallet that holds 200 rupees",
    upgrades: [
      { level: 1, name: "Wallet", maxRupees: 200, imageUrl: '/assets/items/wallet.png' },
      { level: 2, name: "Larger Wallet", maxRupees: 1000, imageUrl: '/assets/items/larger_wallet.png', locationHint: "Collect 30 Skull Necklaces and trade with Maggie's father" },
      { level: 3, name: "Giant Wallet", maxRupees: 5000, imageUrl: '/assets/items/largest_wallet.png', locationHint: "Collect 40 Joy Pendants and give to Mrs. Marie at school" }
    ],
    maxLevel: 3
  }
};

const SONGS = {
  WINDS_REQUIEM: { 
    name: "Wind's Requiem", 
    category: ITEM_CATEGORIES.SONGS, 
    description: "Changes the direction of the wind", 
    imageUrl: '/assets/items/song_note.png',
    locationHint: "Learned from Zephos on Dragon Roost Island" 
  },
  BALLAD_OF_GALES: { 
    name: "Ballad of Gales", 
    category: ITEM_CATEGORIES.SONGS, 
    description: "Creates a cyclone to warp to different islands", 
    imageUrl: '/assets/items/song_note.png',
    locationHint: "Learned from Cyclos after shooting him with arrows" 
  },
  COMMAND_MELODY: { 
    name: "Command Melody", 
    category: ITEM_CATEGORIES.SONGS, 
    description: "Allows control of companions like Medli and Makar", 
    imageUrl: '/assets/items/song_note.png',
    locationHint: "Found in both the Earth and Wind Temples" 
  },
  EARTH_GODS_LYRIC: { 
    name: "Earth God's Lyric", 
    category: ITEM_CATEGORIES.SONGS, 
    description: "Awakens the Earth Sage and opens the Earth Temple", 
    imageUrl: '/assets/items/song_note.png',
    locationHint: "Learned from Laruto in Earth Temple" 
  },
  WIND_GODS_ARIA: { 
    name: "Wind God's Aria", 
    category: ITEM_CATEGORIES.SONGS, 
    description: "Awakens the Wind Sage and opens the Wind Temple", 
    imageUrl: '/assets/items/song_note.png',
    locationHint: "Learned from Fado in Wind Temple" 
  },
  SONG_OF_PASSING: { 
    name: "Song of Passing", 
    category: ITEM_CATEGORIES.SONGS, 
    description: "Changes day to night and vice versa", 
    imageUrl: '/assets/items/song_note.png',
    locationHint: "Learned from the old man beneath the huge tree on Windfall Island" 
  },
};

const PEARLS = {
  PEARL_NAYRU: { 
    name: "Nayru's Pearl", 
    category: ITEM_CATEGORIES.PEARLS, 
    description: "Pearl of the Goddess of Wisdom", 
    imageUrl: '/assets/items/nayrus_pearl.png',
    locationHint: "Given by Jabun near Outset Island" 
  },
  PEARL_FARORE: { 
    name: "Farore's Pearl", 
    category: ITEM_CATEGORIES.PEARLS, 
    description: "Pearl of the Goddess of Courage", 
    imageUrl: '/assets/items/farores_pearl.png',
    locationHint: "Given by the Great Deku Tree after completing Forbidden Woods" 
  },
  PEARL_DIN: { 
    name: "Din's Pearl", 
    category: ITEM_CATEGORIES.PEARLS, 
    description: "Pearl of the Goddess of Power", 
    imageUrl: '/assets/items/dins_pearl.png',
    locationHint: "Given by Valoo after completing Dragon Roost Cavern" 
  },
};

const TRIFORCE = {
  TRIFORCE_SHARD_1: {
    name: "Triforce Shard 1",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Greatfish Isle after deciphering Triforce Chart 1.",
      HD: "Found at Greatfish Isle after using Triforce Chart 1.",
    },
    positions: {
      GameCube: 1,
      HD: 1,
    },
    imageUrl: '/assets/items/triforce_shard_1.png',
    locationHints: {
      GameCube: "Greatfish Isle (decipher chart)",
      HD: "Greatfish Isle (use chart)",
    },
  },
  TRIFORCE_SHARD_2: {
    name: "Triforce Shard 2",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Gale Isle after deciphering Triforce Chart 2.",
      HD: "Found at Private Oasis directly (no chart).",
    },
    positions: {
      GameCube: 2,
      HD: 2,
    },
    imageUrl: '/assets/items/triforce_shard_2.png',
    locationHints: {
      GameCube: "Gale Isle (decipher chart)",
      HD: "Private Oasis (direct)",
    },
  },
  TRIFORCE_SHARD_3: {
    name: "Triforce Shard 3",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Stone Watcher Island after deciphering Triforce Chart 3.",
      HD: "Found at Stone Watcher Island after using Triforce Chart 2.",
    },
    positions: {
      GameCube: 3,
      HD: 3,
    },
    imageUrl: '/assets/items/triforce_shard_3.png',
    locationHints: {
      GameCube: "Stone Watcher Island (decipher chart)",
      HD: "Stone Watcher Island (use chart 2)",
    },
  },
  TRIFORCE_SHARD_4: {
    name: "Triforce Shard 4",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Outset Island after deciphering Triforce Chart 4.",
      HD: "Found on Ghost Ship directly (no chart).",
    },
    positions: {
      GameCube: 4,
      HD: 4,
    },
    imageUrl: '/assets/items/triforce_shard_4.png',
    locationHints: {
      GameCube: "Outset Island (decipher chart)",
      HD: "Ghost Ship (direct)",
    },
  },
  TRIFORCE_SHARD_5: {
    name: "Triforce Shard 5",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Cliff Plateau Isles after deciphering Triforce Chart 5.",
      HD: "Found at Cliff Plateau Isles after using Triforce Chart 3.",
    },
    positions: {
      GameCube: 5,
      HD: 5,
    },
    imageUrl: '/assets/items/triforce_shard_5.png',
    locationHints: {
      GameCube: "Cliff Plateau Isles (decipher chart)",
      HD: "Cliff Plateau Isles (use chart 3)",
    },
  },
  TRIFORCE_SHARD_6: {
    name: "Triforce Shard 6",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Southern Triangle Island after deciphering Triforce Chart 6.",
      HD: "Found at Outset Island directly (no chart).",
    },
    positions: {
      GameCube: 6,
      HD: 6,
    },
    imageUrl: '/assets/items/triforce_shard_6.png',
    locationHints: {
      GameCube: "Southern Triangle Island (decipher chart)",
      HD: "Outset Island (direct)",
    },
  },
  TRIFORCE_SHARD_7: {
    name: "Triforce Shard 7",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Seven-Star Isles after deciphering Triforce Chart 7.",
      HD: "Found at Stone Watcher Island directly (no chart).",
    },
    positions: {
      GameCube: 7,
      HD: 7,
    },
    imageUrl: '/assets/items/triforce_shard_7.png',
    locationHints: {
      GameCube: "Seven-Star Isles (decipher chart)",
      HD: "Stone Watcher Island (direct)",
    },
  },
  TRIFORCE_SHARD_8: {
    name: "Triforce Shard 8",
    category: ITEM_CATEGORIES.TRIFORCE,
    descriptions: {
      GameCube: "Found at Two-Eye Reef after deciphering Triforce Chart 8.",
      HD: "Found at Overlook Island directly (no chart).",
    },
    positions: {
      GameCube: 8,
      HD: 8,
    },
    imageUrl: '/assets/items/triforce_shard_8.png',
    locationHints: {
      GameCube: "Two-Eye Reef (decipher chart)",
      HD: "Overlook Island (direct)",
    },
  },
};

const CHARTS = {
  // Basic Charts
  GHOST_SHIP_CHART: { 
    name: "Ghost Ship Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Reveals the path of the Ghost Ship", 
    imageUrl: '/assets/items/ghost_chart.png',
    locationHint: "Diamond Steppe Island, beneath a rock that requires bombs" 
  },
  TINGLE_CHART: { 
    name: "Tingle's Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of Tingle Island and Tingle Statues", 
    imageUrl: '/assets/items/tingle_chart.png',
    locationHint: "Purchased from Tingle on Tingle Island" 
  },
  IN_CREDIBLE_CHART: { 
    name: "IN-credible Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of Hyrule's Legendary Pictographs", 
    imageUrl: '/assets/items/tingle_chart.png',
    locationHint: "Purchased from Tingle on Tingle Island" 
  },
  OCTO_CHART: { 
    name: "Octo Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of Big Octos in the Great Sea", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "Purchase from Tingle on Tingle Island" 
  },
  GREAT_FAIRY_CHART: { 
    name: "Great Fairy Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of Great Fairy Islands", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "The Windfall Island auction house" 
  },
  ISLAND_HEARTS_CHART: { 
    name: "Island Hearts Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the number of Heart Pieces on each island", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "Minigame reward on Windfall Island" 
  },
  SEA_HEART_CHART: { 
    name: "Sea Hearts Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "" 
  },
  SECRET_CAVE_CHART: { 
    name: "Secret Cave Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of secret caves on various islands", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "From Rock Spire Isle after completing tasks" 
  },
  LIGHT_RING_CHART: { 
    name: "Light Ring Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of light rings found in the ocean", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "Purchase from Tingle on Tingle Island" 
  },
  PLATFORM_CHART: { 
    name: "Platform Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of submarine platforms", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "From a chest on Forsaken Fortress" 
  },
  BEEDLES_CHART: { 
    name: "Beedle's Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the sailing path of Beedle's Shop Ship", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "Purchase from Beedle's Shop Ship" 
  },
  SUBMARINE_CHART: { 
    name: "Submarine Chart", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of submarines", 
    imageUrl: '/assets/items/special_chart.png',
    locationHint: "In a chest on Cliff Plateau Isles" 
  },
  
  // Triforce Charts
  TRIFORCE_CHART_1: {
    name: "Triforce Chart 1",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Islet of Steel, leads to Greatfish Isle shard.",
      HD: "Chart found on Islet of Steel, leads to Greatfish Isle shard.",
    },
    numbers: {
      GameCube: 1,
      HD: 1,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Islet of Steel (Chart) → Greatfish Isle (Shard)",
      HD: "Islet of Steel (Chart) → Greatfish Isle (Shard)",
    },
  },
  TRIFORCE_CHART_2: {
    name: "Triforce Chart 2",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Private Oasis, leads to Gale Isle shard.",
      HD: "Not present in HD; shard is found directly on Private Oasis.",
    },
    numbers: {
      GameCube: 2,
      HD: null,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Private Oasis (Chart) → Gale Isle (Shard)",
      HD: "Private Oasis (Shard only)",
    },
  },
  TRIFORCE_CHART_3: {
    name: "Triforce Chart 3",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Bird's Peak Rock, leads to Stone Watcher Island shard.",
      HD: "Chart found on Bird's Peak Rock, leads to Stone Watcher Island shard.",
    },
    numbers: {
      GameCube: 3,
      HD: 2,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Bird's Peak Rock (Chart) → Stone Watcher Island (Shard)",
      HD: "Bird's Peak Rock (Chart) → Stone Watcher Island (Shard)",
    },
  },
  TRIFORCE_CHART_4: {
    name: "Triforce Chart 4",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Ghost Ship, leads to Outset Island shard.",
      HD: "Not present in HD; shard is found directly on Ghost Ship.",
    },
    numbers: {
      GameCube: 4,
      HD: null,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Ghost Ship (Chart) → Outset Island (Shard)",
      HD: "Ghost Ship (Shard only)",
    },
  },
  TRIFORCE_CHART_5: {
    name: "Triforce Chart 5",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Needle Rock Isle, leads to Cliff Plateau Isles shard.",
      HD: "Chart found on Needle Rock Isle, leads to Cliff Plateau Isles shard.",
    },
    numbers: {
      GameCube: 5,
      HD: 3,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Needle Rock Isle (Chart) → Cliff Plateau Isles (Shard)",
      HD: "Needle Rock Isle (Chart) → Cliff Plateau Isles (Shard)",
    },
  },
  TRIFORCE_CHART_6: {
    name: "Triforce Chart 6",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Outset Island, leads to Southern Triangle Island shard.",
      HD: "Not present in HD; shard is found directly on Outset Island.",
    },
    numbers: {
      GameCube: 6,
      HD: null,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Outset Island (Chart) → Southern Triangle Island (Shard)",
      HD: "Outset Island (Shard only)",
    },
  },
  TRIFORCE_CHART_7: {
    name: "Triforce Chart 7",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Stone Watcher Island, leads to Seven-Star Isles shard.",
      HD: "Not present in HD; shard is found directly on Stone Watcher Island.",
    },
    numbers: {
      GameCube: 7,
      HD: null,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Stone Watcher Island (Chart) → Seven-Star Isles (Shard)",
      HD: "Stone Watcher Island (Shard only)",
    },
  },
  TRIFORCE_CHART_8: {
    name: "Triforce Chart 8",
    category: ITEM_CATEGORIES.CHARTS,
    descriptions: {
      GameCube: "Chart found on Overlook Island, leads to Two-Eye Reef shard.",
      HD: "Not present in HD; shard is found directly on Overlook Island.",
    },
    numbers: {
      GameCube: 8,
      HD: null,
    },
    imageUrl: '/assets/items/triforce_chart.png',
    locationHints: {
      GameCube: "Overlook Island (Chart) → Two-Eye Reef (Shard)",
      HD: "Overlook Island (Shard only)",
    },
  },

  // Treasure Charts
  TREASURE_CHART_1: { 
    name: "Treasure Chart 1", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 1,
    locationHint: "Found in a chest on Windfall Island" 
  },
  TREASURE_CHART_2: { 
    name: "Treasure Chart 2", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 2,
    locationHint: "In a submarine near Two-Eye Reef" 
  },
  TREASURE_CHART_3: { 
    name: "Treasure Chart 3", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 3,
    locationHint: "Reward from Salvage Corp minigame" 
  },
  TREASURE_CHART_4: { 
    name: "Treasure Chart 4", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 4,
    locationHint: "Chest in the Forbidden Woods" 
  },
  TREASURE_CHART_5: { 
    name: "Treasure Chart 5", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 5,
    locationHint: "Reward for Orca's strike challenge" 
  },
  TREASURE_CHART_6: { 
    name: "Treasure Chart 6", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 6,
    locationHint: "Rock Spire Isle - In a submarine" 
  },
  TREASURE_CHART_7: { 
    name: "Treasure Chart 7", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 7,
    locationHint: "Needle Rock Isle - Inside a cave" 
  },
  TREASURE_CHART_8: { 
    name: "Treasure Chart 8", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 8,
    locationHint: "Flight Control Platform - In the room behind a bombable wall" 
  },
  TREASURE_CHART_9: { 
    name: "Treasure Chart 9", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 9,
    locationHint: "Bird's Peak Rock - After completing the bird statue puzzle" 
  },
  TREASURE_CHART_10: { 
    name: "Treasure Chart 10", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 10,
    locationHint: "Pawprint Isle - Inside the cave on the larger island" 
  },
  TREASURE_CHART_11: { 
    name: "Treasure Chart 11", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 11,
    locationHint: "Pawprint Isle - Inside a secret cave on the smaller island" 
  },
  TREASURE_CHART_12: { 
    name: "Treasure Chart 12", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 12,
    locationHint: "Diamond Steppe Island - Behind a bombable wall" 
  },
  TREASURE_CHART_13: { 
    name: "Treasure Chart 13", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 13,
    locationHint: "Bomb Island - In the Secret Cave" 
  },
  TREASURE_CHART_14: { 
    name: "Treasure Chart 14", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 14,
    locationHint: "Rock Spire Isle - In a chest on top" 
  },
  TREASURE_CHART_15: { 
    name: "Treasure Chart 15", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 15,
    locationHint: "Tingles Island - From finding all 5 Tingle Statues" 
  },
  TREASURE_CHART_16: { 
    name: "Treasure Chart 16", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 16,
    locationHint: "Spectacle Island - In a chest after defeating the enemies" 
  },
  TREASURE_CHART_17: { 
    name: "Treasure Chart 17", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 17,
    locationHint: "Windfall Island - From Tott after learning Song of Passing" 
  },
  TREASURE_CHART_18: { 
    name: "Treasure Chart 18", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 18,
    locationHint: "Five-Star Isles - In a chest after defeating all enemies" 
  },
  TREASURE_CHART_19: { 
    name: "Treasure Chart 19", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 19,
    locationHint: "Cliff Plateau Isles - Inside the Secret Cave" 
  },
  TREASURE_CHART_20: { 
    name: "Treasure Chart 20", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 20,
    locationHint: "Horseshoe Island - Inside the maze after solving the puzzle" 
  },
  TREASURE_CHART_21: { 
    name: "Treasure Chart 21", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 21,
    locationHint: "Star Island - Inside the ice ring after melting it" 
  },
  TREASURE_CHART_22: { 
    name: "Treasure Chart 22", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 22,
    locationHint: "Two-Eye Reef - From the submarine" 
  },
  TREASURE_CHART_23: { 
    name: "Treasure Chart 23", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 23,
    locationHint: "Angular Isles - In a chest on the top of the island" 
  },
  TREASURE_CHART_24: { 
    name: "Treasure Chart 24", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 24,
    locationHint: "Boating Course - In a chest after completing the course" 
  },
  TREASURE_CHART_25: { 
    name: "Treasure Chart 25", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 25,
    locationHint: "Stone Watcher Island - Inside the secret cave" 
  },
  TREASURE_CHART_26: { 
    name: "Treasure Chart 26", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 26,
    locationHint: "Outset Island - In a chest on one of the small islands" 
  },
  TREASURE_CHART_27: { 
    name: "Treasure Chart 27", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 27,
    locationHint: "Mother & Child Isles - After getting Fire and Ice Arrows" 
  },
  TREASURE_CHART_28: { 
    name: "Treasure Chart 28", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 28,
    locationHint: "Spectacle Island - After defeating the enemies" 
  },
  TREASURE_CHART_29: { 
    name: "Treasure Chart 29", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 29,
    locationHint: "Windfall Island - Inside the school" 
  },
  TREASURE_CHART_30: { 
    name: "Treasure Chart 30", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 30,
    locationHint: "Three-Eye Reef - From a submarine nearby" 
  },
  
  // Treasure Charts (31-41)
  TREASURE_CHART_31: { 
    name: "Treasure Chart 31", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 31,
    locationHint: "Greatfish Isle - Underneath some rubble" 
  },
  TREASURE_CHART_32: { 
    name: "Treasure Chart 32", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 32,
    locationHint: "Ice Ring Isle - In a chest after melting the ice" 
  },
  TREASURE_CHART_33: { 
    name: "Treasure Chart 33", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 33,
    locationHint: "Forest Haven - In a chest on a small island nearby" 
  },
  TREASURE_CHART_34: { 
    name: "Treasure Chart 34", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 34,
    locationHint: "Cliff Plateau Isles - In a chest after completing a puzzle" 
  },
  TREASURE_CHART_35: { 
    name: "Treasure Chart 35", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 35,
    locationHint: "Horseshoe Island - Hidden in grass after completing the maze" 
  },
  TREASURE_CHART_36: { 
    name: "Treasure Chart 36", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 36,
    locationHint: "Diamond Steppe Island - After defeating the enemies inside" 
  },
  TREASURE_CHART_37: { 
    name: "Treasure Chart 37", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 37,
    locationHint: "Needle Rock Isle - In a chest hidden behind a bombable wall" 
  },
  TREASURE_CHART_38: { 
    name: "Treasure Chart 38", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 38,
    locationHint: "Northern Fairy Island - After helping the Great Fairy" 
  },
  TREASURE_CHART_39: { 
    name: "Treasure Chart 39", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 39,
    locationHint: "Crescent Moon Island - In a chest guarded by enemies" 
  },
  TREASURE_CHART_40: { 
    name: "Treasure Chart 40", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 40,
    locationHint: "Southern Fairy Island - After helping the Great Fairy" 
  },
  TREASURE_CHART_41: { 
    name: "Treasure Chart 41", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 41,
    locationHint: "Six-Eye Reef - From a nearby submarine" 
  },
  TREASURE_CHART_42: { 
    name: "Treasure Chart 42", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure (HD only)", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 42,
    locationHint: "HD exclusive chart location",
    version: 'HD'
  },
  TREASURE_CHART_43: { 
    name: "Treasure Chart 43", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure (HD only)", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 43,
    locationHint: "HD exclusive chart location",
    version: 'HD'
  },
  TREASURE_CHART_44: { 
    name: "Treasure Chart 44", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure (HD only)", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 44,
    locationHint: "HD exclusive chart location",
    version: 'HD'
  },
  TREASURE_CHART_45: { 
    name: "Treasure Chart 45", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure (HD only)", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 45,
    locationHint: "HD exclusive chart location",
    version: 'HD'
  },
  TREASURE_CHART_46: { 
    name: "Treasure Chart 46", 
    category: ITEM_CATEGORIES.CHARTS, 
    description: "Shows the location of a sunken treasure (HD only)", 
    imageUrl: '/assets/items/treasure_chart.png', 
    number: 46,
    locationHint: "HD exclusive chart location",
    version: 'HD'
  },
};

const ITEMS = {
  ...QUEST_ITEMS,
  ...EQUIPMENT,
  ...UPGRADES,
  ...SONGS,
  ...PEARLS,
  ...TRIFORCE,
  ...CHARTS,
};

export { ITEMS, ITEM_CATEGORIES };