const { Router } = require("express")
const fs = require("fs")
//const socket = require("../index")

const router = Router()

router.get("/",  (req, res) => {

    res.render("realTimeProducts.handlebars", {style:"index.css" })
})





module.exports = router