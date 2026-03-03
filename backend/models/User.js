const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Employee', 'Manager', 'HR', 'Admin'], 
    default: 'Employee' 
  },
  department: { type: String },       // e.g. HR, IT, Sales
  designation: { type: String },      // e.g. Software Engineer, HR Manager
  phone: { type: String },
  address: { type: String },
  dateOfJoining: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);
