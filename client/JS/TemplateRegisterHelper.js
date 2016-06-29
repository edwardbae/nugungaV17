Template.registerHelper('sendAndStore', function(tempId){
    console.log(tempId);
});
Template.registerHelper('formattedDate', function(){
    return moment(this.createdAt).fromNow();
});
Template.registerHelper('renderSession', function(){
        lastUpdated = Session.get('pageTitle');
        return lastUpdated;
});
Template.registerHelper('momentTime', function(){
    return moment(this.createdAt).format('a h:mm');
});
Template.registerHelper('momentDate', function(){
    return moment(this.createdAt).format('MMM Do');
});
Template.registerHelper('momentYear', function(){
    return moment(this.createdAt).format('YYYY');
});
Template.registerHelper('getProfileImage', function(tempId){
        var imgUrl = UserImages.findOne({userId: tempId}).image;
        return imgUrl;
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//xxx here i have a problem when there are no chatHistory exists.  it should return "<- 아직 시작한 대화가 없습니다 ->", but instead returns an error on console window;
Template.friendsListCard.helpers({
    latestPost: function(tempuserid){
        if (Chat.find({users: tempuserid, users:Meteor.userId()}).fetch()[0]) {
            var temparray =  Chat.findOne({$and:[{users: tempuserid},{users:Meteor.userId()}]}, {sort:{createdAt: -1 }}).chatHistory;
            returnText = temparray[temparray.length-1].text ;
            if (returnText.length>50) {
                var newText = returnText.substring(50, length) + "  .... ";
                return new Spacebars.SafeString(newText);
            } else {
                return returnText;
            }
        } else {
            return "<- 아직 시작한 대화가 없습니다 ->"
        };
    },
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.registerHelper('loggedInDate', function(){
    Meteor.users.update(
        {_id:Meteor.userId()},
        {$push :
            {'profile.loggedin':new Date()}
        }
    );
    var tempLoggedInDate = Meteor.user(Meteor.userId()).profile.loggedin;
    lastLoggedInDate = tempLoggedInDate[tempLoggedInDate.length-2];
    if (Chat.find( { $and: [ {users:Meteor.userId()},{chatHistory:{$elemMatch:{ createdAt: { $gt: lastLoggedInDate }}}}]}).fetch().length!==0) {
        FlashMessages.sendError("새로운 기도방 메세지가 있습니다", { autoHide: false });
    }
});

Template.registerHelper('checkroomname', function(anonymous, username, userId){
    var tempPageTitle = Session.get('pageTitle');
    if (tempPageTitle === "gido room") {
        return 1;
    } else {
        return 0;
    }
});
Template.registerHelper('checkAnonymous', function(anonymous, username, userId){
    if (anonymous === false) {
        return username;
    } else {
        return "nugunga";
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
    if (Meteor.users.findOne({"_id":tempUserId})) {
        var tempObj = Meteor.users.findOne({"_id":tempUserId}).username;
        return tempObj;
    }
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
Template.registerHelper('truncateText', function(text, length){
    if (text.length>100) {
        var newText = text.substring(100, length) + "  .... [클릭하여 더보기]";
        return new Spacebars.SafeString(newText);
    } else {
        return text;
    }
});
Template.registerHelper('updateFriendshipStatus', function(){
    //staus:1 friendRequestRecieved
    //status:2 friendRequestAccepted
    //status:3 friendRequestDeclined
    if (FriendshipCollection.findOne({"status":1, "receivedUser":Meteor.userId()})) {
        var tempRequest = FriendshipCollection.findOne({"status":1, "receivedUser":Meteor.userId()})
        var tempRequestedUserAccount = Meteor.users.findOne({"_id":tempRequest.receivedUser});
        if (tempRequestedUserAccount._id===Meteor.userId()) {
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$push :
                        {'profile.friendRequestRecieved':tempRequest.initiatedUser}
                    }
            );
            FlashMessages.sendError(tempRequest.initiatedUsername+"님이 친구 신청을 했습니다."+"<br><a href='/friendRequestPage'> -친구관리로 이동-</a>", { autoHide: false });
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
                        {'profile.friendRequestSent':tempRequest.initiatedUser}
                    }//xxx is this friendRequestRecieved or friendRequestSent
            );
            FlashMessages.sendError(tempRequest.initiatedUsername+"님과 친구 연결이 되었습니다.", { autoHide: false });
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
                        {'profile.friendRequestSent':tempRequest.initiatedUser}
                    }
            );
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


// // Template.registerHelper('checkNewMessages', function(){
// //     if (FriendshipCollection.findOne()) {
// //         var tempFriendshipRequest1 = FriendshipCollection.find({"status":1, "receivedUser":Meteor.userId()}).fetch();
// //         console.log(tempFriendshipRequest1[0].receivedUser);
// //         if (tempFriendshipRequest1[0]) {
// //             FlashMessages.sendError(tempFriendshipRequest1[0].initiatedUser+"새로운 친구신청이 있습니다. "+"<a href='/friendRequestPage'> -친구관리로 이동-</a>", { autoHide: false });
// //         }
// //     }
// // });

// // Template.registerHelper('getProfileImg', function(userId){
// //     var imgUrl=UserImages.findOne({userId: userId}).image;
// //     return imgUrl;
// // });
//
