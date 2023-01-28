const cartsController = require("../carts/controller.carts")
const productsController = require("../products/controller.products")

const router = (app) => {  // aca me hago una funcion de enrutador que recibe mi servidor
app.use("/api/products", productsController)
app.use("/api/carts", cartsController)     // cuando reciba el servidor lo que hago es si viene buscando users
}                                  // le paso el controlador de usuarios usersController que haga la distincion de GET, POST , etc

module.exports = router