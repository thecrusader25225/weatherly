import NoResults from "./NoResults";
import { BsWind } from "react-icons/bs";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useRef } from "react";

export default function TwentyfourHourForecastDetails({
  weatherData,
  twentyfourHourForecast,
}) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col bg-common  w-full h-1/5  pt-4 px-8 my-2 flex-shrink-0">
      <p className="sub-size">24-Hour Forecast for {weatherData?.name}</p>
      <div className="h-bar" />

      <span className="w-full h-full flex p-4 my-2  bg-common items-center ">
        <BiLeftArrow
          className="text-5xl hover:bg-white hover:bg-opacity-10 duration-100 rounded-full cursor-pointer p-2"
          onClick={scrollLeft}
        />
        <span
          className="flex w-full h-full overflow-x-auto"
          ref={scrollContainerRef}
        >
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
        <BiRightArrow
          className="text-5xl hover:bg-white hover:bg-opacity-10 duration-100 rounded-full cursor-pointer p-2"
          onClick={scrollRight}
        />
      </span>
    </div>
  );
}
