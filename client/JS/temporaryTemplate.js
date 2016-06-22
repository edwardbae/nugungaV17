//timer function
var time = 0;
var running = 0;

function startPause(){
    if (running === 0) {
        running = 1;
        console.log("timer Started");
        increment();
        document.getElementById('startPrayer').innerHTML = "기도 보내기"
    }else {
        console.log("timer paused");
        running = 0;
        document.getElementById('startPrayer').innerHTML = "Say your prayer"
        document.getElementById('resultText').innerHTML = "누군가 타임을 친구에게 보냈습니다"
    }
};
function reset(){
    running = 0;
    time = 0;
};
function increment(){
    if (running === 1) {
        setTimeout(function(){
            time++;
            var mins= Math.floor(time/10/60);
            var secs= Math.floor(time/10);
            var tenths= time%10;
            document.getElementById('displayTime').innerHTML = mins+":"+secs+":"+tenths;
            increment();
        },100);
    }
};
//timer


Template.friendsListCard.events({
    "click #startPrayer": function(event){
        startPause();
    },
    "click #closePrayer": function(event){
        reset();
    },
    "click #enterChat": function(event){
        window.location = '/poster/';
    }
});

Template.landing.helpers({
    runSim: function(){
        swal("Welcome!", "누군가 성도님을 위해 3분 43초동안 기도를 했습니다")
    }
});
