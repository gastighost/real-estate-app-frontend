import { useState, ChangeEvent, useEffect } from "react";

import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import api from "@/common/api";
import { toast } from "react-hot-toast";

interface SignupFormProps {
  deactivateSignup: () => void;
}

const SignupForm = (props: SignupFormProps) => {
  const { deactivateSignup } = props;

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (confirmPassword && formValues.password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [formValues.password, confirmPassword]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (formValues.password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      await api.signup(formValues);

      toast.success("Successfully signed up!");

      deactivateSignup();
    } catch (error: any) {
      toast.error(error.message || "Failed to signup");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: grey[50],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formValues.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <Typography color="red" display="flex" justifyContent="center">
                {error}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              autoComplete="current-email"
              value={formValues.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              autoComplete="current-phone"
              value={formValues.phone}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              className="text-white bg-sky-600 hover:bg-sky-500"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Button
              fullWidth
              className="text-white bg-sky-600 hover:bg-sky-500"
              sx={{ mt: 3, mb: 2 }}
              onClick={deactivateSignup}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupForm;
