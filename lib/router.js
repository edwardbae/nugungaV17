Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});

var userPostId;
Router.map(function(){
    this.route('landing',{
        path: '/',
        template: 'landing',
        data: function(){
            Session.set("pageTitle", "landing"); //grabs the _id of the Posts docmument
        },
    });
    this.route('myGidoPage', {
        path:'/myGidoPage',
        template: 'myGidoPage',
        data: function(){
            Session.set("pageTitle", "home"); //grabs the _id of the Posts docmument
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
    this.route('profilePage');

    this.route('post', {
        path:'/posts/:_id',
        template: 'post',
        data: function(){
            return Posts.findOne(this.params._id);
        }
    });
    // this.route('poster', {
    //     path:'/poster/kQk9ee9zQDYydimdC',
    //     template: 'poster',
    //     data: function(){
    //         Session.set("postId", this.params._id); //grabs the _id of the Posts docmument
    //         Session.set("pageTitle", "chatroom");
    //     },
    // });
    this.route('chatroom', {
        path:'/chatroom/:_id',
        template: 'chatroom',
        data: function(){
            Session.set("pageTitle", "gido room");
            Session.set("friendTempId", this.params._id);
        },
    });
    this.route('user', {
        path:'/user/:userId',
        template: 'user',
        data: function(){
            Session.set("friendRequestId", this.params.userId);
            /////////////////////////// Removes Modal black backdrop
            $('.modal').modal('hide');//////////////////////////////
            $('body').removeClass('modal-open');////////////////////
            $('.modal-backdrop').remove();//////////////////////////
            /////////////////////////// Removes Modal black backdrop
        },
    });

    // this.route('allGidoPage', {
    //     allPosts: function(){
    //         lastUpdated = Session.get('updated');
    //         return Posts.find({createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    //     },
    // });

});
