const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1/chat/completions',
    createProxyMiddleware({
      target: 'http://216.48.187.144:8000',
      changeOrigin: true,
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',  // Replace with the actual Flask API URL
      changeOrigin: true,
    })
  );
};
