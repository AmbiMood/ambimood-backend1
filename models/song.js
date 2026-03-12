const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  emotion: { 
    type: String, 
    required: true,
    enum: ['happy', 'sad', 'angry', 'disgusted', 'fearful', 'neutral', 'surprised', 'calm', 'energetic', 'romantic']
  },
  language: {
    type: String,
    required: true,
    enum: ['tamil', 'hindi', 'english', 'telugu']
  },
  spotifyUrl: { type: String },  // Spotify song link
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);