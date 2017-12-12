'use strict';

$(function () {
    var a = $('.a');
    var b = $('.b');
    var c = $('.c');
    var circle = $("div[class*='circle']");
    a.animate({ bottom: 1.8 + 'rem' }, 1000);
    b.delay(60).animate({ bottom: 1 + 'rem' }, 1000);
    c.delay(120).animate({ bottom: 0 + 'rem' }, 1000);
    $('.title').delay(130).animate({ bottom: 5.5 + 'rem' }, 1000);
    $('.star1').delay(130).animate({ bottom: -1.1 + 'rem' }, 1000);
    $('.star2').delay(130).animate({ bottom: -1.3 + 'rem' }, 1200);
    $('.star3').delay(130).animate({ bottom: -1.5 + 'rem' }, 1400);
    circle.delay(140).animate({ opacity: 1 }, 2000);
    setInterval(fn, 3000);
    function fn() {
        for (var i = 1; i < 5; i++) {
            var rights = -Math.random() * 4 - 4;
            var tops = -Math.random() * 2 - 4;
            var img = $('<img>').attr('src', 'img/l' + i + '.png');
            var divs = $('<div>').addClass('yu').css({ position: 'absolute', top: tops + 'rem', right: rights + 'rem' }).append(img).delay(200 * i).animate({ right: '100%', top: '100%' }, 4000).queue(function () {
                $(this).remove();
            });
            divs.appendTo($('body'));
        }
    }
    var flag = true;
    $('.next').on('click', function () {
        if (flag) {
            $('.second').css({ opacity: 1, transform: 'translateY(-100%)' });
            $('.bottom').css({ opacity: 1 });
            $('.content>img').css({ transform: 'scale(1)' });
            $('.name').delay(1000).animate({ left: 0 }, 1000);
            $('p').delay(2000).animate({ left: 0 }, 1000);
        } else {
            $('.second').css({ opacity: 0, transform: 'translateY(0)' });
            $('.bottom').css({ opacity: 0 });
            $('.content>img').css({ transform: 'scale(0)' });
            $('.name').animate({ left: '-100%' }, 1000);
            $('p').animate({ left: '-180%' }, 1000);
        }
        flag = !flag;
    });
});