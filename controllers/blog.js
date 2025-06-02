const blogModel = require('../models/blog')


exports.viewBlogs = async (req, res) => {
    const blogs = await blogModel.find().populate('writer', '-password -role -__v')


    res.render("blogs", { blogs })
}


exports.viewSingleBlog = async (req, res) => {


    const singlBlog = await blogModel.findOne({ _id: req.query.id }).populate('writer', '-password -role -__v')
    
    res.render("blog-single", { singlBlog })
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