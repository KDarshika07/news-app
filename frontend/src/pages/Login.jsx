function Login({ onLogin, onBack }) {
    return (
      <div className="login-page">
  
        {/* Decorative background shapes */}
  
        <div className="login-shape login-shape-one"></div>
        <div className="login-shape login-shape-two"></div>
  
  
        <div className="login-card">
  
          {/* Logo */}
  
          <div className="login-logo">
            NEWSLY <span>✦</span>
          </div>
  
  
          {/* Header */}
  
          <div className="login-header">
  
            <p className="login-eyebrow">
              WELCOME BACK
            </p>
  
            <h1>
              Good to see you
              <br />
              <span>again. ✨</span>
            </h1>
  
            <p>
              Log in to pick up right where you left off.
            </p>
  
          </div>
  
  
          {/* Form */}
  
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
  
            <div className="login-field">
  
              <label>
                Email address
              </label>
  
              <input
                type="email"
                placeholder="you@example.com"
                required
              />
  
            </div>
  
  
            <div className="login-field">
  
              <div className="password-label">
  
                <label>
                  Password
                </label>
  
                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>
  
              </div>
  
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
  
            </div>
  
  
            <button
              type="submit"
              className="login-button"
            >
              Log in
              <span>→</span>
            </button>
  
          </form>
  
  
          {/* Divider */}
  
          <div className="login-divider">
            <span>or</span>
          </div>
  
  
          {/* Social login */}
  
          <button
            type="button"
            className="google-button"
            onClick={onLogin}
          >
            <span className="google-icon">
              G
            </span>
  
            Continue with Google
          </button>
  
  
          {/* Sign up */}
  
          <p className="signup-text">
            Don't have an account?
  
            <button
              type="button"
              onClick={onBack}
            >
              Get started
            </button>
          </p>
  
  
        </div>
  
      </div>
    );
  }
  
  export default Login;