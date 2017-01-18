var util = require('util');
var PlexAPI = require('plex-api');
var constants = process.binding('constants');
var plex = exports;
var os = require('os');
var _api = null;

var PLEX_OPTIONS = {
    product: process.env.APP_PRODUCT,
    version: process.env.APP_VERSION,
    device: process.env.APP_DEVICE,
    deviceName: process.env.APP_DEVICE_NAME,
    identifier: process.env.APP_IDENTIFIER
};

function query(api, options) {
    console.time("query: " + options);
    return api.query(options).then(function(response) {
        console.timeEnd("query: " + options);
        return response;
    })
}

var Stream = require('stream').Stream;
var EventEmitter = require('events').EventEmitter;

var Readable = Stream.Readable;
var Writable = Stream.Writable;

var DEBUG = process.env.NODE_DEBUG;
var errnoException = util._errnoException;




//config.bamboo.authorization = Buffer.from(config.bamboo.username + ':' + config.bamboo.password).toString('base64');

//var AUTHORIZATION = Buffer.from(config.bamboo.username + ':' + config.bamboo.password).toString('base64') || 0;
//var HOST = config.bamboo.get('url') || "MissingBambooUrl";
//var PROJECT = config.bamboo.get('project') || "MissingProject";
//var PLAN = config.bamboo.get('plan') || "MissingPlan";

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

plex.initialize = function(callback) {
    var options = {
        hostname: "192.168.21.50",
        port: "32400",
        username: "crussell75",
        password: "0ff1ceSpc4tw!",
        managedUser:{
            name: "crussell75"
        },
        options: {
            identifer: os.hostname(),
            product: "Plex-Sync",
            version: "1.0.0",
            platform: "SkyNet"
        }
    };
    _api = new PlexAPI(options);
    if (_api){
        callback(null,true)
    } else {
        callback(false);
    }
};

plex.getMovies = function (callback) {
    _api.find("/library/sections/3/all").then(function (directories) {
        var results = [];
        for(var x = 0; x < directories.length; x++) {
            results.push({
                year: directories[x].year,
                title: directories[x].title,
                studio: directories[x].studio
            });
            if (x === directories.length -1 ) {
                callback(null,results)
            }
        }
        // directories would be an array of sections whose type are "movie"
    }, function (err) {
        console.error("Could not connect to server", err);
        callback(err);
    });
};

//bamboo.HOST = HOST;
//bamboo.PROJECT = PROJECT;
//bamboo.PLAN = PLAN;
