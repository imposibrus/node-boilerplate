
Object.defineProperty(global, '__stack', {
  get: function() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) { return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function() {
    return __stack[1].getLineNumber();
  }
});

import path from 'path';
import util from 'util';

export default function(namespace) {
  var debug = require('debug')(namespace);

  if(!debug.enabled) {
    return function() {};
  }

  return function() {
    var stackArr = (new Error).stack.split("\n"),
        currFile = stackArr.filter(function(stackLine) {return stackLine.indexOf(__filename) !== -1;}),
        callerFile,
        matchedString,
        callerName = [];

    if(currFile.length) {
      callerFile = stackArr[stackArr.indexOf(currFile[0]) + 1];
      matchedString = callerFile.split(/\s/).pop().match(/(.[^:]*):([0-9]+):([0-9]+)/);
      if(matchedString) {
        callerName = [path.basename(matchedString[1]), matchedString[2], matchedString[3]];
      }
    }

    debug(callerName.join(':'), Array.prototype.slice.call(arguments).map(function(argument) {
      return util.inspect(argument, {depth: null});
    }).join(' '));
  };
};

