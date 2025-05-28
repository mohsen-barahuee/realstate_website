const express = require("express")
const registerController = require('../controllers/register')
const route = express.Router()


route.route('/login')
    .get(registerController.login)
    .post(registerController.loginUser)
route.route('/register')
    .get(registerController.register)
    .post(registerController.registerUser)

route.route('/forgot-password').get(registerController.forgotPassword)


module.exports = route