var express = require('express')
var app = express()

app.set('view engine', 'pug');

app.use('/', express.static('public/sitio_web'))
app.use('/nosotros/:nosotros', express.static('public/sitio_web'))
app.use('/colegio',  express.static('public/colegio'))

app.get('/colegio', function (req, res) {
    res.render('colegio')
})

app.get('*', function (req, res) {
    res.render('sitio_web')
})

app.get('/nosotros/:nosotros', function (req, res) {
    res.render('sitio_web')
})

app.listen(3000, function () {
    console.log('Escuchando en el puerto 3000')
})