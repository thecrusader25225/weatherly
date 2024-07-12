import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet's CSS is imported
import { click } from "@testing-library/user-event/dist/click";

export default function LeafletMap({ position, zoom }) {
  const [mapCenter, setMapCenter] = useState([20, 88]);
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMapCenter([lat, lng]);
      },
    });
  }
  useEffect(() => console.log(mapCenter), [mapCenter]);
  return (
    <div className="w-11/12 h-screen m-2">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        <GetCenter />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            {console.log(position)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
function GetCenter() {
  const map = useMap();
  console.log("map center: ", map.getCenter());
}
