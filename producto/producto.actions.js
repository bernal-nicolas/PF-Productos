const Producto = require("./producto.model")

async function getProductoMongo(filtros) {
  userID = filtros.userID
  delete filtros.userID
  filtros.isActive = true
  filtros["ganadoInfo.userID"] = userID
  
  let productosFiltrados = await Producto.aggregate([
    {
      $addFields: {
        ganadoObjectId: { $toObjectId: "$ganadoID" }
      }
    },
    {
      $lookup: {
        from: "ganados", // Nombre de la colección Ganado en plural
        localField: "ganadoObjectId",
        foreignField: "_id",
        as: "ganadoInfo"
      }
    },
    {
      $unwind: "$ganadoInfo"
    },
    // Filtrar por userID del usuario proporcionado
    {
      $match: filtros
    },
    // Select!
    {
      $project: {
        _id: 1,
        nombre: 1,
        cantidad: 1,
        fechaReg: 1,
        fechaExp: 1,
        ganadoID: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1,
        ganadoInfo: 1
      }
    }
  ])
  
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
