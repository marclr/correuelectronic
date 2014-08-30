/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'views/escriure/message',
    'views/escriure/gestio',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/CorreuElectronic/templates/general/rightPanel.html'
], function($, _, Backbone, Bootstrap, messageView, gestioView, rightPanel) {
    var EscriureView = Backbone.View.extend(function() {


        return {
            events : {
                'click #send':'send'
            },
            initialize: function (params) {
                var that = this;
            },

            render: function () {
                var compiledTemplate = _.template(rightPanel,{});
                this.$el.empty().append('<br><br><br><br>'+compiledTemplate);

                var message = new messageView({el:'#contingut'});
                message.update();

                var gestio = new gestioView({el:'#gestio'});
                gestio.update();
            },

            update: function (options) {
                this.render();
                //Comprovem si cal carregar alguna informacio...
                if(localStorage.getItem("respon") !== null) {
                    localStorage.removeItem("respon");
                    var missatge = JSON.parse(localStorage.getItem('missatge'));
                    localStorage.removeItem("missatge");
                    this.respon(missatge);
                }
                else if(localStorage.getItem("reenvia") !== null) {
                    localStorage.removeItem("reenvia");
                    var missatge = JSON.parse(localStorage.getItem('missatge'));
                    localStorage.removeItem("missatge");
                    this.reenvia(missatge);
                }
            },

            respon: function(missatge) {
                //Dades del missatge original
                var to = missatge.to;
                var from = missatge.from;
                var date = missatge.date;
                var subject = missatge.subject;
                var cc = missatge.cc;
                var message = missatge.message;
                $('#to').val(from);
                $('#subject').val("Resposta a "+subject);
                $('#cc').val(cc);
                var capcalera = "\n\n\nEl "+date+" en "+from+" va enviar el missatge: \n\n"+message;
                $('#message').val(capcalera);

            },
            reenvia: function(missatge) {
                //Dades del missatge original
                var to = missatge.to;
                var from = missatge.from;
                var date = missatge.date;
                var subject = missatge.subject;
                var cc = missatge.cc;
                var message = missatge.message
                //$('#to').val(from);
                $('#subject').val("Resposta a "+subject);
                //$('#cc').val(cc);
                var capcalera = "\n\n\n<----------------- Missatge renviat ---------------------------------------\n" +
                    "Data: "+date+"\nDe: "+from+"\nPer: "+to+"\nAssumpte: "+subject+"\n" +
                    "-------------------------------------------------------------------------->\n" +
                    +""+message;
                $('#message').val(capcalera);

            },
            send: function () {
                alert("Missatge enviat!");
                this.render();
            }
        }
    }());

    // Our module now returns our view
    return EscriureView;
});