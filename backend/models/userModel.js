const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill the name"]
    },
    username: {
        type: String,
        required: [true, "Please fill the username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please fill the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please fill the password"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);