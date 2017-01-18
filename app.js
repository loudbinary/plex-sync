var os = require('os');
var PlexAPI = require("plex-api");
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
var client = new PlexAPI(options);

// filter directories on Directory attributes
client.find("/library/sections/3/all").then(function (directories) {

    console.log(directories);
    // directories would be an array of sections whose type are "movie"
}, function (err) {
    console.error("Could not connect to server", err);
});

// criterias are interpreted as regular expressions
client.find("/library/sections", {type: "movie|shows"}).then(function (directories) {
    console.log(directories);
    // directories type would be "movie" OR "shows"
}, function (err) {
    console.error("Could not connect to server", err);
});

// shorthand to retrieve all Directories
client.find("/").then(function (directories) {
    console.log(directories);
    // directories would be an array of Directory items
}, function (err) {
    throw new Error("Could not connect to server");
});