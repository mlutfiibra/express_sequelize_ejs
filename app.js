const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const PORT = 6600
const routes = require('./routes')
const teachers = require('./routes/teachers')
const students = require('./routes/students')
const subjects = require('./routes/subjects')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/teachers', teachers)
app.use('/students', students)
app.use('/subjects', subjects)
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});