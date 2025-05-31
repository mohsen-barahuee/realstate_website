const express = require('express')
const blogsController = require('../controllers/blog')
const router = express.Router()
const uploader = require('../middleware/upload')


router.route('/blogs')
    .get(blogsController.viewBlogs)

router.route('/view-blog')
    .get(blogsController.viewSingleBlog)

router.route('/blog/upload')
    .post(uploader.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: "pictures", maxCount: 10 }
    ]), blogsController.uploadBlog)



module.exports = router