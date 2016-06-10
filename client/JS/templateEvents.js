Template.myGidoCard.events({
    //insert post
    "submit .myGidoPost": function(event){

        var gidoTitle = event.target.gidoTitle.value;
        var gidoPost = event.target.gidoPost.value;
        var category = event.target.category.value;
        var toWhom = event.target.toWhom.value;
        var anonymous = event.target.anonymous.value;
        var subject = event.target.subject.value;
        if (!gidoPost) {
            sweetAlert("주여..", "보낼 기도내용이 없습니다!", "error");
        } else {
            Posts.insert({
                gidoTitle:gidoTitle,
                gidoPost:gidoPost,
                createdAt: new Date(),
                category: category,
                toWhom: toWhom,
                anonymous: anonymous,
                subject: subject,
                userId: Meteor.userId(),
                username: Meteor.user().username
            });
            event.target.gidoTitle.value = "";
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
    //delete Post
    "click #delete-post": function(){
        if (confirm("이 기도를 지우시겠습니까?")) {
            Posts.remove(this._id);
        }
    },

    //check answered prayer
    "click .prayerAnswerToggle": function(){
        Posts.update(this._id, {
            $set:{checked: ! this.checked}
        });
    },
});

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

Template.user.events({
    "click #friendRequestBtn": function(event){
        // var requestId = Session.get('postId');
        tempuser=Meteor.users.find({"_id":"Lm5P9ePDaJfFsKW5q"})
        console.log(tempuser);
        // Meteor.update(
        //     {_id:this._id},
        //     {$push:{
        //             friendship:{
        //                 userId: Meteor.userId(),
        //                 requestedAt:new Date(),
        //                 status:0
        //             }
        //         }
        //     });
    }
});
