$.getScript('js/url.min.js');

var nav, logo, logoHeight, logoImg, logoImgHeight;
var isReady = false;
var d = document;

// HEADER ANIMATION
$(window).scroll(function () {

    if ($(this).scrollTop() > 100) {
        if ($('#arrow-up').is(':hidden')) {
            $('#arrow-up').css({
                opacity: 1
            }).fadeIn('slow');
        }
    } else {
        $('#arrow-up').stop(true, false).fadeOut('fast');
    }

    if (isReady) {
        var top = $(this).scrollTop();
        var isAnimated = false;
        if ($(window).width() > 768) {
            if (top >= 1) {
                if (isAnimated)
                    return false;
                else {
                    nav.animate({
                        'top': '-32px'
                    }, 'fast');
                    logo.animate({
                        'height': '64',
                        'width': '80'
                    }, 'fast');
                    logoImg.animate({
                        'height': '45',
                        'margin-top': '10'
                    }, 'fast');
                    isAnimated = true;
                }
            } else {
                nav.stop(true);
                logo.stop(true);
                logoImg.stop(true);

                nav.animate({
                    'top': '0'
                }, 'fast');
                logo.animate({
                    'height': logoHeight,
                    'width': '130'
                }, 'fast');
                logoImg.animate({
                    'height': logoImgHeight,
                    'margin-top': '15'
                }, 'fast');
            }
        } else {
            CheckHeaderAnim();
        }
    }
});

$(function () {

    isReady = true;
    nav = $('#navigation');
    logo = $('#logo');
    logoHeight = $('#logo').height();

    logoImg = $('#logo img');
    logoImgHeight = logoImg.height();

    if ($(window).width() <= 768)
        CheckHeaderAnim();
});

function CheckHeaderAnim() {
    nav.stop(true);
    logo.stop(true);
    logoImg.stop(true);

    nav.animate({
        'top': '0'
    }, 'fast');
    logo.animate({
        'height': '74',
        'width': '80'
    }, 'fast');
    logoImg.animate({
        'height': '45',
        'margin-top': '10'
    }, 'fast');
}