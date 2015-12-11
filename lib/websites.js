Websites = new Mongo.Collection("websites");

Websites.allow({
    insert: function(userId, doc){
        return (Meteor.user() && doc.url && doc.title && doc.description);
    },
    update: function(userId, doc){
        return Meteor.user();
    }
});


  WebsiteIndex = new EasySearch.Index({
    collection: Websites,
    fields: ['title', 'url', 'description'],
    engine: new EasySearch.MongoDB()
  });

