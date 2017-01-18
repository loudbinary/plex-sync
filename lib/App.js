
var App = function() {
    var Plex = require('./plex');
    var Slack = require('./slack');
    this.slack = Slack;
    this.plex = Plex;
    this.name = "Plex-Sync";
};

module.exports = {
    App: App
};