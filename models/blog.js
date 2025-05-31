const mongoose = require('mongoose')


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    writer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    pictures: {
        type: [String],
        required: true
    }

})