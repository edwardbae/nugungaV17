// // Template.registerHelper('getProfileImg', function(userId){
// //     var imgUrl=UserImages.findOne({userId: userId}).image;
// //     return imgUrl;
// // });
//
Template.registerHelper('sendAndStore', function(tempId){
    console.log(tempId);
});
Template.registerHelper('formattedDate', function(){
    return moment(this.createdAt).fromNow();
});

Template.registerHelper('momentDate', function(){
    return moment(this.createdAt).format('MMMM Do YYYY');
});
//
// Template.registerHelper('truncateTitle', function(text, length){
//     if (text.length>20) {
//         var newText = text.substring(20, length) + "  ...";
//         return new Spacebars.SafeString(newText);
//     } else {
//         return text;
//     }
// });
//
// Template.registerHelper('truncateText', function(text, length){
//     if (text.length>200) {
//         var newText = text.substring(200, length) + "  .... [클릭하여 더보기]";
//         return new Spacebars.SafeString(newText);
//     } else {
//         return text;
//     }
// });

Template.registerHelper('checkAnonymous', function(anonymous, username, userId){
    if (anonymous === "0") {
        return username;
    } else {
        return "익명의 기도";
    }
});

Template.registerHelper('checkAnonymousLink', function(anonymous){
    if (anonymous === "0") {
        return 0;
    } else {
        return 1;
    }
});

Template.registerHelper('findUsername', function(tempUserId){
    var tempObj = Meteor.users.findOne({"_id":tempUserId}).username;
    return tempObj;
});

Template.registerHelper('checkToWhom', function(toWhom){
    if (toWhom === "0") {
        return "모든성도"
    } else if (toWhom === "1") {
        return "기도친구"
    } else {
        return "나에게만"
    }
});

Template.registerHelper('checkComment', function(commentId){
    tempObj = Posts.findOne({"_id":commentId});
    if (!tempObj.comments) {
        return 0;
    } else {
        return tempObj.comments.length;
    }
});

Template.registerHelper('updateFriendshipStatus', function(){
    if (FriendshipCollection.findOne({"status":1, "receivedUser":Meteor.userId()})) {
        var tempRequest = FriendshipCollection.findOne({"status":1, "receivedUser":Meteor.userId()})
        var tempRequestedUserAccount = Meteor.users.findOne({"_id":tempRequest.receivedUser});
        if (tempRequestedUserAccount._id===Meteor.userId()) {
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$push :
                        {'profile.friendRequestPending':tempRequest.initiatedUser}
                    }
            );
            FlashMessages.sendInfo(tempRequest.initiatedUsername+"님이 친구 신청을 했습니다."+"<br><a href='/friendRequestPage'> -친구관리로 이동-</a>", { autoHide: false });
            FriendshipCollection.remove({_id:tempRequest._id});
        }
    } else if (FriendshipCollection.findOne({"status":2, "receivedUser":Meteor.userId()})) {
        var tempRequest = FriendshipCollection.findOne({"status":2, "receivedUser":Meteor.userId()})
        var tempRequestedUserAccount = Meteor.users.findOne({"_id":tempRequest.receivedUser});
        if (tempRequestedUserAccount._id===Meteor.userId()) {
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$push :
                        {'profile.friendRequestAccepted':tempRequest.initiatedUser}
                    }
            );
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$pull :
                        {'profile.friendRequestPending':tempRequest.initiatedUser}
                    }
            );
            FlashMessages.sendInfo(tempRequest.initiatedUsername+"님과 친구 연결이 되었습니다."+"<br><a href='/friendRequestPage'> -친구관리로 이동-</a>", { autoHide: false });
            FriendshipCollection.remove({_id:tempRequest._id});
        }
    } else if (FriendshipCollection.findOne({"status":3, "receivedUser":Meteor.userId()})) {
        var tempRequest = FriendshipCollection.findOne({"status":3, "receivedUser":Meteor.userId()})
        var tempRequestedUserAccount = Meteor.users.findOne({"_id":tempRequest.receivedUser});
        if (tempRequestedUserAccount._id===Meteor.userId()) {
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$push :
                        {'profile.friendRequestDeclined':tempRequest.initiatedUser}
                    }
            );
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$pull :
                        {'profile.friendRequestPending':tempRequest.initiatedUser}
                    }
            );
            FlashMessages.sendInfo(tempRequest.initiatedUsername+"님과 친구 거절 되었습니다."+"<br><a href='/friendRequestPage'> -친구관리로 이동-</a>", { autoHide: false });
            FriendshipCollection.remove({_id:tempRequest._id});
        }



    }







        // var tempFriendshipRequest1 = FriendshipCollection.findOne({"status":1});
        // // var tempFriendshipRequest2 = FriendshipCollection.findOne({"status":2});
        // // var tempFriendshipRequest3 = FriendshipCollection.findOne({"status":3});
        //
        // console.log(tempFriendshipRequest1.receivedUser);
        // console.log(Meteor.users.findOne({_id:tempFriendshipRequest1.receivedUser}).profile.friendRequestPending.length);
        // var checkLengthReceiveUserFriendRequestPending = Meteor.users.findOne({_id:tempFriendshipRequest1.receivedUser}).profile.friendRequestPending;
        // if (checkLengthReceiveUserFriendRequestPending.length>0) {
        //     var checkSum = 0;
        //     for (var i = 0; i < checkLengthReceiveUserFriendRequestPending.length; i++) {
        //         if(checkLengthReceiveUserFriendRequestPending[i] === tempFriendshipRequest1.initatedUser){
        //             checkSum += 1;
        //         }
        //     };
        //     console.log(checkSum);
        // }


        // if (tempFriendshipRequest1 && tempFriendshipRequest1.receivedUser===Meteor.userId()) {
        //     Meteor.users.update(
        //             {_id:Meteor.userId()},
        //             {$push :
        //                 {'profile.friendRequestPending':tempFriendshipRequest1.initiatedUser}
        //             }
        //     );
        //     FriendshipCollection.remove({_id:tempFriendshipRequest1._id});
        // }
        // if (tempFriendshipRequest.initiatedUser===Meteor.userId()) {
        //     Meteor.users.update(
        //             {_id:Meteor.userId()},
        //             {$push :{
        //                 'profile.friendlist':{
        //                         'userId':tempFriendshipRequest.receivedUser,
        //                     }
        //                 }
        //             });
        // } else if(tempFriendshipRequest.receivedUser===Meteor.userId()){
        //     Meteor.users.update(
        //             {_id:Meteor.userId()},
        //             {$push :{
        //                 'profile.friendlist':{
        //                         'userId':tempFriendshipRequest.initiatedUser
        //                     }
        //                 }
        //             });
        // };

});
//
//
// // Template.registerHelper('checkNewMessages', function(){
// //     if (FriendshipCollection.findOne()) {
// //         var tempFriendshipRequest1 = FriendshipCollection.find({"status":1, "receivedUser":Meteor.userId()}).fetch();
// //         console.log(tempFriendshipRequest1[0].receivedUser);
// //         if (tempFriendshipRequest1[0]) {
// //             FlashMessages.sendError(tempFriendshipRequest1[0].initiatedUser+"새로운 친구신청이 있습니다. "+"<a href='/friendRequestPage'> -친구관리로 이동-</a>", { autoHide: false });
// //         }
// //     }
// // });


Template.registerHelper('renderSession', function(){
        lastUpdated = Session.get('pageTitle');
        return lastUpdated;
});
