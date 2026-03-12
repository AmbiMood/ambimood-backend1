const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/musicController');

router.get('/recommend', getRecommendations);

module.exports = router;

