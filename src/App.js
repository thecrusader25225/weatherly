import { useEffect, useState } from "react";
import { CiCloudDrizzle } from "react-icons/ci";
import { GiSun } from "react-icons/gi";
import SearchPanel from "./SearchPanel";
import CurrentLocationDetails from "./CurrentLocationDetails";
import FiveDayForecastDetails from "./FiveDayForecastDetails";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import WeatherNews from "./WeatherNews";
import AqiDetails from "./AqiDetails";
import TwentyfourHourForecastDetails from "./TwentyfourHourForecastDetails";

export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";
  const NEWS_API_KEY = "bd230653251844188335683c4c1c7814";
  const qWeather_API_KEY = "9000babd99dc467cac785cabbc89dbef";
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");

  const [locationSearchData, setLocationSearchData] = useState([]);
  const [aqi, setAqi] = useState({ list: [] });

  const [weatherData, setWeatherData] = useState("");
  const [bulkWeatherData, setBulkWeatherData] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [twentyfourHourForecast, setTwentyfourHourForecast] = useState("");

  const [timeData, setTimeData] = useState("");
  const [news, setNews] = useState([]);
  const [offset, setOffset] = useState(0);

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
  const fetchAQI = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setAqi(res));
  };
  const fetchNews = () => {
    fetch(
      `https://api.worldnewsapi.com/search-news?api-key=${NEWS_API_KEY}&text=weather&offset=${offset}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.news && Array.isArray(res.news))
          setNews((prev) => [...prev, ...res.news]);
      });
  };
  const fetchQWeatherDataFor24Hours = (lat, lon) => {
    fetch(
      `https://devapi.qweather.com/v7/weather/24h?location=${lon},${lat}&key=${qWeather_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setTwentyfourHourForecast(res));
  };

  const handleClickLocation = (location) => {
    setCityName(location.name);
    // setStateName(location.state);
    setCountryName(location.sys.country);
    fetchWeathermapData(location.coord.lat, location.coord.lon);
    fetchWeathermapDataFor5Days(location.coord.lat, location.coord.lon);
    fetchQWeatherDataFor24Hours(location.coord.lat, location.coord.lon);
    fetchAQI(location.coord.lat, location.coord.lon);
  };
  const windDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const indexWindComingFrom = Math.round(degrees / 45) % 8;
    const indexWindGoingTo = (indexWindComingFrom + 4) % 8;
    return `${directions[indexWindComingFrom]} -> ${directions[indexWindGoingTo]}`;
  };
  const handleLoadNews = () => {
    setOffset(offset + 10);
  };
  useEffect(() => fetchNews(), [offset]);

  // by default

  // console.log(locationSearchData);
  // console.log(weatherData);
  // console.log(fiveDayForecast);
  // console.log(bulkWeatherData);
  // console.log(twentyfourHourForecast);
  // console.log(aqi);
  // console.log(timeData);
  console.log(news);
  return (
    <>
      <div className="bg-slate-800 w-screen h-screen text-white flex flex-col ">
        {/* search panel + current details */}
        <span className="w-3/4 h-auto flex ">
          {/* search panel */}
          <SearchPanel
            setCityName={setCityName}
            setCountryName={setCountryName}
            fetchGeocodingData={fetchGeocodingData}
            locationSearchData={locationSearchData}
            handleClickLocation={handleClickLocation}
          />
          <span className="flex flex-col w-3/4 h-full">
            {/* details of current location */}
            <CurrentLocationDetails
              loading={loading}
              weatherData={weatherData}
              aqi={aqi}
              windDirection={windDirection}
            />
            {/* AQI details display*/}
            <AqiDetails weatherData={weatherData} aqi={aqi} />
          </span>
        </span>

        {/* middle display panels */}
        <div className="flex flex-col w-3/4 h-auto ml-2 pr-2 py-2 overflow-y-auto">
          {/* details of 5 day forecast */}
          <FiveDayForecastDetails
            bulkWeatherData={bulkWeatherData}
            fiveDayForecast={fiveDayForecast}
            windDirection={windDirection}
          />
          {/* details of 24 hr forecast */}
          <TwentyfourHourForecastDetails
            weatherData={weatherData}
            twentyfourHourForecast={twentyfourHourForecast}
          />
        </div>
        {/* right SOMETHING panel */}
        <div className="fixed top-0 right-0 w-1/4 h-full ">
          {/* Weather news display */}
          <WeatherNews news={news} handleLoadNews={handleLoadNews} />
        </div>
      </div>
    </>
  );
}
