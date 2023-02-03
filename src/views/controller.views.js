const { Router } = require("express")
const fs = require("fs")

const router = Router()

router.get("/", async (req, res) => {

    const data = await fs.promises.readFile("./products.json", "utf-8")
    const products = JSON.parse(data)
    res.render("realTimeProducts.handlebars", { message: "hola" })
})


module.exports = router