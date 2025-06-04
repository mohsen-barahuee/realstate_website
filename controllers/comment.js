const commentModel = require('../models/comment')


exports.createCommnet = async (req, res) => {

   const date = new Date()

   let [year, month, day, hour, minute] = [date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes()]


   const commentTime = [year, month, day, hour, minute]

   const { body } = req.body

   if (!body) {
      return res.json("please check the values")
   }

   const comment = await commentModel.create({
      creator: req.user._id,
      body,
      blog: "683f2c320ce4ffbbdff1a9ad",
      time: commentTime


   })




  


}

