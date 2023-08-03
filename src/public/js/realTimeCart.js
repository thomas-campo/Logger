const socket = io();
const productsToCart = document.getElementById('productsToCart');

const btnEliminar = () => {
    const botones = document.getElementsByClassName('btn-danger')
    const arrayBtn = Array.from(botones)

    arrayBtn.forEach(element => {
        element.addEventListener('click', () => {
            console.log('click');
            Swal.fire({
                title: 'Do you want to delete this product?',
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
                    Swal.fire(`The product with ID: ${element.id} was deleted`, '', 'success')
                    socket.emit('delete', element.id)

                }
            })

        })

    })
}

socket.on('productsToCart', data => {

    let productos = ''
    data.forEach(product => {
        productos +=`<div class="card bg-secondary mb-3 mx-4 my-4" style="max-width: 20rem;">
                        <div class="card-body">
                            <h4 class="card-title">${product.title}</h4>
                            <p class="card-text">
                                <li>
                                    id: ${product._id}
                                </li>
                                <li>
                                    description: ${product.description}
                                </li>
                                <li>
                                    price: $${product.price}
                                </li>
                                <li>
                                    category: ${product.category}
                                </li>
                                <li>
                                    status: ${product.status}
                                </li>
                                <li>
                                    stock: ${product.stock}
                                </li>
                                <li>
                                    thumbnail: ${product.thumbnails}
                                </li>
                                <li>
                                    code: ${product.code}
                                </li>
                            </p>
                        </div>
                        <div class="d-flex justify-content-center mb-4">
                            <button type="button" class=" btn btn-danger" id="${product.id}">Eliminar</button>
                        </div>
                    </div>`
    });
    productsToCart.innerHTML = productos;
    btnEliminar()
})