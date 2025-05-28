const mongoose = require("mongoose")


const dbUrl = "mongodb://127.0.0.1:27017/realstate-web"
mongoose.connect(dbUrl)
    .then(() => console.log("Server Connected To DB Successfully"))
    .catch((error) => console.log(error)
    )