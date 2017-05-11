const request = require('request-json');

module.exports = (config) => {
  function getClient(token) {
    const client = request.createClient(config.url);
    client.headers['Content-Type'] = 'application/json';
    client.headers['Authorization'] = 'Bearer ' + token;

    return {
      executeQuery({payload, parser}) {
        return client.post('graphql', payload).then((response) => parser(response));
      }
    };
  }

  function getOkrTeam(token, teamId) {
    return getClient(token).executeQuery(require('./graphql/okr-team')(teamId));
  }

  return {
    getOkrTeam
  }
};
