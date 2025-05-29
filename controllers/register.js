const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

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

exports.senEmail = async (req, res) => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smtp@mailtrap.io",
            pass: "f449307fa884f01615bac579f617be64",
        },
    });


    // Wrap in an async IIFE so we can use await.
    (async () => {
        const info = await transporter.sendMail({
            from: 'realstate@demomailtrap.co',
            to: "nakel3920@gmail.com",
            subject: "RealState Reset Password",
            text: "Reset the password", // plain‑text body
            // html: "<b>Hello world?</b>", // HTML body
        });

        console.log("Message sent:", info.messageId);
    })();


    return res.status(200).json({message :"We sent email to your account"})
}


exports.getMe = async (req, res) => {

    try {

        if (!req.headers.cookie) {
            return res.status(404).json({ messgae: "error" })
        }

        const token = req.headers.cookie.split("=")[1]

        const tokenVerfiy = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const isIdValid = mongoose.Types.ObjectId.isValid(tokenVerfiy.id)

        if (!isIdValid) {
            return res.status(404).json({ message: "Error!" })
        }

        const user = await userModel.findOne({ _id: tokenVerfiy.id }).select("-password -__v")

        res.status(200).json(user)

    } catch (error) {
        console.log("Server Error -->", error);
        res.status(500).json("server Error!!")
    }

}