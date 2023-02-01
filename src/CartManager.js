const fs = require("fs")

const CartManager = class {

    constructor(path = "./carts.json") {
        this.path = path
    }


    getCardbyId(id) {

        const data = fs.readFileSync("./carts.json", "utf-8")
        const carts = JSON.parse(data)
        const [cartId] = carts.filter(cart => cart.id === id)

        if (!cartId) {
            console.log(`El carrito con el id: ${id} no se ha encontrado`)
        } else {

            return cartId.products
        }
    }

    createNewCart(products) {

        const data = fs.readFileSync("./carts.json", "utf-8")
        const carts = JSON.parse(data)

        const cart = {
            id: Math.random().toString(),
            products
        }

        fs.writeFileSync(this.path, JSON.stringify(carts, null, "\t"))

        return `el nuevo carrito con id: ${cart.id} se creo exitosamente`
    }

    addProductToCard(cid, pid) {

        const data = fs.readFileSync("./carts.json", "utf-8")
        const carts = JSON.parse(data)

        const [cartId] = carts.filter(cart => cart.id === cid)

        const productList = cartId.products

        const product = {
            id: pid,
            quantity: 1
        }

        const [productListId] = productList.filter(product => product.id === pid)
        if (productListId) {
            productListId.quantity++
        } else {
            productList.push(product)
        }
        
        cartId.products = productList

        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id === cid) {
                carts[i] = cartId;
            }
        }

        fs.writeFileSync(this.path, JSON.stringify(carts, null, "\t"))
        return `The product with id :  ${pid} successfully add to cart with id: ${cid}`  
    }

}


module.exports = CartManager