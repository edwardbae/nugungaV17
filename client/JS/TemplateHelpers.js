var lastUpdated;

Session.setDefault('updated', new Date());


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
        return Posts.find(  {madePublic:true, createdAt: { $lt: lastUpdated }},     {sort:{createdAt: -1 },limit: Session.get("current_page")*20 }     );
    },
});

Template.answeredPostedGidoCard.helpers({
    answered: function(){
        return Posts.find({toWhom:"0", checked:true},{sort:{createdAt: -1 }});
    },
});

Template.user.helpers({
    requests: function(){
        var friendId = Session.get('friendRequestId');
        return Meteor.users.find({_id:friendId});
    },
    friendRequestSent:function(){
        var friendId = Session.get('friendRequestId');
        if (Meteor.users.find({  $and:[{_id:Meteor.userId()}, {"profile.friendRequestSent":friendId}  ] }).fetch()[0]) {
            return 1
        } else {
            return 0
        }
    },
    friendRequestRecieved:function(){
        var friendId = Session.get('friendRequestId');
        if (Meteor.users.find({  $and:[{_id:Meteor.userId()}, {"profile.friendRequestRecieved":friendId}  ] }).fetch()[0]) {
            return 1
        } else {
            return 0
        }
    },
    friendRequestAccepted:function(){
        var friendId = Session.get('friendRequestId');
        if (Meteor.users.find({  $and:[{_id:Meteor.userId()}, {"profile.friendRequestAccepted":friendId}  ] }).fetch()[0]) {
            return 1
        } else {
            return 0
        }
    },
    friendRequestDeclined:function(){
        var friendId = Session.get('friendRequestId');
        if (Meteor.users.find({  $and:[{_id:Meteor.userId()}, {"profile.friendRequestDeclined":friendId}  ] }).fetch()[0]) {
            return 1
        } else {
            return 0
        }
    },
});

Template.friendsListCard.helpers({
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
        if (Meteor.users.findOne(Meteor.userId())) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendlist;
        }
  },
});
Template.friendsListCard.helpers({
    listFriend: function(){
        if (Meteor.users.findOne(Meteor.userId())) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestAccepted;
        }
    },
    friendPrayerTime: function(thisuser){
        return PrayerTime.findOne({receivedUser:thisuser}).allTime;
    },
    friendPrayerTimeByMe: function(thisuser){
        console.log(  PrayerTime.find(   {  $and:[{receivedUser:thisuser}, {"sender.user":"Pg8NqR4qyNv8YNnky"}  ] }     ).fetch()[0].sender    )  ;
    },

    friendImg: function(tempId){
        var imgUrl = UserImages.findOne({userId: tempId}).image;
        return imgUrl;
    },

});

Template.navbarBottom.helpers({
    makeactive: function(){
        var axxxx = Session.get('pageTitle');

        if (axxxx==="home") {
            $("#myGido").addClass('active');
            $("#friendGido").removeClass('active');
            $("#allGido").removeClass('active');
        }
        if (axxxx==="friends") {
            $("#myGido").removeClass('active');
            $("#friendGido").addClass('active');
            $("#allGido").removeClass('active');
        }
        if (axxxx==="nugunga") {
            $("#myGido").removeClass('active');
            $("#friendGido").removeClass('active');
            $("#allGido").addClass('active');
        }
    }
});

Template.landing.helpers({
    runSim: function(){
        setTimeout(function(){ swal("다시오신것 환영합니다!", "누군가 "+Meteor.user(Meteor.userId()).username+"님을 위해 3분 43초동안 기도를 했습니다") }, 500);
    },

});

Template.chatroom.helpers({
    displayChat: function(){
        var tempIdDisplay = Session.get("friendTempId");
        if (Chat.find({users: tempIdDisplay, users:Meteor.userId()}).fetch()[0]) {
            return Chat.find({$and:[{users: tempIdDisplay},{users:Meteor.userId()}]}, {sort:{createdAt: -1 }}).fetch()[0].chatHistory;
        }
    },
});

// Template.poster.helpers({
//     postUser: function(){
//         return Posts.find({_id:Session.get('postId')})
//     },
//     friendshipStatus:function(){
//         var tempPostObj = Posts.findOne({"_id":Session.get('postId')});
//         var checkStatus = 0;
//         if (Meteor.user().profile.friendRequestPending) {
//             for (var i = 0; i < Meteor.user().profile.friendRequestPending.length; i++) {
//                 if (Meteor.user().profile.friendRequestPending[i] === tempPostObj.userId) {
//                     checkStatus += 1;
//                 }
//             }
//         };
//         if (Meteor.user().profile.friendRequestSent) {
//             for (var i = 0; i < Meteor.user().profile.friendRequestSent.length; i++) {
//                 if (Meteor.user().profile.friendRequestSent[i] === tempPostObj.userId) {
//                     checkStatus += 1;
//                 }
//             }
//         };
//         if (Meteor.user().profile.friendConnected) {
//             for (var i = 0; i < Meteor.user().profile.friendConnected.length; i++) {
//                 if (Meteor.user().profile.friendConnected[i] === tempPostObj.userId) {
//                     checkStatus += 1;
//                 }
//             }
//         };
//         if (checkStatus === 0) {
//             return 0
//         }
//         else {
//             return 1
//         }
//     },
// });
