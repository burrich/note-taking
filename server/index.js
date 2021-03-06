// Load env variables
require('dotenv').config();

const mongoUtil = require('./db/mongoUtil');

const LOG_TAG = '[INFO]';

/*
 * Express server serving a restful api with mongodb.
 * Connect to db, init app and listening.
 * 
 * TODO: timeout
 */

mongoUtil.connect(err => {
  if (err) return console.error(err);

  const app = require('./app');
  const port = process.env.PORT || 3100;
  
  app.listen(port, () => {
    console.log(LOG_TAG, `Express server listen on port ${port}`)
  });
});
