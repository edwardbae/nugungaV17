// Template.registerHelper('getProfileImg', function(userId){
//     var imgUrl=UserImages.findOne({userId: userId}).image;
//     return imgUrl;
// });

Template.registerHelper('formattedDate', function(){
    return moment(this.createdAt).fromNow();
});
Template.registerHelper('momentDate', function(){
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm a');

});

//
// Template.registerHelper('truncateText', function(text, length){
//     if (text.length>3) {
//         var newText = text.substring(0, length) + "  ..";
//         // newText = newText.substr(0, Math.min(newText.lenght, newText.lastIndexOf(" ")));
//         return new Spacebars.SafeString(newText);
//     } else {
//         return text;
//     }
// })
//
//
// Template.registerHelper('location', function(){
//     return this.latlong;
// });
