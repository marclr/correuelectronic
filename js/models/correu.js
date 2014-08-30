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
    var CorreuModel = Backbone.Model.extend({
        defaults: {
            to:"",
            from:"",
            subject:"",
            cc:"",
            bcc:"",
            message:"",
            files:"",
            dir:"inbox",
            date:"",
            read:false
        }
    });
    // Return the model for the module
    return CorreuModel;
});