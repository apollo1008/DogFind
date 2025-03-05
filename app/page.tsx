"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PetsIcon from "@mui/icons-material/Pets";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(name, email);
      if (!success)
        throw new Error("Login failed. Please check your credentials.");
      router.push("/dogs");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8 rounded-xl">
          <Box className="text-center mb-8">
            <Box className="flex justify-center mb-6">
              <Box className="bg-blue-100 p-4 rounded-full">
                <PetsIcon className="text-blue-600" sx={{ fontSize: 40 }} />
              </Box>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Find Dog
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box className="space-y-4">
              <TextField
                fullWidth
                id="name"
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: <PersonIcon color="action" className="mr-2" />
                }}
              />

              <TextField
                fullWidth
                id="email"
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <EmailIcon color="action" className="mr-2" />
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
