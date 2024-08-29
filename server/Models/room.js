const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: String,
    addedUsers: Array
}, { versionKey: false });

module.exports = mongoose.model("Room", roomSchema);