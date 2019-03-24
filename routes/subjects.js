const express = require('express');
const routes = express.Router();
const Model = require('../models')

routes.get('/', (req, res) => {
    Model.Subject.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(subjects => {
            // res.json(subjects)
            subjects = subjects.map(el => el.dataValues)
            res.render('subject/index', {
                subjects
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.post('/add', (req, res) => {
    Model.Subject.create({
            subject_name: req.body.subject_name,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(subjects => {
            // res.json(subjects)
            res.redirect('/subjects')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/add', (req, res) => {
    res.render('subject/add')
});

routes.get('/edit/:id', (req, res) => {
    Model.Subject.findByPk(Number(req.params.id))
        .then(subjects => {
            // res.json(subjects)
            subjects = subjects.dataValues
            res.render('subject/edit', {
                subjects
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

routes.post('/edit/:id', (req, res) => {
    Model.Subject.update({
            subject_name: req.body.subject_name,
            updatedAt: new Date()
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
        .then(subjects => {
            // res.json(subjects)
            res.redirect('/subjects')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

routes.get('/delete/:id', (req, res) => {
    Model.Subject.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(subjects => {
            // res.json(subjects)
            res.redirect('/subjects')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

module.exports = routes
