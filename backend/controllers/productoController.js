var Producto = require('../models/producto');
var slugify = require('slugify');

const registro_producto_admin = async function(req,res){
    if(req.user){
        /**Obtenemos el cuerpo del formulario. Los datos de tipo texto. */
        let data = req.body;
        let productos = await Producto.find({titulo:data.titulo});
        console.log(productos.length);

        //Si es mayor o igual que 1, el producto ya existe.
        if(productos.length>= 1){
            res.status(200).send({data:undefined,message: 'El título del producto ya existe.'});   
        }else{
            //Registro del producto
            /**Se almacena aquí la ruta de la imagen, en la que se ve su nuevo nombre. */
            var img_path = req.files.portada.path;
            //Array con los elementos de img_path que separan las '//'.
            var str_img = img_path.split('\\');
            //Nombre que va a tener la imagen subida.
            var str_portada = str_img[2];

            /**Le damos como valor a la propiedad 'portada' de 'Producto' el nombre de la imagen subida */
            data.portada = str_portada;
            data.slug = slugify(data.titulo);
            
            try {
                //Registramos un nevo documento en nuestra colección de 'Producto'
                let producto = await Producto.create(data);
                //Devolvemos al front-end el objeto Producto con los campos guardados.
                res.status(200).send({data:producto});
            } catch (error) {
                res.status(200).send({data:undefined,message: 'No se ha podido crear el producto.'});   
            }
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

module.exports = {
    registro_producto_admin
}