// randomId.test.js

import {RandomIdGenerator} from '../js/randomId.mjs';

describe('RandomIdGenerator', function () {
  it('should return random Id each time (5000 iterations)', function () {
    let randomId = RandomIdGenerator.randomId();
  for (let i = 0; i < 5000; i++) {
    chai.expect(randomId).to.not.equal(RandomIdGenerator.randomId());
  }
  });
});