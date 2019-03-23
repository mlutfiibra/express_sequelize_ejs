const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const PORT = 6600
const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});