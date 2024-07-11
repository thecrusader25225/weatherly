export default function SearchPanel({
  setCityName,
  setCountryName,
  fetchGeocodingData,
  locationSearchData,
  handleClickLocation,
}) {
  return (
    <div className="flex flex-col w-1/4 h-full bg-common mx-2 py-4">
      <span className="flex w-full ">
        <input
          type="text"
          onChange={(e) => {
            setCityName(e.target.value);
            setCountryName("");
          }}
          className="text-black w-full h-auto ml-2 rounded-l-lg"
          placeholder="Search for a City"
        />
        <button
          className="rounded-r-lg border mr-2"
          onClick={fetchGeocodingData}
        >
          Fetch
        </button>
      </span>

      <div className="w-full h-auto flex flex-col overflow-y-auto">
        {locationSearchData.map((location, index) => (
          <button
            key={index}
            className=" min-h-12 hover:bg-white hover:bg-opacity-5"
            onClick={() => handleClickLocation(location)}
          >
            {location.name}, {location.sys.country}
          </button>
        ))}
      </div>
    </div>
  );
}
