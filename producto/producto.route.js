const express = require('express');
const router = express.Router();
const { readProductoConFiltros, createProducto, updateProducto, deleteProducto } = require("./producto.controller");
const { respondWithError } = require('../utils/functions');
const { authenticateToken } = require('../middleware/auth');

async function GetProductos(req, res) {
    try {
        const resultadosBusqueda = await readProductoConFiltros(req.query);
        res.status(200).json(resultadosBusqueda);
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PostProducto(req, res) {
    try {
        await createProducto(req.body);
        res.status(201).json({ mensaje: "Producto creado con éxito." });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PatchProductos(req, res) {
    try {
        await updateProducto(req.body);

        res.status(200).json({
            mensaje: "Éxito. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function DeleteProductos(req, res) {
    try {
        await deleteProducto(req.params.id);

        res.status(200).json({
            mensaje: "Éxito. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

router.get("/", authenticateToken, GetProductos);
router.post("/", authenticateToken, PostProducto);
router.patch("/", authenticateToken, PatchProductos);
router.delete("/:id", authenticateToken, DeleteProductos);

module.exports = router;
