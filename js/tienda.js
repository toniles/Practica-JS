const criterios = ["Sin ordenar", "Ascendente por precio", "Descendente por precio"];

function creaListaCriterios() {
    const select = document.querySelector("select");
    criterios.forEach(criterio => {
        let option = document.createElement("option");
        option.value = criterio;
        option.textContent = criterio;
        select.appendChild(option);
    });

    // Evento cuando se cambia la opción de ordenación
    select.addEventListener("change", function() {
        pintaArticulos(this.value);
    });
}

function pintaArticulos(orden) {
    const contenedor = document.getElementById("contenedor");
    let articulosOrdenados = [...listaArticulos];  // Crear una copia del array de artículos

    if (orden === "Ascendente por precio") {
        articulosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "Descendente por precio") {
        articulosOrdenados.sort((a, b) => b.precio - a.precio);
    }

    contenedor.innerHTML = "";  // Limpiar el contenedor

    articulosOrdenados.forEach(articulo => {
        const card = `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${articulo.nombre}</h5>
                        <p class="card-text">${articulo.descripcion}</p>
                        <p class="card-text">${articulo.precio} €</p>
                        <button onclick="ponArticuloEnCarrito('${articulo.codigo}')">Comprar</button>
                    </div>
                </div>
            </div>`;
        contenedor.innerHTML += card;
    });
}

function ponArticuloEnCarrito(codigo) {
    const articulo = listaArticulos.find(a => a.codigo === codigo);
    carrito.anyadeArticulo(articulo);
}

function verCarro() {
    carrito.verCarrito();
}

function efectuaPedido() {
    console.log(JSON.stringify(carrito));
}

window.onload = () => {
    creaListaCriterios();
    pintaArticulos("Sin ordenar");  // Pintar inicialmente sin ordenar
};
