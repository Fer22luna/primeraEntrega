const router = require("./router")
const express = require("express")
const handlebars = require("express-handlebars")
const { Server } = require('socket.io')

const port = 8080
const app = express()


app.use(express.json())

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')


router(app)

const httpServer = app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

const io = new Server(httpServer)  // Crea una instancia de Server aquí

io.on('connection', socket => {
    console.log(`Client with id ${socket.id} is connected`)

    socket.on("messageFromClient", data => {
        console.log(`hola me llego esta data ${data}`)
    })


})


module.exports = io  // Exporta la instancia de Server aquí