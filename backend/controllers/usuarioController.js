var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

/**Utilizamos este método para enviar los campos necesarios para el registro (nomonre, apellidos, e-mail...) */
const registro_usuario_admin = async function(req, res) {

    //Siempre y cuando las cabeceras me devuelvan un objeto ya decodificado.
    if (req.user) {
        /**Aquí estarían los datos enviados a través del formulario.
         * En 'data' almacenaremos todos los datos registrados del usuario.
         */
        let data = req.body;

        /**Se encripta la contraseña del administrador mediante una librería instalada.
         * Utiilizamos el método 'hash' para encriptar una cadena, al que le mandamos como primer parámetro la cadena
         * que vamos a encriptar. Los dos siguientes parámetros son configuraciones que vamos a mantener como nulas.
         * El último es una función que recibe como parámetro el error de encriptación o la cadena encriptada.
         */

        /**Consulta al modelo de usuario para verificar si el correo electrónico que enviamos,
         * marcado como único, ya existe.
         * Recogemos el array de información que nos va a proporcionar el método 'find' en la variable 'usuarios' */
        let usuarios = await Usuario.find({email: data.email});

        /**Comprobamos que la longitud de la cadena almacenada en usuario sea 0, es decir, no coincida el email
         * introducido con alguno existente.
         */
        if (usuarios.length >= 1) {
            res.status(200).send({data: undefined, message: 'Ya hay un usuario registrado con el correo introducido.'});
        } else {
            bcrypt.hash('123456', null, null, async function(err, hash) {
                //Si hay un error imprime ese mensaje de error.
                if (err) {
                    res.status(200).send({data: undefined, message: 'No ha sido posible encriptar la contraseña.'});
                    //Si no hay error:
                } else {
                    /**Almacenamos 'hash' en nuestro objeto 'data', para lo que vamos a crear el objeto password. */
                    data.password = hash;
                    //Registramos nuestro usuario
                    let usuario = await Usuario.create(data);
                    res.status(200).send({data: usuario});
                }
            });
        }
    } else {
        res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
    
    console.log(usuarios);

}

//Método para el login del colaborador:
const login_usuario = async function (req, res) {
    /*Obtenemos las credenciales que envía el usuario para hacer el login (correo y contraseña). Estos datos los
    almacenamos en la variable data, y los obtenemos del cuerpo de la solicitud (req.body). */
    var data = req.body;
    
    //Comprobamos si existe en la base de datos el correo que hemos introducido a la hora de hacer el login
    //El método 'find' devuelve siempre un array, porque consulta un conjunto de datos.
    var usuarios = await Usuario.find({email: data.email});
    
    if (usuarios.length >= 1) {
        //El correo introducido existe
        /**El primer parámetro es la contraseña que se envía desde el formulario, el segundo la contraseña
         * a comparar, que está dentro de mi array de usuarios, y el tercero una función cuyos parámetros son
         * un error y una respuesta correcta o no con respecto a la comparación.
         */
        bcrypt.compare(data.password, usuarios[0].password, async function (err, check) {
            //Condicionamiento del 'check'
            if (check) {
                //La respuesta es correcta y la contraseña existe
                /*Enviamos el token y obtenemos la instancia de jwt. El parámetro del método de 'createToken'
                es el usuario ya encontrado, cuyo email y contraseña están verificados. */
                res.status(200).send({
                    token: jwt.createToken(usuarios[0]),
                    //Además del token, vamos a mandar el objeto del usuario logueado.
                    usuario: usuarios[0]
                });
            } else {
                res.status(200).send({data: undefined, message: 'La contraseña es incorrecta.'});
            }
        });
    } else {
        //El correo no existe
        res.status(200).send({data: undefined, message: 'No se encontró el correo electrónico introducido.'});
    }
}

module.exports = {
    registro_usuario_admin,
    login_usuario
}