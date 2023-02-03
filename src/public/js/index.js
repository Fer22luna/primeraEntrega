const socket = io()


const productsRender = document.getElementById("productsRender")

// Para comunicarnos desde el cliente al servidor usamos emit socket.emit("ID del mesaje a enviar","contenido del")

socket.emit("messageFromClient", "Este es un mensaje desde el cliente")


socket.on("newProduct",data =>{
    productsRender.innerHTML = data
})