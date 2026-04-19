import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Typography, Button, Box, Snackbar, Alert } from "@mui/material";

function AdminDashboard() {
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ((role !== "ADMIN" && role !== "ROLE_ADMIN") || !token) {
      setToastMessage("Access Denied: You do not have ADMIN privileges.");
      setToastSeverity("error");
      setOpen(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, [role, token]);

  if ((role !== "ADMIN" && role !== "ROLE_ADMIN") || !token) {
    return (
      <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    );
  }

  const fetchAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToastMessage(res.data.message || "Admin data fetched successfully!");
      setToastSeverity("success");
      setOpen(true);
    } catch (err) {
      setToastMessage("Error fetching admin data: " + (err.response?.data?.message || err.message));
      setToastSeverity("error");
      setOpen(true);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <Container maxWidth="md" className="mt-5">
      <Card elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "#fff5f5" }}>
        <Typography variant="h3" color="error" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          Welcome! You are logged in with role: <strong>{role}</strong>
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="error" size="large" onClick={fetchAdmin}>
            Admin Data
          </Button>
          <Button variant="outlined" color="secondary" size="large" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Card>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminDashboard;
