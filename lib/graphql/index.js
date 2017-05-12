const fs = require('fs');
require.extensions['.graphql'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const {get} = require('lodash');

/**
 * Insert a authenticationChecker query to verify if the token is still valid
 * If the authenticationChecker is empty, the token is invalid
 * @param queryPayload
 * @returns queryPayload
 */
function prepareQuery(queryPayload) {
  const {payload: {query}, parser} = queryPayload;
  // Get the last index of } to inject the authentication query in body
  const authenticationCheckerQueryInsertIndex = query.lastIndexOf('}');
  const firstPartQuery = query.substring(0, authenticationCheckerQueryInsertIndex);

  // AuthenticationChecker query inserting at the end of the query
  queryPayload.payload.query = `${firstPartQuery}
    authenticationChecker: viewer {
      company {
        id
      }
    }
  }`;

  // Wrapping parser to check if the token is valid or not.
  queryPayload.parser = (response) => {
    if(get(response.body, 'data.authenticationChecker.company') === null) {
      throw new Error('the token is invalid');
    }

    return parser(response);
  };

  queryPayload.__prepared = true;
  return queryPayload;
}

module.exports = {
  prepareQuery
};
