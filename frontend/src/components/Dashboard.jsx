import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");

  const [profileData, setProfileData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: "Bearer " + token },
      });
      setProfileData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        sessionStorage.clear();
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Error fetching profile: " + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchAdminDashboard = async () => {
    setLoadingAdmin(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:8080/api/admin/dashboard", {
        headers: { Authorization: "Bearer " + token },
      });
      setAdminData(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("⛔ Access Denied — You do not have ADMIN privileges to access this resource.");
      } else if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        sessionStorage.clear();
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Error: " + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoadingAdmin(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <div className="dash-page">
      {/* Dash header */}
      <div className="dash-header">
        <div className="dash-header-inner">
          <div>
            <h1>Protected Dashboard</h1>
            <p>Authenticated session for <strong>{username}</strong></p>
          </div>
          <button className="btn-outline btn-danger dash-logout" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="dash-body">
        {/* Session info cards */}
        <div className="dash-info-grid">
          <div className="dash-info-card">
            <span className="dash-info-icon">👤</span>
            <div>
              <small>Logged in as</small>
              <strong>{username}</strong>
            </div>
          </div>
          <div className="dash-info-card">
            <span className="dash-info-icon">🏷️</span>
            <div>
              <small>Role</small>
              <strong className={`dash-role-tag ${role === "ROLE_ADMIN" ? "admin" : ""}`}>
                {role}
              </strong>
            </div>
          </div>
          <div className="dash-info-card">
            <span className="dash-info-icon">🔑</span>
            <div>
              <small>JWT Token</small>
              <strong className="dash-token-preview">{token.slice(0, 20)}…</strong>
            </div>
          </div>
          <div className="dash-info-card">
            <span className="dash-info-icon">💾</span>
            <div>
              <small>Storage</small>
              <strong>sessionStorage</strong>
            </div>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="auth-alert auth-alert-error dash-alert">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Action cards */}
        <div className="dash-actions-grid">
          {/* User profile card */}
          <div className="dash-action-card">
            <div className="dash-action-header user">
              <h3>📋 User Profile</h3>
              <span className="dash-endpoint">GET /api/user/profile</span>
            </div>
            <p className="dash-action-desc">
              Fetch your authenticated user profile. Accessible by <strong>USER</strong> and <strong>ADMIN</strong> roles.
            </p>
            <button
              className="btn-primary"
              onClick={fetchProfile}
              disabled={loadingProfile}
            >
              {loadingProfile ? <span className="auth-spinner"></span> : "Fetch Profile Data"}
            </button>

            {profileData && (
              <div className="dash-response">
                <div className="dash-response-header">
                  <span className="dash-status success">200 OK</span>
                  <span>Response</span>
                </div>
                <pre>{JSON.stringify(profileData, null, 2)}</pre>
              </div>
            )}
          </div>

          {/* Admin dashboard card */}
          <div className="dash-action-card">
            <div className="dash-action-header admin">
              <h3>🛡️ Admin Dashboard</h3>
              <span className="dash-endpoint">GET /api/admin/dashboard</span>
            </div>
            <p className="dash-action-desc">
              Access admin-only data. Requires <strong>ADMIN</strong> role. Users with USER role will receive <code>403 Forbidden</code>.
            </p>
            <button
              className="btn-primary"
              onClick={fetchAdminDashboard}
              disabled={loadingAdmin}
            >
              {loadingAdmin ? <span className="auth-spinner"></span> : "Fetch Admin Data"}
            </button>

            {adminData && (
              <div className="dash-response">
                <div className="dash-response-header">
                  <span className="dash-status success">200 OK</span>
                  <span>Response</span>
                </div>
                <pre>{JSON.stringify(adminData, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Token inspector */}
        <div className="dash-token-section">
          <h3>🔍 Session Token Inspector</h3>
          <p>Your JWT token stored in <code>sessionStorage</code>:</p>
          <div className="dash-token-box">
            <code>{token}</code>
          </div>
          <p className="dash-token-note">
            ℹ️ This token is sent as <code>Authorization: Bearer &lt;token&gt;</code> header with every protected API request.
            Logging out clears the session via <code>sessionStorage.removeItem("token")</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
