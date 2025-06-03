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
      creator: "683cae4f3f7fb073b0e9351a",
      body,
      blog: "683efbca5959467020733c67",
      time: commentTime


   })



   res.json({comment })
}

