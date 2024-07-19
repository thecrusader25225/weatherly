import Input from "./Input";
import Loader from "./Loader";
import NoResults from "./NoResults";
import SearchButton from "./SearchButton";

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
      <span className="flex w-full h-8 px-2 items-center justify-between">
        <Input
          setCityName={setCityName}
          setCountryName={setCountryName}
          locationSearchData={locationSearchData}
        />
        <SearchButton
          cityName={cityName}
          fetchGeocodingData={fetchGeocodingData}
        />
      </span>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : locationSearchData.length !== 0 ? (
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
      ) : (
        <NoResults />
      )}
    </div>
  );
}
