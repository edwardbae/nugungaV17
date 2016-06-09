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
    //individualPost route
    this.route('post', {
        path:'/posts/:_id',
        template: 'post',
        data: function(){
            return Posts.findOne(this.params._id)
        }
    });




    // this.route('allGidoPage', {
    //     allPosts: function(){
    //         lastUpdated = Session.get('updated');
    //         return Posts.find({createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    //     },
    // });

});
