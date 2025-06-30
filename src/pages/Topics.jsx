 import { useEffect, useState } from "react";
 import { fetchArticles, fetchTopics } from "../api";
 import '../css/App.css'

 function Topics() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopics()
        .then((topics) => {
        setTopics(topics);
        setLoading(false);
    })
    .catch((err) => {
        setError(err.message);
        setLoading(false);
    });
 }, []);

 if (loading) return <p>Loading Topics ..</p>
 if (error) return <p>Error Loading Topics: {error}</p>

return (
    <main>
        <h2>Topics</h2>
        <div className="topics-container">
            {topics.map((topic) => (
                <button key={topic.slug} 
        className="topic-button"
        style={{
  backgroundImage: `url(${topic.img_url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: '2rem',
  border: 'none',
  borderRadius: '8px',
  width: '100%',
  minHeight: '150px',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  fontWeight: 'bold',
  textShadow: '1px 1px 2px black',
  boxSizing: 'border-box'
}}
                >
                    {topic.slug}
                </button>
            ))}


        </div>
    </main>
)

}

export default Topics;