import { useState } from "react";
import { CiCloudDrizzle } from "react-icons/ci";
import { GiSun } from "react-icons/gi";

export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";

  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");

  const [locationSearchData, setLocationSearchData] = useState([]);

  const [weatherData, setWeatherData] = useState("");
  const [bulkWeatherData, setBulkWeatherData] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

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
      });
    // .catch((e) => console.error("Error fetching geocoding data"));
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
  const fetchWeathermapDataFor5Days = (lat, lon) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setBulkWeatherData(res);
        setFiveDayForecast(
          res.list.filter(
            (forecast) =>
              forecast.dt_txt.includes("09:00:00") ||
              forecast.dt_txt.includes("21:00:00")
          )
        );
        setLoading(false);
      });
  };

  const handleClickLocation = (location) => {
    setCityName(location.name);
    // setStateName(location.state);
    setCountryName(location.sys.country);
    fetchWeathermapData(location.coord.lat, location.coord.lon);
    fetchWeathermapDataFor5Days(location.coord.lat, location.coord.lon);
  };

  // console.log(locationSearchData);
  // console.log(weatherData);
  console.log(fiveDayForecast);
  console.log(bulkWeatherData);
  return (
    <>
      <div className="bg-slate-700 w-screen h-screen text-white flex">
        {/* left search panel */}
        <div className="flex flex-col w-1/4 h-full bg-slate-400 fixed">
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

          <div className="w-full h-auto flex flex-col ">
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
        <div className="flex flex-col w-full h-full bg-slate-600 pl-[calc(25%)]">
          {/* details of current location */}
          <div className="flex w-full h-1/2 min-h-1/2 flex-shrink-0">
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
          <div className="flex flex-col bg-slate-700 w-full h-auto min-h-1/2 flex-shrink-0">
            <p>
              5 day forecast for
              {bulkWeatherData.city && bulkWeatherData.city.name}
            </p>
            <div className="flex flex-row justify-between w-full h-full">
              <span className="flex flex-col">
                {fiveDayForecast.map(
                  (data) =>
                    data.dt_txt.includes("09:00:00") && (
                      <span className="flex">
                        <img
                          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                          className="w-8 h-8"
                          alt="Weather icon"
                        />
                        <p>{data.dt_txt}</p>
                      </span>
                    )
                )}
              </span>
              <span className="flex flex-col">
                {fiveDayForecast.map(
                  (data) =>
                    data.dt_txt.includes("21:00:00") && (
                      <span className="flex">
                        <p>{data.dt_txt}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                          className="w-8 h-8"
                          alt="Weather icon"
                        />
                      </span>
                    )
                )}
              </span>
            </div>
          </div>
          {/* details of 24 hr forecast */}
        </div>
      </div>
    </>
  );
}
