const express = require("express")
const registerController = require('../controllers/register')
const route = express.Router()


route.route('/login').get(registerController.login)
route.route('/register').get(registerController.register)
route.route('/forgot-password').get(registerController.forgotPassword)


module.exports = route