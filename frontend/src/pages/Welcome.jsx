function Welcome({ onGetStarted, onLogin }) {
    return (
      <div className="welcome-page">
  
        {/* Decorative shapes */}
  
        <div className="welcome-shape shape-one"></div>
        <div className="welcome-shape shape-two"></div>
        <div className="welcome-shape shape-three"></div>
  
  
        <div className="welcome-content">
  
          {/* Logo */}
  
          <div className="welcome-logo">
            NEWSLY <span>✦</span>
          </div>
  
  
          {/* Main message */}
  
          <div className="welcome-text">
  
            <p className="welcome-eyebrow">
              YOUR PERSONAL NEWS COMPANION
            </p>
  
            <h1>
              The news is complicated.
              <br />
              <span>Understanding it doesn't have to be.</span>
            </h1>
  
            <p className="welcome-subtitle">
              Stay informed without drowning in headlines.
              Newsly brings you the stories that matter and
              explains them in a way that actually makes sense.
            </p>
  
          </div>
  
  
          {/* Buttons */}
  
          <div className="welcome-actions">
  
            <button
              className="welcome-primary"
              onClick={onGetStarted}
            >
              Get started
              <span>→</span>
            </button>
  
            <button
              className="welcome-login"
              onClick={onLogin}
            >
              Already have an account?
              <strong> Log in</strong>
            </button>
  
          </div>
  
  
          {/* Little visual */}
  
          <div className="welcome-decoration">
  
            <div className="floating-card card-one">
              <span>🌍</span>
              <p>World</p>
            </div>
  
            <div className="floating-card card-two">
              <span>💡</span>
              <p>Explained</p>
            </div>
  
            <div className="floating-card card-three">
              <span>📰</span>
              <p>Today</p>
            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default Welcome;