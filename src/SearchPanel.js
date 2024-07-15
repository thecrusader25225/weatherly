import { useState } from "react";

export default function SearchPanel({
  setCityName,
  setCountryName,
  fetchGeocodingData,
  locationSearchData,
  handleClickLocation,
  loading,
}) {
  return (
    <div className="flex flex-col w-1/4 h-full bg-common mx-2 py-4">
      <span className="flex w-full h-8 px-2">
        <input
          type="text"
          onChange={(e) => {
            setCityName(e.target.value);
            setCountryName("");
          }}
          className="text-white bg-transparent border border-slate-500 w-full h-auto ml-2 rounded-l-lg outline-none px-2"
          placeholder="Enter city name"
        />
        <button
          className="rounded-r-lg border mr-2 w-20"
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
