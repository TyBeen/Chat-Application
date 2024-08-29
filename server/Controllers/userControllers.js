const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");
require("dotenv").config();

// Login user controller
exports.loginUser = async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;

    const userFound = await user.findOne({ username: username });

    const hashedPasswordFromUser = userFound.password;
    
    bcrypt.compare(password, hashedPasswordFromUser, (err, result) => {
        if (result) {
            const payload = {
                id: userFound._id,
                isAdmin: userFound.isAdmin
            };
            const signedJWT = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn :1200 })

            res.status(201).json({ message: "Login Successful", token: signedJWT, loggedIn: true, user: userFound })

        } else {
            res.status(403).json("Login failed")
        }
    })

};

// register user controller
exports.registerUser = (req, res) => {
    const saltRounds = 10;
    const { username, password, firstName, lastName, email } = req.body;
    let isAdmin = false;

    if (username.includes(process.env.ADMIN)) {
        isAdmin = true;
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = new user({ username: username, password: hash, firstName: firstName, lastName: lastName, email: email, isAdmin: isAdmin })

        try {
            await newUser.save();

            res.status(201).json("User Registered");
        } catch (err) {
            res.status(500).json("Couldn't Register User")
        }
    })
};

// update user controller
exports.updateUser = async (req, res) => {
    try {
        const replaceUser = new user({
            _id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })

        await user.findOneAndUpdate({ _id: req.params.id }, replaceUser)

        res.status(200).json(replaceUser)
    } catch (err) {
        res.status(500).json("Couldn't update user!")
    }
};

// delete user controller
exports.deleteUser = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id);

        res.status(200).json("User Removed!")
    } catch (err) {
        res.status(500).json("Couldnt Delete User!")
    }
};


//get all users
exports.getUsers = async (req, res) => {
    try {
        await user.find({});
    
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Something went wrong. Users not found.");
    }
};