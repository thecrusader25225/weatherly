if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const API_KEY = process.env.UV_API_KEY;

  try {
    const response = await fetch(
      `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
      {
        headers: {
          "x-access-token": API_KEY,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch uv data" });
  }
}
