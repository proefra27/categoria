const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const puerto = process.env.PORT || 3000;
// Configuración de Handlebars

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

// Middleware para el manejo de datos en formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const categoriasRouter = require('./src/routes/categoriasRoutes');
app.use('/categorias', categoriasRouter);

app.get('/',(req,res)=>{
    res.render('index')
})

// Inicio del servidor
app.listen(puerto, () => console.log('Servidor iniciado en puerto 3000'));