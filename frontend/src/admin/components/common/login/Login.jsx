// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
      setAuthenticated(true); // Set authenticated state to true
    } catch (error) {
      console.error('Login failed', error.response); // Log the error response
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
