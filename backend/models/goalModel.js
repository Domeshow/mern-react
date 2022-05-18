const mongoose = require("mongoose");

const schema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please fill in the text value"],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', schema);