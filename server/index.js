// Importar express
const express = require('express');
const path = require('path');
const routes = require('./routes');

const configs = require('./config');

const db = require('./config/database');
db.authenticate()
    .then(()=> console.log('DB Contectada'))
    .catch(error => console.log(error))


//Configurar express
const app = express();

//Habilitar PUG
app.set('view engine', 'pug');

//añadir las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar una carpeta estatica PUBLIC
app.use(express.static('public'));

//Validar si estamos en desarrollo o Produccion
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual
app.use((req, res, next)=> {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
})

//Cargar las rutas
app.use('/', routes());

app.listen(5000);