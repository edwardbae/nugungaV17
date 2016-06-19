// closes bootstrap collapiseble menu on clicking outside menu
$(document).click(function(e) {
    if (!$(e.target).is('a')) {
        $('.collapse').collapse('hide');
    }
});
//closes bootstrap collapsible menu on clicking a link
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});



//add active class to highlight
// must comeback and fix this
// $(function(){
//     var tempVar = Session.get('pageTitle')
//     if (tempVar==='나의 기도') {
//         $("#thisIsmyPrayer").addClass("active");
//     }
// });

// $(function () {
//     $("#navbar a:contains('aaa')").parent().addClass('active');
//     $("#navbar a:contains('친구들의 기도들')").parent().addClass('active');
//  });
