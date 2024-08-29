const mongoose = require('mongoose'); // Import the mongoose library
// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
  when:{type: Date, default: Date.now},
  user: String,
  room: String,
  body:{type: String, required: true},
  creator: String
});
// Export the Message model based on the schema
module.exports = mongoose.model('Message', messageSchema);


