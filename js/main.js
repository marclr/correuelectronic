require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min', //versio 1.11.0
        "jquery.bootstrap": "libs/bootstrap/bootstrap.min", //versio 3.1.1
        underscore: 'libs/underscore/underscore-min', //versio 1.6
        backbone: 'libs/backbone/backbone-min', //versio 1.1.2
        'jquery.scrollTo': 'libs/jquery/jquery.scrollTo', //versio 1.4.12
        'jquery.tablesorter': 'libs/jquery/stupidtable',
        "jqueryui" : "libs/jqueryui/jquery-ui"//1.10.4
    }

});

require([

    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});

//Funcio per generar contingut "aleatori"
function random_from() {
    var textArray = [
        'pau',
        'jordi',
        'eloi',
        'raquel',
        'anna',
        'natalia',
        'rachid',
        'xevi'
    ];
    var randomNumber = Math.floor(Math.random()*textArray.length);
    return textArray[randomNumber].concat("@gmail.com");
}

function random_cc() {
    var textArray = [
        'pep@gmail.com',
        'antoni@gmail.com',
        '','','','','','','',
        'lluis@gmail.com',
        'teo@gmail.com'
    ];
    var randomNumber = Math.floor(Math.random()*textArray.length);
    return textArray[randomNumber];
}
function random_subject() {
    var textArray = [
        'Vacances',
        'Treball',
        'Visita al doctor',
        'Viatge a Tenerife',
        'Resultats analítica',
        'Treball d\'interfícies',
        'Contracte laboral',
        'UdG',
        'Patronat EPS',
        'Secretaria acadèmica'
    ];
    var randomNumber = Math.floor(Math.random()*textArray.length);
    return textArray[randomNumber];
}

function random_dir() {
    var textArray = [
        'inbox',
        'familia',
        'feina'
    ];
    var randomNumber = Math.floor(Math.random()*textArray.length);
    return textArray[randomNumber];
}

function random_string(size){
    var str = "";
    for (var i = 0; i < size; i++){
        str += random_character();
    }
    return str;
}

function random_character() {
    var chars = " 0123456789 abcdefghijklmnopqurstuvwxyz ABCDEFGHIJKLMNOPQURSTUVWXYZ ";
    return chars.substr( Math.floor(Math.random() * 66), 1);
}

function random_date(start, end) {
    start = new Date(2012, 0, 1);
    end = new Date();

    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return (curr_date + "-" + curr_month + "-" + curr_year);
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function random_name() {
    var name = [
        'pau',
        'jordi',
        'eloi',
        'ernest',
        'antonio',
        'vicenç',
        'javier',
        'josep',
        'lloreç',
        'ignasi',
        'gustavo',
        'ruben',
        'raquel',
        'anna',
        'natalia',
        'rachid',
        'xavier'
    ]
    var randomNumber = Math.floor(Math.random()*name.length);
    return name[randomNumber];
}

function random_surname() {
    var surname = [
        "Roman",
        "Gallardo",
        "Madrid",
        "Miranda",
        "Sanchez",
        "Rey",
        "Fernandez",
        "Pardo",
        "Sandro",
        "Velasco"
    ]
    var randomNumber = Math.floor(Math.random()*surname.length);
    return surname[randomNumber];
}

function random_notes() {
    var notes = [
        "","","","",
        "El seu aniversari és el 10 de maig\nViu a Girona",
        "El vaig conèixer a La Seu",
        "No suporta els animals"
    ]
    var randomNumber = Math.floor(Math.random()*notes.length);
    return notes[randomNumber];
}