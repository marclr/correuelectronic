/**
 * Created by Marc on 08/05/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'jqueryui',
    'collections/contactes',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/CorreuElectronic/templates/escriure/message.html'
], function($, _, Backbone, Bootstrap, jqueryui, ContactesCollection, messageTemplate) {
    var MessageView = Backbone.View.extend(function() {

        var contactes = new ContactesCollection();

        return {
            events : {
                'click #mesFitxers':'mesFitxers'
            },

            initialize: function (params) {
                var that = this;
            },

            render: function () {
                var compiledTemplate = _.template(messageTemplate,{});
                this.$el.empty().append(compiledTemplate);
            },

            //[TODO] Ajuntar les tres funcions d'autocomplete
            autocompleteTo: function() {
                var el = $('#to').val();
                var find = contactes.searchByMail(el)
                if(find!=null) {
                    find = find._wrapped
                    var availableTags = [];
                    for (var i = 0; i < find.length; i++) {
                        // console.log(find.at(i).get('name'))
                        availableTags.push(find[i].get('mail'));
                    }

                    $("#to").autocomplete({
                        source: availableTags,
                        messages: {
                            noResults: '',
                            results: function() {}
                        }
                    });
                }
            },

            autocompleteCC: function() {
                var el = $('#cc').val();
                var find = contactes.searchByMail(el)
                if(find!=null) {
                    find = find._wrapped
                    var availableTags = [];
                    for (var i = 0; i < find.length; i++) {
                        // console.log(find.at(i).get('name'))
                        availableTags.push(find[i].get('mail'));
                    }

                    $("#cc").autocomplete({
                        source: availableTags,
                        messages: {
                            noResults: '',
                            results: function() {}
                        }
                    });
                }
            },


            autocompleteCCO: function() {
                var el = $('#cco').val();
                var find = contactes.searchByMail(el)
                if(find!=null) {
                    find = find._wrapped
                    var availableTags = [];
                    for (var i = 0; i < find.length; i++) {
                        // console.log(find.at(i).get('name'))
                        availableTags.push(find[i].get('mail'));
                    }

                    $("#cco").autocomplete({
                        source: availableTags,
                        messages: {
                            noResults: '',
                            results: function() {}
                        }
                    });
                }
            },

            update: function () {
                this.render();
                $('#to').on('keyup',this.autocompleteTo)
                $('#cc').on('keyup',this.autocompleteCC)
                $('#cco').on('keyup',this.autocompleteCCO)
            },

            mesFitxers: function() {
                var html = $('#fitxers').html();
                html+='<br><input type="file">';
                $('#fitxers').empty().append(html);
            }

        }
    }());

    // Our module now returns our view
    return MessageView;
});