const SyncedCheckHandler = require('./issue/syncedCheck/handler');

class CommandBus {
  /**
   * Create a new CommandBus instance
   *
   * @param {Object} options
   * @param {Registry} options.registry - a registry of dependencies
   * to inject to resolved handlers.
   */
  constructor({registry}) {
    this.registry = registry;
  }

  /**
   * Execute the given command using its designated hander,
   * and return a Promise.
   *
   * @param {Object} command - the command to execute
   * @returns {Promise} a promise that resolves if the command
   * executes successfully and rejects if it fails
   * @throws if no handler is found for the given command
   */
  async execute(command) {
    if (!command) {
      throw new Error('CommandBus: execute expects a command');
    }

    switch (command.constructor.name) {
      case 'SyncedCheckCommand':
        new SyncedCheckHandler().handle(command);
        break;
      default:
        throw new Error(`CommandBus: No handler found for command "${command.constructor.name}"`);
    }
  }
}

module.exports = CommandBus;
