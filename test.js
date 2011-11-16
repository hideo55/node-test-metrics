var testMetrics = require('./lib/test-metrics');
var assert = require('assert');

//Complexity
assert.ok(!testMetrics.hasComplexCode('./test/test_sample1.js', 10), 'complexity of test_sample1.js does not exceed threshold value');
assert.ok(testMetrics.hasComplexCode('./test/test_sample1.js', 1), 'complexity of test_sample1.js exceeds threshold value');
assert.ok(testMetrics.hasComplexCode('./test/test_sample2.js', 5), 'complexity of test_sample2.js exceeds threshold value');

//Lines
assert.ok(!testMetrics.hasTooLargeFunction('./test/test_sample1.js', 100), 'lines of test_sample1.js does not exceed threshold value');
assert.ok(testMetrics.hasTooLargeFunction('./test/test_sample2.js', 100), 'lines of test_sample2.js exceeds threshold value');
