const { createProductoMongo, getProductoMongo, updateProductoMongo, deleteProductoMongo } = require("./producto.actions");

async function readProductoConFiltros(query) {
    const resultadosBusqueda = await getProductoMongo(query);
    return resultadosBusqueda;
}

async function createProducto(datos) {
    const productoCreado = await createProductoMongo(datos);
    return productoCreado;
}

function updateProducto(datos) {
    const { _id, ...cambios } = datos;
    const productoActualizado = updateProductoMongo(_id, cambios);
    return productoActualizado;
}

function deleteProducto(id) {
    const productoEliminado = deleteProductoMongo(id);
    return productoEliminado;
}

module.exports = {
    readProductoConFiltros,
    createProducto,
    updateProducto,
    deleteProducto
};
