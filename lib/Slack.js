var util = require('util');
var async = require('async');

var Botkit = require('botkit');
var slack = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});
var constants = process.binding('constants');
//var slack = exports;

var Stream = require('stream').Stream;
var EventEmitter = require('events').EventEmitter;

var DEBUG = process.env.NODE_DEBUG;
var errnoException = util._errnoException;


function rethrow() {
    // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
    // is fairly slow to generate.
    if (DEBUG) {
        var backtrace = new Error;
        return function(err) {
            if (err) {
                backtrace.stack = err.name + ': ' + err.message +
                    backtrace.stack.substr(backtrace.name.length);
                err = backtrace;
                throw err;
            }
        };
    }

    return function(err) {
        if (err) {
            throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
        }
    };
}

function maybeCallback(cb) {
    return util.isFunction(cb) ? cb : rethrow();
}

// Ensure that callbacks run in the global context. Only use this function
// for callbacks that are passed to the binding layer, callbacks that are
// invoked from JS already run in the proper scope.
function makeCallback(cb) {
    if (!util.isFunction(cb)) {
        return rethrow();
    }

    return function() {
        return cb.apply(null, arguments);
    };
}

slack.spawn({
        token: "xoxb-128292323985-byt0EBGmayL806cJCDzEjoUR",
        name: 'Plex Bot'
    });


slack.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {

    bot.reply(message,'Hello yourself.');

});
