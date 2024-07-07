import { useState } from "react";

export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";

  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("India");
  const [locationSearchData, setLocationSearchData] = useState([]);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchGeocodingData = () =>
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=50&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          console.log(res);
          setLocationSearchData(res);
        } else throw new Error("Location not found");
      });
  const fetchWeathermapData = (lat, lon) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };
  const handleClickLocation = (name, state, country, lat, lon) => {
    setCityName(name);
    setStateName(state);
    setCountryName(country);
    fetchWeathermapData(lat, lon);
  };
  console.log(data);
  return (
    <>
      <div className="bg-slate-700 w-screen h-screen text-white flex">
        {/* left search panel */}
        <div className="flex flex-col w-1/4 h-full bg-slate-400">
          <span>
            <input
              type="text"
              onChange={(e) => setCityName(e.target.value)}
              className="text-black w-auto h-auto"
              placeholder="City"
            />
            <button className="border" onClick={fetchGeocodingData}>
              Fetch
            </button>
          </span>

          <div className="w-full h-auto flex flex-col">
            {locationSearchData.map((location) => (
              <button
                className="border"
                onClick={() =>
                  handleClickLocation(
                    location.name,
                    location.state,
                    location.country,
                    location.lat,
                    location.lon
                  )
                }
              >
                {location.name}, {location.state}, {location.country}
              </button>
            ))}
          </div>
        </div>

        {/* middle display panels */}
        <div className="flex flex-col w-full h-full">
          {/* details of current location */}
          <div>
            {loading && <p>Loading...</p>}
            {data.coord ? (
              <span className="flex flex-col">
                <p>
                  {data.name}, {data.sys.country}
                </p>
                <p>Coordinates</p>
                <p>Latitude: {data.coord.lat}</p>
                <p>Longitude: {data.coord.lon}</p>
              </span>
            ) : (
              <p>Search for a location</p>
            )}
          </div>
          {/* details of 5 day forecast */}
          <div></div>
          {/* details of 24 hr forecast */}
        </div>
      </div>
    </>
  );
}
