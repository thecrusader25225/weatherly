import { BiSearch } from "react-icons/bi";
import "./SearchButton.css";

export default function SearchButton({ cityName, fetchGeocodingData }) {
  return (
    <div
      className="button cursor-pointer"
      onClick={cityName.length !== 0 ? fetchGeocodingData : null}
    >
      <div className="button-wrapper">
        <div className="text">Search</div>
        <span className="icon">
          <BiSearch />
        </span>
      </div>
    </div>
  );
}
