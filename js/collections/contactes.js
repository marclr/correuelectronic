/**
 * Created by Marc on 04/05/2014.
 */
define([
    'backbone',
    // Pull in the Model module from above
    'models/contacte'
], function(Backbone, ContacteModel){
    var ContacteCollection = Backbone.Collection.extend({
        model: ContacteModel,
        initialize: function() {
            for(var i = 0; i< 100; i++) {
                var nom = capitaliseFirstLetter(random_name());
                var cognom = random_surname();
                var mail = nom+'.'+cognom+'@gmail.com';
                this.add(new ContacteModel({name: nom+" "+cognom,
                    mail: mail,
                    notes: random_notes(),
                    image: ""}));
            }

        },
        search: function(filterValue) {
            if (filterValue == "") return [];
            return this.filter(function(data) {
                return _.some(_.values(data.toJSON()), function(value) {
                    if (_.isNumber(value)) value = value.toString();
                    if (_.isString(value)) return value.indexOf(filterValue) != -1;
                    return false;
                });
            });
        },
        searchByMail: function(letters) {
            if(letters == "") return null;

            var pattern = new RegExp(letters,"gi");
            return _(this.filter(function(data) {
                return pattern.test(data.get("mail"));
            }));
        }
    });
    // You don't usually return a collection instantiated
    return ContacteCollection;
});