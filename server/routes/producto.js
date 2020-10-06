const express = require("express");
const { verificaToken } = require("../middlewares/autenticacion");
let Producto = require("../models/producto")
const app = express();


// ===================================
// Obtener Productos
// ===================================

app.get('/productos', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')

    .exec((err, productos) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            productos
        });

    })



})

// ===================================
// Obtener Productos por ID
// ===================================

app.get('/productos/:id', verificaToken, (req, res) => {

        let id = req.params.id;

        Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'nombre')
            .exec((err, productoDB) => {


                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err,
                    });
                }
                if (!productoDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Id no existe'
                        }
                    });
                }

                res.json({
                    ok: true,
                    productos: productoDB
                });




            })
    })
    // ===================================
    // Buscar Productos
    // ===================================

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i')

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                productos
            });



        })


})




// ===================================
// Crear Productos
// ===================================

app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id,
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        // usuarioDB.password = null;

        res.json({
            ok: true,
            producto: productoDB,
        });
    });






})


// ===================================
// Actualizar Productos
// ===================================

app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;


        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado,
            });

        })

    })
})









// ===================================
// Eliminar Productos
// ===================================

app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }



        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });
        })


    })


})





module.exports = app;