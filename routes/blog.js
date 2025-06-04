const express = require('express')
const blogsController = require('../controllers/blog')
const router = express.Router()
const uploader = require('../middleware/upload')
const authenticationCheker = require('../middleware/auth')

router.route('/blogs')
    .get(blogsController.viewBlogs)


router.route('/view-blog')
    .get(blogsController.viewSingleBlog)
    .post(authenticationCheker,blogsController.createComment)

router.route('/blog/upload')
    .post(uploader.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: "pictures", maxCount: 6 }
    ]), blogsController.uploadBlog)



module.exports = router