Posts = new Mongo.Collection("posts");
FriendshipCollection = new Mongo.Collection("friendshipCollection");




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
