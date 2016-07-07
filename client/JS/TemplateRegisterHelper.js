Template.registerHelper('sendAndStore', function(tempId){

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
    if (UserImages.findOne({userId: tempId})) {
        var imgUrl = UserImages.findOne({userId: tempId}).image;
        return imgUrl
    } else {
        return "/img/generic_avatar_300.png";
    }
});
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
Template.registerHelper('searchPrayerTime', function(tempId){
    if (    PrayerTime.find({receivedUser: tempId,}).fetch()[0]  ) {
        return PrayerTime.find({receivedUser: tempId,}).fetch()[0].allTime;
    } else {
        return "0";
    }
});
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
Template.registerHelper('loggedInDate', function(){
    Meteor.users.update(
        {_id:Meteor.userId()},
        {$push :
            {'profile.loggedin':new Date()}
        }
    );
    var tempLoggedInDate = Meteor.user(Meteor.userId()).profile.loggedin;
    lastLoggedInDate = tempLoggedInDate[tempLoggedInDate.length-2];
    /////////make flashmessages here for new gido time and everything!!!!

    if (Posts.find( { $and: [ {users:Meteor.userId()},{prayedBy:{$elemMatch:{ createdAt: { $gt: lastLoggedInDate }}}}]}).fetch().length!==0) {
        FlashMessages.sendError("누군가 님의 기도제목을 위해  기도를 했습니다", { autoHide: false });
    }
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
        return "누군가";
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
});
