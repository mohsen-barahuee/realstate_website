const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    res.render('register')
}


exports.registerUser = async (req, res) => {
    const { fullname, email, password, role } = req.body



    const user = await userModel.create({ fullname, email, password, role: "admin" })



    res.status(201).json("user created")
}

exports.login = (req, res) => {

    res.render('login')


}


exports.forgotPassword = (req, res) => {
    res.render('forgotPassword')
}