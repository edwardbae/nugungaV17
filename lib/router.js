Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});
var userPostId;
Router.map(function(){
    this.route('landing',{
        path: '/',
        template: 'landing'
    });
    this.route('myGidoPage');
    this.route('friendsGidoPage');
    this.route('answeredGidoPage');
    this.route('friendRequestPage');
    this.route('allGidoPage');
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
            Session.set("postId", this.params._id); //grabs the _id of the Posts docmument
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
