const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes"); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect("mongodb://localhost:27017/backendproject");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => {
    console.log("Connected to DB")
})

app.use("/users", userRoutes)
app.use("/room", roomRoutes); //rooms endpoint
app.use("/messages", messageRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}!`)
})