import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapComponent({ latitude, longitude, zoom }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
}
