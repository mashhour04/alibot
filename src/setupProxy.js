const proxy = require('http-proxy-middleware');

module.exports = function(app) {
 console.log('DOING PROXYING ========================================================++++> =+++++++++++++++++++++++++++>');
  app.use(proxy('/backend', { target: 'http://localhost:8000/' }));
};