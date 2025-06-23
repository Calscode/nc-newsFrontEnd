import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-project-q9w2.onrender.com/api", 
});

export const fetchArticles = () => api.get("/articles").then((res) => res.data.articles);


export function fetchSingleArticle(article_id) {
  return api.get(`/articles/${article_id}`).then((res) => res.data.article);
}

export function fetchCommentsByArticle(article_id) {
  return api.get(`/articles/${article_id}/comments`).then((res) => res.data.comments)
}

export const patchVotes = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then((res) => res.data.article);
};
export const postComment = (article_id, newComment) => {
  return api
    .post(`/articles/${article_id}/comments`, newComment)
    .then((res) => res.data.comment);
};