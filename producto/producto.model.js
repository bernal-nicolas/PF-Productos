const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    ganadoID: {type: String, required: true},
    nombre: {type: String, required: true},
    cantidad: {type: Number, required: true},
    fechaReg: {type: Date, required: true},
    fechaExp: {type: Date, required: true},
    isActive: { type: Boolean, required: true, default: true } // Soft Delete
  }, {
    versionKey: false,
    timestamps: true
});
  
const Producto = mongoose.model('Producto', schemaProducto);

module.exports = Producto;