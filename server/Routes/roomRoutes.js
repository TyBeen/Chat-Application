const express = require("express");
const router = express.Router();

//import controller
const roomControllers = require("../Controllers/roomControllers");
//import middleware
const authorization = require("../Middleware/authorization");
const authentication = require("../Middleware/authentication");

//get all route
router.get("/", roomControllers.getAllRooms);

//add new room
router.post("/", authentication, roomControllers.addRoom);

//update room
router.put("/:id", authentication, authorization, roomControllers.updateRoom);

//delete room
router.delete("/:id", authentication, authorization, roomControllers.deleteRoom);

module.exports = router;