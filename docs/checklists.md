# Checklists Documentation

The Wind Waker Tracker includes several checklists to help players track their progress through various collectibles and objectives.

## Charts Checklist

### Treasure Charts
- 41 Treasure Charts to find throughout the game
- Each chart leads to sunken treasure
- Checklist tracks which charts have been found and which treasures have been collected

### Triforce Charts
- 8 Triforce Charts to find
- Tracks which charts have been found and deciphered

### Other Charts
- Ghost Ship Chart
- IN-credible Chart
- Platform Chart
- Submarine Chart
- Light Ring Chart
- Great Fairy Chart

## Upgrades Checklist

Tracks progression of upgradeable items:
- Wallet (1000 → 5000 → 9999 Rupees)
- Bomb Bag (30 → 60 → 99 Bombs)
- Quiver (30 → 60 → 99 Arrows)
- Magic Meter (1 → 2 bars)
- Hurricane Spin
- Hero's Charm

## Zunari Shop Souvenirs

Tracks items traded in the shop:
- Town Flower → Sea Flower → Exotic Flower
- Town Flower → Sea Flower → Pinwheel
- Decorative Plate → Pinwheel → Sickle Moon Flag
- Fountain Idol → Postman Statue → Mushroom Idol
- And other trading sequences

## Implementation Details

Each checklist is implemented as a React component with:
- Visual indicators for completion status
- Progress tracking (X/Y items collected)
- Local storage for persistence between sessions
- Optional backend sync for cross-device usage