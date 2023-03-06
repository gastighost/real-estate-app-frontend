import { useState, ChangeEvent } from "react";

import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import api from "@/common/api";
import { toast } from "react-hot-toast";

interface SignupFormProps {
  deactivateSignup: () => void;
}

const SignupForm = (props: SignupFormProps) => {
  const { deactivateSignup } = props;

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

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
      await api.signup(formValues);

      toast.success("Successfully signed up!");

      deactivateSignup();
    } catch (error) {
      toast.error("Failed to signup");
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
            Sign in
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
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Button
              fullWidth
              variant="contained"
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
