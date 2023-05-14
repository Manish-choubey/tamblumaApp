// app.js

const Ticket = require('../model/Ticket')

const { v4: uuidv4 } = require('uuid');


// Create a ticket schema


// Create a ticket model


// Create a Tambula ticket
const createdTicket = async (req, res) => {
  const { numTickets } = req.body;
  const tickets = [];

  for (let i = 0; i < numTickets; i++) {
    const numbers = generateTicketNumbers();
    const ticketId = uuidv4(); // Generate a unique ID for the ticket

    const ticket = new Ticket({
      ticketId,
      numbers,
    });

    try {
      await ticket.save();
      tickets.push(ticket);
    } catch (error) {
      console.error(error);
    }
  }

  res.json({ tickets });
};

// Fetch all tickets with pagination


// Generate Tambula ticket numbers
function generateTicketNumbers() {
  const numbers = [];

  for (let col = 0; col < 9; col++) {
    const columnNumbers = [];
    for (let row = 0; row < 3; row++) {
      const minValue = col * 10 + 1;
      const maxValue = col * 10 + 10;
      const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      columnNumbers.push(randomNumber);
    }
    numbers.push(columnNumbers);
  }

  // Fill blank cells with zero or "x"
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 3; row++) {
      if (!numbers[row][col]) {
        numbers[row][col] = 0; // Fill blank cells with zero
        // numbers[row][col] = 'x'; // Fill blank cells with "x"
      }
    }
  }

  return numbers;
}



const fetchticket = async (req, res) => {
  
  const { page, limit  } = req.query;
  const ticketId = req.param.ticketId
  if(ticketId){
   return res.status(400).send({
      msg:"provide id",
    })
  }
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;

  try {
    const tickets = await Ticket.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Start the server

module.exports.createdTicket = createdTicket
module.exports.fetchticket = fetchticket