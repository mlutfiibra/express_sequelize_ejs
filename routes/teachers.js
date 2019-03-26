const express = require('express');
const routes = express.Router();
const ModelTeacher = require('../models').Teacher
const ModelSubject = require('../models').Subject

routes.get('/', (req, res) => {
    let teacherResult ={}

    ModelTeacher.findAll({
            order: [
                ['id', 'ASC']
            ],
            include: [{
                model: ModelSubject,
                required: false
            }]
        })
        .then(teachers => {
            teacherResult = {
                teachers:teachers.map(el => el.dataValues)
            }

            return ModelTeacher.count()
        })
        .then(count=> {
            let result =[]

            count = {
                teacherCount : count
            }
            
            result.push(teacherResult)
            result.push(count)

            // res.json(result)
            
            res.render('teacher/index', {
                result
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

routes.post('/add', (req, res) => {
    ModelTeacher.uniqueEmail(req.body.email)
        .then(sameEmail => {
            if (sameEmail === true) throw ('Email sudah ada')
            return ModelTeacher.create({
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        })
        .then((result) => {
            res.redirect('/teachers')
        })
        .catch(err => { 
            ModelSubject.findAll()
                .then(subjects => {
                    res.render('teacher/add', {
                        subjects,
                        err
                    })
                })
        })
});

routes.get('/add', (req, res) => {
    ModelSubject.findAll()
        .then(subjects => {
            // res.json(subjects)
            let err = ''
            res.render('teacher/add', {
                subjects,
                err
            })
        })
});

routes.get('/edit/:id', (req, res) => {
    var teachers = ''
    ModelTeacher.findByPk(Number(req.params.id))
        .then(teachers => {
            teachers = teachers.dataValues
            
            ModelSubject.findAll()
            .then(subjects=> {
                subjects = subjects.map(el=>el.dataValues)
                res.render('teacher/edit', {
                    teachers, subjects
                })
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

routes.post('/edit/:id', (req, res) => {
    ModelTeacher.update({
            ...req.body,
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