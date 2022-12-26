/**Llamamos a nuestro framework de Express */
var express = require('express');

/**Conectamos con el servidor local de nuestra base de datos. */
var mongoose = require('mongoose');

/**Realizamos la llamada al paquete 'body-parser' */
var bodyparser = require('body-parser');

/**Creamos una variable que almacene el puerto en el que la variable app se va a mantener a la escucha. */
var port = process.env.port || 4201;

/**Creamos un módulo de Express.
 * La inicialización del framework va a estar dentro de la variable 'app'.
 */
var app = express();

/**Instanciar el archivo de rutas de cliente. */
var cliente_router = require('./routes/cliente');
/**Instanciar el archivo de rutas de usuario. */
var usuario_router = require('./routes/usuario');
/**Instanciar el archivo de rutas de producto. */
var producto_router = require('./routes/producto');

/**Para poder 'parsear' los datos: */
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/tienda', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        /**Ponemos a la variable 'app' a escuchar en un puerto. */
        app.listen(port, function() {
            console.log('Servidor corriendo en el puerto ' + port + ".");
        });
    }
});

/*Para permitir el traspaso de datos desde un servidor externo hasta nuestro backend */
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

/**Usar el archivo de rutas instanciado anteriormente.
 * En el primer parámetro introducimos el prefijo de la app.
 * En el segundo parámetro introducimos la instancia de nuestro enrutado.
 */
app.use('/api', cliente_router);
/**Hacemos lo mismo pero con el archivo de rutas de usuario. */
app.use('/api', usuario_router);
/**Lo mismo con el archivo de rutas de producto. */
app.use('/api', producto_router);

/**Exportamos nuestra variable app */
module.exports = app;