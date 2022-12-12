var express = require('express');

/**Instanciamos clienteController dentro de nuestra ruta cliente.js */
var clienteController = require('../controllers/clienteController');

var api = express.Router();

/**En un parámetro le damos nombre a la ruta, que se recomienda que sea el mismo que el del método.
 * En el otro parámetro se introduce lo que se va a ejecutar en nuestra ruta.
 */
api.get('/testing', clienteController.testing);

/**Otra manera de hacerlo, aunque no recomendada: */
// api.get('/testing', function (req, res) {
//     res.status(200).send({data:'HOLA TESTING 2'})
// });

module.exports = api;