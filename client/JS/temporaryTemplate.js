
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

Template.user.events({
    "click #friendRequestBtn": function(event){
        var friendId = Session.get('friendRequestId');
        var tempPostObj=Meteor.users.find({_id:friendId}).fetch()[0];
        FriendshipCollection.insert({
            createdAt: new Date(),
            initiatedUser: Meteor.userId(),
            initiatedUsername: Meteor.users.findOne(Meteor.userId()).username,
            receivedUser: tempPostObj._id,
            receivedUsername: tempPostObj.username,
            status:1,
        });
        Meteor.users.update(
                {_id:Meteor.userId()},
                {$push :
                    {'profile.friendRequestSent':tempPostObj._id}
                }
        );
    },
    "click #friendRequestAcceptBtn": function(event){
        Meteor.users.update(
                {_id:Meteor.userId()},
                {$push :
                    {'profile.friendRequestAccepted':Session.get('friendRequestId')}
                }
        );
        Meteor.users.update(
                {_id:Meteor.userId()},
                {$pull :
                    {'profile.friendRequestRecieved':Session.get('friendRequestId')}
                }
        );
        FriendshipCollection.insert({
            createdAt: new Date(),
            initiatedUser: Meteor.userId(),
            initiatedUsername: Meteor.users.findOne(Meteor.userId()).username,
            receivedUser: Session.get('friendRequestId'),
            status:2,//status 2 meaning friendship accepted
        });
    },
    "click #friendRequestDeclineBtn": function(event){
        Meteor.users.update(
                {_id:Meteor.userId()},
                {$push :
                    {'profile.friendRequestDeclined':Session.get('friendRequestId')}
                }
        );
        Meteor.users.update(
                {_id:Meteor.userId()},
                {$pull :
                    {'profile.friendRequestRecieved':Session.get('friendRequestId')}
                }
        );
        FriendshipCollection.insert({
            createdAt: new Date(),
            initiatedUser: Meteor.userId(),
            initiatedUsername: Meteor.users.findOne(Meteor.userId()).username,
            receivedUser: Session.get('friendRequestId'),
            status:3,
        });
    },
});
















//
// var tempHiddenUserId;
// Template.postedGidoModal.events({
//
//     "click .startPrayerUnique": function(event){
//
//         tempHiddenUserId = $(event.target).text();
//         console.log(tempHiddenUserId);
//         function startPause(){
//             if (running === 0) {
//                 running = 1;
//                 increment();
//                 // if (    PrayerTime.find({receivedUser: tempSessionId,}).fetch()[0]  ) {
//                 //     console.log(PrayerTime.find({receivedUser: tempSessionId,}).fetch()[0]);
//                 // } else {
//                 //     console.log("prayertime db does not exist");
//
//                     // PrayerTime.insert({
//                     //     createdAt:new Date(),
//                     //     receivedUser: tempSessionId,
//                     //     allTime:0,
//                     //     sender:[],
//                     // });
//                 // }
//             }else {
//                 sendTime = time;
//                 running = 0;
//                 time=0;
//                 swal("아멘!", "누군가타임 "+sendTime+"을 친구에게 보냈습니다");
//                 swal({
//                     title: "아멘!",
//                     text: "누군가타임 "+sendTime+"을 친구에게 보냈습니다",
//                     type: "success",
//                     confirmButtonColor: "#69a2b2",
//                     confirmButtonText: "감사합니다!",
//                     closeOnConfirm: true },
//
//                     function(){
//                         setTimeout(function(){
//                             document.getElementById(idname).innerHTML = "0:0:0";
//                         }, 100);
//                     },
//                 );
//                 // var temptemptemp = PrayerTime.find({receivedUser: tempSessionId,}).fetch()[0];
//                 // PrayerTime.update(
//                 //     {_id: temptemptemp._id},
//                 //     { $inc: {allTime: sendTime },
//                 //         $push:{
//                 //             sender:{
//                 //                 newtime:sendTime,
//                 //                 createdAt:new Date(),
//                 //                 user: Meteor.userId(),
//                 //             }
//                 //         }
//                 //     },
//                 // );
//                 sendTime = 0;
//             }
//         };
//         function increment(){
//             if (running === 1) {
//                 setTimeout(function(){
//                     time++;
//                     var mins= Math.floor(time/10/60);
//                     var secs= Math.floor(time/10);
//                     var tenths= time%10;
//                     idname = 'startPrayerPGM' + tempHiddenUserId;
//                     document.getElementById(idname).innerHTML = mins+":"+secs+":"+tenths;
//                     increment();
//                 },100);
//             }
//         };
//         startPause();
//     },
//
// });
