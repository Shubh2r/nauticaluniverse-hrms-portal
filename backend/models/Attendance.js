const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Half Day', 'Holiday'], 
    required: true 
  },
  checkIn: { type: Date },
  checkOut: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
