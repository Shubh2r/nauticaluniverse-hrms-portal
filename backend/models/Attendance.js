const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Leave'], 
    default: 'Present' 
  },
  checkInTime: { type: Date },
  checkOutTime: { type: Date }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
