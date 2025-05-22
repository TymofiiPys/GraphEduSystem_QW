const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://spring:8080/api',
      changeOrigin: true,
    })
  );
  app.use(
    '/grpc',
    createProxyMiddleware({
      target: 'http://grpc:8081/api',
      changeOrigin: true,
    })
  );
};