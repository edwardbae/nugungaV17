// Template.registerHelper('getProfileImg', function(userId){
//     var imgUrl=UserImages.findOne({userId: userId}).image;
//     return imgUrl;
// });

Template.registerHelper('formattedDate', function(){
    return moment(this.createdAt).fromNow();
});
Template.registerHelper('momentDate', function(){
    return moment(this.createdAt).format('MMMM Do YYYY');
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

Template.registerHelper('checkAnonymous', function(anonymous, username, userId){
    if (anonymous === "0") {
        return username;
    } else {
        return "익명의 기도";
    }
});

Template.registerHelper('checkAnonymousLink', function(anonymous){
    if (anonymous === "0") {
        return 0;
    } else {
        return 1;
    }
});

Template.registerHelper('findUsername', function(tempUserId){
    tempObj = Meteor.users.findOne({"_id":tempUserId}).username;
    return tempObj;
    // return tempObj.username
});

Template.registerHelper('checkToWhom', function(toWhom){
    if (toWhom === "0") {
        return "모든성도"
    } else if (toWhom === "1") {
        return "기도친구"
    } else {
        return "나에게만"
    }
});

Template.registerHelper('checkComment', function(commentId){
    tempObj = Posts.findOne({"_id":commentId});
    if (!tempObj.comments) {
        return 0;
    } else {
        return tempObj.comments.length;
    }
});
