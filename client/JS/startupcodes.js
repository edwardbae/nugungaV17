
Meteor.startup(function () {
    accountsUIBootstrap3.setLanguage('ko'); // for Korean
    Accounts.ui.config({
        passwordSignupFields:"USERNAME_AND_EMAIL"
    });

});
