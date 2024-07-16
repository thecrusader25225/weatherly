import { useState } from "react";
import Loader from "./Loader";
import { CgClose } from "react-icons/cg";

export default function SearchPanel({
  cityName,
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

            if (!e.target.value) {
              locationSearchData.length = 0;
            }
          }}
          className="text-white bg-transparent border border-slate-500 w-full h-auto ml-2 rounded-l-lg outline-none px-2"
          placeholder="Enter city name"
        />
        <button
          className="rounded-r-lg border mr-2 w-20"
          onClick={cityName.length !== 0 ? fetchGeocodingData : null}
        >
          Fetch
        </button>
      </span>
      <span className="flex p-2 px-4 justify-center">
        <span className="h-bar inline" />
        <CgClose
          className="inline text-xl cursor-pointer"
          onClick={() => (locationSearchData.length = 0)}
        />
      </span>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-auto flex flex-col overflow-y-auto">
          {locationSearchData.map((location, index) => (
            <>
              <button
                key={index}
                className=" min-h-12 hover:bg-white hover:bg-opacity-5 justify-between flex items-center px-2"
                onClick={() => handleClickLocation(location)}
              >
                <p className="text-sm xl:text-lg break-all w-1/2 text-start">
                  {location?.name}, {location?.sys.country}
                </p>
                <span className="flex items-center ">
                  <img
                    src={`https://openweathermap.org/img/wn/${location?.weather[0]?.icon}.png`}
                    alt="weather"
                    className=""
                  />
                  <span className="flex items-start ">
                    <p className="text-sm xl:text-xl ">
                      {Math.round(location?.main?.temp - 273.15)}
                    </p>
                    <p className="text-[calc(10px)]"> ℃</p>
                  </span>
                </span>
              </button>
              {index === locationSearchData.length - 1 && (
                <p className="text-[calc(10px)] text-slate-400 text-center">
                  Click for details
                </p>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
