const express = require('express')
const blogsController = require('../controllers/blog')
const router = express.Router()


router.route('/blogs').get(blogsController.viewBlogs)

router.route('/view-blog').get(blogsController.viewSingleBlog)



module.exports = router