
const socket = io()



const submitButton = document.getElementById("submitButton")

submitButton.addEventListener("click", ()=>{
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;
    const input3 = document.getElementById("input3").value;
    const input4 = document.getElementById("input4").value;
    const input5 = document.getElementById("input5").value;
    const input6 = document.getElementById("input6").value;

    const inputs = [input1, input2,input3,input4,input5,input6];
    socket.emit("inputs", inputs)
})


socket.on('inputValues', data => {
  
    console.log(data)

   const productos = document.getElementById("productos")

    productos.innerHTML = `<p>producto id:  ${data[0]}  y la quantity${data[1]}</p>`
    
})



//socket.on('messageFromServer', data => {
//    console.log(data)
//  })