var lastUpdated;
Session.setDefault('updated', new Date());

Template.postedGidoCard.helpers({
    posts: function(){
        return Posts.find({},{sort:{createdAt: -1 }});
    },
});


Template.allGidoPage.helpers({
    posts: function(){
        lastUpdated = Session.get('updated');
        return Posts.find({createdAt: { $lt: lastUpdated }},{sort:{createdAt: -1 }});
    },
});
