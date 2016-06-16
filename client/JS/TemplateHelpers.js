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
});

Template.friendsPostedGidoCard.helpers({
    friendsGido: function(curUser){
        var tempArray = [];
        var tempArrayItem
        if (Meteor.users.findOne(curUser)) {
            aaa=Meteor.users.findOne(curUser).profile.friendlist;
            for (var n = 0; n < aaa.length; n++) {
                tempArrayItem=Posts.find({"userId":aaa[n].userId},{sort:{createdAt: -1 }});
                tempArray.push(tempArrayItem)
            };
        }
        console.log(tempArray);
        return tempArray;

        // Meteor.users.findOne(curUser);

        // if (Meteor.users.findOne(Meteor.userId()).profile.friendlist) {
        //     // aaa= Meteor.users.findOne(Meteor.userId()).profile.friendlist;
        // }

        // for (var n = 0; n < aaa.length; n++) {
        //     console.log(aaa[n].userId);
        //     return
            // return Posts.find({"userId":aaa[n].userId},{sort:{createdAt: -1 }});
        // }
    },
});

Template.friendsNameCard.helpers({
    listFriendCard: function(){
    return Meteor.users.findOne(Meteor.userId()).profile.friendlist;
  },
});
