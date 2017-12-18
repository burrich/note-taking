const express    = require('express');
const bodyParser = require('body-parser');
const notes      = require('./api/notes');

const app = express();

app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/x-www-form-urlencoded
app.use('/api/notes', notes);

module.exports = app;