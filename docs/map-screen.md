# Map Screen Documentation

The Map Screen is the central navigation feature of the Wind Waker Tracker. It displays the Wind Waker world map with interactive markers for important locations.

## Features

- Interactive Leaflet-based map of the Great Sea
- Markers for all islands, caves, and points of interest
- Clickable chest locations that can be marked as collected
- Sector grid overlay matching the in-game sea chart

## Custom Map Assets

Some base map pieces and assets are extracted using a specialized tool developed specifically for this project ([wind-waker-map-extractor](https://github.com/CaptainChrispy/wind-waker-map-extractor)). It takes screenshots from The Legend of Zelda: Wind Waker HD to provide cropped data that we then upscale and fit onto the interactive map. For more information on how this works, please refer to its repository.

## Implementation Details

### Map Component

The map utilizes `react-leaflet` to render an interactive map:

```jsx
<MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
  <TileLayer url="path/to/wind-waker-map-tiles" />
  <Markers />
</MapContainer>
```

## Markers
Each marker represents an important location:
- Islands (49 total)
- Submarine locations
- Chest locations

## Chest Tracking
- Chests are displayed as treasure icons
- Clicking a chest icon and checking it off toggles its collected state
- Collected chests are visually distinct (e.g., grayed out)
- Chest data is stored locally via `localStorage` to persist across sessions, but may be synced with a backend in future versions.

## Filters
Users can filter the map to show only:
- Uncollected chests
- Specific types of locations (e.g., caves, fairy fountains)