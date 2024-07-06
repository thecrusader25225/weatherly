export default function App() {
  const API_KEY = "b82565c34cea20f860e1531e0d3a4597";
  let lat = 22;
  let lon = 88;
  let data = "";
  const fetchData = () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        data = res;
        console.log(data);
      });
  return (
    <>
      <div className="bg-slate-700 w-screen h-screen text-white">
        <button onClick={fetchData}>Fetch data</button>
      </div>
    </>
  );
}
