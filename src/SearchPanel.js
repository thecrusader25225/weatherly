export default function SearchPanel({
  setCityName,
  setCountryName,
  fetchGeocodingData,
  locationSearchData,
  handleClickLocation,
}) {
  return (
    <div className="flex flex-col w-1/4 h-full bg-slate-400">
      <span>
        <input
          type="text"
          onChange={(e) => {
            setCityName(e.target.value);
            setCountryName("");
          }}
          className="text-black w-auto h-auto"
          placeholder="City"
        />
        <button className="border" onClick={fetchGeocodingData}>
          Fetch
        </button>
      </span>

      <div className="w-full h-auto flex flex-col ">
        {locationSearchData.map((location, index) => (
          <button
            key={index}
            className="border"
            onClick={() => handleClickLocation(location)}
          >
            {location.name}, {location.sys.country}
          </button>
        ))}
      </div>
    </div>
  );
}
