const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    try {

        if (!req.headers.cookie) {
            return res.status(404).json("Please login first")
        }
        const token = req.headers.cookie.split("=")[1]
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await userModel.findOne({ _id: verifyToken.id }).select('-password  -__v')
        if (!user)
            return res.status(404).json("User not founded")
        req.user = user
        next()

    } catch (error) {
        console.log("Error -->" + error)
        return res.status(500).json("server error!")
    }


}



