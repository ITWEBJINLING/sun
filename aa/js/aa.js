'use strict';

$(function () {
    var a = $('.a');
    var b = $('.b');
    var c = $('.c');
    var circle = $("div[class*='circle']");
    a.animate({ bottom: 1.8 + 'rem' }, 1000);
    b.animate({ bottom: 1 + 'rem' }, 1000).delay(60);
    c.animate({ bottom: 0 + 'rem' }, 1000).delay(120);
    $('.title').animate({ bottom: 5.5 + 'rem' }, 1000).delay(130);
    $('.star1').animate({ bottom: -1.1 + 'rem' }, 1000).delay(130);
    $('.star2').animate({ bottom: -1.3 + 'rem' }, 1200).delay(130);
    $('.star3').animate({ bottom: -1.5 + 'rem' }, 1400).delay(130);
    circle.animate({ opacity: 1 }, 2000).delay(140);
    setInterval(fn,3000)
    function fn() {
        for (var i = 1; i < 5; i++) {
            var rights = -Math.random() * 4 - 4;
            var tops = -Math.random() * 2 - 4;
            var img = $('<img>').attr('src', 'img/l' + i + '.png');
            var divs = $('<div>').addClass('yu').css({ position: 'absolute', top: tops + 'rem', right: rights + 'rem' }).append(img).delay(200 * i).animate({ right: '100%', top: '100%' }, 3000).queue(function () {
                $(this).remove();
            });
            divs.appendTo($('body'));
        }
    }
});