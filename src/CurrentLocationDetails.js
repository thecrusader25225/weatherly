export default function CurrentLocationDetails({ loading, weatherData }) {
  return (
    <div className="flex w-full h-full border min-h-1/2 flex-shrink-0">
      {loading && <p>Loading...</p>}
      {weatherData.coord ? (
        <span className="flex flex-col">
          <p>
            {weatherData.name}, {weatherData.sys.country}
          </p>
          <p>Coordinates</p>
          <p>Latitude: {weatherData.coord.lat}</p>
          <p>Longitude: {weatherData.coord.lon}</p>
        </span>
      ) : (
        <p>Search for a location</p>
      )}
    </div>
  );
}
