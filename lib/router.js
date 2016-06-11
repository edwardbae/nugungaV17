Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});
var userPostId;
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
            return Posts.findOne(this.params._id);
        }
    });
    this.route('poster', {
        path:'/poster/:_id',
        template: 'poster',
        data: function(){
            Session.set("postId", this.params._id);
        },
    });
    this.route('user', {
        path:'/user/:_id',
        template: 'user',
        data: function(){
            Session.set("friendRequestId", this.params._id);
        },
    });




    // this.route('allGidoPage', {
    //     allPosts: function(){
    //         lastUpdated = Session.get('updated');
    //         return Posts.find({createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    //     },
    // });

});
