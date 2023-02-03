const fs = require("fs")
const { v4: uuidv4 } = require('uuid');


const ProductManager = class {

    constructor(path = "./products.json") {

        this.path = path
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(data);
        }

    }

    addProducts(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !code || !stock) {
            return "all parameters are required"
        }

        const product = {
            id: uuidv4(),
            title,
            description,
            price,
            thumbnail,
            code,
            status: true,
            stock,
            quantity: 1
        }

        const [producto] = this.products.filter(product => product.code === code)
        if (producto) {
            return "Cannot add code that already exists, must be unique "
        }

        this.products.push(product)  

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))

        return `se agrego el producto con id: ${product.id}`

    }

    getProducts() {

        return this.products
    }

    getProductsById(idProduct) {

        const productById = this.products.find(product => product.id === idProduct)

        if (!productById) {
            return `Not Found`
        } else {
            return productById
        }
    }

    updateProduct(id, ...camposCambiar) {

        const cambios = { ...camposCambiar }

        const [productId] = this.products.filter(product => product.id === id)

        Object.keys(productId).forEach(key => {
            if (cambios[0].hasOwnProperty(key)) {

                productId[key] = cambios[0][key]
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))


        return `the product with id: ${id} has been successfully updated `;
    }

    deleteProducts(id) {

        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            return "Product not found";
        }
        this.products.splice(productIndex, 1);


        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))

        return `Delete the product with  id : ${id} `
    }
}

module.exports = ProductManager

