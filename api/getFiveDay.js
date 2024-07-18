export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
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
