import { useState } from "react";

function ArticleDetail({
  article,
  onBack,
  onExplain,
}) {
  const [leaving, setLeaving] = useState(false);

  const handleBack = () => {
    setLeaving(true);

    setTimeout(() => {
      onBack();
    }, 350);
  };

  return (
    <div
      className={`article-detail-page ${
        leaving ? "page-leaving" : ""
      }`}
    >

      <button
        className="back-button"
        onClick={handleBack}
      >
        <span>←</span>
        Back to your news
      </button>

      <div className="article-detail">

        <p className="article-detail-category">
          {article.category}
        </p>

        <h1>
          {article.title}
        </h1>

        <div className="article-meta">
          <span>{article.source}</span>
          <span>·</span>
          <span>{article.time}</span>
        </div>

        <div className="article-detail-image">
          <span>{article.emoji}</span>
        </div>

        <p className="article-detail-description">
          {article.description}
        </p>

        <div className="explain-section">

          <p className="small-heading">
            ✨ MAKE IT MAKE SENSE
          </p>

          <h2>
            How would you like this explained?
          </h2>

          <div className="explanation-buttons">

            <button
              onClick={() =>
                onExplain("simple")
              }
            >
              <span>🧒</span>

              <div>
                <strong>
                  Like I'm 5
                </strong>

                <small>
                  Super simple & jargon-free
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                onExplain("context")
              }
            >
              <span>🎓</span>

              <div>
                <strong>
                  Give me more context
                </strong>

                <small>
                  Understand the bigger picture
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                onExplain("executive")
              }
            >
              <span>💼</span>

              <div>
                <strong>
                  Executive summary
                </strong>

                <small>
                  Just the important stuff
                </small>
              </div>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ArticleDetail;