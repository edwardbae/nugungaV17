Template.friendsGidoPage.events({
    "click #friendsGidoPageBtn": function(event){
        Router.go('friendsGidoPage');
    },
    "click #friendRequestPageBtn": function(event){
        Router.go('friendRequestPage');
    },
});
Template.friendRequestPage.events({
    "click #friendsGidoPageBtn": function(event){
        Router.go('friendsGidoPage');
    },
    "click #friendRequestPageBtn": function(event){
        Router.go('friendRequestPage');
    },
});


Handlebars.registerHelper('activeRouteClass', function () {/* routes names */
var args = Array.prototype.slice.call(arguments, 0),
    active;
args.pop();

active = _.any(args, function (name) {
    return Router.current().route.name === name;
});
if (active) {
    return 'active';
}
return '';
});
