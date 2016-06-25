

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
            console.log("room not found");
            console.log(Meteor.userId()+" : "+tempuserid);
            return "<- 아직 시작한 대화가 없습니다 ->"
        };


    },
});
