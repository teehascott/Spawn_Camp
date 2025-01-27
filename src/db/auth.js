const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret

// Register User
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: 'User registration failed' });
    }
  })
);

// Login User
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
    }
  })
);

// Get Logged-in User
router.get(
  '/me',
  asyncHandler(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      res.json(user);
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  })
);

module.exports = router;
