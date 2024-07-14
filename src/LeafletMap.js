import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet's CSS is imported
import { click } from "@testing-library/user-event/dist/click";

export default function LeafletMap({
  position,
  zoom,
  fetchWeathermapData,
  fetchWeathermapDataFor5Days,
  fetchQWeatherDataFor24Hours,
  fetchAQI,
  fetchUV,
  scrollToTop,
}) {
  const [mapCenter, setMapCenter] = useState([0, 0]);
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMapCenter([lat, lng]);
        scrollToTop();
      },
    });
    return null;
  }

  useEffect(() => {
    console.log(mapCenter);
    fetchWeathermapData(mapCenter[0], mapCenter[1]);
    fetchWeathermapDataFor5Days(mapCenter[0], mapCenter[1]);
    fetchQWeatherDataFor24Hours(mapCenter[0], mapCenter[1]);
    fetchAQI(mapCenter[0], mapCenter[1]);
    fetchUV(mapCenter[0], mapCenter[1]);
  }, [mapCenter]);

  return (
    <div className="  flex flex-col w-3/4  p-4 my-6 flex-grow bg-common">
      <p className="sub-size ">Select a location to get Weather Data</p>
      <div className="h-bar" />
      <div className="w-full h-96 m-2 rounded-3xl self-center">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          minZoom={3}
          style={{ height: "100%", width: "100%" }}
          maxBounds={[
            [-90, -Infinity],
            [90, Infinity],
          ]}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />

          <Marker position={mapCenter}>
            <Popup>
              {mapCenter[0]}, {mapCenter[1]}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
