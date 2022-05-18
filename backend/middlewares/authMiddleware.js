const expressHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = expressHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SERCRET_KEY);
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error("Not authorized")

        }

    } else {
        res.status(400)
        throw new Error("Missing Token Value")
    }
});

module.exports = auth;