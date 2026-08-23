import { useState } from "react";

function Summarize({ onBack }) {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSummarize = () => {
    if (!url.trim()) return;

    setSubmitted(true);
  };

  return (
    <div className="summarize-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <span>←</span>
        Back to your news
      </button>

      <div className="summarize-container">

        <p className="eyebrow">
          HAVE AN ARTICLE?
        </p>

        <h1>
          Bring it here.
          <br />
          <span>We'll make sense of it. ✨</span>
        </h1>

        <p className="summarize-subtitle">
          Paste a news article URL and Newsly will
          break it down for you.
        </p>

        <div className="url-box">

          <input
            type="url"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
          />

          <button onClick={handleSummarize}>
            Summarize →
          </button>

        </div>

        {submitted && (
          <div className="summarize-result">

            <div className="ai-badge">
              ✨ Newsly AI
            </div>

            <h2>
              Your article is ready to be decoded.
            </h2>

            <p>
              Tomorrow, this is where we'll connect
              the URL to your backend and generate
              the actual AI summary.
            </p>

            <div className="mock-summary-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Summarize;