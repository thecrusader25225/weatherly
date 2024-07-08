export default function FiveDayForecastDetails({
  bulkWeatherData,
  fiveDayForecast,
}) {
  return (
    <div className="flex flex-col border w-full h-full min-h-1/2 flex-shrink-0">
      <p>
        5 day forecast for {bulkWeatherData.city && bulkWeatherData.city.name}
      </p>
      <div className="flex flex-row justify-between w-full h-full">
        <span className="flex flex-col">
          {fiveDayForecast.map(
            (data) =>
              data.dt_txt.includes("09:00:00") && (
                <span className="flex">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    className="w-8 h-8"
                    alt="Weather icon"
                  />
                  <p>{data.dt_txt}</p>
                </span>
              )
          )}
        </span>
        <span className="flex flex-col">
          {fiveDayForecast.map(
            (data) =>
              data.dt_txt.includes("21:00:00") && (
                <span className="flex">
                  <p>{data.dt_txt}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    className="w-8 h-8"
                    alt="Weather icon"
                  />
                </span>
              )
          )}
        </span>
      </div>
    </div>
  );
}
