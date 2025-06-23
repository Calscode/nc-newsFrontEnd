import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles } from "../api"; 

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
    .then((articles) => {
          console.log("First Article:", articles[0]);
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;

  if (error) return <p>Error loading articles: {error}</p>;

  return (
    <main>

      <h2>Cals News of the World</h2>
      <p>Welcome to the best news in the world!</p>
      <p>Find out about everything</p>
      <p>News news news!</p>

      <div className="button-group">
        <Link to="/topics">
          <button className="button">Topics</button>
        </Link>
        <Link to="/articles">
          <button className="button">Articles</button>
        </Link>
      </div>


      {articles.length > 0 && (
        <div className="article-preview">
            <h2>Today's Hot Article</h2>
          <h3>{articles[0].title}</h3>
          <p>by {articles[0].author}</p>
          <img src={articles[0].article_img_url} 
          alt={`Image for article titled ${articles[0].title}`} 
          style={{ maxWidth: "100%", height: "auto" }} 
          />
        </div>
      )}
    </main>
  );
}

export default Home;