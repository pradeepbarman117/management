import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const CenteredContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  maxWidth: '600px',
  width: '100%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  borderRadius: '16px'
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const authSignin = () => {
  const [employee_id, setEmployee_id] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [reporting_to, setReporting_to] = useState('');
  const [reporting_to_id, setReporting_to_id] = useState('');
  const [profile_pic, setProfile_pic] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth_register', {
      employee_id,
      name,
      profile_pic,
      email,
      password,
      department,
      designation,
      reporting_to,
      reporting_to_id
    })
      .then(res => {
        if (res.data.Error === "Employee ID already exists") {
          alert("Employee ID already exists");
        } else {
          console.log('Data sent to server', res);
          navigate('/admin');
        }
      })
      .catch(err => { 
        alert("Something went wrong", err);
      });
  };

  return (
    <CenteredContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee ID"
                variant="outlined"
                required
                fullWidth
                value={employee_id}
                onChange={(e) => setEmployee_id(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Profile pic Url"
                variant="outlined"
                required
                fullWidth
                value={profile_pic}
                onChange={(e) => setProfile_pic(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Department"
                variant="outlined"
                required
                fullWidth
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Designation"
                variant="outlined"
                required
                fullWidth
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reporting To"
                variant="outlined"
                required
                fullWidth
                value={reporting_to}
                onChange={(e) => setReporting_to(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reporting To ID"
                variant="outlined"
                required
                fullWidth
                value={reporting_to_id}
                onChange={(e) => setReporting_to_id(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </StyledForm>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account? <Link to="/admin">Login</Link>.
          </Typography>
        </Box>
      </StyledPaper>
    </CenteredContainer>
  );
};

export default authSignin;
