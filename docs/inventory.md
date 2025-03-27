# Inventory System Documentation

The inventory system allows players to track all items, equipment, and collectibles from The Legend of Zelda: The Wind Waker.

## Complete Inventory Tracking

### Equipment
- Hero's Sword → Master Sword (Half Power) → Master Sword (Full Power)
- Hero's Shield → Mirror Shield
- Power Bracelets
- Iron Boots
- Magic Armor
- Grappling Hook
- Boomerang
- Deku Leaf
- Bombs
- Skull Hammer
- Bow & Arrow
- Fire & Ice Arrows
- Light Arrows
- Hookshot
- Bait Bag, Spoils Bag, Delivery Bag
- Wind Waker

### Quest Items
- Din's Pearl, Farore's Pearl, Nayru's Pearl
- Wind and Earth God's Lyric
- Triforce Shards (8)
- Dragon Roost Cavern Key, Forbidden Woods Key, etc.
- Ghost Ship Chart
- Cabana Deed
- Hurricane Spin
- Magic Meter Upgrade

## Pictograph/Figurine Checklist

Track progress in the Nintendo Gallery:
- List of all 134 figurines
- Required pictograph targets
- Special/missable pictographs (Knuckle, Puppet Ganon, etc.)
- Sorting by location or figurine number

## Sliding Puzzle Helper

An interactive tool to help with the Sliding Puzzle on Private Oasis:
- Visual representation of the puzzle
- Optional solver that suggests moves
- Tracks completion across save files

## Implementation Details

The inventory system uses:
- React state management to track collected items
- Visual indicators showing upgrade paths
- Icons matching in-game appearances
- Category filtering
- Local storage for persistence
- Backend API endpoints for saving/loading progress