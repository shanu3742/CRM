const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: 'OPEN',
    enum: ['OPEN', 'in_PROGRESS', 'CLOSED'],
  },
  ticketReport: {
    type: String,
    require: true,
  },
  assigned: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updateAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
