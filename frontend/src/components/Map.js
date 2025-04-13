import React from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Yes, this will be dynamic, just throwing this together for now...
import A1 from '../assets/images/map/base-zoom/A1.png';
import A2 from '../assets/images/map/base-zoom/A2.png';
import A3 from '../assets/images/map/base-zoom/A3.png';
import A4 from '../assets/images/map/base-zoom/A4.png';
import A5 from '../assets/images/map/base-zoom/A5.png';
import A6 from '../assets/images/map/base-zoom/A6.png';
import A7 from '../assets/images/map/base-zoom/A7.png';
import B1 from '../assets/images/map/base-zoom/B1.png';
import B2 from '../assets/images/map/base-zoom/B2.png';
import B3 from '../assets/images/map/base-zoom/B3.png';
import B4 from '../assets/images/map/base-zoom/B4.png';
import B5 from '../assets/images/map/base-zoom/B5.png';
import B6 from '../assets/images/map/base-zoom/B6.png';
import B7 from '../assets/images/map/base-zoom/B7.png';
import C1 from '../assets/images/map/base-zoom/C1.png';
import C2 from '../assets/images/map/base-zoom/C2.png';
import C3 from '../assets/images/map/base-zoom/C3.png';
import C4 from '../assets/images/map/base-zoom/C4.png';
import C5 from '../assets/images/map/base-zoom/C5.png';
import C6 from '../assets/images/map/base-zoom/C6.png';
import C7 from '../assets/images/map/base-zoom/C7.png';
import D1 from '../assets/images/map/base-zoom/D1.png';
import D2 from '../assets/images/map/base-zoom/D2.png';
import D3 from '../assets/images/map/base-zoom/D3.png';
import D4 from '../assets/images/map/base-zoom/D4.png';
import D5 from '../assets/images/map/base-zoom/D5.png';
import D6 from '../assets/images/map/base-zoom/D6.png';
import D7 from '../assets/images/map/base-zoom/D7.png';
import E1 from '../assets/images/map/base-zoom/E1.png';
import E2 from '../assets/images/map/base-zoom/E2.png';
import E3 from '../assets/images/map/base-zoom/E3.png';
import E4 from '../assets/images/map/base-zoom/E4.png';
import E5 from '../assets/images/map/base-zoom/E5.png';
import E6 from '../assets/images/map/base-zoom/E6.png';
import E7 from '../assets/images/map/base-zoom/E7.png';
import F1 from '../assets/images/map/base-zoom/F1.png';
import F2 from '../assets/images/map/base-zoom/F2.png';
import F3 from '../assets/images/map/base-zoom/F3.png';
import F4 from '../assets/images/map/base-zoom/F4.png';
import F5 from '../assets/images/map/base-zoom/F5.png';
import F6 from '../assets/images/map/base-zoom/F6.png';
import F7 from '../assets/images/map/base-zoom/F7.png';
import G1 from '../assets/images/map/base-zoom/G1.png';
import G2 from '../assets/images/map/base-zoom/G2.png';
import G3 from '../assets/images/map/base-zoom/G3.png';
import G4 from '../assets/images/map/base-zoom/G4.png';
import G5 from '../assets/images/map/base-zoom/G5.png';
import G6 from '../assets/images/map/base-zoom/G6.png';
import G7 from '../assets/images/map/base-zoom/G7.png';

const tileImages = {
  'A1': A1, 'A2': A2, 'A3': A3, 'A4': A4, 'A5': A5, 'A6': A6, 'A7': A7,
  'B1': B1, 'B2': B2, 'B3': B3, 'B4': B4, 'B5': B5, 'B6': B6, 'B7': B7,
  'C1': C1, 'C2': C2, 'C3': C3, 'C4': C4, 'C5': C5, 'C6': C6, 'C7': C7,
  'D1': D1, 'D2': D2, 'D3': D3, 'D4': D4, 'D5': D5, 'D6': D6, 'D7': D7,
  'E1': E1, 'E2': E2, 'E3': E3, 'E4': E4, 'E5': E5, 'E6': E6, 'E7': E7,
  'F1': F1, 'F2': F2, 'F3': F3, 'F4': F4, 'F5': F5, 'F6': F6, 'F7': F7,
  'G1': G1, 'G2': G2, 'G3': G3, 'G4': G4, 'G5': G5, 'G6': G6, 'G7': G7
};

const Map = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const columns = [1, 2, 3, 4, 5, 6, 7];
  const tileSize = 309;

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
        columns.map((col, colIndex) => (
          <ImageOverlay
            key={`${row}${col}`}
            bounds={[
              [(rows.length - rowIndex) * tileSize, colIndex * tileSize],
              [(rows.length - rowIndex - 1) * tileSize, (colIndex + 1) * tileSize]
            ]}
            url={tileImages[`${row}${col}`]}
          />
        ))
      ))}
    </MapContainer>
  );
};

export default Map;