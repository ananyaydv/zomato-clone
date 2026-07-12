const {
  CreateUser,
  GetAllUsers,
  DeleteUser,
  LoginUser
} = require('../Controller/UserController');

const express = require('express');
const upload = require('../Midleware/UploadMidleware');
const { authMiddleware } = require('../Midleware/AuthMilderware');

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Users API is working"
  });
});

// Signup
router.post('/signup', upload.single('image'), CreateUser);

// Login
router.post('/login', LoginUser);

// Get all users
router.get('/all', authMiddleware, GetAllUsers);

// Current logged in user
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Delete user
router.delete('/:id', authMiddleware, DeleteUser);

module.exports = router;