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

        $('nav a').each(function() {
            var curBlock = $(this).attr('href');
            if ($(curBlock).length > 0 && $(curBlock).offset().top < (curScroll + $(window).height())) {
                $('nav li.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        });
        var curWidth = $('nav ul').offset().left;
        if ($('nav li.active').length > 0) {
            curWidth = $('nav li.active').offset().left + $('nav li.active').width();
        }
        $('.nav-line').css({'width': curWidth});
    });

    $('.up-link').click(function(e) {
        $.scrollTo(0, {duration : 500});
        e.preventDefault();
    });

    $(window).on('load resize scroll', function() {
        if ($(window).scrollTop() > $(window).height()) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }
    });

});