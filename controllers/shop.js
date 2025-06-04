const productModel = require('../models/products')

exports.products = async (req, res) => {
    res.render("shop")
}


exports.createProduct = async (req, res) => {

    try {
        if (!req.files || req.body.title === undefined || req.body.description === undefined)
            return res.json("please check the inputed")

        if (req.user.role !== 'admin')
            return res.json("you dont have access to this route")

        const { title, description } = req.body

        const picutresUrl = req.files.images.map(items => `http://localhost:4000/uploads/${items.filename}`)


        const product = await productModel.create({
            title,
            description,
            images: picutresUrl
        })

        res.json(product)

    } catch (error) {
        console.log("Errro-->" + error);
        return res.status(500).json("Server Error")
    }

}