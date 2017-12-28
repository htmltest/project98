$(document).ready(function() {

    $('nav a, .mobile-menu ul li a').click(function(e) {
        $('html').removeClass('mobile-menu-open');
        if ($($(this).attr('href')).length > 0) {
            $.scrollTo($($(this).attr('href')), {duration : 500, offset: -80});
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

        if (curScroll > 0) {
            $('.intro-scroll').fadeOut();
        } else {
            $('.intro-scroll').fadeIn();
        }
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

    if ($(window).width() > 1199) {
        $('.teaser').parallaxBackground();
    } else {
        $('[data-parallax]').removeAttr('data-parallax style');
    }

    $('.mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.mobile-menu').length == 0) {
            $('html').removeClass('mobile-menu-open');
        }
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

});

function windowOpen(linkWindow, dataWindow, callbackWindow) {
    if (!$('html').hasClass('window-open')) {
        var curScroll = $(window).scrollTop();
        $('.wrapper').data('curScroll', curScroll);
        $('.wrapper-inner').css({'top': -curScroll});
    }

    $('html').addClass('window-open');

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        $('.window-container').removeClass('window-container-load');

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window-close').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('.wrapper-inner').css({'top': 'auto'});
    }
}