const { Router } = require("express")
const fs = require("fs")

const router = Router()



router.get("/", async (req, res) => {

    const data = await fs.promises.readFile("./products.json", "utf-8")
    const products = JSON.parse(data)

    const { limit = 10 } = req.query

    const newProductsArray = products.slice(0, limit)
    res.json(newProductsArray)


})


router.get("/:pid", async (req, res) => {

    const data = await fs.promises.readFile("./products.json", "utf-8")
    const products = JSON.parse(data)
    const { pid } = req.params

    const [product] = products.filter(product => product.id === Number(pid))


    if (!product) {
        res.json({ error: "No hay productos con ese id" })
    } else {
        res.json({ message: product })
    }
})


router.post("/", (req, res) => {

    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body


    const newProduct = {
        id: Math.random().toString(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    if (!title || !description || !price || !category || !code || !stock) {
        res.json({ message: " Todos los parametros son requeridos" })
    } else {
        console.log(newProduct)
        res.json({ message: newProduct })
    }
})


router.put("/:pid", async (req, res) => {

    const data = await fs.promises.readFile("./products.json", "utf-8")
    const products = JSON.parse(data)
    const { pid } = req.params

    const productId = products.find(product => product.id === Number(pid))


    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body

    const changeProduct = {
        id: Number(pid),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    products[pid - 1] = changeProduct

    res.json({ message: products })
})


router.delete("/:pid", async (req, res) => {

    const data = await fs.promises.readFile("./products.json", "utf-8")
    const products = JSON.parse(data)
    const { pid } = req.params

    products.splice(Number(pid) - 1, 1)
    res.json({ message: products })

})






module.exports = router