import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [registrationStatus, setRegistrationStatus] = useState(null); // Added registrationStatus state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('/auth/register', formData);
      setRegistrationStatus('success'); // Set registrationStatus to 'success' upon successful registration
      console.log('Registration successful');
    } catch (error) {
      setRegistrationStatus('error'); // Set registrationStatus to 'error' if registration fails
      console.error('Registration failed:', error.response?.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {registrationStatus === 'success' && <p>Registration successful! You can now login.</p>}
      {registrationStatus === 'error' && <p>Registration failed. Please try again.</p>}
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
