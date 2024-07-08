import { useState } from "react";
import { CiCloudDrizzle } from "react-icons/ci";
import { GiSun } from "react-icons/gi";
import SearchPanel from "./SearchPanel";
import CurrentLocationDetails from "./CurrentLocationDetails";
import FiveDayForecastDetails from "./FiveDayForecastDetails";

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
        <SearchPanel
          setCityName={setCityName}
          setCountryName={setCountryName}
          fetchGeocodingData={fetchGeocodingData}
          locationSearchData={locationSearchData}
          handleClickLocation={handleClickLocation}
        />

        {/* middle display panels */}
        <div className="flex flex-col w-full h-full bg-slate-600 pl-[calc(25%)]">
          {/* details of current location */}
          <CurrentLocationDetails loading={loading} weatherData={weatherData} />
          {/* details of 5 day forecast */}
          <FiveDayForecastDetails
            bulkWeatherData={bulkWeatherData}
            fiveDayForecast={fiveDayForecast}
          />
          {/* details of 24 hr forecast */}
          {/* will do later */}
        </div>
        {/* right SOMETHING panel */}
        <div className="fixed top-0 right-0 w-1/4 h-full bg-slate-500"></div>
      </div>
    </>
  );
}
