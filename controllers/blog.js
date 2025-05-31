


exports.viewBlogs = async (req, res) => {
    res.render("blogs")
}


exports.viewSingleBlog = async (req, res) => {
    console.log(req.query.id);

    res.render("blog-single")
}


exports.uploadBlog = async (req, res) => {
    console.log("Thumbnail", req.files.thumbnail[0].filename);

    req.files.pictures.map((item) => console.log("pictures",item.filename)
    )


    res.json("upload")
}