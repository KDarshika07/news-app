function Preferences({
  profession,
  explanationLevel,
  genres,
  setProfession,
  setExplanationLevel,
  setGenres,
  onBack,
}) {
  const allGenres = [
    "Technology",
    "Science",
    "Business",
    "Indian Politics",
    "World Politics",
    "Entertainment",
    "Sports",
  ];

  const toggleGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(
        genres.filter((item) => item !== genre)
      );
    } else {
      setGenres([...genres, genre]);
    }
  };

  const handleSavePreferences = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${API_URL}/preferences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profession: profession,
            explanation_level: explanationLevel,
            genres: genres,
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
          `Failed to save preferences: ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "Preferences saved:",
        data
      );

      // Go back to the news feed
      onBack();

    } catch (error) {
      console.error(
        "Error saving preferences:",
        error
      );

      alert(
        "Unable to save preferences. Please try again."
      );
    }
  };

  return (
    <div className="preferences-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <span>←</span>
        Back to your news
      </button>

      <div className="preferences-container">

        <p className="eyebrow">
          YOUR NEWSLY
        </p>

        <h1>
          Your preferences
        </h1>

        <p className="preferences-subtitle">
          Change how Newsly understands you.
        </p>

        <div className="preference-card">

          {/* Profession */}

          <div className="section">

            <label>
              What do you do?
            </label>

            <input
              type="text"
              value={profession}
              onChange={(e) =>
                setProfession(e.target.value)
              }
            />

          </div>

          {/* Explanation level */}

          <div className="section">

            <label>
              How should we explain your news?
            </label>

            <div className="option-grid">

              {[
                ["Like I'm 5", "Like I'm 5"],
                ["A college student", "College student"],
                ["General Reader", "General Reader"],
                ["C-suite executive", "Executive"],
              ].map(([value, label]) => (

                <button
                  key={value}
                  className={
                    explanationLevel === value
                      ? "option selected"
                      : "option"
                  }
                  onClick={() =>
                    setExplanationLevel(value)
                  }
                >
                  <strong>
                    {label}
                  </strong>
                </button>

              ))}

            </div>

          </div>

          {/* Genres */}

          <div className="section">

            <label>
              Your interests
            </label>

            <div className="genre-bar">

              {allGenres.map((genre) => (

                <button
                  key={genre}
                  className={
                    genres.includes(genre)
                      ? "genre_selected"
                      : "genre"
                  }
                  onClick={() =>
                    toggleGenre(genre)
                  }
                >
                  {genre}
                </button>

              ))}

            </div>

          </div>

          {/* Save */}

          <button
            className="continue-button"
            onClick={handleSavePreferences}
          >
            Save preferences ✓
          </button>

        </div>

      </div>

    </div>
  );
}

export default Preferences;