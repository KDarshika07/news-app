import { useState } from "react";

function Explanation({
  article,
  explanationType,
  onBack,
}) {
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const explanationContent = {
    simple: {
      emoji: "🧒",
      label: "EXPLAINED SIMPLY",
      title: "Here's the story in simple terms",
    },

    context: {
      emoji: "🎓",
      label: "THE BIGGER PICTURE",
      title: "Here's some context",
    },

    executive: {
      emoji: "💼",
      label: "EXECUTIVE SUMMARY",
      title: "Here's what matters",
    },
  };

  const content =
    explanationContent[explanationType] ||
    explanationContent.simple;

  const getAudience = () => {
    if (explanationType === "simple") {
      return "like I am 5";
    }

    if (explanationType === "executive") {
      return "C-suite executive";
    }

    return "A college student";
  };

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question.trim();

    setAskedQuestion(currentQuestion);
    setQuestion("");
    setAnswer("");
    setError("");
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${API_URL}/ask-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: article.link,
            question: currentQuestion,
            audience: getAudience(),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Backend response:",
          response.status,
          errorText
        );

        throw new Error(
          `Failed to get answer: ${response.status}`
        );
      }

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {
      console.error("Error asking AI:", error);

      setError(
        "I couldn't answer that right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explanation-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <span>←</span>
        Back to article
      </button>

      <div className="explanation-container">

        <div className="explanation-header">

          <span className="explanation-emoji">
            {content.emoji}
          </span>

          <p className="small-heading">
            {content.label}
          </p>

          <h1>
            {content.title}
          </h1>

          <p className="explaining-article">
            {article.title}
          </p>

        </div>

        <div className="ai-explanation-card">

          <div className="ai-badge">
            ✨ Newsly AI
          </div>

          <p>
            Your AI explanation will appear here.
          </p>

        </div>

        <div className="ask-section">

          <p className="small-heading">
            STILL CONFUSED?
          </p>

          <h2>
            Ask me anything.
          </h2>

          <div className="question-box">

            <input
              type="text"
              placeholder="Ask something about this story..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAsk();
                }
              }}
              disabled={loading}
            />

            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
            >
              {loading ? "..." : "→"}
            </button>

          </div>

          {askedQuestion && (
            <div className="conversation">

              <div className="user-question">
                {askedQuestion}
              </div>

              <div className="mock-answer">
                <span>✨</span>

                <div>
                  {loading ? (
                    <p>
                      Newsly is thinking... ✨
                    </p>
                  ) : error ? (
                    <p>
                      {error}
                    </p>
                  ) : (
                    <p>
                      {answer}
                    </p>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Explanation;