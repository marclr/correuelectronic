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
    'text!/CorreuElectronic/templates/bustia/menu.html'
], function($, _, Backbone, Bootstrap, menuTemplate) {
    var OpcionsView = Backbone.View.extend(function() {

        return {
            events : {

            },
            initialize: function (params) {
                var that = this;
            },

            render: function (activePanel, badges, directoris) {
                var compiledTemplate = _.template(menuTemplate,{active: activePanel, badges:badges, directoris:directoris});
                this.$el.empty().append(compiledTemplate);
            },

            update: function (activePanel, badges, directoris) {
                this.render(activePanel, badges, directoris);
            }

        }
    }());

    // Our module now returns our view
    return OpcionsView;
});