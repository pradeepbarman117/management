import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const CenteredContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  width: '100%',
  borderRadius: '16px'
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const authLogin = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth_login', { email: email, password: password })
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/dashboard');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('employee_id', res.data.employee_id);
          localStorage.setItem('department', res.data.department);
          localStorage.setItem('reporting_to', res.data.reporting_to);
          localStorage.setItem('reporting_to_id', res.data.reporting_to_id);
          localStorage.setItem('designation', res.data.designation);
          localStorage.setItem('profile', res.data.profile);
        } else {
          alert(res.data.Error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <CenteredContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </StyledForm>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account? <Link to={'/admin-signin'}>Sign Up</Link>
          </Typography>
        </Box>
      </StyledPaper>
    </CenteredContainer>
  );
};

export default authLogin;
