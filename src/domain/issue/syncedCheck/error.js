class SyncedCheckError extends Error {
  constructor(syncedCheckCommand, errors, ...params) {
    super(...params);
    this.name = 'SyncedCheckError';
    this.command = syncedCheckCommand;
    this.errors = errors;
    this.date = new Date();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SyncedCheckError);
    }
  }
}

module.exports = SyncedCheckError;
