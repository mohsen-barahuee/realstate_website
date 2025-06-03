
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

schema.virtual("comments", {

    ref: "Comment",
    localField: "_id",
    foreignField: "blog",
    

})


schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

const model = mongoose.model('Blog', schema)

module.exports = model
