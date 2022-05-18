const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/",userController.profile)
        .post("/login", userController.login)
        .post("/register",userController.register)

module.exports = router;