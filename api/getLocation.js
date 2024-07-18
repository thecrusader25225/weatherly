if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
export default async function handler(req, res) {
  const { cityName, stateName, countryName } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=50&appid=${API_KEY}`
    );
    const data = await response.json();

    // Fetch weather data for each location in parallel
    const weatherPromises = data.map((location) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
      ).then((res) => res.json())
    );

    // Resolve all weather data fetches
    const weatherData = await Promise.all(weatherPromises);

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching geocoding data" });
  }
}
