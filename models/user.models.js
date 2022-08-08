/**
 * this file will contain the  schema  of the user  model
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 10,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: 'CUSTOMER',
    enum: ['ENGINEER', 'CUSTOMER', 'ADMIN'],
  },
  userStatus: {
    type: String,
    require: true,
    default: 'APPROVED',
    enum: ['APPROVED', 'PENDING', 'REJECTED'],
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updateedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  ticketAssigned: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Ticket',
  },
  ticketReport: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Ticket',
  },
});

module.exports = mongoose.model('User', userSchema);
