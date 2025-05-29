const express = require("express")
const registerController = require('../controllers/register')
const router = express.Router()


router.route('/login')
    .get(registerController.login)
    .post(registerController.loginUser)
router.route('/register')
    .get(registerController.register)
    .post(registerController.registerUser)

router.route('/forgot-password')
    .get(registerController.forgotPassword)
    .post(registerController.senEmail)

router.route('/get-me').get(registerController.getMe)


module.exports = router