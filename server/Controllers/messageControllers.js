const Message = require("../models/Message");

require("dotenv").config();
// Controller to get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const message = await Message.find({ room: req.params.room }); //get all within specific room

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json("Something went wrong. Message not found.");
  }
};
// Controller to add a message
exports.addMessage = async (req, res) => {
  try {
    console.log('add message')
    console.log(req.body)
    const newMessage = new Message({
      when: new Date(),
      user: req.body.user,
      room: req.body.room,
      body: req.body.body,
      creator: req.body.creator
    });

    console.log(newMessage);

    const savedMessage = await newMessage.save();

    console.log(savedMessage);

    return res.status(201).json(newMessage);
  } catch (err) {
    return res.status(500).json("Something went wrong. Message not added.");
  }
};
// Controller to update a message
exports.updateMessage = async (req, res) => {
  try {
    const editingMessage = new Message({
      _id: req.params.id,
      when: new Date(req.body.when),
      user: req.body.user,
      room: req.body.room,
      body: req.body.body,
    });

    await Message.findOneAndUpdate({ _id: req.params.id }, editingMessage);

    res.status(200).json(editingMessage);
  } catch (err) {
    res.status(500).json("Something went wrong. Message not updated.");
  }
};
// Controller to delete a message
exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json("Message deleted.");
  } catch (err) {
    res.status(500).json("Something went wrong. Message not deleted.");
  }
};