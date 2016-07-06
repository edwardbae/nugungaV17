// Template.registerHelper('assignGenericProfileImg', function(){
//     var currentImg = UserImages.findOne({userId:Meteor.userId()});
//     if (currentImg) {
//         console.log("image found");
//     } else {
//         console.log("image not found");
//         // var imageLoc = '/cfs/files/ProfileImages/genericProfileImg';
//         // UserImages.insert({
//         //     userId: Meteor.userId(),
//         //     username: Meteor.user().username,
//         //     image: imageLoc,
//         // });
//     }
// });

Template.registerHelper('checkProfileImage', function(){
    var currentImg = UserImages.findOne({userId:Meteor.userId()});
    if (currentImg) {
        console.log("user profile image found");
        var imgUrl = UserImages.findOne({userId: Meteor.userId()}).image;
        console.log (imgUrl);
        return imgUrl
    } else {
        console.log("user profile image not found");
        return "img/generic_avatar_300.png"
        // var imageLoc = '/cfs/files/ProfileImages/genericProfileImg';
        // UserImages.insert({
        //     userId: Meteor.userId(),
        //     username: Meteor.user().username,
        //     image: imageLoc,
        // });
    }
});


// assignGenericProfileImg: function(){
//     console.log("assignImg");
//     var currentImg = UserImages.findOne({userId:Meteor.userId()});
//     console.log(currentImg);
//     if (currentImg) {
//     } else {
//         var imageLoc = '/cfs/files/ProfileImages/genericProfileImg';
//         UserImages.insert({
//             userId: Meteor.userId(),
//             username: Meteor.user().username,
//             image: imageLoc,
//         });
//     }
// },
