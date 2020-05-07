const SyncedCheckError = require('./error');

class SyncedCheckCommand {
  validate() {
    const errors = [];

    // todo error check later

    if (errors.length > 0) {
      throw new SyncedCheckError(this, errors, 'SyncedCheckCommand is not valid');
    }
  }

  static buildFromJSON({issueName, owner, repositories}) {
    const syncedCheckCommand = new SyncedCheckCommand();
    syncedCheckCommand.issueName = issueName;
    syncedCheckCommand.owner = owner;
    syncedCheckCommand.repositories = repositories;
    return syncedCheckCommand;
  }
}

module.exports = SyncedCheckCommand;