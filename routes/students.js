const express = require('express');
const routes = express.Router();
const ModelStudent = require('../models').Student
const ModelSubject = require('../models').Subject
const ModelStudentSubject = require('../models').Student_Subject

routes.get('/', (req, res) => {
    ModelStudent.findAll({
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
    ModelStudent.create({
            ...req.body,
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
    res.render('student/add')
});

routes.get('/edit/:id', (req, res) => {
    ModelStudent.findByPk(Number(req.params.id))
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
    ModelStudent.update({
            ...req.body,
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
    ModelStudent.destroy({
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

routes.get('/:id/add-subject', (req, res) => {
    let obj = {}
    ModelStudent.findByPk(req.params.id)
        .then(student=> {
            // res.json(student)
            obj=student 
            return ModelSubject.findAll({
                include: [{
                    model: ModelStudent,
                    through: { attributes: [] }
                }]
            })
        })
        .then(subjects => {
            let result = [obj]
            result.push(subjects)
            // res.json(result)
            res.render('student/add-subject', {result})
        })
})

routes.post('/:id/add-subject', (req, res) => {
    ModelStudentSubject.create({
        subjectId:req.body.subjectId,
        studentId:req.params.id
    })
        .then(data => {
            res.redirect('/students')
        })
})

module.exports = routes
