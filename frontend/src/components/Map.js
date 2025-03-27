import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[0, 0]}>
        <Popup>
            Wind Waker World!
            <input type="checkbox" onChange={() => alert('Checkbox checked!')} /> Check me!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;