import { BiUser } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Switch from "./Switch";

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  console.log(isDarkMode);
  return (
    <div className="fixed top-0 left-0 w-full h-16 backdrop-blur-lg z-50 flex justify-center items-center text-white ">
      <span className="flex  p-2 px-8 items-center  text-3xl">
        <TiWeatherPartlySunny className="p-1 text-5xl" />
        <p>Weatherly</p>
      </span>
      <span className="absolute right-0  p-2 px-8 flex items-center text-5xl">
        <span className="p-3">
          <Switch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </span>
        <a
          href="https://github.com/thecrusader25225/weather-app-2"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub className="p-3 hover:bg-white hover:bg-opacity-5 rounded-full duration-100 cursor-pointer" />
        </a>
        <BiUser className="p-3 hover:bg-common hover:bg-white hover:bg-opacity-5 rounded-full cursor-pointer duration-100" />
      </span>
    </div>
  );
}
