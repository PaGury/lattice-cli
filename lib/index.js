const config = require('./config');
const lattice = require('./lattice')(config);

module.exports = {
  getOkrTeam: lattice.getOkrTeam
};
