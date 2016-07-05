Template.friendSearchPage.events({
    "submit .searchUsernameClass": function(event){
        event.preventDefault();
        var text = event.target.searchUsername.value;
        var searchResult = Meteor.users.find({username:text}).fetch()[0];
        if (searchResult) {
            document.getElementById('displaySearchResult').innerHTML = searchResult.username
            Session.set("friendSearchId", searchResult._id)
        } else {
            document.getElementById('displaySearchResult').innerHTML = "등록이 되어 있지 않은 이름입니다"
        }
    },
    "click #displaySearchResult": function(event, template){
        var tempFriendSearchId = Session.get("friendSearchId")
        console.log(tempFriendSearchId);
        Router.go('/user/'+tempFriendSearchId);
    },

})
