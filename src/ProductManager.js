const fs = require("fs")

const ProductManager = class {

    constructor( products = [], path = "./products.json") {

        this.products = products
        this.id = 1
        this.path = path

    }

    addProducts(title, description, price, thumbnail, code ,stock) {

        const product = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            status:true,
            stock,
            quantity: 1
        }

        ////////////// Aca validamos que se ingresen todos los parametros lo cambie de la entrega anterior
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('TODOS LOS PARAMETROS SON REQUERIDOS')
            
        }

        const data =  fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(data)

        this.products = products

        const [producto] = this.products.filter(product => product.code === code)

        if (producto) {
            console.log("ERROR : el codigo debe ser unico ")
        }

        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }

        this.products.push(product)  // pusheo los productos en el array de productos

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))

        return `se agrego el producto con id: ${product.id}`

    }

    getProducts() {

        const data =  fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(data)

        return products
    }

    getProductsById(idProduct) {


        const data =  fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(data)

        const productById = products.find(product => product.id === idProduct)

        if (!productById) {
            return `Not Found`
        } else {
            return productById
        }
    }


    updateProduct(id, ...camposCambiar) {


        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8")
            const products = JSON.parse(data)
            const  cambios  = {...camposCambiar}

            const [productId] = products.filter(product => product.id === id)

            Object.keys(productId).forEach(key =>{
                if(cambios[0].hasOwnProperty(key)){

                    productId[key] = cambios[0][key]
                }
            }) 

            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
        }

        return `the product with id: ${id} has been successfully updated `;
    }

    deleteProducts(id) {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8")
            const users = JSON.parse(data)
            users.splice(id - 1, 1)   // Aca borro el elemento del numero id ubicado en el lugar id-1

            fs.writeFileSync(this.path, JSON.stringify(users, null, "\t"))

            return `Delete the product with  id : ${id} `
        }
    }
}


module.exports = ProductManager

