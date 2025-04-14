import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const columns = [1, 2, 3, 4, 5, 6, 7];
  const tileSize = 309;
  const [tileImages, setTileImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTileImages = async () => {
      const images = {};
      
      for (const row of rows) {
        for (const col of columns) {
          const key = `${row}${col}`;
          try {
            const image = await import(`../assets/images/map/base-zoom/${key}.png`);
            images[key] = image.default;
          } catch (err) {
            console.error(`Failed to load tile ${key}:`, err);
          }
        }
      }
      
      setTileImages(images);
      setLoading(false);
    };

    loadTileImages();
  }, []);

  if (loading) {
    return <div>Loading map tiles...</div>;
  }

  return (
    <MapContainer 
      center={[0, 0]} 
      zoom={1} 
      style={{ height: "100vh", width: "100%" }}
      minZoom={0}
      maxZoom={4}
      crs={L.CRS.Simple}
    >
      {rows.map((row, rowIndex) => (
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
    </MapContainer>
  );
};

export default Map;