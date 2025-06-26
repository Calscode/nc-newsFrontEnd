import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleArticle, fetchCommentsByArticle, patchVotes, postComment } from "../api";
import { useUser } from "../state/userContext";

function ArticleDetail() {
  const { article_id } = useParams();
  const { user } = useUser();

  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [errorArticle, setErrorArticle] = useState(null);

  const [voteChange, setVoteChange] = useState(0)
  const [voteError, setVoteError] = useState(null);
  
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  const [commentBody, setCommentBody] = useState("")
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleVote = (inc) => {
    if ((voteChange === 1 && inc === 1) || (voteChange === -1 && inc === -1)) return; // prevent double upvotes/downvotes
  
    setVoteChange((curr) => curr + inc);
    setVoteError(null);
  
    patchVotes(article_id, inc)
      .catch(() => {
        setVoteChange((curr) => curr - inc); // revert change
        setVoteError("Something went wrong. Please try again.");
      });
  };
  const handleCommentSubmit = () => {
    if (!user) {
      setPostError("You must be logged in to comment!");
      return;
    }
  
    setIsPosting(true);
    setPostError(null);
    setSuccessMessage("");
  
    postComment(article_id, {
      username: user.username, 
      body: commentBody,
    })
      .then((newComment) => {
        setComments((prev) => [newComment, ...prev]);
        setCommentBody("");
        setSuccessMessage("Comment posted!");
      })
      .catch(() => {
        setPostError("Failed to post comment. Try again.");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };
  useEffect(() => {
    fetchSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
        setLoadingArticle(false);
      })
      .catch((err) => {
        setErrorArticle(err.message);
        setLoadingArticle(false);
      });
  
    // Fetch comments
    fetchCommentsByArticle(article_id)
      .then((data) => {
        setComments(data);
        setLoadingComments(false);
      })
      .catch((err) => {
        setErrorComments(err.message);
        setLoadingComments(false);
      });
  }, [article_id]);

  if (loadingArticle) return <p>Loading...</p>;
  if (errorArticle) return <p>{error}</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <main className="article-detail-page">
    <div className="page-container">
    <section className="article-detail">
    <h2>{article.title}</h2>
    <p className="article-author">By {article.author}</p>
    <p className="article-topic">{article.topic}</p>
  
    <img
      className="article-image"
      src={article.article_img_url}
      alt={`Image for ${article.title}`}
    />
  
    <p className="article-body">{article.body}</p>
    <p className="article-votes">Votes: {article.votes + voteChange}</p>
    <div className="vote-buttons">
        <button onClick={() => handleVote(1)} disabled={voteChange === 1}>⬆️ Upvote</button>
        <button onClick={() => handleVote(-1)} disabled={voteChange === -1}>⬇️ Downvote</button>
        {voteError && <p className="error">{voteError}</p>}
    </div>
    </section>
    <div className="comments-section">
        <h3>Comments</h3>

    {loadingComments && <p>Loading comments...</p>}
    {errorComments && <p>Error loading comments: {errorComments}</p>}
    {!loadingComments && comments.length === 0 && <p>No comments yet.</p>}

    <div className="post-comment-form">
  <h4>Post a comment</h4>

  <textarea
    placeholder="Write your comment here..."
    value={commentBody}
    onChange={(e) => setCommentBody(e.target.value)}
    disabled={isPosting}
    rows={4}
  />

  <button
    disabled={isPosting}
    onClick={handleCommentSubmit}
  >
    {isPosting ? "Posting..." : "Submit Comment"}
  </button>

  {postError && <p className="error">{postError}</p>}
  {successMessage && <p className="success">{successMessage}</p>}
</div>

      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p><strong>{comment.author}</strong> says:</p>
            <p>{comment.body}</p>
            <p className="comment-votes">Votes: {comment.votes}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  </main>
  );
}

export default ArticleDetail;