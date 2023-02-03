const fs = require("fs")
const { v4: uuidv4 } = require('uuid');


const CartManager = class {

    constructor(path = "./carts.json") {
        this.path = path
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8");
            this.carts = JSON.parse(data);
        }
    }

    getCardbyId(id) {

        const [cartId] = this.carts.filter(cart => cart.id === id)

        if (!cartId) {
            return `El carrito con el id: ${id} no se ha encontrado`
        } else {
            return cartId.products
        }
    }

    createNewCart(products) {

        const cart = {
            id: uuidv4(),
            products
        }

        this.carts.push(cart)
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"))

        return `the new cart with id: ${cart.id} was created successfully`
    }


    addProductToCard(cid, pid) {

        const [cartId] = this.carts.filter(cart => cart.id === cid)

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

        for (let i = 0; i < this.carts.length; i++) {
            if (this.carts[i].id === cid) {
                this.carts[i] = cartId;
            }
        }

        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"))
        return `The product with id :  ${pid} successfully add to cart with id: ${cid}`  
    }

}


module.exports = CartManager