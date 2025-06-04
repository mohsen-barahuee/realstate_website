const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop')
const authenticationCheker = require('../middleware/auth')
const uploader = require('../middleware/upload')

router.route('/shop').get(shopController.products)
router.route('/create-product').post(authenticationCheker, uploader.fields([
    { name: 'images' }
]), shopController.createProduct)


module.exports = router