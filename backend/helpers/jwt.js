var jwt = require('jwt-simple');
/** Librería que nos va a ayudar a controlar el tiempo que dura el token. */
var moment = require('moment');
//Variable para la contraseña de encriptación:
var secret = 'julia';

/**Se crea el token de acceso del usuario que está intentando acceder, el cual se le pasa al siguiente método
 * em forma de objeto, y lo que devuelve es ese token de acceso:
 */
exports.createToken = function (usuario) {
    /**Objeto que contiene los datos para encriptar: */
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        rol: usuario.rol,

        /**Aparte de los datos propios del objeto, añadimos la fecha de creación y expiración del token */
        iat: moment().unix,
        /*Le pasamos al 'add' como parámetro el número del segundo, que es el tipo de tiempo. En este caso,
        un día. Después obtenemos los datos en formato unix, como en la fecha de creación. */
        exp: moment().add(1, 'day').unix()
    }

    //Encriptamos el objeto. Primer parámetro: objeto. Segundo: clave de encriptación.
    return jwt.encode(payload, secret);

}