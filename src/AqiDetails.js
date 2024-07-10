import { MdLocationPin } from "react-icons/md";

export default function AqiDetails({ weatherData, aqi }) {
  return (
    <span className="w-full h-[calc(40%)] bg-common flex flex-col p-4 mx-2">
      <p className="text-2xl">Air Quality Index</p>
      <span className="flex items-center">
        <MdLocationPin />
        <p>{weatherData.name}</p>
      </span>
      <div className="h-bar" />
      <div className="flex flex-col w-full h-full flex-shrink-0 overflow-y-auto">
        {aqi.list &&
          aqi.list.length > 0 &&
          Object.entries(aqi.list[0].components).map(([key, value]) => (
            <span className="flex bg-common w-full px-4 my-[calc(1%)] min-w-16 justify-between items-center overflow-y-auto">
              <p>{key}</p>
              <p>{value}</p>
            </span>
          ))}
      </div>
    </span>
  );
}
