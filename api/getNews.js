if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
export default async function handler(req, res) {
  const { offset } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://api.worldnewsapi.com/search-news?api-key=${API_KEY}&text=weather&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    res.status(500).json({ error: "Unable to fetch AQI data" });
  }
}
