import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Typography, TextField, Button, Box } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      // Use the proper login endpoint for the JWT backend
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });

      if (res.status === 200) {
        const token = res.data.token;
        const role = res.data.role; // Assuming backend returns role or we infer it
        
        let finalRole = role ? role.replace("ROLE_", "") : (username.includes("admin") ? "ADMIN" : "USER");
        
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("role", finalRole);

        if (finalRole === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      }
    } catch (err) {
      setError("Invalid credentials or unauthorized.");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <Card elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(255, 255, 255, 0.9)" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Enter your credentials to access the RBAC system.
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField 
            label="Username" 
            variant="outlined" 
            fullWidth 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={login}
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
