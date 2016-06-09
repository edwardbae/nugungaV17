var lastUpdated;
Session.setDefault('updated', new Date());

Template.postedGidoCard.helpers({
    posts: function(){
        return Posts.find({},{sort:{createdAt: -1 }});
    },
});


Template.allPostedGidoCard.helpers({
    allPosts: function(){
        lastUpdated = Session.get('updated');
        return Posts.find({toWhom:0, createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    },
});


Template.answeredGidoPage.helpers({
    answered: function(){
        return Posts.find({toWhom:0, checked:true},{sort:{createdAt: -1 }});
    },
});
