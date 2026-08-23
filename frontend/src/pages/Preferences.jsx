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
          genres.filter(
            (item) => item !== genre
          )
        );
      } else {
        setGenres([
          ...genres,
          genre,
        ]);
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
  
            <div className="section">
  
              <label>
                How should we explain your news?
              </label>
  
              <div className="option-grid">
  
                {[
                  ["Explain like I'm 5", "Like I'm 5"],
                  ["College student", "College student"],
                  ["General audience", "General Reader"],
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
  
            <button
              className="continue-button"
              onClick={onBack}
            >
              Save preferences ✓
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default Preferences;