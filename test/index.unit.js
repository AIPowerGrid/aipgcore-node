'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export aipgcore-lib', function() {
    var aipgcore = require('../');
    should.exist(aipgcore.lib);
    should.exist(aipgcore.lib.Transaction);
    should.exist(aipgcore.lib.Block);
  });
});
