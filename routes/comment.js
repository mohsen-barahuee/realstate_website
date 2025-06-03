const express = require('express')
const commentController = require('../controllers/comment')
const router = express.Router()


router.route('/create-comment').post(commentController.createCommnet)




module.exports = router