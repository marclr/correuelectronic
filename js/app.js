define('app', ['jquery', 'backbone', 'router', 'ui'], function($, Bb, Router, Ui) {
    var App = {};

    App.initialize = function() {
        Ui.initialize();
        Router.initialize(Ui);
    };

    App.navigate = function(hash) {
        Router.navigate(hash)
    }

    return App;
});
