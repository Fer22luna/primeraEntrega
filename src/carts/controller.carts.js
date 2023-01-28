const { Router } = require("express")
const fs = require("fs")

const router = Router()


router.get("/:cid", async (req, res) => {

    const data = await fs.promises.readFile("./carts.json", "utf-8")
    const carts = JSON.parse(data)

    const { cid } = req.params

    const cartId = carts.filter(cart => cart.id === Number(cid))

    if (!cartId) {
        res.json({ error: "Id no econtrado" })
    } else {
        res.json({ message: cartId })
    }

})


router.post("/:cid/products/:pid", async (req, res) => {

    // http://localhost:8080/api/carts/2/products/3

    const data = await fs.promises.readFile("./carts.json", "utf-8")
    const carts = JSON.parse(data)

    const { cid, pid } = req.params
    console.log(req.params)
    const cart = carts.filter(cart => cart.id === Number(cid))

    const productList = carts[1].products  // a este arreglo voy a  agregar el nuevo

    const [productListId] = productList.filter(product => product.id === Number(pid))


    const newProductAddById = {
        product: pid,
        quantity: 1
    }

    if(productListId){
        
        productListId.quantity++

    }else{
        productList.push(newProductAddById)
    }
    res.json({message: productList})

})


router.post("/", async (req, res) => {

    const data = await fs.promises.readFile("./carts.json", "utf-8")
    const carts = JSON.parse(data)
    const products = req.body

    const cart = {

        id: Math.random().toString(),
        products
    }

    carts.push(cart)
    res.json({ message: carts })
})



module.exports = router