import { useEffect, useState } from "react";
import { BsWind } from "react-icons/bs";
import NoResults from "./NoResults";
export default function FiveDayForecastDetails({
  bulkWeatherData,
  fiveDayForecast,
  windDirection,
}) {
  const [groupedForecast, setGroupedForecast] = useState([]);
  useEffect(() => {
    setGroupedForecast([]); //ensuring that somehow re-rendering doesnt cause it to append twice
    for (let i = 0; i < 10; i += 2) {
      setGroupedForecast((prev) => [
        ...prev,
        {
          day: fiveDayForecast[i] || null,
          night: fiveDayForecast[i + 1] || null,
        },
      ]);
    }
  }, [bulkWeatherData.city, fiveDayForecast]);
  return (
    <div className="flex flex-col bg-common my-2 w-full h-full py-4 px-8">
      <p className="sub-size">
        5-Day Forecast for {bulkWeatherData.city && bulkWeatherData.city.name}
      </p>
      <div className="h-bar" />

      <span className="flex flex-col w-full h-full bg-common p-4 my-2 ">
        {groupedForecast ? (
          groupedForecast.map((forecast, index) => {
            const { day, night } = forecast;
            return (
              <div
                key={index}
                className="flex flex-row justify-between items-center my-2 bg-common w-full "
              >
                <div className="flex flex-row items-center justify-between w-3/4 px-[calc(2%)]">
                  {day && (
                    <>
                      {" "}
                      <span className="flex flex-col justify-center items-center m-1 w-8 ">
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          className=""
                          alt="Weather"
                        />
                        <p className="text-sm">{day?.weather[0]?.main}</p>
                      </span>
                      <p className="mx-1 text-2xl">
                        {Math.round(day?.main?.temp - 273.15)}℃
                      </p>
                      <span className="mx-2 flex w-full items-center">
                        <BsWind className="m-1" />
                        <span className="flex flex-col justify-center items-center text-xs">
                          <p>{day?.wind.speed}m/s</p>
                          <p>{windDirection(day?.wind.deg)}</p>
                        </span>
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-col w-1/2 items-center">
                  {
                    <div className="flex items-center ">
                      <p className="mr-2 text-xl font-light">
                        {day?.dt_txt.split(" ")[0].split("-")[1] +
                          "-" +
                          day?.dt_txt.split(" ")[0].split("-")[2]}
                      </p>
                    </div>
                  }
                </div>
                <div className="flex flex-row items-center justify-between w-3/4 px-[calc(2%)]">
                  {night && (
                    <>
                      {" "}
                      <span className="mx-2 flex w-full items-center justify-end">
                        <BsWind />
                        <span className="flex flex-col justify-center items-center text-xs">
                          <p>{night?.wind.speed}</p>
                          <p>{windDirection(night?.wind.deg)}</p>
                        </span>
                      </span>
                      <p className="mx-1 text-2xl">
                        {Math.round(night?.main?.temp - 273.15)}℃
                      </p>
                      <span className="flex flex-col justify-center items-center m-1 w-8 ">
                        <img
                          src={`https://openweathermap.org/img/wn/${night.weather[0].icon}.png`}
                          className=""
                          alt="Weather"
                        />
                        <p className="text-sm">{night?.weather[0]?.main}</p>
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <NoResults />
        )}
      </span>
    </div>
  );
}
