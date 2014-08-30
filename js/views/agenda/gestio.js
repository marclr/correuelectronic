/**
 * Created by Marc on 08/05/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/CorreuElectronic/templates/agenda/gestio.html'
], function($, _, Backbone, Bootstrap, gestioTemplate) {
    var GestioView = Backbone.View.extend(function() {

        return {
            events : {

            },
            initialize: function (params) {
                var that = this;
            },

            render: function () {
                var compiledTemplate = _.template(gestioTemplate,{});
                this.$el.empty().append(compiledTemplate);
            },

            update: function (options) {
                this.render();
            }

        }
    }());

    // Our module now returns our view
    return GestioView;
});