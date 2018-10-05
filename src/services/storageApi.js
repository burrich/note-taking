const LOG_TAG = '[INFO]';
const backendEnv = process.env.REACT_APP_BACKEND;

let storageApi; 

if (backendEnv === '0' || backendEnv === undefined) {
  storageApi = require('./clientStorageApi.js');
  console.log(LOG_TAG, 'running no backend mode');
  
} else { // process.env.REACT_APP_BACKEND === '1'
  storageApi = require('./serverStorageApi.js');
  console.log(LOG_TAG, 'running backend mode');
}

export default storageApi;