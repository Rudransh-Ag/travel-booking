import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("role", res.data.role);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left — decorative panel */}
        <div className="auth-panel">
          <div className="auth-panel-content">
            <span className="auth-panel-icon">🔐</span>
            <h2>Welcome Back</h2>
            <p>Sign in to access your protected dashboard and manage your travel bookings securely.</p>
            <div className="auth-panel-features">
              <div className="auth-feature"><span>✔</span> JWT Session Authentication</div>
              <div className="auth-feature"><span>✔</span> Role-Based Access Control</div>
              <div className="auth-feature"><span>✔</span> Secure Token Storage</div>
            </div>
          </div>
        </div>

        {/* Right — login form */}
        <div className="auth-form-wrap">
          <div className="auth-form-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to continue</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={login} className="auth-form">
            <div className="auth-field">
              <label htmlFor="username">Username</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">👤</span>
                <input
                  id="username"
                  type="text"
                  placeholder="e.g. user1 or admin1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary full-width auth-submit"
              disabled={loading || !username || !password}
            >
              {loading ? (
                <span className="auth-spinner"></span>
              ) : (
                <>Sign In →</>
              )}
            </button>
          </form>

          <div className="auth-demo-creds">
            <p className="auth-demo-title">Demo Credentials</p>
            <div className="auth-demo-grid">
              <div className="auth-demo-card" onClick={() => { setUsername("user1"); setPassword("user123"); }}>
                <span className="auth-demo-role">USER</span>
                <span className="auth-demo-user">user1 / user123</span>
              </div>
              <div className="auth-demo-card" onClick={() => { setUsername("admin1"); setPassword("admin123"); }}>
                <span className="auth-demo-role admin">ADMIN</span>
                <span className="auth-demo-user">admin1 / admin123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
