import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import defaultTile from '../assets/images/map/default.png';
import { detailAreas } from '../assets/data/mapAreas';
import { useSaves } from '../context/SavesContext';
import { firstQuestSeaCharts } from '../assets/data/mapMarkers/firstQuestSeaCharts';
import { secondQuestSeaCharts } from '../assets/data/mapMarkers/secondQuestSeaCharts';
import { lightChests } from '../assets/data/mapMarkers/lightChests';
import treasureMarkerIcon from '../assets/images/map/treasure_marker.png';
import lightChestMarkerIcon from '../assets/images/map/light_chest_marker.png';
import { useLocation } from 'react-router-dom';

const ZoomListener = ({ onZoomChange }) => {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    },
  });
  return null;
};

const customIcon = new L.Icon({
  iconUrl: 'https://api.iconify.design/material-symbols:edit-location-alt.svg',
  iconSize: [32, 32],    
  iconAnchor: [16, 32],  
  popupAnchor: [0, -32], 
});
const seaChartIconSmall = new L.Icon({
  iconUrl: treasureMarkerIcon,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});
const seaChartIconLarge = new L.Icon({
  iconUrl: treasureMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});
const lightChestIconSmall = new L.DivIcon({
  html: `<div style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;"><img src='${lightChestMarkerIcon}' style='width:16px;height:16px;display:block;'/></div>` ,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
  className: ''
});
const lightChestIconLarge = new L.DivIcon({
  html: `<div style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;"><img src='${lightChestMarkerIcon}' style='width:28px;height:28px;display:block;'/></div>` ,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
  className: ''
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick({ y: Math.round(lat), x: Math.round(lng) });
    },
  });
  return null;
};

