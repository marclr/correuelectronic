/**
 * Created by Marc on 04/05/2014.
 */
/**
 * Created by Marc on 16/04/2014.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ContacteModel = Backbone.Model.extend({
        defaults: {
            name:"",
            mail:"",
            notes:"",
            image:""
        }
    });
    // Return the model for the module
    return ContacteModel;
});