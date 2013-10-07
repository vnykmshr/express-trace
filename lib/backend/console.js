"use strict";

/**
 *
 * level is mainly for router - so that all middlewares
 * of router are properly indented.
 *
 **/
module.exports = function log(route,level,middleware,latency) {
  var name = middleware;
  var router = (name == 'router');
  if (arguments.length < 4) {
    if (level == 0) {
      process.stderr.write('  \u001b[90mmiddleware \u001b[33m'
        + route + ' \u001b[36m'
          + name + '\u001b[0m'
            + (router ? '\n' : ' '));
    } else {
      process.stderr.write('      \u001b[90mmiddleware \u001b[36m'
        + name + '\u001b[0m ');
    }
  } else {
      console.error((router ? '  ' : '')
      + '\u001b[90m%dms\u001b[0m', latency);
  }
};
