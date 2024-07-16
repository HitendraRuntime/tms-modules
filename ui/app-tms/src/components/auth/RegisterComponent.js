// components/Register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link, Box, Avatar, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registerAPICall } from '../../services/AuthService';
import { validateForm } from '../../services/UtilService';
import { NETWORK_ERROR } from '../../services/CommonService';

const RegisterComponent = () => {

  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState('');
  const [registerInputs, setRegisterInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  // input change func
  const handleChange = (e) => {
    setRegisterInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: ''
    }));
  };

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    console.log(registerInputs);

    setErrors({});
    const formErrors = validateForm(registerInputs);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setRegistrationError(''); // Clear previous error
    debugger;
    registerAPICall(registerInputs).then((response) => {
      console.log(response.data);
    }).catch(error => {
      setRegistrationError(NETWORK_ERROR);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration Form
          </Typography>
          {registrationError && <Alert severity="error">{registrationError}</Alert>}
          <Box component="form" onSubmit={handleRegistrationSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={registerInputs.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={registerInputs.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={registerInputs.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={registerInputs.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Link href="/" variant="body2">
              Already registered? Login Here
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterComponent;