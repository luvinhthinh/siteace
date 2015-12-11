/// routing
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('navbar', {
        to:"navbar"
    });
    this.render('application', {
        to:"main"
    });
});

Router.route('/url/:_id', function () {
    this.render('navbar', {
        to:"navbar"
    });
    
    this.render('comment', {
        to:"comment",
        data:function(){
            return Websites.findOne({_id:this.params._id});
        }
    });
    
    this.render('', {
        to:"main"
    });
}); 

Router.route('/search', function () {
    this.render('navbar', {
        to:"navbar"
    });
    this.render('', {
        to:"main"
    });
    this.render('searchBox', {
        to:"main"
    });
    this.render('', {
        to:"comment"
    });
});


/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function(){
        return Websites.find({}, {sort: {rate: -1}});
    }
});

Template.searchBox.helpers({
  websiteIndex: () => WebsiteIndex
});


/////
// template events
/////

Template.website_item.events({
    "click .js-upvote": function (event) {
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        console.log("Up voting website with id " + website_id);
        // put the code in here to add a vote to a website!
        Websites.update({_id: website_id}, {$inc : {rate: 1}});

        return false;// prevent the button from reloading the page
    },
    "click .js-downvote": function (event) {

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        console.log("Down voting website with id " + website_id);

        // put the code in here to remove a vote from a website!
        Websites.update({_id: website_id}, {$inc : {rate: -1}});

        return false;// prevent the button from reloading the page
    }
});

Template.website_form.events({
    "click .js-toggle-website-form": function (event) {
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function (event) {

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        console.log("The url they entered is: " + url);

        if (Meteor.user()){
            Websites.insert({
                title:event.target.title.value,
                url:event.target.url.value,
                description:event.target.description.value,
                createdOn:new Date(),
                rate:0
            });
        }
        $("#website_form").modal('hide');

        return false;// stop the form submit from reloading the page

    }
});


/// accounts config
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});
///

/// comment config
Comments.ui.config({
    template: 'bootstrap' // or ionic, semantic-ui
});
///