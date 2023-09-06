const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Replace 'http://localhost:3003' with the URL of your backend server
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:3003', // Change this to your backend server's URL
      changeOrigin: true,
    })
  );
};