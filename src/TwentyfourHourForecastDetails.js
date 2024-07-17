import NoResults from "./NoResults";
import { BsWind } from "react-icons/bs";

export default function TwentyfourHourForecastDetails({
  weatherData,
  twentyfourHourForecast,
}) {
  return (
    <div className="flex flex-col bg-common  w-full h-1/5  pt-4 px-8 my-2 flex-shrink-0">
      <p className="sub-size">24-Hour Forecast for {weatherData?.name}</p>
      <div className="h-bar" />
      {
        <span className="w-full h-full flex p-4 my-2 overflow-x-auto bg-common items-center">
          {twentyfourHourForecast ? (
            twentyfourHourForecast.hourly ? (
              twentyfourHourForecast?.hourly.map((weather) => (
                <span className="w-20 h-full flex flex-col justify-between bg-common p-2 items-center mx-2">
                  <span className="text-center flex flex-col">
                    <span className="flex justify-center">
                      <p className="text-xl">{weather?.temp}</p>
                      <p className="text-xs">℃</p>
                    </span>
                    <p className={`qi-${weather?.icon}`}></p>
                  </span>
                  <span className="text-center flex flex-col">
                    <span className="flex">
                      <BsWind />
                      <p className="text-xs">{weather?.windSpeed}m/s</p>
                    </span>
                    <p>{weather?.fxTime.split("T")[1].split("+")[0]}</p>
                  </span>
                </span>
              ))
            ) : (
              <NoResults />
            )
          ) : (
            <NoResults />
          )}
        </span>
      }
    </div>
  );
}
