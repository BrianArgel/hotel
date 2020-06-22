const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function() {
    router.get('/', (req, res) => {
        res.render('index',  {
            clase: 'home'
        });
    });
    
    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });
    
    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error));
    });


    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes',{
                pagina: 'Proximos Viajes',
                viajes 
            }))
            .catch(error => console.log(error))
    });

    router.get('/testimoniales', (req, res) => {
        Testimonial.findAll()
        .then(testimoniales =>res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
            }))
    
        });
        
    //Cuando se llena el Form

    router.post('/testimoniales', (req, res)=>{
        //Validar los datos
        let {nombre, correo, mensaje} = req.body;
        let errores = [];
        if(!nombre) {
            errores.push({'mensaje': 'Agrega Tu nombre'})
        }
        if(!correo) {
            errores.push({'mensaje': 'Agrega Tu Correo'})
        }
        if(!mensaje) {
            errores.push({'mensaje': 'Agrega Tu mensaje'})
         }

        if(errores.length > 0){
            res.render('testimoniales',{
            errores,
            nombre,
            correo,
            mensaje    
            })
        } else {
            Testimonial.create({
                nombre,
                correo,
                mensaje
            }).then(Testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));
                

        }


    })
    




  

    return router;
}