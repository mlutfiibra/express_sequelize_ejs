const routes = require('express').Router()
const Model = require('../models')

routes.get('/', (req, res) => {
    Model.Teachers.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(teachers => {
            let guru = teachers.map(el => el.dataValues)

            res.render('index', {
                teachers: guru
            });
        })
});

routes.get('/students', (req, res) => {
    Model.Student.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(students => {
            students = students.map(el => el.dataValues)
            res.render('student/index', {
                students
            })
        })
});

routes.post('/students/add', function (req, res) {
    Model.Student.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(students => {
            res.redirect('/students')
        })
        .catch(err => {})
});

routes.get('/students/add', (req, res) => {
    res.render('student-add')
});

routes.get('/students/edit/:id', function (req, res) {
    Model.Student.findByPk(Number(req.params.id))
        .then(students => {
            students = students.dataValues
            res.render('student/edit', {
                students
            })
        })
})

routes.post('/students/edit/:id', function (req, res) {
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
            res.redirect('/students')
        })
        .catch(err => {
            console.log(`Update error: ${err}`);
        })
})

routes.get('/students/delete/:id', function (req, res) {
    Model.Student.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(students => {
            res.redirect('/students')
        })
        .catch(err => {
            console.log(`Update error: ${err}`);
        })
})
// end student

// teacher
routes.get('/teachers', (req, res) => {
    Model.Teachers.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(teachers => {
            teachers = teachers.map(el => el.dataValues)
            res.render('teacher/index', {
                teachers
            })
        })
});

routes.post('/teachers/add', function (req, res) {
    Model.Teachers.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(teachers => {
            res.redirect('/teachers')
        })
        .catch(err => {})
});

routes.get('/teachers/add', (req, res) => {
    res.render('teacher/add')
});

routes.get('/teachers/edit/:id', function (req, res) {
    Model.Teachers.findByPk(Number(req.params.id))
        .then(teachers => {
            teachers = teachers.dataValues
            res.render('teacher/edit', {
                teachers
            })
        })
})

routes.post('/teachers/edit/:id', function (req, res) {
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
            res.redirect('/teachers')
        })
        .catch(err => {
            console.log(`Update error: ${err}`);
        })
})

routes.get('/teachers/delete/:id', function (req, res) {
    Model.Teachers.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(teachers => {
            res.redirect('/teachers')
        })
        .catch(err => {
            console.log(`Update error: ${err}`);
        })
})
// end of teachers

// subject
routes.get('/subjects', (req, res) => {
    Model.Subject.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(subjects => {
            subjects = subjects.map(el => el.dataValues)
            res.render('subject/index', {
                subjects
            })
        })
});

routes.post('/subjects/add', function (req, res) {
    Model.Subject.create({
            subject_name: req.body.subject_name,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(subjects => {
            res.redirect('/subjects')
        })
        .catch(err => {})
});

routes.get('/subjects/add', (req, res) => {
    res.render('subject/add')
});

routes.get('/subjects/edit/:id', function (req, res) {
    Model.Subject.findByPk(Number(req.params.id))
        .then(subjects => {
            subjects = subjects.dataValues
            res.render('subject/edit', {
                subjects
            })
        })
})

routes.post('/subjects/edit/:id', function (req, res) {
    Model.Subject.update({
            subject_name: req.body.subject_name,
            updatedAt: new Date()
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
        .then(subjects => {
            res.redirect('/subjects')
        })
        .catch(err => {
            console.log(`Update error: ${err}`);
        })
})

routes.get('/subjects/delete/:id', function (req, res) {
    Model.Subject.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(subjects => {
            res.redirect('/subjects')
        })
        .catch(err => {
            console.log(`Update error: ${err}`);
        })
})
// end of 

routes.get('*', function (req, res) {
    res.status(404).send('404 page not found');
});


module.exports = routes