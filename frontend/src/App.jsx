import { useState } from 'react';
import './App.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import NewsFeed from './pages/NewsFeed';
import ArticleDetail from './pages/ArticleDetail';
import Explanation from './pages/Explanation';
import Summarize from './pages/Summarize';
import Preferences from './pages/Preferences';
import Loader from './loader';

function App() {
  // -----------------------------------------
  // USER INFORMATION
  // -----------------------------------------

  const [profession, setProfession] = useState('');
  const [explanationLevel, setExplanationLevel] = useState('');
  const [genres, setGenres] = useState([]);

  // -----------------------------------------
  // PAGE / NAVIGATION STATE
  // -----------------------------------------

  const [page, setPage] = useState('welcome');

  const [onboardingDone, setOnboardingDone] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState(null);

  const [explanationType, setExplanationType] = useState(null);

  // -----------------------------------------
  // LOADER STATE
  // -----------------------------------------

  const [loading, setLoading] = useState(false);

  // -----------------------------------------
  // NAVIGATION WITH LOADER
  // -----------------------------------------

  const navigateWithLoader = (nextPage, delay = 1000) => {
    setLoading(true);

    setTimeout(() => {
      setPage(nextPage);
      setLoading(false);
    }, delay);
  };

  // -----------------------------------------
  // WELCOME PAGE
  // -----------------------------------------

  const handleGetStarted = () => {
    navigateWithLoader('onboarding');
  };

  const handleLogin = () => {
    navigateWithLoader('login');
  };

  // -----------------------------------------
  // ONBOARDING
  // -----------------------------------------

  const toggleGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((item) => item !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  const handleContinue = () => {
    setLoading(true);

    setTimeout(() => {
      setOnboardingDone(true);
      setPage('news');
      setLoading(false);
    }, 1200);
  };

  // -----------------------------------------
  // ARTICLE
  // -----------------------------------------

  const openArticle = (article) => {
    setSelectedArticle(article);

    navigateWithLoader('article');
  };

  // -----------------------------------------
  // EXPLANATION
  // -----------------------------------------

  const openExplanation = (type) => {
    setExplanationType(type);

    navigateWithLoader('explanation');
  };

  // -----------------------------------------
  // HOME / NEWS FEED
  // -----------------------------------------

  const goHome = () => {
    setSelectedArticle(null);
    setExplanationType(null);

    navigateWithLoader('news');
  };

  // -----------------------------------------
  // SUMMARIZE
  // -----------------------------------------

  const openSummarize = () => {
    navigateWithLoader('summarize');
  };

  // -----------------------------------------
  // PREFERENCES
  // -----------------------------------------

  const openPreferences = () => {
    navigateWithLoader('preferences');
  };

  // -----------------------------------------
  // LOGIN
  // -----------------------------------------

  const handleSuccessfulLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setOnboardingDone(true);
      setPage('news');
      setLoading(false);
    }, 1200);
  };

  const backToWelcome = () => {
    navigateWithLoader('welcome');
  };

  // -----------------------------------------
  // LOADER
  // -----------------------------------------

  /*
    This is checked first.

    Therefore, whenever loading === true,
    the Loader appears instead of the current page.
  */

  if (loading) {
    return <Loader />;
  }

  // -----------------------------------------
  // WELCOME PAGE
  // -----------------------------------------

  if (page === 'welcome') {
    return <Welcome onGetStarted={handleGetStarted} onLogin={handleLogin} />;
  }

  // -----------------------------------------
  // LOGIN PAGE
  // -----------------------------------------

  if (page === 'login') {
    return <Login onLogin={handleSuccessfulLogin} onBack={backToWelcome} />;
  }

  // -----------------------------------------
  // ONBOARDING PAGE
  // -----------------------------------------

  if (page === 'onboarding') {
    return (
      <div className="app">
        <div className="onboarding-card">
          <div className="header">
            <p className="eyebrow">WELCOME TO NEWSLY</p>

            <h1>
              Stay informed.
              <br />
              <span>And actually understand it.</span>
            </h1>

            <p className="subtitle">
              Tell us a little about yourself, and we'll explain the news just
              how you like it!
            </p>
          </div>

          {/* PROFESSION */}

          <div className="section">
            <label>What do you do?</label>

            <input
              type="text"
              placeholder="Enter your profession here"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>

          {/* EXPLANATION LEVEL */}

          <div className="section">
            <label>How would you like your news explained?</label>

            <div className="option-grid">
              <button
                className={
                  explanationLevel === "Explain like I'm 5"
                    ? 'option selected'
                    : 'option'
                }
                onClick={() => setExplanationLevel("Explain like I'm 5")}
              >
                <strong>Like I'm 5</strong>

                <span>Simple, clear & jargon-free</span>
              </button>

              <button
                className={
                  explanationLevel === 'College student'
                    ? 'option selected'
                    : 'option'
                }
                onClick={() => setExplanationLevel('College student')}
              >
                <strong>College student</strong>

                <span>Context without the complexity</span>
              </button>

              <button
                className={
                  explanationLevel === 'General audience'
                    ? 'option selected'
                    : 'option'
                }
                onClick={() => setExplanationLevel('General audience')}
              >
                <strong>General Reader</strong>

                <span>The important stuff, explained well</span>
              </button>

              <button
                className={
                  explanationLevel === 'C-suite executive'
                    ? 'option selected'
                    : 'option'
                }
                onClick={() => setExplanationLevel('C-suite executive')}
              >
                <strong>Executive</strong>

                <span>Concise, strategic & to the point</span>
              </button>
            </div>
          </div>

          {/* GENRES */}

          <div className="section">
            <label>What fields interest you the most?</label>

            <div className="genre-bar">
              {[
                'Technology',
                'Science',
                'Business',
                'Indian Politics',
                'World Politics',
                'Entertainment',
                'Sports',
              ].map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={
                    genres.includes(genre) ? 'genre_selected' : 'genre'
                  }
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* CONTINUE */}

          <button className="continue-button" onClick={handleContinue}>
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // ARTICLE PAGE
  // -----------------------------------------

  if (page === 'article' && selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={goHome}
        onExplain={openExplanation}
      />
    );
  }

  // -----------------------------------------
  // EXPLANATION PAGE
  // -----------------------------------------

  if (page === 'explanation' && selectedArticle) {
    return (
      <Explanation
        article={selectedArticle}
        explanationType={explanationType}
        onBack={() => navigateWithLoader('article')}
      />
    );
  }

  // -----------------------------------------
  // SUMMARIZE PAGE
  // -----------------------------------------

  if (page === 'summarize') {
    return <Summarize onBack={goHome} />;
  }

  // -----------------------------------------
  // PREFERENCES PAGE
  // -----------------------------------------

  if (page === 'preferences') {
    return (
      <Preferences
        profession={profession}
        explanationLevel={explanationLevel}
        genres={genres}
        setProfession={setProfession}
        setExplanationLevel={setExplanationLevel}
        setGenres={setGenres}
        onBack={goHome}
      />
    );
  }

  // -----------------------------------------
  // NEWS FEED
  // -----------------------------------------

  return (
    <NewsFeed
      onArticleClick={openArticle}
      onSummarize={openSummarize}
      onPreferences={openPreferences}
    />
  );
}

export default App;
