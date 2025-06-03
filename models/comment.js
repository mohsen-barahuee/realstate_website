const mongoose = require('mongoose')

const schema = mongoose.Schema({

    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: {
        type: String ,
        required: true
    },
    time: {
        type: [String],
        required: true
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    commentAnswer: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },



})


const model = mongoose.model("Comment", schema)


module.exports = model