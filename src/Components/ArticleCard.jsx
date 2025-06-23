import { Link } from "react-router-dom";

function ArticleCard({ article }) {
    return (
      <div className="article-card">
        <Link to={`/articles/${article.article_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{article.title}</h3>
          <p>by {article.author}</p>
          <img
            src={article.article_img_url}
            alt={`Image for article titled ${article.title}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <p>Topic: {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</p>
          <p>Votes: {article.votes}</p>
        </Link>
      </div>
    );
  }
  
export default ArticleCard;
