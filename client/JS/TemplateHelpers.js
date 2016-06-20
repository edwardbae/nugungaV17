var lastUpdated;
Session.setDefault('updated', new Date());

Template.postedGidoCard.helpers({
    postsByMe: function(){
        return Posts.find({userId:Meteor.userId()},{sort:{createdAt: -1 }});
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

Template.poster.helpers({
    postUser: function(){
        return Posts.find({_id:Session.get('postId')})
    },
    friendshipStatus:function(){
        var tempPostObj = Posts.findOne({"_id":Session.get('postId')});
        var checkStatus = 0;
        if (Meteor.user().profile.friendRequestPending) {
            for (var i = 0; i < Meteor.user().profile.friendRequestPending.length; i++) {
                if (Meteor.user().profile.friendRequestPending[i] === tempPostObj.userId) {
                    checkStatus += 1;
                }
            }
        };
        if (Meteor.user().profile.friendRequestSent) {
            for (var i = 0; i < Meteor.user().profile.friendRequestSent.length; i++) {
                if (Meteor.user().profile.friendRequestSent[i] === tempPostObj.userId) {
                    checkStatus += 1;
                }
            }
        };
        if (Meteor.user().profile.friendConnected) {
            for (var i = 0; i < Meteor.user().profile.friendConnected.length; i++) {
                if (Meteor.user().profile.friendConnected[i] === tempPostObj.userId) {
                    checkStatus += 1;
                }
            }
        };
        if (checkStatus === 0) {
            return 0
        }
        else {
            return 1
        }
    },


    // friendshipStatus:function(){
    //     var userPostId = Session.get('postId');
    //     var posterPage = Posts.findOne({_id:userPostId});
    //     frienshipExists = FriendshipCollection.findOne({$and:[{$or:[{"initiatedUser":Meteor.userId()}, {"receivedUser":Meteor.userId()}]}, {$or:[{"initiatedUser":posterPage.userId}, {"receivedUser":posterPage.userId}]}]}    )
    //     if (frienshipExists) {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // },
//     users: function(){
//         return Meteor.users.find({});
//     },
//     alreadyFriend:function(passedinId){
//         tempUserFriend = Meteor.users.findOne(Meteor.userId()).profile.friendlist
//         console.log(tempUserFriend[0].userId);
//         var returnValue = 0;
//         for (var i = 0; i < tempUserFriend.length; i++) {
//             if (tempUserFriend[i].userId === passedinId) {
//                 returnValue += 1;
//             } else {
//                 returnValue = 0;
//             }
//         }
//         return returnValue;
//     },
});

Template.user.helpers({
    requests: function(){
        return Meteor.users.find({_id:Session.get('friendRequestId')});
    },
    friendshipStatus:function(){
        console.log(Meteor.user.profile.friendRequestAccepted);
    },
    friendshipConnected:function(){
        if (true) {
            return 0
        } else {
            return 1
        }
    },

});

Template.friendsPostedGidoCard.helpers({
    friendsGido: function(){
        if (Meteor.users.findOne(Meteor.userId())) {
            return Posts.find(
                 {$or:
                    [{userId:
                         {$in:
                              Meteor.users.findOne(Meteor.userId()).profile.friendRequestAccepted
                         }
                    }]
                }, {sort:{createdAt: -1 }}
            ).fetch();
        }
    },
});

Template.friendsNameCard.helpers({
    listFriendCard: function(){
    return Meteor.users.findOne(Meteor.userId()).profile.friendlist;
  },
});

Template.navbarBottom.helpers({
    makeactive: function(){
        var axxxx = Session.get('pageTitle');
        if (axxxx==="나의 기도") {
            $("#myGido").addClass('active');
            $("#friendGido").removeClass('active');
            $("#allGido").removeClass('active');
        }
        if (axxxx==="친구의 기도") {
            $("#myGido").removeClass('active');
            $("#friendGido").addClass('active');
            $("#allGido").removeClass('active');
        }
        if (axxxx==="모두의 기도") {
            $("#myGido").removeClass('active');
            $("#friendGido").removeClass('active');
            $("#allGido").addClass('active');        
        }
    }
});
