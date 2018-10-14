const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const session       = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const notes         = require('./api/notes');
const User          = require('./db/models/user');

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
app.use(session({ 
  secret: 'the fish doesn\'t think',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Passport init.
 * TODO: passport config file
 */

passport.use(new LocalStrategy((username, password, done) => {
  User.find(username, (err, user) => {
    if (err) return done(err);

    if (!user) {
      return done(null, false, { message: 'incorrect username' });
    }

    if (!User.validPassword(password, user)) {
      return done(null, false, { message: 'incorrect password' });
    }

    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


// Routing

app.use('/api/notes', notes);

/**
 * Login route.
 * TODO: route file
 */
app.post('/login', 
  passport.authenticate('local', {
    session: 'true',
    successRedirect: '/api/notes',
    failureRedirect: '/login'
  }
));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;