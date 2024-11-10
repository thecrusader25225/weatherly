import { useEffect, useRef, useState } from "react";
import SearchPanel from "./SearchPanel";
import CurrentLocationDetails from "./CurrentLocationDetails";
import FiveDayForecastDetails from "./FiveDayForecastDetails";
import WeatherNews from "./WeatherNews";
import AqiDetails from "./AqiDetails";
import TwentyfourHourForecastDetails from "./TwentyfourHourForecastDetails";
import LeafletMap from "./LeafletMap";
import Navbar from "./Navbar";
import UserLocationData from "./UserLocationData";

export default function App() {
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

  const [loading, setLoading] = useState({
    inputLocation: false,
    myLocation: false,
    weather: false,
    news: false,
  });

  const appRef = useRef(null);

  const [latLon, setLatLon] = useState([0, 0]);

  const [bg, setBg] = useState("#");

  const [isDarkMode, setIsDarkMode] = useState(false);

  const videoRef = useRef(null);
  const fetchGeocodingData = () => {
    setLoading((prev) => ({ ...prev, inputLocation: true }));
    fetch(
      `/api/getLocation?cityName=${cityName}&stateName=${stateName}&countryName=${countryName} `
    )
      .then((res) => res.json())
      .then((bulk) => {
        setLocationSearchData(bulk);
        setLoading((prev) => ({ ...prev, inputLocation: false }));
      });
    // .catch((e) => console.error("Error fetching geocoding data"));
  };

  const fetchWeathermapData = (lat, lon) => {
    setLoading((prev) => ({ ...prev, weather: true }));
    fetch(`/api/getWeather?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res);
        setLoading((prev) => ({ ...prev, weather: false }));
      });
  };
  const fetchWeathermapDataFor5Days = (lat, lon) => {
    fetch(`/api/getFiveDay?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.list) {
          setBulkWeatherData(res);
          setFiveDayForecast(
            res.list.filter(
              (forecast) =>
                forecast.dt_txt.includes("09:00:00") ||
                forecast.dt_txt.includes("21:00:00")
            )
          );
        } else {
          console.log("Response struc is not as expected: ", res);
          setBulkWeatherData([]);
          setFiveDayForecast([]);
        }
      });
  };
  const fetchAQI = (lat, lon) => {
    setLoading((prev) => ({ ...prev, weather: true }));
    fetch(`/api/getAqi?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((res) => {
        setAqi(res);
        setLoading((prev) => ({ ...prev, weather: false }));
      });
  };
  const fetchNews = () => {
    setLoading((prev) => ({ ...prev, news: true }));
    fetch(`/api/getNews?offset=${offset}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.news && Array.isArray(res.news))
          setNews((prev) => [...prev, ...res.news]);
        setLoading((prev) => ({ ...prev, news: false }));
      });
  };
  const fetchQWeatherDataFor24Hours = (lat, lon) => {
    fetch(`/api/getTwentyfour?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((res) => {
        setTwentyfourHourForecast(res);
      });
  };
  const fetchUV = (lat, lon) => {
    fetch(`/api/getUv?lat=${lat}&lon=${lon}`)
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
  //to fetch initial news
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
    const id =
      weatherData && weatherData.weather && weatherData?.weather[0]?.id;
    const currentTime =
      twentyfourHourForecast &&
      twentyfourHourForecast.hourly &&
      twentyfourHourForecast?.hourly[0]?.fxTime.split("T")[1].split(":")[0];
    const isDay = currentTime > 6 && currentTime < 19;
    if (id > 800) {
      //clouds
      if (isDay) {
        //day
        if (id === 801) return "light_cloudy_day";
        else if (id === 804) return "overcast_cloudy";
        else return "heavy_cloudy_day";
      } else {
        //night
        if (id === 804) return "overcast_cloudy";
        else return "light_cloudy_night";
      }
    } else if (id === 800) {
      //clear
      if (isDay) {
        //day
        return "clear_day";
      } else {
        //night
        return "clear_night";
      }
    } else if (id >= 700) {
      //atmosphere
      if (isDay) {
        //day
        if (id === 731) return "duststorm";
        else if (id === 751) return "sandstorm";
        else if (id === 762) return "volcano";
        else if (id === 781) return "tornado";
        else return "foggy_day";
      } else {
        //night
        if (id === 731) return "duststorm";
        else if (id === 751) return "sandstorm";
        else if (id === 762) return "volcano";
        else if (id === 781) return "tornado";
        else return "foggy_night";
      }
    } else if (id >= 600) {
      //snow
      if (id === 600 || id === 612 || id === 620) return "light_snowfall";
      else return "heavy_snowfall";
    } else if (id >= 500) {
      //rain
      if (isDay) {
        //day
        if (id === 500 || id === 501 || id === 520) return "light_rain_day";
        else return "heavy_rain";
      } else {
        //night
        if (id === 500 || id === 501 || id === 520) return "light_rain_night";
        else return "heavy_rain";
      }
    } else if (id >= 300) {
      //drizzle
      if (isDay) {
        //day
        return "drizzle_day";
      } else {
        //night
        return "drizzle_night";
      }
    } else if (id >= 200) {
      //thunderstorm
      return "thunderstorm";
    }
    console.log("day: " + isDay);
  };
  //setting bg video speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  //setting setBg
  useEffect(() => {
    const newBg = chooseBg();
    setBg(newBg);
  }, [weatherData]);

  //setting bg to screen
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  // console.log(locationSearchData);
  // console.log(weatherData);
  // console.log(fiveDayForecast);
  // console.log(bulkWeatherData);
  // console.log(twentyfourHourForecast);
  // console.log(aqi);
  // console.log(timeData);
  // console.log(news);
  // console.log(bg);
  return (
    <div className={`w-screen h-screen text-white overflow-auto`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div
        className={`z-10 w-full h-full flex  ${
          isDarkMode ? "bg-black bg-opacity-60" : "bg-black bg-opacity-10"
        } duration-1000`}
      >
        <div ref={appRef} />
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-screen h-screen object-cover -z-10 "
          src={`/videos/${chooseBg()}.mp4`}
          autoPlay
          loop
          muted
        ></video>

        <div className=" w-full h-full flex flex-col  pt-[calc(72px)] pl-4   ">
          {/* top display panels */}
          <span className="w-3/4 h-auto flex ">
            {/* search panel */}
            <SearchPanel
              cityName={cityName}
              setCityName={setCityName}
              setCountryName={setCountryName}
              fetchGeocodingData={fetchGeocodingData}
              locationSearchData={locationSearchData}
              handleClickLocation={handleClickLocation}
              loading={loading.inputLocation}
            />
            <span className="flex flex-col w-3/4 h-full">
              {/* details of current location */}
              <CurrentLocationDetails
                weatherData={weatherData}
                uv={uv}
                windDirection={windDirection}
                loading={loading.weather}
              />
              {/* AQI details display*/}
              <AqiDetails weatherData={weatherData} aqi={aqi} />
            </span>
          </span>

          {/* middle display panels */}
          <div className="flex flex-col w-3/4 h-auto  ml-2 pr-2  ">
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
            {/* leaflet map */}
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
        </div>

        {/* right display panel */}
        <div className="fixed top-0 right-0 w-1/4 h-full pt-16 pr-8 z-10 pb-4">
          {/* user location data */}
          <UserLocationData
            windDirection={windDirection}
            loading={loading.myLocation}
          />
          {/* Weather news display */}
          <WeatherNews
            news={news}
            handleLoadNews={handleLoadNews}
            loading={loading.news}
          />
        </div>
      </div>
    </div>
  );
}
