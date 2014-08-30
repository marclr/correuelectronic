/**
 * Created by Marc on 16/04/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap',
    'jquery.tablesorter',
    'jqueryui',
    'collections/correus',
    'views/bustia/opcions',
    'views/bustia/safataEntrada',
    'views/bustia/gestio',
    'views/bustia/gestioPaperera',
    'views/bustia/gestioSpam',
    'views/general/reader',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/CorreuElectronic/templates/general/generalPattern.html'
], function($, _, Backbone, Bootstrap, tablesorter, jqueryui, CorreuCollection, OpcionsView, SafataEntradaTemplate, GestioView, GestioViewPaperera, GestioViewSpam, ReaderView, BustiaTemplate) {
    var BustiaView = Backbone.View.extend(function() {
        var correus = new CorreuCollection();
        var directoris={
            'familia':0,
            'feina':0
        }
        return {
            events : {
                'click .menu':'canviarOpcio',
                'click #search': 'search',
                'click #delete': 'delete',
                'click #deleteMessage': 'delete',
                'click #block': 'block',
                'click #blockMessage': 'block',
                'click #unblock': 'unblock',
                'click #arxivar': 'arxivar',
                'click .novaCarpeta': 'novaCarpeta'
            },

            initialize: function (params) {
                var that = this;
            },

            novaCarpeta: function() {
                $( "#novaCarpeta" ).dialog( "open" );
            },

            arxivar: function() {
                var elements = $('input[name=seleccionador]:checked');
                if(elements.length==0) alert("Per realitzar aquesta opció has de marcar com a mínim un correu")
                else {
                    $( "#carpeta" ).dialog( "open" );
                }
            },

            getBadgesDirectoris : function() {
                var acc=0;
                var resultat = 0;
                for (var k in directoris){
                    if (directoris.hasOwnProperty(k)) {
                        resultat = correus.getBadgesDir(k);
                        directoris[k] = resultat;
                        acc+= resultat;
                    }
                }
                return acc;
            },

            render: function (activePanel) {
                activePanel = parseInt(activePanel); //Assegurem que sempre tinguem un int!
                var compiledTemplate = _.template(BustiaTemplate,{});
                this.$el.empty().append('<br><br><br><br>'+compiledTemplate);
                //Afegim el menu d'opcions
                this.getBadgesDirectoris();
                var badges = correus.getBadges();
                var opcionsView = new OpcionsView({el:'#panell'});
                opcionsView.update(activePanel, badges, directoris);

                //Afegim la safata dentrada
                var safataView = new SafataEntradaTemplate({el:'#contingut'});
                var dir = ["inbox","paperera","spam","arxivador"];
                for (var k in directoris){
                    if (directoris.hasOwnProperty(k)) {
                        dir.push(k);
                    }
                }

                if(dir[activePanel]=="arxivador"){
                    var msg = new CorreuCollection();
                    while (msg.length > 0) msg.remove(msg.at(0)); //Eliminem els correus generats aleatoriament
                    for(var i=activePanel+1;i<dir.length;i++) {
                        var elements = correus.getByDir(dir[i]);
                        msg.add(elements.models);
                    }
                    safataView.update(msg);
                }
                else safataView.update(correus.getByDir(dir[activePanel]));

                //Afegim la safata dentrada
                var gestioView;
                if(activePanel == 1) gestioView = new GestioViewPaperera({el:'#gestio'});
                else if(activePanel == 2) gestioView = new GestioViewSpam({el:'#gestio'});
                else gestioView = new GestioView({el:'#gestio'});
                gestioView.update();

                //Per ordenar els correus
                $("#correus").stupidtable({
                    "date":function(a,b){
                        //Muntem el tipus 'date'
                        var date = a.split('-');
                        var thisDate = new Date();
                        thisDate.setFullYear(date[2],date[1],date[0]);
                        aDate = thisDate.getTime();

                        var date = b.split('-');
                        var thisDate = new Date();
                        thisDate.setFullYear(date[2],date[1],date[0]);
                        bDate = thisDate.getTime();

                        return aDate - bDate;
                    }
                });
                var that = this;
                //Per mostrar el popup de crear carpeta
                $( "#novaCarpeta" ).dialog({
                    autoOpen: false,
                    modal:true,
                    buttons: {
                        "Crea": function() {
                            var text = $('#novaCarpetaText').val().toLowerCase();
                            directoris[text] = 0; //AFegim el nou directori a l'objecte
                            text = text.charAt(0).toUpperCase() + text.slice(1); //Posem be el nom

                            var t = '<a href="#" class="list-group-item menu" title="Obre"><input type="hidden" value="-1"/>'+text+'<span class="badge" title="Correus sense llegir">0</span></a>';
                            $($('#panell div').get(0)).append(t);
                            $('#novaCarpetaText').val(''); //Eliminem el contingut del input
                            $(this).dialog("close");
                        }
                    }
                });
                //Per mostrar el popup de arxivar
                $( "#carpeta" ).dialog({
                    autoOpen: false,
                    modal:true,
                    open: function() {
                        $('#altresCarpetes').empty();
                        for (var k in directoris){
                            if (directoris.hasOwnProperty(k)) {
                                $('#altresCarpetes').append('<input type="radio" name="carpeta" value="'+ k.toLowerCase()+'">&nbsp' +k.charAt(0).toUpperCase() + k.slice(1)+'<br>');
                            }
                        }
                    },
                    buttons: {
                        "Arxivar": function() {
                            var elements = $('input[name=seleccionador]:checked');
                            var desti = $('input[name=carpeta]:checked').val().toLowerCase();
                            for(var i=0; i<elements.length; i++) {
                                var cid = $(elements.get(i)).val();
                                var model = correus.get({cid:cid});
                                if(desti==0) {
                                    model.set('dir','inbox');
                                }
                                else {
                                    model.set('dir', desti);
                                }
                            }
                            var pantalla = $('#panell .active input').val();
                            that.render(pantalla);
                            $(this).dialog("close");
                        }
                    }
                });
                //Event
                $('tr.msg td')
                    .not('input')
                    .on('click',this.llegirMissatge);

            },

            renderSearch: function (values) {
                $('#contingut').empty().hide().fadeIn();
                //Afegim la safata dentrada
                var safataView = new SafataEntradaTemplate({el:'#contingut'});
                safataView.update(values);

                $("#correus").stupidtable({
                    "date":function(a,b){
                        //Muntem el tipus 'date'
                        var date = a.split('-');
                        var thisDate = new Date();
                        thisDate.setFullYear(date[2],date[1],date[0]);
                        aDate = thisDate.getTime();

                        var date = b.split('-');
                        var thisDate = new Date();
                        thisDate.setFullYear(date[2],date[1],date[0]);
                        bDate = thisDate.getTime();

                        return aDate - bDate;
                    }
                });

                //Event
                $('tr.msg td')
                    .not('input')
                    .on('click',this.llegirMissatge);
            },

            update: function (options, values) { //Values pot tenir la pestanya activa o l'opcio a llistar!
                if(options === "search") this.renderSearch(values);
                else this.render(options);
            },

            canviarOpcio: function(element) {
                $('#panell a.active').attr('class', 'list-group-item');
                $(element.currentTarget).attr('class','list-group-item active');
                //Cal capturar aqui l'element donat que a vegades canviarem la vista des de la cerca, i aquesta no esta
                // lligada al router!!
                var opcio = $(element.currentTarget).find('input[type=hidden]').val();
                this.update(opcio);
            },

            delete: function() {
                var activePanel = $('#panell').find('.active').children().val();
                var checked = $('input[name="seleccionador"]:checked');
                var remove = $('#panell a.active').not('.remove').length === 0;
                for (var index = 0; index < checked.length; ++index) {
                    var cid = $(checked[index]).val();
                    if(remove) correus.remove(cid);
                    else {
                        var dir = correus.get({ cid:cid}).get('dir');
                        //Afegim el directori antic en cas que no sigui la paperera o el spam
                        if(activePanel!=1 && activePanel!=2) correus.get({ cid: cid }).set('olddir',dir);
                        correus.get({ cid: cid }).set('dir','paperera');
                    }
                }
                this.update(activePanel);
            },

            block: function() {
                var activePanel = $('#panell').find('.active').children().val();
                var checked = $('input[name="seleccionador"]:checked');
                for (var index = 0; index < checked.length; ++index) {
                    var cid = $(checked[index]).val();
                    var dir = correus.get({ cid:cid}).get('dir');
                    //Afegim el directori antic en cas que no sigui la paperera o el spam
                    if(activePanel!=1 && activePanel!=2)  correus.get({ cid: cid }).set('olddir',dir);
                    correus.get({ cid: cid }).set('dir','spam');
                }
                this.update(activePanel);
            },

            unblock: function() {
                var activePanel = $('#panell').find('.active').children().val();
                var checked = $('input[name="seleccionador"]:checked');
                for (var index = 0; index < checked.length; ++index) {
                    var cid = $(checked[index]).val();
                    var dir = correus.get({ cid:cid}).get('olddir');
                    correus.get({ cid: cid }).set('dir',dir);
                }
                this.update(activePanel);
            },

            search: function() {
                //eliminem l'active
                $('#panell a.active').attr('class', 'list-group-item menu');

                //Busuqem l'element
                var string = $('#searchText').val();
                var searchResults = correus.search(string);
                var searchCollection = new CorreuCollection(searchResults);
                this.update("search",searchCollection);
            },

            llegirMissatge: function(element) {
                var el = $(element.currentTarget);
                if(el.find('input').length==0) {
                    el = el.parent().find('input[name="seleccionador"]');
                    $(el.parent().parent().find('img[name="new"]').get(0)).parent().empty();//Metode una mica cutre per eliminar la marca
                    el.prop('checked', true);

                    var cid = el.val();
                    var msg = correus.get({ cid: cid });
                    msg.set('read',true); //Marquem el missatge com a llegit

                    //Guardem l'estat de la pantalla
                    var tagBadge = $('#panell').find('.active .badge');
                    tagBadge.text(tagBadge.text()-1)
                    localStorage.setItem('missatge',JSON.stringify(msg));
                    var reader = new ReaderView({el:'#lectura', msg:msg});
                    reader.update();
                    $('#llistatCorreus').hide();
                }
            }

        }
    }());

    // Our module now returns our view
    return BustiaView;
});