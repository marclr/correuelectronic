/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'text!/CorreuElectronic/templates/ajuda/document.html'
], function($, _, Backbone, Bootstrap, fitxerAjuda) {
    var AjudaView = Backbone.View.extend(function() {


        return {
            events : {
            },

            render: function () {
                var compiledTemplate = _.template(fitxerAjuda, {});
                this.$el.empty().append(compiledTemplate);
                $("#ajuda").accordion({
                    collapsible: true
                });

            },
            update: function() {
            this.render();
            }
        }
    }());

    // Our module now returns our view
    return AjudaView;
});