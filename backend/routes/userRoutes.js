const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const private = require("../middlewares/authMiddleware")

router.get("/me", private, userController.profile)
        .post("/login", userController.login)
        .post("/register",userController.register)

module.exports = router;