const axios = require('axios');

class GetAllPrsAction {
  constructor (owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }

  async execute() {
      let config = {
          headers: {
            'Authorization': `token bc9d81abdc16517422503b766c8ba3483c297e39`,
          },
          params: {
            state: 'open'
          }
      }
      const response = await axios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/pulls`, config);
      //console.log('Full response:\n');
      //console.log(response)
      //console.log('\n')
      return response.data;
  }
}

module.exports = GetAllPrsAction;