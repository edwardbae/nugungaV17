Template.myGidoCard.events({
    "submit .myGidoPost": function(event){

        var gidoTitle = event.target.gidoTitle.value;
        var gidoPost = event.target.gidoPost.value;
        var category = event.target.category.value;
        var toWhom = event.target.toWhom.value;
        var anonymous = event.target.anonymous.value;
        var subject = event.target.subject.value;
        if (!gidoPost) {
            FlashMessages.sendError("기도 내용이 없습니다", { hideDelay: 3000 });
        } else {
            FlashMessages.sendSuccess("성도님의 기도가 포스팅 되었습니다", { hideDelay: 3000 });
            Posts.insert({
                gidoTitle:gidoTitle,
                gidoPost:gidoPost,
                createdAt: new Date(),
                category: category,
                toWhom: toWhom,
                anonymous: anonymous,
                subject: subject,
            });
            event.target.gidoTitle.value = "";
            event.target.gidoPost.value = "";
        }
        return false;
    }
});
