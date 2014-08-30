define('ui',
    [
        'jquery',
        'backbone',
        'jquery.bootstrap',
        'views/general/bustia',
        'views/general/escriure',
        'views/general/contactes',
        'views/general/configuracio',
        'views/general/ajuda'
    ], function($, Backbone, Bootstrap, BustiaView, EscriureView, ContactesView, ConfiguracioView, AjudaView) {
        var Ui = {};
        var $el = $('#page');

        var bustiaView = new BustiaView({el: $el});
        var escriureView = new EscriureView({el: $el});
        var contactesView = new ContactesView({el: $el});
        var configuracioView = new ConfiguracioView({el: $el});
        var ajudaView = new AjudaView({el: $el});

        Ui.initialize = function() {
        };

        Ui.desmarcar= function () {
            $('#general').find('.active').attr('class','');
        };

        Ui.marcar = function (ref) {
            Ui.desmarcar();
            $('#general').find('a[href="#'+ref+'"]').parent().attr('class','active');
        }
        Ui.clean = function () {
            $el.empty();
        };

        Ui.showBustia = function(options) {/** Funcio executada al inici */
            Ui.clean();
            Ui.marcar('bustia');
            bustiaView.update(options);
        };

        Ui.showEscriure = function() {
            Ui.clean();
            Ui.marcar('escriure');
            escriureView.update();
        };

        Ui.showContactes = function() {
            Ui.clean();
            Ui.marcar('contactes');
            contactesView.update();
        };

        Ui.showConfiguracio = function(element) {
            Ui.clean();
            Ui.marcar('configuracio');
            configuracioView.update();
        };

        Ui.showAjuda = function () {
            Ui.clean();
            Ui.marcar('ajuda');
            ajudaView.update();
        }

        return Ui;

});
