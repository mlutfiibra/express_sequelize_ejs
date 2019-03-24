const express = require('express');
const routes = express.Router();
const ModelTeacher = require('../models').Teacher

routes.get('/', (req, res) => {
    ModelTeacher.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(teachers => {
            // res.json(teachers)
            teachers = teachers.map(el => el.dataValues)
            res.render('teacher/index', {
                teachers
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

routes.post('/add', (req, res) => {
    ModelTeacher.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(teachers => {
            // res.json(teachers)
            res.redirect('/teachers')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/add', (req, res) => {
    res.render('teacher/add')
});

routes.get('/teachers/edit/:id', (req, res) => {
    ModelTeacher.findByPk(Number(req.params.id))
        .then(teachers => {
            // res.json(teachers)
            teachers = teachers.dataValues
            res.render('teacher/edit', {
                teachers
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

routes.post('/edit/:id', (req, res) => {
    ModelTeacher.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            updatedAt: new Date()
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
        .then(teachers => {
            // res.json(teachers)
            res.redirect('/teachers')
        })
        .catch(err => {
            res.json(err)
        })
})

routes.get('/delete/:id', (req, res) => {
    ModelTeacher.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(teachers => {
            // res.json(teachers)
            res.redirect('/teachers')
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = routes
