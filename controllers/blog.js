


exports.viewBlogs = async (req, res) => {
    res.render("blogs")
}


exports.viewSingleBlog = async (req, res) => {
    console.log(req.query.id);
    
    res.render("blog-single")
}