const Map = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const columns = [1, 2, 3, 4, 5, 6, 7];
  const tileSize = 309;
  const ZOOM_LEVELS = {
    BASE: -1,     
    MEDIUM: 2,   
    DETAILED: 3, 
  };

  const [tileImages, setTileImages] = useState({});
  const [detailImages, setDetailImages] = useState({});
  const [currentZoom, setCurrentZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPlacingMarker, setIsPlacingMarker] = useState(false);
  const [markers, setMarkers] = useState(() => {
    const saved = localStorage.getItem('mapMarkers');
    return saved ? JSON.parse(saved) : [];
  });
  const { currentSave } = useSaves();
  const markerRefs = useRef({});
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('mapMarkers', JSON.stringify(markers));
  }, [markers]);

  useEffect(() => {
    const loadAllImages = async () => {
      // Load base map tiles
      const images = {};
      const details = {};
      
      // Load base tiles
      for (const row of rows) {
        for (const col of columns) {
          const key = `${row}${col}`;
          try {
            const image = await import(`../assets/images/map/base-zoom/${key}.png`);
            images[key] = image.default;
          } catch (err) {
            console.error(`Failed to load base tile ${key}:`, err);
          }
        }
      }
      
      // Load detail images for zoom levels
      for (const area of detailAreas) {
        try {
          // Load medium zoom image
          const mediumImage = await import(`../assets/images/map/medium-zoom/${area.imagePrefix}.png`);
          details[`${area.id}-medium`] = mediumImage.default;
          
          // Load detailed zoom image
          const detailedImage = await import(`../assets/images/map/detailed-zoom/${area.imagePrefix}.png`);
          details[`${area.id}-detailed`] = detailedImage.default;
        } catch (err) {
          console.error(`Failed to load detail images for ${area.id}:`, err);
        }
      }
      
      setTileImages(images);
      setDetailImages(details);
      setLoading(false);
    };

    loadAllImages();
  }, []);

  const getDetailBounds = (area) => {
    // Find the grid square position
    const rowIndex = rows.indexOf(area.baseSquare[0]);
    const colIndex = parseInt(area.baseSquare[1]) - 1;
    
    // Calculate the absolute position on the map
    const top = (rows.length - rowIndex) * tileSize - area.position.y;
    const left = colIndex * tileSize + area.position.x;
    const bottom = top - area.size.height;
    const right = left + area.size.width;
    
    // Return bounds as [[top-left], [bottom-right]]
    return [[top, left], [bottom, right]];
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  const handleMapClick = (coords) => {
    if (!isPlacingMarker) return;

    // Get grid square info
    const col = Math.floor(coords.x / tileSize) + 1;
    const rowIndex = Math.floor((rows.length * tileSize - coords.y) / tileSize);
    const gridSquare = `${rows[rowIndex]}${col}`;

    // Calculate relative position within the grid square
    const relativeX = Math.round(coords.x % tileSize);
    const relativeY = Math.round(tileSize - (coords.y % tileSize));

    const markerData = {
      id: Date.now(),
      position: coords,
      gridSquare,
      relativePosition: { x: relativeX, y: relativeY }
    };

    setMarkers([...markers, markerData]);
    setIsPlacingMarker(false);
  };

  const removeMarker = (markerId) => {
    setMarkers(markers.filter(marker => marker.id !== markerId));
  };

  const exportMarkers = () => {
    const dataStr = JSON.stringify(markers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'markers.json');
    linkElement.click();
  };

  const importMarkers = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedMarkers = JSON.parse(e.target.result);
      setMarkers(importedMarkers);
    };
    reader.readAsText(file);
  };

  const updateMarkerPosition = (markerId, newPos) => {
    setMarkers(markers.map(marker => {
      if (marker.id === markerId) {
        // Calculate new grid square and relative position
        const col = Math.floor(newPos.x / tileSize) + 1;
        const rowIndex = Math.floor((rows.length * tileSize - newPos.y) / tileSize);
        const gridSquare = `${rows[rowIndex]}${col}`;
        
        // Calculate new relative position within the grid square
        const relativeX = Math.round(newPos.x % tileSize);
        const relativeY = Math.round(tileSize - (newPos.y % tileSize));

        return {
          ...marker,
          position: newPos,
          gridSquare,
          relativePosition: { x: relativeX, y: relativeY }
        };
      }
      return marker;
    }));
  };

  // This is some dumb, temp code just to prove the concept
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedChart = params.get('chart');
    if (selectedChart) {
      setTimeout(() => {
        const questType = currentSave?.quest || 'Normal';
        const seaChartMarkers = questType === 'Second Quest' ? secondQuestSeaCharts : firstQuestSeaCharts;
        const a1Marker = seaChartMarkers.find(m => m.gridSquare === 'A1');
        if (a1Marker && markerRefs.current[a1Marker.id]) {
          markerRefs.current[a1Marker.id].openPopup();
          const map = markerRefs.current[a1Marker.id]._map;
          if (map) {
            map.setView([a1Marker.position.y, a1Marker.position.x], 3, { animate: true });
          }
        }
      }, 500);
    }
  }, [location.search, currentSave]);

  if (loading) {
    return <div>Loading map tiles...</div>;
  }

  // Determine which quest chests to show
  const questType = currentSave?.quest || 'Normal';
  const seaChartMarkers = questType === 'Second Quest' ? secondQuestSeaCharts : firstQuestSeaCharts;

  const seaChartIcon = currentZoom >= ZOOM_LEVELS.DETAILED ? seaChartIconLarge : seaChartIconSmall;
  const lightChestIcon = currentZoom >= ZOOM_LEVELS.MEDIUM ? lightChestIconLarge : lightChestIconSmall;

  return (
    <div className="map-container">
      {/* Add marker placement controls */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000, display: 'flex', gap: '10px' }}>
        <button onClick={() => setIsPlacingMarker(!isPlacingMarker)}>
          {isPlacingMarker ? 'Cancel Placement' : 'Place Marker'}
        </button>
        <button onClick={() => setMarkers([])}>Clear All Markers</button>
        <button onClick={exportMarkers}>Export Markers</button>
        <input
          type="file"
          accept=".json"
          onChange={importMarkers}
          style={{ display: 'none' }}
          id="import-markers"
        />
        <button onClick={() => document.getElementById('import-markers').click()}>
          Import Markers
        </button>
      </div>

      {/* Add cursor style when placing marker */}
      <MapContainer 
        center={[ 
          (rows.length * tileSize) / 2,
          (columns.length * tileSize) / 2
        ]} 
        zoom={-1} 
        style={{  height: "100vh", width: "100%" }}
        minZoom={-1}
        maxZoom={4}
        crs={L.CRS.Simple}
      >
        <ZoomListener onZoomChange={handleZoomChange} />
        
        {/* Base map tiles - only show at lowest zoom */}
        {currentZoom < ZOOM_LEVELS.MEDIUM && rows.map((row, rowIndex) => (
          columns.map((col, colIndex) => {
            const key = `${row}${col}`;
            return tileImages[key] ? (
              <ImageOverlay
                key={key}
                bounds={[
                  [(rows.length - rowIndex) * tileSize, colIndex * tileSize],
                  [(rows.length - rowIndex - 1) * tileSize, (colIndex + 1) * tileSize]
                ]}
                url={tileImages[key]}
              />
            ) : null;
          })
        ))}
        
        {/* Default background tiles for medium and detailed zoom */}
        {currentZoom >= ZOOM_LEVELS.MEDIUM && rows.map((row, rowIndex) => (
          columns.map((col, colIndex) => {
            const key = `${row}${col}`;
            return (
              <ImageOverlay
                key={`default-${key}`}
                bounds={[
                  [(rows.length - rowIndex) * tileSize, colIndex * tileSize],
                  [(rows.length - rowIndex - 1) * tileSize, (colIndex + 1) * tileSize]
                ]}
                url={defaultTile}
              />
            );
          })
        ))}
        
        {/* Medium detail overlays */}
        {currentZoom >= ZOOM_LEVELS.MEDIUM && currentZoom < ZOOM_LEVELS.DETAILED && 
          detailAreas.map(area => {
            const imageKey = `${area.id}-medium`;
            return detailImages[imageKey] ? (
              <ImageOverlay
                key={imageKey}
                bounds={getDetailBounds(area, 'medium')}
                url={detailImages[imageKey]}
              />
            ) : null;
          })
        }
        
        {/* Detailed overlays */}
        {currentZoom >= ZOOM_LEVELS.DETAILED && 
          detailAreas.map(area => {
            const imageKey = `${area.id}-detailed`;
            return detailImages[imageKey] ? (
              <ImageOverlay
                key={imageKey}
                bounds={getDetailBounds(area, 'detailed')}
                url={detailImages[imageKey]}
              />
            ) : null;
          })
        }

        {/* Sea Chart Chests */}
        {seaChartMarkers.map(marker => (
          <Marker
            key={`sea-chart-${marker.id}`}
            position={[marker.position.y, marker.position.x]}
            icon={seaChartIcon}
            interactive={true}
            ref={el => markerRefs.current[marker.id] = el}
          >
            <Popup>
              <div>
                <p><strong>Sea Chart Chest</strong></p>
                <p><strong>Grid Square:</strong> {marker.gridSquare}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* Light Chests */}
        {lightChests.map(marker => (
          <Marker
            key={`light-chest-${marker.id}`}
            position={[marker.position.y, marker.position.x]}
            icon={lightChestIcon}
            interactive={true}
          >
            <Popup>
              <div>
                <p><strong>Light Chest</strong></p>
                <p><strong>Grid Square:</strong> {marker.gridSquare}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapClickHandler onMapClick={handleMapClick} />
        {markers.map(marker => (
          <Marker 
            key={marker.id} 
            position={[marker.position.y, marker.position.x]}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const newPos = e.target.getLatLng();
                updateMarkerPosition(marker.id, { y: Math.round(newPos.lat), x: Math.round(newPos.lng) });
              }
            }}
          >
            <Popup>
              <div>
                <p><strong>Grid Square:</strong> {marker.gridSquare}</p>
                <p><strong>Position:</strong></p>
                <pre style={{ background: '#f5f5f5', padding: '8px' }}>
{`{
  id: '${marker.gridSquare}',
  baseSquare: '${marker.gridSquare}',
  position: { 
    x: ${marker.relativePosition.x}, 
    y: ${marker.relativePosition.y} 
  },
  size: { width: 69, height: 69 },
  imagePrefix: '${marker.gridSquare}',
  resolutions: {
    medium: { width: 69, height: 69 },
    detailed: { width: 680, height: 680 }
  }
}`}
                </pre>
                <button onClick={() => removeMarker(marker.id)}>Remove Marker</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;