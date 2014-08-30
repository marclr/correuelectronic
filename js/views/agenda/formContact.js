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
    'text!/CorreuElectronic/templates/agenda/addContact.html'
], function($, _, Backbone, Bootstrap, formContactTemplate) {
    var AddContactView = Backbone.View.extend(function() {

        return {
            events : {

            },
            initialize: function (params) {
                var that = this;
            },

            render: function (msg) {
                var compiledTemplate = _.template(formContactTemplate);
                this.$el.empty().append(compiledTemplate);
            },

            update: function (msg) {
                this.render(msg);
            }

        }
    }());

    // Our module now returns our view
    return AddContactView;
});