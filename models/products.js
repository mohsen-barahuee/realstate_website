const mongoose = require('mongoose')


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images : {
        type : [String],
        required : true
    }


})


const model = mongoose.model("Product",schema)



module.exports = model