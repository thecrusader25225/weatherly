import { useEffect, useRef, useState } from "react";
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
import Bot from "./LeafletMap";
import LeafletMap from "./LeafletMap";
import Navbar from "./Navbar";
import UserLocationData from "./UserLocationData";

export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";
  const NEWS_API_KEY = "bd230653251844188335683c4c1c7814";
  const qWeather_API_KEY = "9000babd99dc467cac785cabbc89dbef";
  const UV_API_KEY = "openuv-150uamrlyj0m5jv-io";

  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");

  const [locationSearchData, setLocationSearchData] = useState([]);
  const [aqi, setAqi] = useState({});
  const [uv, setUv] = useState();

  const [weatherData, setWeatherData] = useState("");
  const [bulkWeatherData, setBulkWeatherData] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [twentyfourHourForecast, setTwentyfourHourForecast] = useState("");

  const [timeData, setTimeData] = useState("");
  const [news, setNews] = useState([]);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const appRef = useRef(null);

  const [latLon, setLatLon] = useState([0, 0]);

  const [bg, setBg] = useState("#");
  const videoRef = useRef(null);
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
  const fetchUV = (lat, lon) => {
    fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
      headers: {
        "x-access-token": UV_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((res) => setUv(res));
  };

  const handleClickLocation = (location) => {
    setCityName(location.name);
    // setStateName(location.state);
    setCountryName(location.sys.country);
    fetchWeathermapData(location.coord.lat, location.coord.lon);
    fetchWeathermapDataFor5Days(location.coord.lat, location.coord.lon);
    fetchQWeatherDataFor24Hours(location.coord.lat, location.coord.lon);
    fetchAQI(location.coord.lat, location.coord.lon);
    fetchUV(location.coord.lat, location.coord.lon);
    setLatLon(location.coord.lat, location.coord.lon);
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

  const scrollToTop = () => {
    appRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    // window.scrollBy(0, -16);
  };

  const chooseBg = () => {
    const id = weatherData?.weather[0]?.id;
    const currentTime = twentyfourHourForecast?.hourly[0]?.fxTime
      .split("T")[1]
      .split(":")[0];
    if (id > 800) {
      //done
      //clouds
      //all distinct
      if (currentTime > 6 && currentTime < 19) {
        //day
        if (id === 804) setBg("");
      } else setBg();
    } else if (id === 800) {
      //done
      //clear
      //both day night
    } else if (id >= 700) {
      //atmosphere
      //mist,smoke,haze,fod,squall will have same video-done
      //dust -done
      //sand-done
      //volcanic-done
      //tornado-done
      //both day and night
    } else if (id >= 600) {
      //done
      //snow
      //light and heavy
    } else if (id >= 500) {
      //done
      //rain
      //light and heavy rain
    } else if (id >= 300) {
      //done
      //drizzle
      //grouped all to be one
      //both day night
    } else if (id >= 200) {
      //done
      //thunderstorm
      //only thunderstorm and thunderstorm with rain
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // by default

  // console.log(locationSearchData);
  // console.log(weatherData);
  // console.log(fiveDayForecast);
  // console.log(bulkWeatherData);
  console.log(twentyfourHourForecast);
  // console.log(aqi);
  // console.log(timeData);
  // console.log(news);
  return (
    <>
      <div className="w-screen h-screen text-white  flex flex-col z-10 bg-black bg-opacity-50">
        <Navbar />
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-screen h-screen object-cover -z-10"
          src="/videos/heavy_cloudy_day.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className=" w-full h-full flex flex-col overflow-y-auto pt-16 pl-4">
          <div ref={appRef} />
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
                uv={uv}
                windDirection={windDirection}
              />
              {/* AQI details display*/}
              <AqiDetails weatherData={weatherData} aqi={aqi} />
            </span>
          </span>

          {/* middle display panels */}
          <div className="flex flex-col w-3/4 h-auto ml-2 pr-2 py-2 ">
            {/* details of 24 hr forecast */}
            <TwentyfourHourForecastDetails
              weatherData={weatherData}
              twentyfourHourForecast={twentyfourHourForecast}
            />
            {/* details of 5 day forecast */}
            <FiveDayForecastDetails
              bulkWeatherData={bulkWeatherData}
              fiveDayForecast={fiveDayForecast}
              windDirection={windDirection}
            />
          </div>
          <LeafletMap
            position={latLon}
            zoom={3}
            fetchWeathermapData={fetchWeathermapData}
            fetchWeathermapDataFor5Days={fetchWeathermapDataFor5Days}
            fetchQWeatherDataFor24Hours={fetchQWeatherDataFor24Hours}
            fetchAQI={fetchAQI}
            fetchUV={fetchUV}
            scrollToTop={scrollToTop}
          />
        </div>
        {/* right SOMETHING panel */}
        <div className="fixed top-0 right-0 w-1/4 h-full pt-16 pr-8 z-10">
          <UserLocationData
            API_KEY={API_KEY}
            UV_API_KEY={UV_API_KEY}
            windDirection={windDirection}
          />
          {/* Weather news display */}
          <WeatherNews news={news} handleLoadNews={handleLoadNews} />
        </div>
      </div>
    </>
  );
}
