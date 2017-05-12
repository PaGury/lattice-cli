const {prepareQuery} = require('../');
const {get} = require('lodash');
const query = require('./query.graphql');

module.exports = (teamId) => prepareQuery({
  parser: (response) => {
    return get(response.body, 'data.viewer.team.goals.edges', []).map(g => g.node);
  },
  payload: {
    query,
    variables: {
      goalsState: 'ACTIVE',
      teamId
    }
  }
});
