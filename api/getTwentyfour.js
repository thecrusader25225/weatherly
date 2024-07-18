const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { lat, lon } = req.query;
  const API_KEY = process.env.qWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://devapi.qweather.com/v7/weather/24h?location=${lon},${lat}&key=${API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch 24hour weather data" });
  }
};
