import { BsSunrise, BsSunset, BsWind } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { LuLeaf } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import AqiDetails from "./AqiDetails";
import { TbUvIndex } from "react-icons/tb";
export default function CurrentLocationDetails({
  loading,
  weatherData,
  uv,
  windDirection,
}) {
  return (
    <div className="flex w-full h-3/4 p-[calc(2%)] bg-common">
      {weatherData.coord ? (
        <span className="flex flex-row justify-between w-full h-full">
          <div className="flex w-[calc(60%)] items-center justify-center">
            <span className="flex flex-col w-1/3 items-center">
              <p className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-wrap text-center ">
                {weatherData?.name}, {weatherData?.sys?.country}
              </p>
              <span className="flex items-center justify-center">
                <MdLocationPin className="text-2xl" />
                <p className="text-xs text-center">
                  {weatherData?.coord.lat}, {weatherData?.coord.lon}
                </p>
              </span>
            </span>
            <span className="flex flex-col justify-center items-center ">
              <span className="flex text-3xl lg:text-5xl xl:text-7xl items-center ">
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
          <div className="w-0.5 h-full bg-white mx-4 p-0.5" />
          {/* */}
          <div className="flex flex-col w-[calc(40%)] h-full text-xs lg:text-sm xl:text-base 2xl:text-lg">
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
              <span className="w-[calc(60%)]  m-1 p-2 flex flex-col justify-center bg-common">
                <p className="text-xs text-gray-400 text-center">Description</p>
                <p className="text-sm lg:text-base xl:text-lg text-center">
                  {weatherData.weather[0].description}
                </p>
              </span>
              <span className="bg-common w-[calc(40%)] flex justify-center items-center text-center text-xl">
                <TbUvIndex className="text-3xl" />{" "}
                <p> {Math.round(uv?.result?.uv)}</p>
              </span>
            </div>
          </div>
        </span>
      ) : (
        <p>Search for a location</p>
      )}
    </div>
  );
}
