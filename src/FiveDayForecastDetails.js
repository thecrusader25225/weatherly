export default function FiveDayForecastDetails({
  bulkWeatherData,
  fiveDayForecast,
}) {
  return (
    <div className="flex flex-col bg-common  w-full h-full p-4">
      <p className="text-3xl">
        5-Day Forecast for {bulkWeatherData.city && bulkWeatherData.city.name}
      </p>
      <div className="w-full h-0.5 bg-white" />
      <div className="flex flex-row justify-between w-full h-full">
        <span className="flex flex-col w-1/2">
          {fiveDayForecast.map(
            (data) =>
              data.dt_txt.includes("09:00:00") && (
                <span className="flex bg-common my-1 w-full">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    className="w-8 h-8"
                    alt="Weather"
                  />
                  <p>
                    {data.dt_txt.split(" ")[0].split("-")[1] +
                      "-" +
                      data.dt_txt.split(" ")[0].split("-")[2]}
                  </p>
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
