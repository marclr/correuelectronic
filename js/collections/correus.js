/**
 * Created by Marc on 04/05/2014.
 */
define([
    'backbone',
    // Pull in the Model module from above
    'models/correu'
], function(Backbone, CorreuModel){
    var CorreuCollection = Backbone.Collection.extend({
        model: CorreuModel,
        initialize: function() {
            for(var i = 0; i< 30; i++)
                this.add(new CorreuModel( {to:"marc@gmail.com", from:random_from(), subject:random_subject(), cc: random_cc(), message:random_string(1550), files:"", dir:random_dir(), date:random_date(), read:false}))
        },
        getByDir: function(dir) {
            var filtered = this.filter(function(correus) {
                return correus.get("dir") === dir;
            });
            return new CorreuCollection(filtered);
        },
        getByRead: function(read) {
            var filtered = this.filter(function(correus) {
                return correus.get("read") === read;
            });
            return new CorreuCollection(filtered);
        },
        getBadges: function() {
            var badges = {};
            // Mode cutre al no tenir servidor per fer-ho dinàmic
            badges.inbox = this.getByDir('inbox').getByRead(false).length;
            badges.familia = this.getByDir('familia').getByRead(false).length;
            badges.feina = this.getByDir('feina').getByRead(false).length;
            badges.paperera = this.getByDir('paperera').getByRead(false).length;
            badges.spam = this.getByDir('spam').getByRead(false).length;
            return badges;
        },
        getBadgesDir: function(dir) {
            return this.getByDir(dir).getByRead(false).length;
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
        }

    });
    // You don't usually return a collection instantiated
    return CorreuCollection;
});