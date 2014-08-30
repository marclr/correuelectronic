/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    '../../router',
    'models/correu',
    'views/general/bustia',
    'views/reader/message',
    'views/reader/gestio'
], function($, _, Backbone, Bootstrap, Router, CorreuModel, BustiaView, MessageView, GestioView) {
    var ReaderView = Backbone.View.extend(function() {

        var msg = new CorreuModel();

        return {
            events : {
                'click #enrrere': 'enrrere',
                'click #respon': 'respon',
                'click #reenvia': 'reenvia',
                'click #arxivarMessage': 'arxivarMessage',
                'click #printMessage' : 'print'
            },

            initialize: function (params) {
                var that = this;
                msg = params.msg;
            },

            print: function () {
                //alert("Obrint pagina d'impressió... Codi en el fitxer js/views/general/reader.js")
                /* La plana es bloqueja...
                var imprimir = window.open( '', "Correu", "menubar=0,location=0,height=700,width=700" );
                $('.btn').hide();
                $('#missatge').clone().appendTo( imprimir.document.body );
                $('.btn').show();
                imprimir.print();
                */
            },

            arxivarMessage: function () {
                $( "#carpeta" ).dialog( "open" );
            },

            render: function () {
                var gestioView = new GestioView({el:'#missatgeGestio'});
                gestioView.update();

                var messageView  = new MessageView({el:'#missatge'});
                messageView.update(msg);
                var that = this;

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
                localStorage.removeItem('missatge');
            },

            respon: function() {
                localStorage.setItem('respon','respon')
                Router.navigate('escriure')
            },

            reenvia: function() {
                localStorage.setItem('reenvia','reenvia')
                Router.navigate('escriure')
            }

        }
    }());

    // Our module now returns our view
    return ReaderView;
});