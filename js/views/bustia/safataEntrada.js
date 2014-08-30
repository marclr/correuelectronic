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
    'text!/CorreuElectronic/templates/bustia/safata.html'
], function($, _, Backbone, Bootstrap, safataTemplate) {
    var SafataEntradaView = Backbone.View.extend(function() {
        return {
            events : {

            },
            initialize: function (params) {
                var that = this;
            },

            render: function (correus) {
                var compiledTemplate = _.template(safataTemplate,{correus:correus});
                this.$el.empty().append(compiledTemplate);
            },

            update: function (correus) {
                this.render(correus);
            }

        }

    }());

    // Our module now returns our view
    return SafataEntradaView;
});