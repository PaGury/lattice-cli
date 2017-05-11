const fs = require('fs');
require.extensions['.graphql'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

function getGraphQlQuery(queryName) {
  if (!queryName) {
    throw Error('QueryName argument is missing');
  }

  try {
    return require(`./graphqlQueries/${queryName}.graphql`);
  } catch (e) {
    throw Error(`${queryName} query does not exists`);
  }
}

module.exports = {
  getGraphQlQuery
};
