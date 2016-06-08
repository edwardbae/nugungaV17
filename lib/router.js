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
    //answeredGidoPage route
    this.route('answeredGidoPage');
    //answeredGidoPage route
    this.route('allGidoPage');



    // this.route('allGidoPage', {
    //     allPosts: function(){
    //         lastUpdated = Session.get('updated');
    //         return Posts.find({createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    //     },
    // });

});
