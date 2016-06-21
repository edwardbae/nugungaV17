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
    this.route('myGidoPage', {
        path:'/myGidoPage',
        template: 'myGidoPage',
        data: function(){
            Session.set("pageTitle", "my gido"); //grabs the _id of the Posts docmument
        },
    });
    this.route('friendsGidoPage', {
        path:'/friendsGidoPage',
        template: 'friendsGidoPage',
        data: function(){
            Session.set("pageTitle", "friends"); //grabs the _id of the Posts docmument
        },
    });
    this.route('allGidoPage', {
        path:'/allGidoPage',
        template: 'allGidoPage',
        data: function(){
            Session.set("pageTitle", "nugunga"); //grabs the _id of the Posts docmument
        },
    });
    this.route('answeredGidoPage', {
        path:'/answeredGidoPage',
        template: 'answeredGidoPage',
        data: function(){
            Session.set("pageTitle", "응답받은 기도"); //grabs the _id of the Posts docmument
        },
    });
    this.route('friendRequestPage');

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
