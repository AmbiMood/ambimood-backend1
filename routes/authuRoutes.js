const express = require('express');
const router = express.Router();
const { signup, verifyOTP, login, resendOTP } = require('../controllers/authController');
const MoodHistory = require('../models/moodHistory');

router.get('/mood-history/:email', async (req, res) => {
  try {
    const history = await MoodHistory
      .find({ userEmail: req.params.email })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/resend-otp', resendOTP);

module.exports = router;

