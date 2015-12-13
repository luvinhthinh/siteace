Websites = new Mongo.Collection("websites");

Websites.allow({
    insert: function(userId, doc){
        console.log('calling http');
        var result = HTTP.get(
            doc.url, 
            {}
        );
        var pos1 = result.content.indexOf('<title>');
        var pos2 = result.content.indexOf('</title>');
        var title = result.content.substring(pos1 + 7, pos2);
        doc.title = (pos1 != -1 && pos2 != -1) ? title : "No Title";
        console.log(pos1, pos2, title);
        
        var pos3 = result.content.indexOf("<meta name=\x22description\x22");
        var pos4 = result.content.indexOf('<meta', pos3+1);
        var desc = result.content.substring(pos3+34, pos4-2);
        doc.description = (pos3 != -1 && pos4 != -1) ? desc : "No description";
        console.log(pos3, pos4, desc);
        
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

