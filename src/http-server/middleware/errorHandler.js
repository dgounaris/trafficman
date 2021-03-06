const Boom = require('boom');
const logger = require('../../logger');

module.exports = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    const boom = Boom.boomify(err);

    ctx.response.status = boom.output.statusCode;
    ctx.response.set(boom.output.headers);
    ctx.response.body = boom.output.payload;

    // print unknown error stack to stderr
    if (boom.output.statusCode >= 500) {
      logger.error(boom.stack);
    }
  }
}