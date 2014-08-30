/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'models/correu',
    'views/general/bustia',
    'views/agenda/formContact',
    'views/agenda/gestio'
], function($, _, Backbone, Bootstrap, CorreuModel, BustiaView, FormContact, GestioView) {
    var ReaderView = Backbone.View.extend(function() {

        var msg = new CorreuModel();

        return {
            events : {
            },

            initialize: function (params) {
            },

            render: function () {
                $('#titolContacte').text("Afegir un nou contacte a l'agenda");
                var formContact = new FormContact({el:'#missatge'});
                formContact.update();

                var gestioView  = new GestioView({el:'#missatgeGestio'});
                gestioView.update(msg);
            },

            update: function () {
                this.render();
            },

            enrrere: function()  {
                //Eliminem el reader
                $('#missatge').empty();
                $('#missatgeGestio').empty();
                //Mostrem bustia sense opcions seleccionades
                $('input[name="seleccionador"]').prop('checked', false);
                $('#llistatCorreus').show();
                $('#titolContacte').text("Llista de contactes a l'agenda");
            }
        }
    }());

    // Our module now returns our view
    return ReaderView;
});