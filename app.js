const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000
const routes = require('./routes')
const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/students')
const user = require('./routes/user')
const getIndexScore = require('./helpers/getIndexScore')

// function isAuth(req, res, next) {
//   if(res.user && res.isLogIn) {
//     return next()
//   }

//   res.redirect('/')
// }

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.locals.getIndexScore = getIndexScore
app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)
app.use('/user', user)
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});