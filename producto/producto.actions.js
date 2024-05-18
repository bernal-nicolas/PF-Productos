const Producto = require("./producto.model")

async function getProductoMongo(filtros) {
    filtros.isActive = true;
    const productosFiltrados = await Producto.find(filtros);
    
    return productosFiltrados;
}

async function createProductoMongo(datos) {
    const productoCreado = await Producto.create(datos);

    return productoCreado;
}

async function updateProductoMongo(id, cambios) {
    const resultado = await Producto.findByIdAndUpdate(id, cambios);

    return resultado;
}

async function deleteProductoMongo(id) {
    const resultado = await Producto.findByIdAndUpdate(id, { isActive: false }, { new: true });

    return resultado;
}

module.exports = {
    createProductoMongo,
    getProductoMongo,
    updateProductoMongo,
    deleteProductoMongo
};
