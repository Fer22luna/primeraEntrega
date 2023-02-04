const { Router } = require("express")
const fs = require("fs")
const ProductManager = require("../ProductManager")
const socket = require("../index")  // Importa la instancia de Server aquí
const eventEmitter = require("events")


const router = Router()
const manager = new ProductManager()

router.get("/productList",  (req, res) => {

    const data = fs.readFileSync("./products.json", "utf-8")
    const products = JSON.parse(data)
    res.render("home.handlebars", { productos: products })
})


router.get("/",  (req, res) => {

    const { limit = 15 } = req.query
    const allProducts = manager.getProducts()
    const newProductsArray = allProducts.slice(0, limit)
    res.json({ message: newProductsArray })
})

router.get("/:pid", (req, res) => {

    const { pid } = req.params
    res.json({ message: manager.getProductsById(pid) })
})

router.post("/", (req, res) => {

    const { title, description, code, price, stock, thumbnail } = req.body
    const productAdd = manager.addProducts(title, description, price, thumbnail, code, stock)  
    socket.emit("newProduct", req.body.title)
    res.json({ message: productAdd })
})

router.put("/:pid",  (req, res) => {

    const { pid } = req.params
    const { ...variables } = req.body
    const productChange = manager.updateProduct(pid, { ...variables })
    res.json({ message: productChange })
})

router.delete("/:pid",  (req, res) => {

    const { pid } = req.params
    res.json({ message: manager.deleteProducts(pid) })
})

module.exports = router