import { useState, useEffect } from "react";
import { TbUvIndex } from "react-icons/tb";
import { LuLeaf } from "react-icons/lu";
import { BsWind } from "react-icons/bs";
import Loader from "./Loader";

export default function UserLocationData({
  API_KEY,
  UV_API_KEY,
  windDirection,
  loading,
}) {
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [userWeatherData, setUserWeatherData] = useState("");
  const [userAqi, setUserAqi] = useState([]);
  const [userUV, setUserUV] = useState([]);
  //get current user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // console.log(pos);
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    } else {
      console.error("Geolocation not supported by this browser");
    }
  };
  const fetchWeathermapData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setUserWeatherData(res);
      });
  };

  const fetchAQI = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setUserAqi(res));
  };

  const fetchUV = (lat, lon) => {
    fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
      headers: {
        "x-access-token": UV_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((res) => setUserUV(res));
  };
  useEffect(() => getUserLocation(), []);
  useEffect(() => {
    if (userLocation[0] !== 0 && userLocation[1] !== 0) {
      fetchWeathermapData(userLocation[0], userLocation[1]);
      fetchAQI(userLocation[0], userLocation[1]);
      // fetchUV(userLocation[0], userLocation[1]);
    }
  }, [userLocation]);
  // console.log(userLocation);

  return (
    <div className="w-full h-[calc(30%)]  bg-common flex flex-col m-2 p-2 ">
      {/* user info like location */}
      <span className="w-full h-auto flex flex-col">
        <p className="sub-size ">Your location</p>
        <div className="h-bar" />
      </span>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col h-full w-full  pt-2">
          <div className="flex items-center justify-between bg-common w-full h-2/3 px-2">
            <span className="flex flex-col justify-center w-1/2 h-full ">
              <p className="text-sm 2xl:text-3xl">
                {userWeatherData?.name}, {userWeatherData?.sys?.country}
              </p>
              <p className="text-[calc(10px)]">
                {userLocation[0]}, {userLocation[1]}
              </p>
              <span className="flex items-center text-left m-1 w-full h-auto  text-[calc(10px)] 2xl:text-xs ">
                <BsWind className="text-xl 2xl:text-2xl m-1" />
                <span>
                  <p>{windDirection(userWeatherData?.wind?.deg)}</p>
                  <p>{userWeatherData?.wind?.speed}</p>
                </span>
              </span>
            </span>
            <span className="flex flex-col  w-1/2 h-full items-center justify-center">
              <span className="flex items-center w-full h-1/2">
                <img
                  src={`https://openweathermap.org/img/wn/${
                    userWeatherData &&
                    userWeatherData.weather &&
                    userWeatherData?.weather[0]?.icon
                  }.png`}
                  alt="weather"
                  className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
                />
                <span className="flex justify-center items-center w-full h-full ">
                  <p className="text-xl 2xl:text-5xl">
                    {Math.round(userWeatherData?.main?.temp - 273.15)}
                  </p>
                  <p className="text-xs 2xl:text-lg"> ℃</p>
                </span>
              </span>
              <p className="text-sm 2xl:text-lg">
                =
                {userWeatherData &&
                  userWeatherData.weather &&
                  userWeatherData?.weather[0]?.main}
                =
              </p>
            </span>
          </div>
          <div className="flex w-full h-1/3 my-2 px-2 items-center justify-between bg-common">
            <span className="w-auto h-full  text-base xl:text-lg flex items-center justify-center">
              <p>
                AQI: {userAqi && userAqi.list && userAqi?.list[0]?.main?.aqi}
              </p>
              <LuLeaf />
            </span>
            <span className=" w-auto h-full text-base xl:text-lg flex justify-center items-center text-center ">
              <TbUvIndex className="" />{" "}
              <p> {Math.round(userUV?.result?.uv)}</p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
