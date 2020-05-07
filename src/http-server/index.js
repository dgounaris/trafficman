const Koa = require('koa');
const http = require('http');
const Boom = require('boom');
const pino = require('koa-pino-logger');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const errorHandler = require('./middleware/errorHandler');
const health = require('./health');
const api = require('./api');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = function createServer({commandBus} = {}) {
  if (!commandBus) {
    throw new Error('server: commandBus is missing');
  }

  const app = new Koa();

  Object.assign(app.context, {commandBus});

  // setup logging
  app.use(pino());

  // setup helmet
  if (inProduction) {
    app.use(helmet());
  }

  // handle errors
  app.use(errorHandler);

  // parse application/json
  app.use(
    bodyParser({
      enableTypes: ['json'],
      onerror: err => {
        throw Boom.badRequest(err);
      }
    })
  );

  
  // register routes
  app.use(health.routes(), health.allowedMethods());
  app.use(api.routes());
  app.use(
    api.allowedMethods({
      throw: true,
      notImplemented: () => Boom.notImplemented(),
      methodNotAllowed: () => Boom.methodNotAllowed()
    })
  );

  return http.createServer(app.callback());
}