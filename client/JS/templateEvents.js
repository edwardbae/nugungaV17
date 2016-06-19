Template.navbarBottom.events({
    "click #testtest": function(event){
        if (event.preventDefault) event.preventDefault();

        return false;



    //     var toWhom = event.target.toWhom.value;
    //     var anonymous = event.target.anonymous.value;
    //     if (!gidoPost) {
    //         sweetAlert("아멘", "보낼 기도내용이 없습니다!", "error");
    //     } else {
    //         Posts.insert({
    //             gidoPost:gidoPost,
    //             createdAt: new Date(),
    //             toWhom: toWhom,
    //             anonymous: anonymous,
    //             userId: Meteor.userId(),
    //             username: Meteor.user().username
    //         });
    //         event.target.gidoPost.value = "";
    //         sweetAlert("아멘..", "성도님의 기도내용을 포스팅 했습니다!", "success");
    //     }
    //     return false;
    },

    // gidoPosting using SWAL.  if bootstrap modal gido posting goes well, than delete this..
    // "click #writeGido": function(event){
    //     swal({
    //         title: "기도쓰기",
    //         text: "모든성도에게 보내는 기도",
    //         type: "input",
    //         showCancelButton: true,
    //         closeOnConfirm: false,
    //         animation: "slide-from-bottom",
    //         inputPlaceholder: "기도제목" },
    //
    //         function(inputValue){
    //             if (inputValue === false) return false;
    //             if (inputValue === "") {
    //                 swal.showInputError("포스팅 기도내용이 없습니다!");
    //                 return false   };
    //             Posts.insert({
    //                 gidoPost:inputValue,
    //                 createdAt: new Date(),
    //                 toWhom: "0",
    //                 anonymous: "0",
    //                 userId: Meteor.userId(),
    //                 username: Meteor.user().username
    //             });
    //             swal("아멘", "성도님의 기도가 포스팅되었습니다");
    //         });
    // },
});

Template.myGidoCard.events({
    "submit .myGidoPost": function(event){
        var gidoPost = event.target.gidoPost.value;
        var toWhom = event.target.toWhom.value;
        var anonymous = event.target.anonymous.value;
        if (!gidoPost) {
            sweetAlert("아멘", "보낼 기도내용이 없습니다!", "error");
        } else {
            Posts.insert({
                gidoPost:gidoPost,
                createdAt: new Date(),
                toWhom: toWhom,
                anonymous: anonymous,
                userId: Meteor.userId(),
                username: Meteor.user().username
            });
            event.target.gidoPost.value = "";
            sweetAlert("아멘..", "성도님의 기도내용을 포스팅 했습니다!", "success");
        }
        return false;
    },
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
                $('.modal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                /////////////////////////// Removes Modal black backdrop
            });
    },

    "click .prayerAnswerToggle": function(){
        Posts.update(this._id, {
            $set:{checked: ! this.checked}
        });
    },
});
////////////////////////////////////////////////////////////////////////Remove this when all comments are added by modal
////////////////////////////////////////////////////////////////////////Remove this when all comments are added by modal
Template.post.events({
    "submit .pgcdComment": function(event){
        var text = event.target.replyText.value;
        var commentId = new Meteor.Collection.ObjectID();   //variable to insert a uniqueId to the comment.  makes it easier to delete the comment
        Posts.update(
            {_id:this._id},
            {$push:{
                    comments:{
                        replyPost:text,
                        createdAt:new Date(),
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        commentId: commentId._str
                    }
                }
            });
        event.target.replyText.value = "";
        return false;
    },
    "click #delete-comment": function(event, template){
        var tempCommentId = $(event.target).parent().find('#commentIdPass').text();
        Posts.update(
            {_id: template.data._id},
            {$pull:{
                comments: {
                    commentId: tempCommentId
                }}
            });
    },
});
////////////////////////////////////////////////////////////////////////Remove this when all comments are added by modal
////////////////////////////////////////////////////////////////////////Remove this when all comments are added by modal

Template.postedGidoCard.events({
    "submit .pgcdComment": function(event){
        var text = event.target.replyText.value;
        var commentId = new Meteor.Collection.ObjectID();   //variable to insert a uniqueId to the comment.  makes it easier to delete the comment
        Posts.update(
            {_id:this._id},
            {$push:{
                    comments:{
                        replyPost:text,
                        createdAt:new Date(),
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        commentId: commentId._str
                    }
                }
            });
        event.target.replyText.value = "";
        return false;
    },
    "click #delete-comment-mpgcd": function(event, template){
        var tempCommentId = $(event.target).parent().find('#commentIdPass-mpgcd').text();
        var tempPost = Posts.find({comments:{$elemMatch:{commentId:tempCommentId}}}).fetch();
        var tempPostId = tempPost[0]._id;
        Posts.update(
            {_id: tempPostId},
            {$pull:{
                comments: {
                    commentId: tempCommentId
                }}
            });
    },
});

Template.poster.events({
    "click #friendRequestBtn": function(event){
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
            FriendshipCollection.insert({
                createdAt: new Date(),
                initiatedUser: Meteor.userId(),
                initiatedUsername: Meteor.users.findOne(Meteor.userId()).username,
                receivedUser: tempPostObj.userId,
                receivedUsername: tempPostObj.username,
                status:1,
            });
            Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$push :
                        {'profile.friendRequestPending':tempPostObj.userId}
                    }
            );
        } else {
            FlashMessages.sendError("이미 친구 신청을 보냈습니다");
        };
    }
});

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
