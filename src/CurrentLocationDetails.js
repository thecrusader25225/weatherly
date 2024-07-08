import { BsSunrise, BsSunset, BsWind } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { LuLeaf } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
export default function CurrentLocationDetails({ loading, weatherData, aqi }) {
  const windDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const indexWindComingFrom = Math.round(degrees / 45) % 8;
    const indexWindGoingTo = (indexWindComingFrom + 4) % 8;
    return `${directions[indexWindComingFrom]} -> ${directions[indexWindGoingTo]}`;
  };
  return (
    <div className="flex w-3/4 h-full  min-h-1/2 flex-shrink-0 px-[calc(5%)] py-[calc(2%)] bg-common">
      {weatherData.coord ? (
        <div className="flex flex-col w-full h-full">
          <span className="flex flex-row justify-between w-full h-full">
            <div className="flex  w-1/2 items-center bg-common px-2">
              <span className="flex flex-col w-1/3">
                <p className="text-base lg:text-lg xl:text-xl 2xl:text-3xl text-wrap ">
                  {weatherData?.name}, {weatherData?.sys.country}
                </p>
                <span className="flex items-center">
                  <MdLocationPin className="text-lg" />
                  <p className="text-xs xl:text-base">
                    {weatherData?.coord.lat}, {weatherData?.coord.lon}
                  </p>
                </span>
              </span>
              <span className="flex flex-col justify-center items-center w-2/3">
                <span className="flex text-3xl lg:text-5xl xl:text-7xl items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`}
                    alt="weather"
                    className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
                  />
                  <span className="flex">
                    <p>{Math.round(weatherData?.main?.temp - 273.15)}</p>
                    <p className="text-xl"> ℃</p>
                  </span>
                </span>
                <p className="text-base xl:text-xl">
                  ={weatherData?.weather[0]?.main}=
                </p>
                <div className="p-1">
                  <span className="flex items-center">
                    <BsSunrise className="text-xl" />
                    <p className="text-sm xl:text-base">
                      {new Date(
                        weatherData?.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </span>
                  <span className="flex items-center">
                    <p className="text-sm xl:text-base">
                      {new Date(
                        weatherData?.sys.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                    <BsSunset className="text-xl" />
                  </span>
                </div>
              </span>
            </div>
            {/*  */}
            <div className="w-0.5 h-full bg-white mx-4" />
            {/* */}
            <div className="flex flex-col w-1/2 h-full text-xs lg:text-sm xl:text-base 2xl:text-lg">
              <div className=" flex justify-between items-center w-full h-2/3">
                <span className="flex flex-col bg-common w-1/2 h-full m-1 p-2 justify-center">
                  <span className="flex">
                    <p>
                      Feels like:{" "}
                      {Math.round(weatherData.main.feels_like - 273.15)} ℃
                    </p>
                  </span>
                  <p>Pressure: {weatherData.main.pressure}mbar</p>
                  <p>Cloudiness: {weatherData.clouds.all}%</p>
                </span>
                <span className="flex items-center bg-common m-1 w-1/2 h-full  p-2">
                  <BsWind className="text-3xl m-1" />
                  <span>
                    <p>{windDirection(weatherData.wind.deg)}</p>
                    <p>{weatherData.wind.speed}</p>
                  </span>
                </span>
              </div>
              <div className="w-full h-1/3 flex  overflow-x-auto mt-2">
                <span className="w-2/3  m-1 p-2 flex flex-col justify-center bg-common">
                  <p className="text-xs text-gray-400">Forecast Description</p>
                  <p className="text-sm lg:text-base xl:text-lg">
                    {weatherData.weather[0].description}
                  </p>
                </span>
                <span className="w-1/3  m-1 text-base lg:text-xl xl:text-2xl flex items-center justify-center bg-common">
                  <p>AQI:{aqi.list[0].main.aqi}</p>
                  <LuLeaf />
                </span>
              </div>
            </div>
          </span>
        </div>
      ) : (
        <p>Search for a location</p>
      )}
    </div>
  );
}
