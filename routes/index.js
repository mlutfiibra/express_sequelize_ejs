const routes = require('express').Router()
const Model = require('../models')

routes.get('/', (req, res) => {
    Model.Teachers.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(teachers => {
            res.json(teachers)
            let guru = teachers.map(el => el.dataValues)
            res.render('index', {
                teachers: guru
            });
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/students', (req, res) => {
    Model.Student.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(students => {
            res.json(students)           
            students = students.map(el => el.dataValues)
            res.render('student/index', {
                students
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.post('/students/add', (req, res) => {
    Model.Student.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(students => {
            res.json(students)          
            res.redirect('/students')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/students/add', (req, res) => {
    res.render('student-add')
});

routes.get('/students/edit/:id', (req, res) => {
    Model.Student.findByPk(Number(req.params.id))
        .then(students => {
            res.json(students)
            students = students.dataValues
            res.render('student/edit', {
                students
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

routes.post('/students/edit/:id', (req, res) => {
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
            res.json(students)
            res.redirect('/students')
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

routes.get('/students/delete/:id', (req, res) => {
    Model.Student.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(students => {
            res.json(students)
            res.redirect('/students')
        })
        .catch(err => {
            res.status(400).json(err)
        })
})
// end student API

// teacher API
routes.get('/teachers', (req, res) => {
    Model.Teachers.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(teachers => {
            res.json(teachers)
            teachers = teachers.map(el => el.dataValues)
            res.render('teacher/index', {
                teachers
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.post('/teachers/add', (req, res) => {
    Model.Teachers.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(teachers => {
            res.json(teachers)
            res.redirect('/teachers')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/teachers/add', (req, res) => {
    res.render('teacher/add')
});

routes.get('/teachers/edit/:id', (req, res) => {
    Model.Teachers.findByPk(Number(req.params.id))
        .then(teachers => {
            res.json(teachers)
            teachers = teachers.dataValues
            res.render('teacher/edit', {
                teachers
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

routes.post('/teachers/edit/:id', (req, res) => {
    Model.Teachers.update({
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
            res.json(teachers)
            res.redirect('/teachers')
        })
        .catch(err => {
            res.json(err)
        })
})

routes.get('/teachers/delete/:id', (req, res) => {
    Model.Teachers.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(teachers => {
            res.json(teachers)
            res.redirect('/teachers')
        })
        .catch(err => {
            res.json(err)
        })
})
// end of teachers API

// subject API
routes.get('/subjects', (req, res) => {
    Model.Subject.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(subjects => {
            res.json(subjects)
            subjects = subjects.map(el => el.dataValues)
            res.render('subject/index', {
                subjects
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.post('/subjects/add', (req, res) => {
    Model.Subject.create({
            subject_name: req.body.subject_name,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(subjects => {
            res.json(subjects)
            res.redirect('/subjects')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
});

routes.get('/subjects/add', (req, res) => {
    res.render('subject/add')
});

routes.get('/subjects/edit/:id', (req, res) => {
    Model.Subject.findByPk(Number(req.params.id))
        .then(subjects => {
            res.json(subjects)
            subjects = subjects.dataValues
            res.render('subject/edit', {
                subjects
            })
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

routes.post('/subjects/edit/:id', (req, res) => {
    Model.Subject.update({
            subject_name: req.body.subject_name,
            updatedAt: new Date()
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
        .then(subjects => {
            res.json(subjects)
            res.redirect('/subjects')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})

routes.get('/subjects/delete/:id', (req, res) => {
    Model.Subject.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(subjects => {
            res.json(subjects)
            res.redirect('/subjects')
        })
        .catch(err => {
            res.status(400).json(err)            
        })
})
// end of subject API

routes.get('*', (req, res) => {
    res.status(404).send('404 page not found');
});


module.exports = routes