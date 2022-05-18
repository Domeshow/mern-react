const User = require('../models/userModel')
const expressHandler = require("express-async-handler")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    // @desc Get users
    // @route GET /api/users
    // access Private
    profile : expressHandler(async (req, res) => {
        res.status(200).json({status: 200, data: req.user})
    }),

    // @desc Login user
    // @route POST /api/users/login
    // access Public
    login : expressHandler(async (req, res) => {
        const { password, email } = req.body;
        if (! password || ! email) {
            res.status(400)
            throw new Error("Email and Password are required!")
        }

        const user = await User.findOne({email})
        if (! user) {
            res.status(400)
            throw new Error("Invalid user")
        }
        const check = await bcrypt.compare(password, user.password)
        if (check) {
            res.status(200).json({
                _id: user._id,
                name: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error("Invalid credentials!")
        }
    }),

    // @desc Register user
    // @route PUT /api/users/register
    // access Private
    register : expressHandler(async (req, res) => {
        const { name, username, password, email } = req.body;
        if (! name || ! username || ! password || ! email) {
            res.status(400)
            throw new Error("Name, Username, Email and Password are required!")
        }

        const found = await User.findOne({email})
        if (found) {
            res.status(400)
            throw new Error("A user with this email already exists!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, username, email, password: hashedPassword});
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data!")
        }
        // let a = await jwt.sign({username: username}, "secretkey");
        // console.log(a)
        



    }),
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SERCRET_KEY, {
        expiresIn: "1d"
    });
}
module.exports = userController;