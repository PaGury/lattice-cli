const lib = require('../lib');
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .env('LATTICE_CLI')
  .option('token', {
    describe: 'the lattice token, find it in localStorage under the access_token key',
    demandOption: true
  })
  .command('ls okr team <teamId>', 'get the team OKRs', {}, function(argv) {
    lib.getOkrTeam(argv.token, argv.teamId).then((result) => {
      console.log(JSON.stringify(result));
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  })
  .help()
  .argv;
