import "./Input.css";
export default function Input({
  setCityName,
  setCountryName,
  locationSearchData,
}) {
  return (
    <div class="textInputWrapper">
      <input
        placeholder="Search location"
        type="text"
        class="textInput"
        onChange={(e) => {
          setCityName(e.target.value);
          setCountryName("");

          if (!e.target.value) {
            locationSearchData.length = 0;
          }
        }}
      />
    </div>
  );
}
