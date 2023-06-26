const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1/chat/completions',
    createProxyMiddleware({
      target: 'http://216.48.187.144:8000',
      changeOrigin: true,
    })
  );
};
