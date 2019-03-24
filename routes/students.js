const express = require('express');
const routes = express.Router();
const Model = require('../models')

routes.get('/', (req, res) => {
    Model.Student.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(students => {
            // res.json(students)
            students = students.map(el => el.dataValues)
            res.render('student/index', {
                students
            })  
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.post('/add', (req, res) => {
    Model.Student.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(students => {
            // res.json(students)        
            res.redirect('/students')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/add', (req, res) => {
    res.render('student-add')
});

routes.get('/edit/:id', (req, res) => {
    Model.Student.findByPk(Number(req.params.id))
        .then(students => {
            // res.json(students)
            students = students.dataValues
            res.render('student/edit', {
                students
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

routes.post('/edit/:id', (req, res) => {
    Model.Student.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            updatedAt: new Date()
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
        .then(students => {
            // res.json(students)
            res.redirect('/students')
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

routes.get('/delete/:id', (req, res) => {
    Model.Student.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(students => {
            // res.json(students)
            res.redirect('/students')
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = routes
