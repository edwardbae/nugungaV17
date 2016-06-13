var lastUpdated;
Session.setDefault('updated', new Date());

Template.postedGidoCard.helpers({
    postsByMe: function(){
        return Posts.find({username:Meteor.user().username},{sort:{createdAt: -1 }});
    },
});

Template.postedGidoCard.helpers({
    posts: function(){
        return Posts.find({},{sort:{createdAt: -1 }});
    },
});


Template.allPostedGidoCard.helpers({
    allPosts: function(){
        lastUpdated = Session.get('updated');
        return Posts.find({toWhom:"0", createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    },
});


Template.answeredPostedGidoCard.helpers({
    answered: function(){
        return Posts.find({toWhom:"0", checked:true},{sort:{createdAt: -1 }});
    },
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.friendsPostedGidoCard.helpers({//////////////////////////////////////////////////////////////////////////////////////
    friendsGido: function(){//////////////////////////////////////////////////////////////////////////////////////////////////
        aaa = FriendshipCollection.find({"initatedUser":Meteor.userId(), "status":1},{sort:{createdAt: -1 }});////////////////
        return Posts.find({"userId":aaa.recievedUser},{sort:{createdAt: -1 }});///////////////////////////////////////////////
    },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Template.poster.helpers({
    users: function(){
        return Meteor.users.find({});
    },
    postUser: function(){
        var userPostId = Session.get('postId');
        return Posts.find({_id:userPostId})
    },
    friendshipStatus:function(){

        var userPostId = Session.get('postId');
        var posterPage = Posts.findOne({_id:userPostId});
        frienshipExists = FriendshipCollection.findOne({$and:[{$or:[{"initatedUser":Meteor.userId()}, {"recievedUser":Meteor.userId()}]}, {$or:[{"initatedUser":posterPage.userId}, {"recievedUser":posterPage.userId}]}]}    )
        if (frienshipExists) {
            return 1
        } else {
            return 0
        }
    }
});

Template.friendRequestCard.helpers({
    friendRequests: function(){
        return FriendshipCollection.find({"recievedUser":Meteor.userId(), "status":1},{sort:{createdAt: -1 }});
    },
});
Template.friendListCard.helpers({
    friendLists: function(){
        return FriendshipCollection.find({"status":2, $or:[{"initatedUser":Meteor.userId()},{"recievedUser":Meteor.userId()}]},     {sort:{createdAt: -1 }   });
    },
});

Template.friendRequestSentCard.helpers({
    friendRequestsSent: function(){
        return FriendshipCollection.find({"initatedUser":Meteor.userId(), "status":1},{sort:{createdAt: -1 }});
    },
});
Template.friendRequestDeclinedCard.helpers({
    friendRequestsSent: function(){
        return FriendshipCollection.find({"initatedUser":Meteor.userId(), "status":3},{sort:{createdAt: -1 }});
    },
});
Template.friendRequestBlockCard.helpers({
    friendRequestsSent: function(){
        return FriendshipCollection.find({"initatedUser":Meteor.userId(), "status":4},{sort:{createdAt: -1 }});
    },
});

Template.user.helpers({
    requests: function(){
        var userReqId = Session.get('friendRequestId');
        console.log(userReqId);
        return FriendshipCollection.find({_id:userReqId})
    },
});

Template.notify.helpers({
    alarm: function(){
        if (true) {
            FlashMessages.sendWarning("New Friend Request");
        }
    }
});
