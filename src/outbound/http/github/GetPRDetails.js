const axios = require('axios');

class GetPRDetails {
  constructor (url) {
    this.url = url;
  }

  async execute() {
      let config = {
          headers: {
            'Authorization': `token bc9d81abdc16517422503b766c8ba3483c297e39`,
          }
      }
      const response = await axios.get(this.url, config);
      //console.log('Full response:\n');
      //console.log(response)
      //console.log('\n')
      return response.data;
  }
}

module.exports = GetPRDetails;