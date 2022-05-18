const mongoose = require("mongoose");

const schema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please fill in the text value"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        Ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', schema);