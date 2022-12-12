/**Se crea la petición */
const testing = async function (req, res) {
    res.status(200).send('Hola testing 2');
}

/**Se exporta el método anterior para que nuestro archivo de rutas pueda utilizarlo */
module.exports = {
    testing
}