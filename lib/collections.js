Posts = new Mongo.Collection("posts");
FriendshipCollection = new Mongo.Collection("friendshipCollection");

// Posts.attachSchema(new SimpleSchema({
//     gidoPost: {
//         label:"성도님의 기도제목",
//         type: String,
//         max: 1500
//     },
//     createdAt:{
//         type: Date,
//         autoValue: function(){
//             return new Date()
//         }
//     },
//     userId:{
//         type: String,
//         autoValue: function(){
//             return Meteor.userId()
//         }
//     },
//     username:{
//         type: String,
//         autoValue: function(){
//             return Meteor.users.findOne({_id:Meteor.userId()}).username
//         }
//     },
//     anonymous: {
//         label: "익명으로 포스팅 원하시면 체크",
//         type: Boolean,
//         defaultValue: false,
//     },
//     toFriends: {
//         label: "친구에게만 포스팅 원하시면 체크",
//         type: Boolean,
//         defaultValue: false,
//     },
//
// }));

// FriendshipCollection
//     0: pending
//     1: friends
//     2: declined
//     3: blocked
//
// user1: 843902482
// user2: 580934850
// status: 0
// actionuser: 843902482
// {
// [843902482, 580934850, 0, 843902482]
// [843902482, 580934850, 1, 843902482]


// Posts.attachSchema(new SimpleSchema({
//     gidoTitle: {
//         type: String,
//         max: 100
//     },
//     gidoPost: {
//         type: String,
//         max: 1500
//     },
//     createdAt:{
//         type: Date,
//     },
//     category:{
//         type: Number,
//     },
//     toWhom:{
//         type: Number,
//     },
//     anonymous:{
//         type: Number,
//     },
//     subject:{
//         type: Number,
//     },
//     userId:{
//         type: String,
//     },
//     username:{
//         type: String,
//     },
//     checked:{
//         type: Boolean,
//         optional: true
//     },
//     replyPost:{
//         type: Boolean,
//         optional: true
//     },
//
//
// }));


//
// ProfileImages = new FS.Collection("ProfileImages",{
//     stores:[new FS.Store.GridFS("ProfileImages")]
// });
//
// UserImages = new Mongo.Collection("UserImages");
