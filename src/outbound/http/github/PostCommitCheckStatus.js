const axios = require('axios');

class PostCommitCheckStatus {
  constructor (owner, repo, commit, state, description, context) {
    this.owner = owner;
    this.repo = repo;
    this.commit = commit;
    this.state = state;
    this.description = description;
    this.context = context;
  }

  async execute() {
      let config = {
          headers: {
            'Authorization': `token bc9d81abdc16517422503b766c8ba3483c297e39`,
          }
      }

      const data = {
        "state": this.state,
        "description": this.description,
        "context": this.context
      }
      const response = await axios.post(`https://api.github.com/repos/${this.owner}/${this.repo}/statuses/${this.commit}`, data, config);
      //console.log('Full response:\n');
      //console.log(response)
      //console.log('\n')
      return response.data;
  }
}

module.exports = PostCommitCheckStatus;