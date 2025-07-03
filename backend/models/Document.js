const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['pdf', 'text'],
    required: true
  },
  filePath: {
    type: String,
    required: function() {
      return this.type === 'pdf';
    }
  },
  rawText: {
    type: String,
    required: function() {
      return this.type === 'text';
    }
  },
  summary: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);
