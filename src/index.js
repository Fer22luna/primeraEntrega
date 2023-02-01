const router = require("./router")
const express = require("express")
const handlebars = require("express-handlebars")
const io = require("socket.io")

const port = 8080
const app = express()

app.use(express.json())

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')


router(app)

app.listen(port, (req,res) =>{
    console.log(`Running server at port: ${port}`)
})