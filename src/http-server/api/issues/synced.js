const Boom = require('boom');
const SyncedCheckCommand = require('../../../domain/issue/syncedCheck/command');

module.exports = async function issueSynced(ctx) {
  const {request} = ctx;
  const command = SyncedCheckCommand.buildFromJSON(request.body);
  try {
    await ctx.commandBus.execute(command);
    const {response} = ctx;
    response.status = 200;
    response.body = 'OK';
  } catch (err) {
    if (err.errors) {
      throw Boom.badData('Invalid request', err.errors);
    } else {
      throw err;
    }
  }
}
