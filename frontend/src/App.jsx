import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Redirect unknown routes back to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;