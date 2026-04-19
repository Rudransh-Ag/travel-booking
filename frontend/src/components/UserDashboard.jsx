import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Typography, Button, Box, Snackbar, Alert } from "@mui/material";

function UserDashboard() {
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  if (!role || !token) {
    window.location.href = "/";
    return null;
  }

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToastMessage(res.data.message || "User data fetched successfully!");
      setToastSeverity("success");
      setOpen(true);
    } catch (err) {
      setToastMessage("Error fetching profile: " + (err.response?.data?.message || err.message));
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
      <Card elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h3" color="primary" gutterBottom>
          User Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          Welcome! You are logged in with role: <strong>{role}</strong>
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="success" size="large" onClick={fetchData}>
            Get Profile
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

export default UserDashboard;
