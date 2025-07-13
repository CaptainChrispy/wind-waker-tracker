# Map Screen Documentation

The Map Screen is the central navigation feature of the Wind Waker Tracker, displaying an interactive map of the Great Sea with comprehensive tracking capabilities.

## Features

- **7x7 grid system** matching the in-game sea chart (A1-G7)
- **Quest-aware markers**: Different chest locations for Normal vs Second Quest
- **Interactive markers**: Sea chart chests, light chests, and custom user markers
- **Treasure chart visualization**: Lines and circles showing chart-to-treasure relationships
- **Responsive sidebar**: Layer controls and marker management tools

## Map Assets

Custom map tiles extracted using [wind-waker-map-extractor](https://github.com/CaptainChrispy/wind-waker-map-extractor), providing high-quality imagery at multiple zoom levels from Wind Waker HD screenshots.

## Implementation

### Map Component
Uses `react-leaflet` with a pixel-based coordinate system and dynamic tile loading based on zoom level:

- **Coordinate System**: Uses pixel coordinates instead of lat/lng for precise positioning
- **Dynamic Tiles**: Renders different map layers based on current zoom level
- **Custom Icons**: Marker sizes scale automatically with zoom level
- **Quest Integration**: Automatically displays chest locations based on save file

### Marker Types
- **Sea Chart Chests**: Quest-specific treasure locations with inventory integration
- **Light Chests**: Additional collectible markers
- **Custom Markers**: User-placeable with drag-to-edit functionality
- **Treasure Chart Lines**: Visual connections between where to find a chart and its treasure

## Controls

### Sidebar Features
- **Map Markers**: Place, clear, export/import custom markers
- **Map Layers**: Toggle visibility for different marker types
- **Responsive Design**: Desktop sidebar or mobile top drawer

### Layer Toggles
- Sea Chart Chests
- Light Chests  
- Island Names
- Treasure Chart Lines
- Treasure Chart Circles

## Data Management
- **Local Storage**: Custom markers and preferences persist across sessions
- **Save Integration**: Automatically switches chest locations based on quest type
- **Export/Import**: JSON-based marker data for backup and sharing