const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./Routes/restaurante.routes');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/restaurante', router);

mongoose.connect(process.env.direccion)
.then(() => console.log('Conexion de base de datos'))
.catch((error) => console.error(error));





app.listen(4000, ()=>{
    console.log('listening at port 4000');
})

