const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch 5day weather data" });
  }
};
