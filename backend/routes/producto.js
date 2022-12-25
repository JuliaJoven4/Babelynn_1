var express = require('express');

/**Instanciamos clienteController dentro de nuestra ruta producto.js */
var productoController = require('../controllers/productoController');

//Llamamos al archivo 'authenticate'
var authenticate = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');

var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

api.post('/registro_producto_admin', [authenticate.decodeToken, path], productoController.registro_producto_admin);

module.exports = api;