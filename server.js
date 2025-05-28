const express = require("express")
const path = require("path")
const app = express()
require('./config/db')

app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')));




app.get("/", (req, res) => {

    res.render("index", { message: "This is message from back-end to front end" })
})


app.get('/property', (req, res) => {
    res.render("property")
})

app.get('/view-property', (req, res) => {
    res.render('single_property')
})

app.get("/about",(req,res)=>{
    res.render('about')
})


app.listen(4000, () => {
    console.log("Server is Running PORT 4000");

})