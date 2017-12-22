$(document).ready(function() {

    $('nav a').click(function(e) {
        if ($($(this).attr('href')).length > 0) {
            $.scrollTo($($(this).attr('href')), {duration : 500, offset: -110});
            e.preventDefault();
        }
    });

    $(window).on('load resize scroll', function() {
        var curScroll = $(window).scrollTop();
        if (curScroll > 130) {
            $('nav').addClass('fixed');
        } else {
            $('nav').removeClass('fixed');
        }
    });

});