const {assert} = require('chai');
const {set} = require('lodash');

describe('okr-team', function() {
  const okrTeam = require('./')('teamId');
  const createOkrTeamResponse = () => {
    return set({}, 'body.data.viewer.team.goals.edges', [{
      "node": {
        "id": "R29hbDo0NWM1YjZjMi0zNjIwLTExZTctYTkxOS05MmViY2I2N2ZlMzM=",
        "entityId": "5244002a-3620-11e7-a919-92ebcb67fe33",
        "name": "OKR name",
        "status": "amber",
        "lastUpdated": "Wed May 10 2017 00:00:01 GMT+0000 (UTC)",
        "companyGoal": false,
        "private": false,
        "state": "active",
        "computedType": "quantitative",
        "computedAmountType": "percent",
        "computedProgressAmount": 50,
        "computedStartingAmount": 0,
        "computedGoalAmount": 100,
        "endedAt": "2017-12-12T21:59:00.000Z",
        "ownersList": [{
          "name": "PAG",
          "id": "VXNlcjo3Y2RkNDVhOC0zNjIwLTExZTctYTkxOS05MmViY2I2N2ZlMzMNCg=="
        }]
      }
    }]);
  };

  describe('parser', function() {
    it('should parse response and return 1 okr', function() {
      const okr = okrTeam.parser(createOkrTeamResponse());
      assert.lengthOf(okr, 1, 'okr array has length of 1');
      assert.strictEqual(okr[0].status, 'amber');
    });
  });
});
