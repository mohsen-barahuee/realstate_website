const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()
const registerRouter = require("./routes/register")
const blogRouter = require('./routes/blog')
const shopRouter = require('./routes/shop')

require('dotenv').config()
require('./config/db')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, "uploads")))





app.use('/', registerRouter)
app.use('/', blogRouter)
app.use('/',shopRouter)




app.get('/property', (req, res) => {
    res.render("property")
})

app.get('/view-property', (req, res) => {
    res.render('single_property')
})

app.get("/about", (req, res) => {
    res.render('about')
})


app.get("/contact", (req, res) => {
    res.render("contact")
})


app.get("/services", (req, res) => {
    res.render("services")
})


app.get("/cart", (req, res) => {
    res.render("cart")
})

app.get('/checkout', (req, res) => {
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