import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, ImageOverlay, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import defaultTile from '../assets/images/map/default.png';
import { detailAreas } from '../assets/data/mapAreas';

const ZoomListener = ({ onZoomChange }) => {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    },
  });
  return null;
};

const Map = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const columns = [1, 2, 3, 4, 5, 6, 7];
  const tileSize = 309;
  const [tileImages, setTileImages] = useState({});
  const [detailImages, setDetailImages] = useState({});
  const [currentZoom, setCurrentZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const ZOOM_LEVELS = {
    BASE: -1,     
    MEDIUM: 2,   
    DETAILED: 3, 
  };

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

  const getDetailBounds = useCallback((area) => {
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
  }, [rows, tileSize]);

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  if (loading) {
    return <div>Loading map tiles...</div>;
  }

  return (
    <MapContainer 
      center={[
        (rows.length * tileSize) / 2,
        (columns.length * tileSize) / 2
      ]} 
      zoom={-1} 
      style={{ height: "100vh", width: "100%" }}
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
    </MapContainer>
  );
};

export default Map;