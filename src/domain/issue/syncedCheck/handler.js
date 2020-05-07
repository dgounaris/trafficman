const GetAllPRsAction = require('../../../outbound/http/github/GetAllPRsAction');
const GetPRDetails = require('../../../outbound/http/github/GetPRDetails');
const PostCommitCheckStatus = require('../../../outbound/http/github/PostCommitCheckStatus');

class SyncedCheckHandler {
  constructor({ eventBus } = {}) {
    this.eventBus = eventBus;
  }

  async handle(command) {
    command.validate();

    const affectedPrs = await this.getAllAffectedPrs(command);
    console.log('Affected shas');
    console.log(affectedPrs);

    //this.triggerPendingStatus(affectedPrs);

    if (affectedPrs.some(pr => !pr.mergeable)) {
      this.triggerFailureStatus(affectedPrs);
    } else {
      this.triggerSuccessStatus(affectedPrs);
    }
  }

  async getAllAffectedPrs(command) {
    let affectedPrs = [];
    for (let i = 0; i < command.repositories.length; i++) {
      const affectedPrsOfRepo = await this.getAffectedPRsOfRepo(command.issueName, command.owner, command.repositories[i]);
      for (let j = 0; j < affectedPrsOfRepo.length; j++) {
        const affectedSha = affectedPrsOfRepo[j].head.sha;
        const prDetails = await new GetPRDetails(affectedPrsOfRepo[j].url).execute();
        const mergeable = prDetails.mergeable;
        affectedPrs.push({
          owner: command.owner,
          repo: command.repositories[i],
          sha: affectedSha,
          mergeable: mergeable
        })
      }
    }
    return affectedPrs;
  }

  async getAffectedPRsOfRepo(issueName, owner, repository) {
    const response = await new GetAllPRsAction(owner, repository).execute();
    return response.filter(pr => pr.title.startsWith(issueName));
  }

  async triggerPendingStatus(affectedPrs) {
    affectedPrs.forEach(pr => 
     new PostCommitCheckStatus(pr.owner, pr.repo, pr.sha, "pending", "Checking if all pull requests with the same issue number are mergeable", "Trafficman/synced").execute()
    );
  }

  async triggerSuccessStatus(affectedPrs) {
    affectedPrs.forEach(pr => 
     new PostCommitCheckStatus(pr.owner, pr.repo, pr.sha, "success", "All pull requests for the same ticket are mergeable", "Trafficman/synced").execute()
    );
  }

  async triggerFailureStatus(affectedPrs) {
    affectedPrs.forEach(pr => 
     new PostCommitCheckStatus(pr.owner, pr.repo, pr.sha, "failure", "One or more pull requests for the same ticket are not mergeable", "Trafficman/synced").execute()
    );
  }
}

module.exports = SyncedCheckHandler;
