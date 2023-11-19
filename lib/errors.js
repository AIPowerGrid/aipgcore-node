'use strict';

var createError = require('errno').create;

var aipgcoreNodeError = createError('aipgcoreNodeError');

var RPCError = createError('RPCError', aipgcoreNodeError);

module.exports = {
  Error: aipgcoreNodeError,
  RPCError: RPCError
};
