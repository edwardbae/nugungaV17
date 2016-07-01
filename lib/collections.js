Posts = new Mongo.Collection("posts");
FriendshipCollection = new Mongo.Collection("friendshipCollection");
Chat = new Mongo.Collection("chat");
PrayerTime = new Mongo.Collection("prayerTime");
ProfileImages = new FS.Collection("ProfileImages",{
    stores:[new FS.Store.GridFS("ProfileImages")]
});
UserImages = new Mongo.Collection("UserImages");


Posts.attachSchema(new SimpleSchema({
    gidoPost: {
        label:" ",
        type: String,
        max: 1500
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    userId:{
        type: String,
        autoValue: function(){
            if (this.isInsert) {
                return Meteor.userId()
            }
        }
    },
    username:{
        type: String,
        autoValue: function(){
        if (this.isInsert) {
            return Meteor.users.findOne({_id:Meteor.userId()}).username
        }
        }
    },
    anonymous: {
        label: "익명으로 기도쓰기",
        type: Boolean,
        defaultValue: false,
    },
    toFriends: {
        label: "친구에게만 포스팅 원하시면 체크",
        type: Boolean,
        defaultValue: false,
    },
    madePublic: {
        label: "모두에게 기도부탁",
        type: Boolean,
        defaultValue: true,
    },
    checkAnswered: {
        label: "기도 응답",
        type: Boolean,
        defaultValue: false,
    },
    answeredPost: {
        label:" ",
        type: String,
        max: 1500,
        optional: true
    },
    answeredAt: {
        type: Date,
        optional: true
    },
    allTime: {
        type: Number,
        optional: true,
        autoValue: function(){
            if (this.isInsert) {
                return 0
            }
        }
    },
    "prayedBy.$.time":{
        type: Number,
        optional: true
    },
    "prayedBy.$.userId":{
        type:String,
        optional:true
    },
    "prayedBy.$.createdAt":{
        type:Date,
        optional: true,
    },
    "comments.$.replyPost": {
        type: String,
        optional: true,
    },
    "comments.$.commentCreatedAt": {
        type: Date,
        optional: true,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    "comments.$.userId": {
        type: String,
        optional: true,
        autoValue: function(){
            if (this.isInsert) {
                return Meteor.userId()
            }
        }
    },
    "comments.$.username": {
        type: String,
        optional: true,
        autoValue: function(){
            if (this.isInsert) {
                return Meteor.users.findOne({_id:Meteor.userId()}).username
            }
        }
    },
    "comments.$.commentId": {
        type: String,
        optional: true,
        autoValue: function(){
        if (this.isInsert) {
             var commentId = new Meteor.Collection.ObjectID();
             return commentId.str;
        }
        }
    },
}));
