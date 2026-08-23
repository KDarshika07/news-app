import { useState } from "react";

function Explanation({
  article,
  explanationType,
  onBack,
}) {
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");

  const explanationContent = {
    simple: {
      emoji: "🧒",
      label: "EXPLAINED SIMPLY",
      title: "Here's the story in simple terms",
      text:
        "Imagine this is a big conversation happening in the world. Something has changed, and that change could affect people, businesses, or governments. The important part is understanding what changed and why it matters.",
    },

    context: {
      emoji: "🎓",
      label: "THE BIGGER PICTURE",
      title: "Here's some context",
      text:
        "This story is part of a larger development. Looking at the background helps explain why this is happening now, what led to it, and what the possible consequences could be.",
    },

    executive: {
      emoji: "💼",
      label: "EXECUTIVE SUMMARY",
      title: "Here's what matters",
      text:
        "The key takeaway is that this development could have broader implications for businesses, markets, governments, and decision-makers. The immediate development is important, but its longer-term consequences are worth watching.",
    },
  };

  const content =
    explanationContent[explanationType] ||
    explanationContent.simple;

  const handleAsk = () => {
    if (!question.trim()) return;

    setAskedQuestion(question);
    setQuestion("");
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
            {content.text}
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
            />

            <button onClick={handleAsk}>
              →
            </button>

          </div>

          {askedQuestion && (
            <div className="conversation">

              <div className="user-question">
                {askedQuestion}
              </div>

              <div className="mock-answer">
                <span>✨</span>

                <p>
                  Great question! Once we connect Newsly
                  to the AI backend, I'll be able to give
                  you a personalised answer based on this
                  article.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Explanation;