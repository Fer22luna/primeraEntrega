const router = require("./router")
const express = require("express")

const port = 8080
const app = express()

app.use(express.json())


router(app)

app.listen(port, (req,res) =>{
    console.log(`Running server at port: ${port}`)
})