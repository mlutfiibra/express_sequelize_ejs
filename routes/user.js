const routes = require('express').Router()
const ModelUser = require('../models').User

routes.get('/', (req,res) => {
    res.render('user/signup')
})

routes.post('/', (req,res) => {
    ModelUser.create({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(newUser=> {
        res.redirect('/user')
    })
})

routes.get('/signin', (req, res) => {
    res.render('user/signin')
})

routes.post('/signin', (req, res) => {
    ModelUser.findOne({
        where: {
            email : req.body.email,
            name : req.body.name,
        }
    })
    .then(loginUser => {
        if(loginUser === null) throw (`Email atau password salah`)
        loginUser.isLogin = 1
        loginUser.save()
        res.redirect('/')
    })
    .catch(err => {
        // console.log(err);
        res.render('user/signin', {err})
    })
})

module.exports = routes
