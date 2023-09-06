import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', formData); // Update the endpoint to match the backend route
      const token = response?.data?.token; // Use optional chaining to access the 'token'
      if (token) {
        localStorage.setItem('token', token);
        onLogin();
      } else {
        console.error('Token not found in response');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data);
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
