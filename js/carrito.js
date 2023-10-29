class Carrito {
    constructor(id) {
        this.id = id;
        this.articulos = [];
    }

    anyadeArticulo(articulo) {
        let encontrado = this.articulos.find(a => a.codigo === articulo.codigo);
        if (encontrado) {
            encontrado.unidades++;
        } else {
            articulo.unidades = 1;
            this.articulos.push(articulo);
        }
    }

    borraArticulo(codigoArticulo) {
        this.articulos = this.articulos.filter(a => a.codigo !== codigoArticulo);
    }

    verCarrito() {
        // Mostrar el carrito en el control dialog
        const dialogContent = document.getElementById("dialogContent");
        dialogContent.innerHTML = "";  // Limpiar el contenido anterior

        if (this.articulos.length === 0) {
            dialogContent.innerHTML = "<p>No hay artículos en el carrito</p>";
            return;
        }

        let tabla = "<table><thead><tr><th>Nombre</th><th>Unidades</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>";
        this.articulos.forEach(articulo => {
            tabla += `<tr>
                        <td>${articulo.nombre}</td>
                        <td>${articulo.unidades}</td>
                        <td>${articulo.precio * articulo.unidades}</td>
                        <td>
                            <button onclick="modificarUnidades('${articulo.codigo}', 'incrementar')">+</button>
                            <button onclick="modificarUnidades('${articulo.codigo}', 'decrementar')">-</button>
                            <button onclick="borrarArticuloCarrito('${articulo.codigo}')">Eliminar</button>
                        </td>
                      </tr>`;
        });
        tabla += "</tbody></table>";

        dialogContent.innerHTML = tabla;
        this.actualizarTotal();
    }

    modificaUnidades(codigoArticulo, operacion) {
        let articulo = this.articulos.find(a => a.codigo === codigoArticulo);
        if (articulo) {
            if (operacion === "incrementar") {
                articulo.unidades++;
            } else if (operacion === "decrementar" && articulo.unidades > 0) {
                articulo.unidades--;
                if (articulo.unidades === 0) {
                    this.borraArticulo(codigoArticulo);
                }
            }
            this.verCarrito();  // Actualizar la vista del carrito
        }
    }

    actualizarTotal() {
        const totalSpan = document.getElementById("total");
        const total = this.articulos.reduce((acum, articulo) => acum + (articulo.precio * articulo.unidades), 0);
        totalSpan.textContent = total + " €";
    }
}

// Funciones globales para ser llamadas desde el HTML
function modificarUnidades(codigo, operacion) {
    carrito.modificaUnidades(codigo, operacion);
}

function borrarArticuloCarrito(codigo) {
    carrito.borraArticulo(codigo);
}

// Creación del carrito global
const carrito = new Carrito(1);
