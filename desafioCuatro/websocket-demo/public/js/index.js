(function() {
    const socket = io();

    // Agregar producto.
    const formAddProduct = document.getElementById('add-product');

    formAddProduct?.addEventListener('submit', (event => {
        event.preventDefault();

        const title = document.getElementById("input-title").value;
        const description = document.getElementById("input-description").value;
        const price = document.getElementById("input-price").value;
        const code = document.getElementById("input-code").value;
        
        socket.emit('addProduct', { title, description, price, code })

        document.getElementById('input-title').value = '';
        document.getElementById('input-description').value = '';
        document.getElementById('input-code').value = '';
        document.getElementById('input-price').value = '';
    }))

    // Renderizado de lista de productos.
    const render = (data) => {
    const ul = document.getElementById('websocket');
    ul.innerHTML = '';
    if (data.length === 0) {
        ul.innerHTML = '<p>No hay productos agregados</p>'
    } else {
        data.forEach(prod => {
            const html = document.createElement('li')
            html.innerHTML =
            `
            <p>Title: ${prod.title}</p>
            <p>Description: ${prod.description}</p>
            <p>Price: $${prod.price}</p>
            <p>Stock: ${prod.stock}</p>
            <p>Code: ${prod.code}</p>
            <p>Id: ${prod.id}</p>
            `

            ul.append(html)
        });
    }
}

socket.on('allProducts', (data) => {
    render(data);   
});

})();