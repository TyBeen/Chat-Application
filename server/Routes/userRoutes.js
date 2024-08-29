const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/login", userController.loginUser);

router.post("/register", userController.registerUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/all", userController.getUsers);

module.exports = router;