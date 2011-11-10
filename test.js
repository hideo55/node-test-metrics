
var testMetrics = require('./lib/test-metrics');
var assert = require('assert');

assert.ok(!testMetrics.hasComplexCode('./test/test_sample1.js',10));
assert.ok(testMetrics.hasComplexCode('./test/test_sample1.js',1));
