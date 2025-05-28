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

app.get("/about", (req, res) => {
    res.render('about')
})


app.get("/blogs", (req, res) => {
    res.render("blogs")
})


app.get("/contact", (req, res) => {
    res.render("contact")
})


app.get("/services", (req, res) => {
    res.render("services")
})

app.get('/shop', (req, res) => {
    res.render("shop")
})

app.get("/cart", (req, res) => {
    res.render("cart")
})

app.get('/checkout',(req,res)=>{
    res.render("checkout")
})

app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found",
        message: "The page you're looking for does not exist.",
    });
})




app.listen(4000, () => {
    console.log("Server is Running PORT 4000");

})