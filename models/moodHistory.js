const mongoose = require('mongoose');

const moodHistorySchema = new mongoose.Schema({
  userEmail: { 
    type: String, 
    required: true 
  },
  emotion: { 
    type: String, 
    required: true 
  },
  language: { 
    type: String, 
    required: true 
  },
  detectedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('MoodHistory', moodHistorySchema);