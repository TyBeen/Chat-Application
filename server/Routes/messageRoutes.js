const express = require("express");
const router = express.Router();
const messageControllers = require("../controllers/messageControllers"); 
//import middleware
const authorization = require("../Middleware/authorization");
const authentication = require("../Middleware/authentication");

// Route to add a new message
router.post("/", authentication, messageControllers.addMessage);
// Route to update a message
router.put("/:id", authentication, authorization, messageControllers.updateMessage);
// Route to delete a message
router.delete("/:id", authentication, authorization, messageControllers.deleteMessage);
// Route to get all messages within specific room
router.get("/:room", messageControllers.getAllMessages);

module.exports = router;