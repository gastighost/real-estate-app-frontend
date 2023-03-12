import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import toast from "react-hot-toast";

import api from "@/common/api";
import { getLoggedInUser } from "@/store/users";
import { AppDispatch } from "@/store/store";

interface LoginFormProps {
  activateSignup: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { activateSignup } = props;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      await api.login(username, password);

      dispatch(getLoggedInUser());

      toast.success("Successfully logged in!");

      router.push("/properties/");
    } catch (error) {
      toast.error("Wrong credentials. Please try again.");
    } finally {
      setUsername("");
      setPassword("");
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
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
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
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              className="text-white bg-sky-600 hover:bg-sky-500"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Button
              fullWidth
              className="text-white bg-sky-600 hover:bg-sky-500"
              sx={{ mt: 3, mb: 2 }}
              onClick={activateSignup}
            >
              Signup instead
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
