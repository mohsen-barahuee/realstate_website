const blogModel = require('../models/blog')
const commentModel = require("../models/comment")

exports.viewBlogs = async (req, res) => {
    
    const blogs = await blogModel.find()
        .populate('writer', '-password -role -__v')
        .populate('comments','-__v').exec();

    
    res.render("blogs", { blogs })
}


exports.viewSingleBlog = async (req, res) => {


    const singlBlog = await blogModel.findOne({ _id: req.query.id }).populate('writer', '-password -role -__v')
    const blogComments = await commentModel.find({ blog: singlBlog._id }).populate('creator', '-password -__v -role')

    res.render("blog-single", { singlBlog, blogComments })
}


exports.uploadBlog = async (req, res) => {

    const { title, body, writer } = req.body
    const pictreUrl = req.files.pictures.map(item =>
        `http://localhost:4000/uploads/${item.filename}`)

    const blog = await blogModel.create({
        title,
        body,
        writer,
        thumbnail: `http://localhost:4000/uploads/${req.files.thumbnail[0].filename}`,
        pictures: pictreUrl

    })

    res.json("upload")
}