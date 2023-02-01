const { Router } = require("express")
const fs = require("fs")
const ProductManager = require("../ProductManager")


const router = Router()
const manager = new ProductManager()

/*
router.get("/productos", async (req, res) => {

    const data = await fs.promises.readFile("./products.json", "utf-8")
    const products = JSON.parse(data)
    res.render("home.handlebars", { productos: products })
})
*/
router.get("/", async (req, res) => {

    const { limit = 10 } = req.query
    const allProducts = manager.getProducts()
    const newProductsArray = allProducts.slice(0, limit)
    res.json({ message: newProductsArray })
})

router.get("/:pid", (req, res) => {

    const { pid } = req.params
    res.json({ message: manager.getProductsById(Number(pid)) })
})

router.post("/", (req, res) => {

    const { title, description, code, price, stock, thumbnail } = req.body
    const productAdd = manager.addProducts(title, description, price, thumbnail, code, stock)
    res.json({ message: productAdd })

})


router.put("/:pid",  (req, res) => {

    const { pid } = req.params
    const { ...variables } = req.body
    const productChange = manager.updateProduct(Number(pid), { ...variables })
    res.json({ message: productChange })
})



router.delete("/:pid",  (req, res) => {

    const { pid } = req.params
    res.json({ message: manager.deleteProducts(Number(pid)) })

})


module.exports = router