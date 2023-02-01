const { Router } = require("express")
const fs = require("fs")
const CartManager = require("../CartManager")

const router = Router()
const manager = new CartManager()

router.get("/:cid", async (req, res) => {

    const { cid } = req.params   
    const productsOnCardId = manager.getCardbyId(Number(cid))
    res.json({products: productsOnCardId})
})

router.post("/:cid/products/:pid",  (req, res) => {

    const { cid, pid } = req.params
    const productoAdd = manager.addProductToCard(Number(cid),Number(pid))
    res.json({message: productoAdd})
    
})

router.post("/",  (req, res) => {

    const products = req.body
    const newCart = manager.createNewCart(products)
    res.json({message: newCart})
})

module.exports = router