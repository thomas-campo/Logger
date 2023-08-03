const listProducts = document.getElementById("listProducts")


listProducts.addEventListener('click', e => {
    addCarrito(e)
})
const addCarrito = (e) => {
    if(e.target.classList.contains('agregarAlCarrito')){
        console.log(e.target.parentElement)
        // setCart(e.target.parentElement)
    }
}

// const setCart = obj =>{
//     const product = {
//         id:obj.querySelector(".agregarAlCarrito").id,
//         title:obj.querySelector("h2").textContent,
//         quantity:1
//     }
//     cart[product.id] = {...product}
//     console.log(cart)
// }


// function addToCarritoItem(e){
//     const button = e.target
//     console.log(item,"item")
//     console.log(button,"boton")
//     const item = button.closest(`.card`)
//     const itemTitle = item.querySelector(`.card-title`).textContent
//     const itemPrice = item.querySelector(`.precio`).textContent
//     const newItem = {
//         title:itemTitle,
//         precio: itemPrice,
//         cantidad: 1
//     }
//     console.log(newItem);
// }
    
    // form.addEventListener('submit',async (event)=>{
    //     event.preventDefault();
    //     const data = new FormData(form);
    //     const obj = {};
    //     data.forEach((value,key)=>(obj[key] = value));
    //     const response = await fetch(`/api/carts/:${cid}/product/:${pid}`,{
    //       method:'POST',
    //       body:JSON.stringify(obj),
    //       headers:{
    //           "Content-Type":"application/json"
    //       }
    //     })
    //     const responseData = await response.json();
    //     if(responseData.status==="success"){
    //       window.location.replace('/products');//redirijo a los productos
    //     }
    //   })