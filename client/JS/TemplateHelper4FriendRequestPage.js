Template.friendRequestCard.helpers({
    friendRequestsFunc: function(){
        if (    Meteor.users.findOne(Meteor.userId())   ) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestPending;
        }
    },
});
Template.friendListCard.helpers({
    friendListFunc: function(){
        if (    Meteor.users.findOne(Meteor.userId())   ) {
            return Meteor.users.findOne(Meteor.userId()).profile.friendRequestAccepted;
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
