import { useState } from "react";

function NewsFeed({
  onArticleClick,
  onSummarize,
  onPreferences,
}) {
  const [selectedCategory, setSelectedCategory] = useState("For You");

  const articles = [
    {
      category: "TECHNOLOGY",
      title: "AI is changing the way people work. Here's what comes next.",
      description:
        "Artificial intelligence is moving beyond chatbots and becoming part of everyday work, from coding to research and design.",
      source: "Reuters",
      time: "2 hours ago",
      emoji: "🤖",
    },
    {
      category: "WORLD",
      title: "A major shift in global trade is underway.",
      description:
        "Countries are rethinking how they trade with one another as businesses adapt to a changing global economy.",
      source: "BBC",
      time: "4 hours ago",
      emoji: "🌍",
    },
    {
      category: "SCIENCE",
      title: "Scientists discover something fascinating about our planet.",
      description:
        "A new study is giving researchers a better understanding of how our planet is changing.",
      source: "National Geographic",
      time: "6 hours ago",
      emoji: "🔬",
    },
    {
      category: "BUSINESS",
      title: "Markets are adapting to a rapidly changing economy.",
      description:
        "Businesses around the world are adjusting their strategies as economic conditions continue to evolve.",
      source: "Bloomberg",
      time: "8 hours ago",
      emoji: "📈",
    },
    {
      category: "POLITICS",
      title: "Governments face new challenges this week.",
      description:
        "Political leaders are responding to developments that could shape policy and international relations.",
      source: "The Guardian",
      time: "10 hours ago",
      emoji: "🏛️",
    },
  ];

  const filteredArticles =
    selectedCategory === "For You"
      ? articles
      : articles.filter(
          (article) =>
            article.category === selectedCategory.toUpperCase()
        );

  const categories = [
    "For You",
    "Technology",
    "World",
    "Business",
    "Science",
    "Politics",
  ];

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

          {filteredArticles.length > 0 ? (

            filteredArticles.map((article, index) => (

              <article
                className={
                  index === 0
                    ? "article-card featured"
                    : "article-card"
                }
                key={article.title}
              >

                <div className="article-image">
                  <span>{article.emoji}</span>
                </div>

                <div className="article-content">

                  <p className="article-category">
                    {article.category}
                  </p>

                  <h3>{article.title}</h3>

                  <p className="article-description">
                    {article.description}
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