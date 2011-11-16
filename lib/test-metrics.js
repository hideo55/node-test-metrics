/*!
* test-metrics
* Copyright(c) 2011 Hideaki Ohno <hide.o.j55{at}gmail.com>
* MIT Licensed
*/

/**
 * Library version.
 */

exports.version = '0.0.1';
var tokens = require('jsmeter/tokens');
tokens.setup();
var complex = require('jsmeter/complexity').make_complexity();
var parse = require('jsmeter/parse').make_parse();
var fs = require('fs');
var path = require('path');

var cache = {};
var getMetrics = function(src) {
  var jsonStr;
  var res = {
    write : function(t) {
      jsonStr = t;
    }
  };
  src = path.normalize(path.join(process.cwd(), src));

  var source, name, metrics;
  if(cache[src]) {
    metrics = cache[src];
  } else {
    source = fs.readFileSync(src, 'utf-8');
    name = src.match(/([^\/])\.js$/)[1];

    complex.complexity(parse(source), name);
    complex.renderStats(res, 'JSON');
    metrics = JSON.parse(jsonStr);
    cache[src] = metrics;
  }
  return metrics;
};

exports.hasComplexCode = function(src, threshold) {
  var metrics = getMetrics(src);
  var hasTooComplexCode = false;
  metrics.forEach(function(elm) {
    if(elm.complexity > threshold) {
      hasTooComplexCode = true;
    }
  });
  return hasTooComplexCode;
};


exports.hasTooLargeFunction = function(src, threshold) {
  var metrics = getMetrics(src);
  var hasTooLargeFunction = false;
  metrics.forEach(function(elm) {
    if(elm.lines> threshold) {
      hasTooLargeFunction = true;
    }
  });
  return hasTooLargeFunction;
};