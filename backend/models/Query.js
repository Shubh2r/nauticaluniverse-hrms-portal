const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Resolved'], 
    default: 'Open' 
  },
  hrResponse: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Query', QuerySchema);
