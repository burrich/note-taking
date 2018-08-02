const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const notes      = require('./api/notes');

const app = express();

app.use(express.static(path.join(__dirname,'../build')));

app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/x-www-form-urlencoded
app.use('/api/notes', notes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;