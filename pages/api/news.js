// pages/api/news.js

export default async function handler(req, res) {
  const { category = "general" } = req.query;

  try {
    const apiKey = process.env.NEWSAPI_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "NEWSAPI_KEY is missing in environment variables" });
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch news from NewsAPI" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
