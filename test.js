var async = require('async');
var SyncApp = require('./lib/app').App;
var sync = new SyncApp();

sync.plex.initialize(function(err,results){
    if(results){
        sync.plex.getMovies(function(err,movies){
            console.log(movies);
        });
    }
});

