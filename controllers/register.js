const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    res.render('register')
}


exports.registerUser = async (req, res) => {
    try {

        const { fullname, email, password } = req.body
        const documentLenght = await userModel.countDocuments();
        const isUserExist = await userModel.findOne({ email })

        if (isUserExist) {
            return res.status(409).redirect('/register')
        }

        const hashedPassword = bcrypt.hashSync(password, 12)

        const user = await userModel.create({ fullname, email, password: hashedPassword, role: documentLenght > 0 ? "user" : "admin" })

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET_KEY)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,


        })

        res.status(201).redirect('/')
    } catch (error) {
        console.log("ERROR ==>", error);

        res.status(500).json("Server Error!!")
    }
}

exports.login = async (req, res) => {

    res.render('login')


}

exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const isUserExist = await userModel.findOne({ email })

        if (!isUserExist) {
            return res.status(404).redirect('/login')
        }
        const isPasswordCorrect = bcrypt.compareSync(password, isUserExist.password)

        if (!isPasswordCorrect) {
            return res.status(404).redirect('/login')
        }

        const token = jwt.sign({ id: isUserExist._id, role: isUserExist.role, email: isUserExist.email }, process.env.JWT_SECRET_KEY)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,


        })
        res.status(201).redirect('/')



    } catch (error) {
        console.log("server Error -->", error);

        res.status(500).json("server Error")
    }



}


exports.forgotPassword = (req, res) => {
    res.render('forgotPassword')
}