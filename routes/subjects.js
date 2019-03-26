const express = require('express');
const routes = express.Router();
const ModelSubject = require('../models').Subject;
const ModelTeacher = require('../models').Teacher;
const ModelStudent = require('../models').Student;
const ModelStudentSubject = require('../models').Student_Subject;

routes.get('/', (req, res) => {
    ModelSubject.findAll({
            order: [
                ['id', 'ASC']
            ],
            include: [{
                model: ModelTeacher,
                required: false
            }]
        })
        .then(subjects => {
            // res.json(subjects)
            subjects = subjects.map(el => el.dataValues)
            res.render('subject/index', {
                subjects
            })
        })
        .catch(err => {
            subjects = null
            res.render('subject/index', subjects)
        })
});

routes.post('/add', (req, res) => {
    ModelSubject.create({
            ...req.body,
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
    ModelSubject.findByPk(Number(req.params.id))
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
    ModelSubject.update({
            ...req.body,
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
    ModelSubject.destroy({
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

routes.get('/:id/enrolled-students', (req, res) => {
    ModelSubject.findByPk(req.params.id, {
            include: [{
                model: ModelStudent
            }]
        })
        .then(subject => {
            // res.json(subject)
            res.render('subject/enrolled-students', {
                subject
            })
        })
})

routes.get('/:id/give-score', (req, res) => {
    ModelStudentSubject.findOne({
            where: {
                subjectId: req.params.id
            }
        })
        .then(subject => {
            // res.json(subject)
            res.render('subject/give-score', {
                subject
            })
        })
})

routes.post('/:id/give-score', (req, res) => {
    let idUser = req.params.id
    ModelStudentSubject.update({
            score: req.body.score,
        }, {
            where: {
                subjectId: req.params.id
            }
        })
        .then(subject => {
            // res.json(subject)
            res.redirect('/subjects')
        })
})

module.exports = routes