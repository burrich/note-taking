const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const notes      = require('./api/notes');

const app = express();

/**
 * Configuration :
 * - serving statics files
 * - parsing application/json
 * - parsing application/x-www-form-urlencoded
 * 
 * TODO: local/heroku test for __dirname ?
 */
app.use(express.static(path.join(__dirname,'../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use('/api/notes', notes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;