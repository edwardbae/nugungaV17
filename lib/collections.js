Posts = new Mongo.Collection("posts");
FriendshipCollection = new Mongo.Collection("friendshipCollection");

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
        label: "익명",
        type: Boolean,
        defaultValue: false,
    },
    toFriends: {
        label: "친구에게만 포스팅 원하시면 체크",
        type: Boolean,
        defaultValue: false,
    },
    madePublic: {
        label: "기도 공유",
        type: Boolean,
        defaultValue: false,
    },
    "comments.$.replyPost": {
        type: String,
    },
    "comments.$.commentCreatedAt": {
        type: Date,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date;
            }
        }
    },
    "comments.$.userId": {
        type: String,
        autoValue: function(){
            if (this.isUpdate) {
                return Meteor.userId()
            }
        }
    },
    "comments.$.username": {
        type: String,
        autoValue: function(){
            if (this.isUpdate) {
                return Meteor.users.findOne({_id:Meteor.userId()}).username
            }
        }
    },
    "comments.$.commentId": {
        type: String,
        autoValue: function(){
        if (this.isUpdate) {
             var commentId = new Meteor.Collection.ObjectID();
             return commentId.str;
        }
        }
    },
}));


//
// ProfileImages = new FS.Collection("ProfileImages",{
//     stores:[new FS.Store.GridFS("ProfileImages")]
// });
//
// UserImages = new Mongo.Collection("UserImages");
