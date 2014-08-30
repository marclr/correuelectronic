define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '' : 'showBustia',
            'escriure': 'showEscriure',
            'contactes': 'showContactes',
            'configuracio': 'showConfiguracio',
            'ajuda': 'showAjuda',

            //Rutes bustia
            'bustia': 'showBustia',
            'bustia/arxivador': 'showArxivador',
            'bustia/familia': 'showFamilia',
            'bustia/feina': 'showFeina',
            'bustia/paperera': 'showPaperera',
            'bustia/spam': 'showSpam',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var app_router = new AppRouter();

    var initialize = function (Ui) {
       //Rutes de la bustia
        app_router.on('route:showBustia', function () {
            Ui.showBustia(0);
        });
        app_router.on('route:showPaperera', function () {
            Ui.showBustia(1);
        });
        app_router.on('route:showSpam', function () {
            Ui.showBustia(2);
        });
        app_router.on('route:showArxivador', function () {
            Ui.showBustia(3);
        });
        app_router.on('route:showFamilia', function () {
            Ui.showBustia(4);
        });
        app_router.on('route:showFeina', function () {
            Ui.showBustia(5);
        });

        //Fi rutes bustia
        app_router.on('route:showEscriure', function () {
            Ui.showEscriure();
        });

        app_router.on('route:showContactes', function () {
             Ui.showContactes();
        });

        app_router.on('route:showConfiguracio', function () {
            Ui.showConfiguracio();
        });

        app_router.on('route:showAjuda', function () {
            Ui.showAjuda();
        });


        app_router.on('defaultAction', function (actions) {
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize,
        navigate: function(hash) {
            app_router.navigate(hash, {trigger: true})
        }
    };
});