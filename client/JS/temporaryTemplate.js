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
        console.log(tempSessionId);
    }else {
        console.log(tempSessionId);
        sendTime = time;
        running = 0;
        time=0;
        swal("아멘!", "누군가타임 "+sendTime+"을 친구에게 보냈습니다");
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

Template.landing.helpers({
    runSim: function(){
        swal("Welcome!", "누군가 성도님을 위해 3분 43초동안 기도를 했습니다")
    }
});

Template.chatroom.helpers({
    displayChat: function(){
        var tempIdDisplay = Session.get("friendTempId");
        if (Chat.find({users: tempIdDisplay, users:Meteor.userId()}).fetch()[0]) {
            console.log("gidoroom found");
            console.log(Meteor.userId()+" : "+tempIdDisplay);
            return Chat.find({$and:[{users: tempIdDisplay},{users:Meteor.userId()}]}, {sort:{createdAt: -1 }}).fetch()[0].chatHistory;
        } else {
            console.log("room not found");
            console.log(Meteor.userId()+" : "+tempIdDisplay);
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
