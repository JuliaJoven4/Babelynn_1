var express = require('express');

/**Instanciamos clienteController dentro de nuestra ruta usuario.js */
var usuarioController = require('../controllers/usuarioController');

//Llamamos al archivo 'authenticate'
var authenticate = require('../middlewares/authenticate');

var api = express.Router();

/**En un parámetro le damos nombre a la ruta, que se recomienda que sea el mismo que el del método.
 * En el segundo parámetro primero introducimos la instancia del archivo 'authenticate', seguido del método
 * 'decodeToken'. En el otro parámetro se introduce lo que se va a ejecutar en nuestra ruta.
 * En este caso le vamos a poner el método post porque es un formulario a través del que hay que enviar datos.
 */
api.post('/registro_usuario_admin', authenticate.decodeToken, usuarioController.registro_usuario_admin);

//Ruta de acceso al método 'login_usuario':
api.post('/login_usuario', usuarioController.login_usuario);


/**Otra manera de hacerlo, aunque no recomendada: */
// api.get('/testing', function (req, res) {
//     res.status(200).send({data:'HOLA TESTING 2'})
// });

module.exports = api;