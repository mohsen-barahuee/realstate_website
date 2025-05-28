const mongoose = require("mongoose")


const schema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]
    }
})


const model = mongoose.model("User", schema)

module.exports = model