//timer function start
var time = 0;
var running = 0;
var tempCapture;
var tempSessionId;
var sendTime = 0;
function startPause(){
    if (running === 0) {
        running = 1;
        increment();
        document.getElementById('startPrayer').innerHTML = "기도 보내기"
    }else {
        sendTime = time;
        running = 0;
        time=0;
        swal("아멘!", "누군가타임 "+sendTime+"을 친구에게 보냈습니다");
        swal({
            title: "아멘!",
            text: "누군가타임 "+sendTime+"을 친구에게 보냈습니다",
            type: "success",
            confirmButtonColor: "#69a2b2",
            confirmButtonText: "감사합니다!",
            closeOnConfirm: true },

            function(){
                setTimeout(function(){
                    document.getElementById('displayTime'+tempSessionId).innerHTML = "0:0:0";
                }, 100);
            }
        );

        Meteor.users.update(
                {_id:tempSessionId},
                {$set:
                    {'profile.nugungaTime':sendTime}
                }
        );
    }
};
function increment(){
    if (running === 1) {
        setTimeout(function(){
            time++;
            var mins= Math.floor(time/10/60);
            var secs= Math.floor(time/10);
            var tenths= time%10;
            tempSessionId=Session.get("sessionUserId")
            document.getElementById('displayTime'+tempSessionId).innerHTML = mins+":"+secs+":"+tenths;
            increment();
        },100);
    }
};
//timer function end

Template.friendsListCard.events({
    "click #friendModal": function(event, template){
        tempCapture = this.valueOf();
        Session.set("sessionUserId", tempCapture)
    },
    "click #startPrayer": function(event){
        tempSessionId=Session.get("sessionUserId")
        startPause();
    },
    "click #enterChat": function(event){
        tempSessionId=Session.get("sessionUserId");
        /////////////////////////// Removes Modal black backdrop
        $('.modal').modal('hide');//////////////////////////////
        $('body').removeClass('modal-open');////////////////////
        $('.modal-backdrop').remove();//////////////////////////
        /////////////////////////// Removes Modal black backdrop
        if (Chat.find({$and:[{users: tempSessionId},{users:Meteor.userId()}]}).fetch()[0]) {
            console.log("gidoroom found");
            Router.go('/chatroom/'+tempSessionId);
        } else {
            console.log("room not found");
            Chat.insert({
                createdAt:new Date(),
                users: [Meteor.userId(), tempSessionId ],
                chatHistory:[],
            });
            Router.go('/chatroom/'+tempSessionId);
        };
    },
});

Template.chatNavbarBottom.events({
    "submit .chatInput": function(event, template){
        var text = event.target.chatText.value;
        var tempIdChapInput = Session.get("friendTempId");
        var temptemp = Chat.find({$and:[{users: tempIdChapInput},{users:Meteor.userId()}]}).fetch()[0];
            Chat.update(
                {_id: temptemp._id},
                {$push:{
                        chatHistory:{
                            text:text,
                            createdAt:new Date(),
                            user: Meteor.userId(),
                        }
                    }
                },
            );
        event.target.chatText.value = "";
        return false;
    }
});

Template.navbarBottom.events({
    "click #navbarGidoPost": function(event){
        $('#myGidoModal').modal('hide');
    }
});

Template.allGidoPage.events({
    "click #showNewPosts": function(event, template){
        Session.set("updated", new Date());
    }
});
Template.postedGidoCard.events({
    "click #delete-post": function(){
        var self = this;
        swal({
            title: "기도삭제",
            text: "지우시면 다시 복귀를 하실수 없습니다.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "기도 삭제",
            closeOnConfirm: false },
            function(){
                Posts.remove({_id:self._id});
                swal("삭제!", "기도를 삭제하였습니다.", "success");
                /////////////////////////// Removes Modal black backdrop
                $('.modal').modal('hide');//////////////////////////////
                $('body').removeClass('modal-open');////////////////////
                $('.modal-backdrop').remove();//////////////////////////
                /////////////////////////// Removes Modal black backdrop
            });
    },
    "click .prayerAnswerToggle": function(){
        Posts.update(this._id, {
            $set:{checked: ! this.checked}
        });
    },
    "click .makePublicToggle": function(){1111111

        Posts.update(this._id, {
            $set:{madePublic: ! this.madePublic}
        });
    },
});

Template.postedGidoModal.events({
    "submit .pgcdComment": function(event){
        var text = event.target.replyText.value;
        var commentId = new Meteor.Collection.ObjectID();   //variable to insert a uniqueId to the comment.  makes it easier to delete the comment
        Posts.update(
            {_id:this._id},
            {$push:{
                    comments:{
                        replyPost:text,
                        commentCreatedAt:new Date(),
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        commentId: commentId._str
                    }
                }
            });
        event.target.replyText.value = "";
        return false;
    },
    "click #delete-comment-Modal": function(event, template){
        var tempCommentId = $(event.target).parent().find('#commentIdPass-mpgcd').text();
        var tempPost = Posts.find({comments:{$elemMatch:{commentId:tempCommentId}}}).fetch();
        var tempPostId=tempPost[0]._id;
        console.log(tempCommentId);
        console.log(tempPostId);
        Posts.update(
            {_id:tempPostId},
            {$pull:{
                comments: {
                    commentId: tempCommentId
                }}
            });
    },
    "click .prayerAnswerToggle": function(){
        Posts.update(this._id, {
            $set:{prayerAnswered: ! this.checked}
        });
    },
    "click .makePublicToggle": function(){
        console.log(111);
        Posts.update(this._id, {
            $set:{madePublic: ! this.aaa}
        });
    },
});

// Template.poster.events({
//     "click #friendRequestBtn": function(event){
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
//
//         if (checkStatus === 0) {
//             FriendshipCollection.insert({
//                 createdAt: new Date(),
//                 initiatedUser: Meteor.userId(),
//                 initiatedUsername: Meteor.users.findOne(Meteor.userId()).username,
//                 receivedUser: tempPostObj.userId,
//                 receivedUsername: tempPostObj.username,
//                 status:1,
//             });
//             Meteor.users.update(
//                     {_id:Meteor.userId()},
//                     {$push :
//                         {'profile.friendRequestPending':tempPostObj.userId}
//                     }
//             );
//         } else {
//             FlashMessages.sendError("이미 친구 신청을 보냈습니다");
//         };
//     }
// });

Template.user.events({
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
                    {'profile.friendRequestPending':Session.get('friendRequestId')}
                }
        );
        FriendshipCollection.insert({
            createdAt: new Date(),
            initiatedUser: Meteor.userId(),
            initiatedUsername: Meteor.users.findOne(Meteor.userId()).username,
            receivedUser: Session.get('friendRequestId'),
            status:2,
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
                    {'profile.friendRequestPending':Session.get('friendRequestId')}
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
