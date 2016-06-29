Template.friendRequestAcceptedCard.helpers({
    friendListFunc: function(){
        if (    Meteor.users.findOne(Meteor.userId())   ) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestAccepted;
        }
    },
});
Template.friendRequestRecievedCard.helpers({
    friendRequestRecievedFunc: function(){
        if (    Meteor.users.findOne(Meteor.userId())   ) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestRecieved;
        }
    },
});
Template.friendRequestSentCard.helpers({
    friendRequestSentFunc: function(){
        if (    Meteor.users.findOne(Meteor.userId())   ) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestSent;
        }
    },
});
Template.friendRequestDeclinedCard.helpers({
    friendRequestDeclinedFunc: function(){
        if (    Meteor.users.findOne(Meteor.userId())   ) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestDeclined;
        }
    },
});
