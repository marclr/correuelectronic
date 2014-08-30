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
    'text!/CorreuElectronic/templates/reader/message.html'
], function($, _, Backbone, Bootstrap, messageTemplate) {
    var MessageView = Backbone.View.extend(function() {

        return {
            events : {

            },
            initialize: function (params) {
                var that = this;
            },

            render: function (msg) {
                var compiledTemplate = _.template(messageTemplate,{msg:msg});
                this.$el.empty().append(compiledTemplate);
            },

            update: function (msg) {
                this.render(msg);
            }

        }
    }());

    // Our module now returns our view
    return MessageView;
});