import { useState } from "react";

export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";

  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");

  const [locationSearchData, setLocationSearchData] = useState([]);
  const [weatherData, setWeatherData] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchGeocodingData = () => {
    setLoading(true);
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=50&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) =>
        Promise.all(
          res.map((location) =>
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
            ).then((res) => res.json())
          )
        )
      )
      .then((bulk) => {
        setLocationSearchData(bulk);
        setLoading(false);
      })
      .catch((e) => console.error("Error fetching geocoding data"));
  };

  const fetchWeathermapData = (lat, lon) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res);
        setLoading(false);
      });
  };

  const handleClickLocation = (location) => {
    setCityName(location.name);
    // setStateName(location.state);
    setCountryName(location.sys.country);
    fetchWeathermapData(location.coord.lat, location.coord.lon);
  };

  console.log(locationSearchData);
  console.log(weatherData);
  return (
    <>
      <div className="bg-slate-700 w-screen h-screen text-white flex">
        {/* left search panel */}
        <div className="flex flex-col w-1/4 h-full bg-slate-400">
          <span>
            <input
              type="text"
              onChange={(e) => {
                setCityName(e.target.value);
                setCountryName("");
              }}
              className="text-black w-auto h-auto"
              placeholder="City"
            />
            <button className="border" onClick={fetchGeocodingData}>
              Fetch
            </button>
          </span>

          <div className="w-full h-auto flex flex-col">
            {locationSearchData.map((location, index) => (
              <button
                key={index}
                className="border"
                onClick={() => handleClickLocation(location)}
              >
                {location.name}, {location.sys.country}
              </button>
            ))}
          </div>
        </div>

        {/* middle display panels */}
        <div className="flex flex-col w-full h-full">
          {/* details of current location */}
          <div>
            {loading && <p>Loading...</p>}
            {weatherData.coord ? (
              <span className="flex flex-col">
                <p>
                  {weatherData.name}, {weatherData.sys.country}
                </p>
                <p>Coordinates</p>
                <p>Latitude: {weatherData.coord.lat}</p>
                <p>Longitude: {weatherData.coord.lon}</p>
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
