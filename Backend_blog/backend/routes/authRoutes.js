const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Check if the provided password matches the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    
    // If the password is invalid, return an error
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, 'your_secret_key');

    // Send the token in the response header
    res.header('Authorization', token).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    console.log('Login data:', formData);

  }
});

module.exports = router;
