const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasProducto = require("./producto/producto.route")
app.use('/producto', rutasProducto);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error(error))

app.listen(8082);