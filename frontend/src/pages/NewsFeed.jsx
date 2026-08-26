import { useEffect, useState } from "react";

function NewsFeed({
  onArticleClick,
  onSummarize,
  onPreferences,
}) {
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "For You",
    "Technology",
    "World",
    "Business",
    "Science",
    "Politics",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");

        // const response = await fetch(
        //   "http://127.0.0.1:8000/news?language=en"
        // );
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${API_URL}/news?language=en`
        );

        // if (!response.ok) {
        //   throw new Error("Failed to fetch news");
        // }
        if (!response.ok) {
            const errorText = await response.text();
          
            console.error("Backend response:", response.status, errorText);
          
            throw new Error(
              `Failed to fetch news: ${response.status}`
            );
          }

        const data = await response.json();

        const formattedArticles = data.map((article) => ({
          ...article,
          category: "NEWS",
          emoji: "📰",
          time: article.published_at
            ? new Date(article.published_at).toLocaleString()
            : "Recently",
        }));

        setArticles(formattedArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Unable to load news right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles =
    selectedCategory === "For You"
      ? articles
      : articles.filter(
          (article) =>
            article.category === selectedCategory.toUpperCase()
        );

  return (
    <div className="news-feed">

      <header className="feed-header">

        <div>
          <p className="eyebrow">YOUR DAILY NEWS</p>

          <h1>
            Your world,
            <br />
            <span>decoded. ✨</span>
          </h1>

          <p className="feed-subtitle">
            News selected for you, explained the way you like it.
          </p>
        </div>

        <div className="feed-actions">

          <button
            className="header-action"
            onClick={onSummarize}
          >
            ✨ Summarize
          </button>

          <button
            className="profile-circle"
            onClick={onPreferences}
          >
            👋
          </button>

        </div>

      </header>

      <div className="category-bar">

        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category active"
                : "category"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}

      </div>

      <section className="articles-section">

        <div className="section-heading">

          <div>
            <p className="small-heading">
              WHAT'S HAPPENING
            </p>

            <h2>
              Today's stories
            </h2>
          </div>

          <span className="article-count">
            {filteredArticles.length} stories
          </span>

        </div>

        <div className="article-grid">

          {loading ? (

            <div className="no-articles">
              <span>📰</span>

              <h3>
                Loading your news...
              </h3>

              <p>
                Finding stories for you ✨
              </p>
            </div>

          ) : error ? (

            <div className="no-articles">
              <span>😕</span>

              <h3>
                Something went wrong
              </h3>

              <p>
                {error}
              </p>
            </div>

          ) : filteredArticles.length > 0 ? (

            filteredArticles.map((article, index) => (

              <article
                className={
                  index === 0
                    ? "article-card featured"
                    : "article-card"
                }
                key={article.link || article.title}
              >

                <div className="article-image">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                    />
                  ) : (
                    <span>{article.emoji}</span>
                  )}
                </div>

                <div className="article-content">

                  <p className="article-category">
                    {article.category}
                  </p>

                  <h3>{article.title}</h3>

                  <p className="article-description">
                    {article.description ||
                      "No description available for this story."}
                  </p>

                  <div className="article-footer">

                    <span>
                      {article.source} · {article.time}
                    </span>

                    <button
                      onClick={() =>
                        onArticleClick(article)
                      }
                    >
                      Read →
                    </button>

                  </div>

                </div>

              </article>

            ))

          ) : (

            <div className="no-articles">
              <span>📰</span>

              <h3>
                No stories yet
              </h3>

              <p>
                We don't have any stories in this category right now.
              </p>
            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default NewsFeed;