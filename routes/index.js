const routes = require('express').Router()
const Model = require('../models')

routes.get('/', (req, res) => {
    res.render('index')
});

routes.get('*', (req, res)=> {
    res.status(404).send('404 page not found');
})

module.exports = routes