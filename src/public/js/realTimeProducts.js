const socket = io();
const products = document.getElementById('products');

const addToCart = () => {
    const botones = document.getElementsByClassName('agregarAlCarrito')
    const arrayBtn = Array.from(botones)

    arrayBtn.forEach(element => {
        element.addEventListener('click', () => {
            Swal.fire({
                title: 'quieres agregar el producto al carrito?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(element.id);
                    Swal.fire(`El producto se agrego al carrito. Id:${element.id}`, '', 'success');
                    socket.emit('agregar', element.id);
                }
            })

        })

    })
}

socket.on('products', data => {

    let productos = ''
    data.forEach(producto => {
        productos +=`<div class="card bg-secondary mb-3 mx-4 my-4" style="max-width: 20rem;">
                        <div class="card-body">
                            <h4 class="card-title">${producto.title}</h4>
                            <p class="card-text">
                                <li>
                                    description: ${producto.description}
                                </li>
                                <li>
                                    price: $${producto.price}
                                </li>
                                <li>
                                    category: ${producto.category}
                                </li>
                                <li>
                                    status: ${producto.status}
                                </li>
                                <li>
                                    stock: ${producto.stock}
                                </li>
                                <li>
                                    thumbnail: ${producto.thumbnails}
                                </li>
                            </p>
                            <a class="agregarAlCarrito" id=${producto._id}><button>agregar al carrito</button></a>
                        </div>
                        </div>`
                    });
                    products.innerHTML = productos;
                    addToCart()
});

