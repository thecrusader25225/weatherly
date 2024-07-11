import { MdLocationPin } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
export default function AqiDetails({ weatherData, aqi }) {
  return (
    <div className="w-full h-1/4  bg-common flex px-2 my-2 items-center">
      <div className="w-24 h-16 flex-shrink-0 m-1 text-xl lg:text-xl xl:text-2xl flex items-center justify-center bg-common">
        <p>AQI: {aqi?.list[0]?.main?.aqi}</p>
        <LuLeaf />
      </div>
      <div className="w-0.5 h-[calc(80%)] bg-white m-2 px-0.5 rounded-2xl" />
      <span className="w-full h-full overflow-x-auto">
        <div className="flex w-full h-full flex-shrink-0 items-center">
          {aqi.list &&
            aqi.list.length > 0 &&
            Object.entries(aqi.list[0].components).map(([key, value]) => (
              <span className="flex flex-col bg-white bg-opacity-5 w-14 h-14 rounded-full justify-center items-center overflow-y-auto flex-shrink-0 text-sm m-1">
                <p className="font-bold">{key.toUpperCase()}</p>
                <p>{value}</p>
              </span>
            ))}
        </div>
      </span>
    </div>
  );
}
