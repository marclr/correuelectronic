/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'text!/CorreuElectronic/templates/agenda/showContact.html'
], function($, _, Backbone, Bootstrap, showContactTemplate) {
    var ShowContactView = Backbone.View.extend(function() {

        var contact = null; //Tindra el model!

        return {
            events : {
                'click #modifyContact':'modifyContact',
                'click #saveContact':'saveContact'
            },

            initialize: function (params) {
                contact = params.contacte;
            },

            render: function (msg) {
                var compiledTemplate = _.template(showContactTemplate,{contacte:contact});
                this.$el.empty().append(compiledTemplate);
                $('#titolContacte').text("Consulta d'un contacte");
                $("input").prop('disabled', true);
                $("textarea").prop('disabled', true);
            },

            update: function (msg) {
                this.render(msg);
            },

            modifyContact: function() {
                $("input").prop('disabled', false);
                $("textarea").prop('disabled', false);
                $('#saveContact').show();
                $('#modifyContact').hide();
                $('#deleteContact').hide();
                $('#titolContacte').text("Modificant el contacte");
            },

            saveContact: function() {
                $("input").prop('disabled', true);
                $("textarea").prop('disabled', true);
                $('#saveContact').hide();
                $('#modifyContact').show();
                $('#deleteContact').show();
                $('#titolContacte').text("Consulta d'un contacte");
            }



        }
    }());

    // Our module now returns our view
    return ShowContactView;
});