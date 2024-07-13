import { useState, useEffect } from "react";
import { TbUvIndex } from "react-icons/tb";
import { LuLeaf } from "react-icons/lu";

export default function UserLocationData({ API_KEY, UV_API_KEY }) {
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [userWeatherData, setUserWeatherData] = useState([]);
  const [userAqi, setUserAqi] = useState([]);
  const [userUV, setUserUV] = useState([]);
  //get current user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);
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
      fetchUV(userLocation[0], userLocation[1]);
    }
  }, [userLocation]);
  console.log(userLocation);

  return (
    <div className="w-full h-1/3  bg-common flex flex-col m-2 p-2">
      {/* user info like location */}
      <p>Your location</p>
      <div className="flex flex-col h-full w-full justify-center">
        <div className="flex items-center bg-common w-full h-auto">
          <span className="flex flex-col w-1/2 h-full  p-4 pr-2">
            <p className="text-lg 2xl:text-3xl">
              {userWeatherData?.name}, {userWeatherData?.sys?.country}
            </p>
            <p className="text-xs">
              {userLocation[0]}, {userLocation[1]}
            </p>
          </span>
          <span className="flex flex-col p-4 pl-2 w-2/3 h-full items-center justify-center">
            <span className="flex justify-end items-center w-full h-1/2">
              <img
                src={`https://openweathermap.org/img/wn/${userWeatherData?.weather[0]?.icon}.png`}
                alt="weather"
                className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
              />
              <span className="flex justify-end w-full h-full items-center">
                <p className="text-2xl 2xl:text-4xl">
                  {Math.round(userWeatherData?.main?.temp - 273.15)}
                </p>
                <p className="text-xs 2xl:text-lg"> ℃</p>
              </span>
            </span>
            <p className="text-sm 2xl:text-lg">
              ={userWeatherData?.weather[0]?.main}=
            </p>
          </span>
        </div>
        <div className="flex w-full h-auto py-2 items-center">
          <span className="w-24 h-full flex-shrink-0 m-1 text-xl lg:text-xl xl:text-2xl flex items-center justify-center bg-common">
            <p>AQI: {userAqi && userAqi.list && userAqi?.list[0]?.main?.aqi}</p>
            <LuLeaf />
          </span>
          <span className="bg-common w-full h-full flex justify-center items-center text-center ">
            <TbUvIndex className="" /> <p> {Math.round(userUV?.result?.uv)}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
