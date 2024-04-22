import React, { useEffect, useState } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

export default function MapComponent({
  latitude,
  longitude,
  zoom,
  // polygonCoords,
}) {
  const [mapKey, setMapKey] = useState(0); // State to force map refresh

  // Use useEffect to refresh the map when latitude or longitude changes
  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1); // Increment key to force re-render
  }, [latitude, longitude]);

  return (
    <MapContainer
      key={mapKey}
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <FeatureGroup></FeatureGroup>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
}
