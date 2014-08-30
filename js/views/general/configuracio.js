/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/CorreuElectronic/templates/general/configureTemplate.html'
], function($, _, Backbone, Bootstrap, configureTemplate) {
    var ConfiguracioView = Backbone.View.extend(function() {


        return {
            events : {
                'click #showAvancada':'showAvancada'
            },
            initialize: function (params) {
                var that = this;
            },
            showAvancada: function() {
                if($('#avancada').is(":visible")) {
                    $('#avancada').hide();
                    $('#showAvancada').text('(mostrar)');
                }
                else {
                    $('#avancada').show();
                    $('#showAvancada').text('(amagar)');
                }
            },
            render: function () {
                var compiledTemplate = _.template(configureTemplate,{});
                this.$el.empty().append('<br><br><br>'+compiledTemplate);
                $('input[name=pop]').on('change',this.POP);
                $('input[name=imap]').on('change',this.IMAP);
                //Executem per mostrar els valors
                this.POP();
                this.IMAP();
            },

            POP: function() {
                $('#pop').text($('input[name=pop]:checked').parent().text());
            },

            IMAP: function () {
                $('#imap').text($('input[name=imap]:checked').parent().text());
            },

            update: function (options) {
                this.render();
            }

        }
    }());

    // Our module now returns our view
    return ConfiguracioView;
});