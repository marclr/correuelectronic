/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'jquery.scrollTo',
    'models/contacte',
    'collections/contactes',
    'views/agenda/gestio',
    'views/agenda/addContact',
    'views/agenda/showContact',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/CorreuElectronic/templates/general/generalPattern.html',
    'text!/CorreuElectronic/templates/general/listLetters.html',
    'text!/CorreuElectronic/templates/agenda/contactList.html'
], function($, _, Backbone, Bootstrap, ScrollTo, ContacteModel, ContactesCollection, GestioView, AddContactView, ShowContactView, generalTemplate, listLetters, contactList) {
    var ConctactesView = Backbone.View.extend(function() {
        var contactes = new ContactesCollection();

        return {
            events : {
                "click .lletra":'lletra',
                "click .contacte":'showContact',
                "click .listContact":'listContact',
                "click .addContact":'showFormAddContact',
                "click #addContact":'addContact',
                'click #deleteContact':'deleteContact'
            },

            initialize: function (params) {
                var that = this;
            },

            showContact: function(element) {
                var el = $(element.currentTarget);
                var cid = $(el.find('input').get(0)).val();

                var c = contactes.get({cid:cid});

                $('#llistatCorreus').hide();
                var showContact = new ShowContactView({el:'#missatge',contacte:c});
                showContact.update();

                var messageView  = new GestioView({el:'#missatgeGestio'});
                messageView.update();

                $('#lectura').show();
                $('.addContact').show();
                $('.listContact').show();
            },

            deleteContact: function() {
                var cid = $('#cid').val();
                contactes.remove({cid:cid});
                this.update();
            },

            listContact: function() {
                this.render();
            },

            addContact: function() {
                var values = this.getInputsForm('#newContact');
                var c = new ContacteModel(values);
                contactes.add(c);
                alert("S'ha afegit el contacte!");
                this.listContact();
            },

            getInputsForm: function (id) {
                var $inputs = $(id+' :input');
                var values = {};
                $inputs.each(function() {
                    values[this.name] = $(this).val();
                });
                return values;
            },

            showFormAddContact: function() {
                $('#llistatCorreus').hide();
                var addContact = new AddContactView({el:'#lectura'});
                addContact.update();
                $('#lectura').show();
                $('.addContact').hide();
            },

            lletra: function (element) {
                var el = $(element.currentTarget);
                var lletra = el.text().replace(/\d+/g, '');
                $.scrollTo('#'+lletra,400);
                $.scrollTo('-=80px')
            },

            render: function () {
                var compiledTemplate = _.template(generalTemplate,{});
                this.$el.empty().append(compiledTemplate);
                $('#page').prepend('<div class="page-header">' +
                    '<h2 class="container" id="titolContacte">Llista de contactes a l\'agenda</h2>'+
                '</div>')
                var count = this.countListPeople();
                $('#contingut').removeClass('col-sm-7').addClass('col-sm-6').after('<div class="col-sm-1"></div>');
                var compiledTemplate = _.template(listLetters,{countAgenda:count});
                $('#panell').append(compiledTemplate);
                var compiledTemplate = _.template(contactList, {contactes:contactes});
                $('#contingut').append(compiledTemplate);
                var gestio = new GestioView({el:'#gestio'});
                gestio.update();
                $('.listContact').hide();

                //Posem el boto on toca
                $("#goTop").css("left", function() {
                    var el = $('#contingut');
                    return parseInt(el.css('width'),10)+el.position().left;
                });
                //Boto per tornar amunt
                $(window).scroll(function() {
                    //Solucio cutre per detectar el Zoom de la pagina i redimensionar el boto
                    $("#goTop").css("left", function() {
                        var el = $('#contingut');
                        return parseInt(el.css('width'),10)+el.position().left;
                    });
                    //Moguem el boto
                    if($(this).scrollTop() > 100){
                        $('#goTop').stop().animate({
                            top: '100px'
                        }, 500);
                    }
                    else{
                        $('#goTop').stop().animate({
                            top: '-100px'
                        }, 500);
                    }
                });
                //Event per tornar amunt
                $('#goTop').click(function() {
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 500, function() {
                        $('#goTop').stop().animate({
                            top: '-100px'
                        }, 500);
                    });
                });

            },

            update: function (options) {
                this.render();
            },

            countListPeople: function() {
                var count={};
                for(var i=0;i<contactes.length; i++) {
                    var inicial = contactes.at(i).get('name').charAt(0).toUpperCase();
                    if(isNaN(count[inicial])) count[inicial]=0;
                    count[inicial]+=1;
                }
                return count;
            }
        }
    }());

    // Our module now returns our view
    return ConctactesView;
});