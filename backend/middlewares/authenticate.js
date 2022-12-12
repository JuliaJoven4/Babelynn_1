var jwt = require('jwt-simple');
/** Librería que nos va a ayudar a controlar el tiempo que dura el token. */
var moment = require('moment');
//Variable para la contraseña de encriptación:
var secret = 'julia';

/**Exportamos un método que decodifique el token. */
exports.decodeToken = function (req, res, next) {
    /**Verificamos que en la petición estemos enviando la llave 'authorization' con el token de acceso. Si no
     * estamos enviando esta llave en la cabecera, enviamos una respuesta.
     */
    if (!req.headers.authorization) {
        //Enviamos una respuesta en un estado.
        return res.status(403).send({message: 'NoHeadersError'});
    }

    //Una vez comprobado que estamos enviando el token, lo almacenamos en una variable.
    var token = req.headers.authorization;

    //Validamos su estructura.
    var segment = token.split('.');

    //Si la longitud de la variable 'segment' no es 3, el token es incorrecto (no tiene sus 3 partes).
    if (segment.length != 3) {
        return res.status(403).send({message: 'InvalidToken'});
    } else {
        try {
            /**Al decodificar el token, me va a obtener los datos ya decodificados, y los vamos a almacenar en
             * un objeto. El siguiente método recibe dos parámetros: el token que decodifica y la clave de
             * encriptación */
            var payload = jwt.decode(token, secret);
            console.log(payload);
        } catch (error) {
            /*Si surge un error durante la decodificación del token. De esta manera, comprobamos que el token
            que ha pasado la validación de tener las tres partes sea correcto, y no cualquier cadena dividida
            convenientemente por dos puntos, lo cual no podría decodificarse. */
            return res.status(403).send({message: 'ErrorToken'});
        }
    }

    /**Si el token pasa todas estas comprobaciones, le enviamos a las cabeceras un objeto user con el usuario
     * ya decodificado, que se almacenaría en la variable payload, tal y como hemos fijado anteriormente.
     */
    req.user = payload;
    next();
}