const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { offset } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://api.worldnewsapi.com/search-news?api-key=${API_KEY}&text=weather&offset=${offset}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
};
