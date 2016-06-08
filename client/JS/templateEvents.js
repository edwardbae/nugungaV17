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

var confirmDelete = 0;
Template.postedGidoCard.events({
    //delete Post
    "click #delete-post": function(){
        if (confirm("이 기도를 지우시겠습니까?")) {
            Posts.remove(this._id);
        }
    },

});
