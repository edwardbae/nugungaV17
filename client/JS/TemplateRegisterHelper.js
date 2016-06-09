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
Template.registerHelper('truncateTitle', function(text, length){
    if (text.length>20) {
        var newText = text.substring(20, length) + "  ...";
        return new Spacebars.SafeString(newText);
    } else {
        return text;
    }
});
Template.registerHelper('truncateText', function(text, length){
    if (text.length>200) {
        var newText = text.substring(200, length) + "  .... [클릭하여 더보기]";
        return new Spacebars.SafeString(newText);
    } else {
        return text;
    }
});

//
//
// Template.registerHelper('location', function(){
//     return this.latlong;
// });
