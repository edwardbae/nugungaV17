Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});

Router.map(function(){
    // landing route
    this.route('landing',{
        path: '/',
        template: 'landing'
    });

    //myGido route
    this.route('myGidoPage');
    //friendsGidoPage route
    this.route('friendsGidoPage');
    //allGidoPage route
    this.route('allGidoPage');
    //answeredGidoPage route
    this.route('answeredGidoPage');


});
