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

    //myHome route
    this.route('myHome');
    //allGido route
    this.route('allGido');
    //answeredPrayers route
    this.route('answeredPrayers');
    //profile route
    this.route('profile');

});
