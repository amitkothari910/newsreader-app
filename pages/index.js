import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news?category=${category}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h1>Top News - {category}</h1>

      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="health">Health</option>
      </select>

      <ul>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))
        ) : (
          <p>No news found.</p>
        )}
      </ul>
    </div>
  );
}
