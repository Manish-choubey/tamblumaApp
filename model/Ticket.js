const mongoose = require('mongoose');

// Ticket schema
const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  numbers: {
    type: [[Number]],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
