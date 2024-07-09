import { useEffect, useState } from "react";
import { CiCloudDrizzle } from "react-icons/ci";
import { GiSun } from "react-icons/gi";
import SearchPanel from "./SearchPanel";
import CurrentLocationDetails from "./CurrentLocationDetails";
import FiveDayForecastDetails from "./FiveDayForecastDetails";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";
  const NEWS_API_KEY = "bd230653251844188335683c4c1c7814";
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");

  const [locationSearchData, setLocationSearchData] = useState([]);
  const [aqi, setAqi] = useState({ list: [] });
  const [weatherData, setWeatherData] = useState("");
  const [bulkWeatherData, setBulkWeatherData] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [timeData, setTimeData] = useState("");
  const [news, setNews] = useState("");
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
      .then((res) => setNews((prev) => [...prev, ...res.news]));
  };

  const handleClickLocation = (location) => {
    setCityName(location.name);
    // setStateName(location.state);
    setCountryName(location.sys.country);
    fetchWeathermapData(location.coord.lat, location.coord.lon);
    fetchWeathermapDataFor5Days(location.coord.lat, location.coord.lon);
    fetchAQI(location.coord.lat, location.coord.lon);
    fetchNews();
  };
  const handleLoadNews = () => {
    setOffset(offset + 10);
  };
  useEffect(() => fetchNews(), [offset]);

  // console.log(locationSearchData);
  // console.log(weatherData);
  // console.log(fiveDayForecast);
  // console.log(bulkWeatherData);
  // console.log(aqi);
  // console.log(timeData);
  console.log(news);
  return (
    <>
      <div className="bg-slate-800 w-screen h-screen text-white flex flex-col">
        {/* search panel + current details */}
        <span className="w-3/4 h-1/3 flex ">
          {/* search panel */}
          <SearchPanel
            setCityName={setCityName}
            setCountryName={setCountryName}
            fetchGeocodingData={fetchGeocodingData}
            locationSearchData={locationSearchData}
            handleClickLocation={handleClickLocation}
          />
          {/* details of current location */}
          <CurrentLocationDetails
            loading={loading}
            weatherData={weatherData}
            aqi={aqi}
          />
        </span>

        {/* middle display panels */}
        <div className="flex flex-col w-3/4 h-1/2 ml-2 pr-2 py-2">
          {/* details of 5 day forecast */}
          <FiveDayForecastDetails
            bulkWeatherData={bulkWeatherData}
            fiveDayForecast={fiveDayForecast}
          />
          {/* details of 24 hr forecast */}
          {/* will do later */}
        </div>
        {/* right SOMETHING panel */}
        <div className="fixed top-0 right-0 w-1/4 h-full ">
          {/* AQI details display*/}
          <span className="w-full h-1/2 bg-common flex flex-col p-4 mx-2">
            <p className="text-3xl">Air Quality Index</p>
            <span className="flex items-center">
              <MdLocationPin />
              <p>{weatherData.name}</p>
            </span>
            <div className="flex flex-col w-full h-full flex-shrink-0 flex-wrap">
              {aqi.list &&
                aqi.list.length > 0 &&
                Object.entries(aqi.list[0].components).map(([key, value]) => (
                  <span className="flex bg-common w-full px-4 my-[calc(1%)] min-w-16 justify-between items-center overflow-y-auto">
                    <p>{key}</p>
                    <p>{value}</p>
                  </span>
                ))}
            </div>
          </span>
          <span className="w-full h-1/2  bg-common flex flex-col p-4 m-2">
            <p className="text-3xl">Weather News</p>
            <span className="flex flex-col overflow-y-auto">
              {news &&
                news.length > 0 &&
                news.map((news, index) => (
                  <a href={news.url}>
                    <div className="p-2 bg-white bg-opacity-5 flex flex-col">
                      <img src={news.image} alt={index} />
                      <p>{news.summary}</p>
                    </div>
                  </a>
                ))}
              <button onClick={handleLoadNews}>Load More</button>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
