"use strict";

var http = require('http');

/**
 * Status code color map.
 */

var colors = {
    2: 32
  , 3: 36
  , 4: 33
  , 5: 31
};


var conlogger = {

  /* 
   * Called at the start of a request. Return value 
   * is passed to log as context.
   */
  start: function(req) {
    console.log('\n  \u001b[90m%s \u001b[33m%s\u001b[0m', req.method, req.url);
    return { method: req.method, url: req.url }; 
  },

  /**
  *
  * @param {String} route 
  *  In case of global middlewares, route is set to the regex
  *  match specified as the first optional arg to app.use()
  * @param {String} middleware name
  * @param {Number} latency
  *  For each middleware, this function is called twice,
  *  and latency is set on the second call. This is to allow 
  *  debugging in situations when the second call never happens,
  *  i.e. missing next
  *
  **/
  log: function (ctx,route,middleware,latency) {
    var name = middleware;
    var router = (name == 'router');
    if (arguments.length < 4) {
      if (route) {
        // global middleware
        process.stderr.write('  \u001b[90mmiddleware \u001b[33m'
          + route + ' \u001b[36m'
            + name + '\u001b[0m'
              + (router ? '\n' : ' '));
      } else {
        // router middleware
        process.stderr.write('      \u001b[90mmiddleware \u001b[36m'
          + name + '\u001b[0m ');
      }
    } else {
      console.log((router ? '  ' : '')
      + '\u001b[90m%dms\u001b[0m', latency);
    }
  },

  end: function(ctx,statusCode,latency) {
    var color = colors[statusCode / 100 | 0];
    console.log('\n  \u001b[90mresponded to %s \u001b[33m%s\u001b[0m '
      + '\u001b[90min %dms with \u001b[' + color + 'm%s\u001b[0m'
        + ' \u001b[90m"%s"\u001b[0m'
          , ctx.method
          , ctx.url
          , latency
          , statusCode
    , http.STATUS_CODES[statusCode]);
  }
};

module.exports = conlogger;
