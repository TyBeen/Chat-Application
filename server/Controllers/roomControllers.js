const Room = require("../models/room");
require("dotenv").config();


exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});


        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json("Something went wrong. Rooms not found.");
    }
};


exports.addRoom = async (req, res) => {
    try {
        const newRoom = new Room({
            name: req.body.name,
            description: req.body.description,
            creator: req.body.creator,
            addedUsers: []
        });

        await newRoom.save();

        res.status(201).json(newRoom);
    } catch (err) {
        res.status(500).json("Something went wrong. Room not added.");
    }
};


exports.updateRoom = async (req, res) => {
        try {
            const editRoom = new Room({
                _id: req.params.id,
                name: req.body.name,
                description: req.body.description,
                creator: req.body.creator,
                addedUsers: req.body.addedUsers
            });

            await Room.findOneAndUpdate({ _id: req.params.id }, editRoom);

            res.status(200).json(editRoom);
        } catch (err) {
            res.status(500).json("Something went wrong. Room not updated.")
        }
};


exports.deleteRoom = async (req, res) => {
        try {
            await Room.findByIdAndDelete(req.params.id);

            res.status(200).json("Room deleted.")
        } catch (err) {
            res.status(500).json("Something went wrong. Room not deleted.")
        }
};
