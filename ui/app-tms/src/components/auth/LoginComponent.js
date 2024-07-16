import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link, Box, Avatar, CssBaseline, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { loginAPICall, saveLoggedInUser, storeToken } from '../../services/AuthService';

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: '40px',
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)'
}));

const LoginComponent = () => {

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loginInputs, setLoginInputs] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const validateForm = () => {
    const newErrors = {};
    if (!loginInputs.usernameOrEmail) newErrors.usernameOrEmail = 'Username or email is required';
    if (!loginInputs.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  // input change func
  const handleChange = (e) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: ''
    }));
  };

  async function handleLoginForm(e) {
    e.preventDefault();

    setErrors({});
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setAuthError(''); // Clear previous auth error

    await loginAPICall(loginInputs).then((response) => {
      console.log(response.data);

      const token = 'Basic ' + window.btoa(loginInputs.usernameOrEmail + ":" + loginInputs.password);
      storeToken(token);

      saveLoggedInUser(loginInputs.usernameOrEmail);
      navigator("/view-task");

      window.location.reload(false);
    }).catch(error => {
      setAuthError('Invalid username or password. Please try again.');
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CustomPaper elevation={6}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {authError && <Alert severity="error">{authError}</Alert>}
        <Box component="form" onSubmit={handleLoginForm} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="usernameOrEmail"
            autoComplete="email"
            autoFocus
            value={loginInputs.usernameOrEmail}
            onChange={handleChange}
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginInputs.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
          <Link href="/register" variant="body2" style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </CustomPaper>
    </Container>
  );
};

export default LoginComponent;