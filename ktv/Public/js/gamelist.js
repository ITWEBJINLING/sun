'use strict';

$(function () {
    var main = $('.main');
    var change = $('.change');
    var type = location.search.slice(-1);
    main.on('click', 'li', function () {
        $(this).css('transform', 'rotateY(360deg)');
        if ($('.main>li.active').length == 2) {
            $('.change').addClass('active');
        }
    });
    main.on('webkitTransitionEnd', 'li', function () {
        $(this).addClass('active');
    });

    /////////////////////////////////////////分页////////////////////////////
    var pages = 1;
    $('header').on('click', '.change.active', function () {
        pages++;
        $.ajax({
            url: '/ktv/index.php/game/change',
            data: { type: type, pages: pages },
            dataType: 'json',
            success: function success(data) {
                if (data.length == 0) {
                    alert('没有了');
                    return;
                }
                render(data);
            }
        });
    });

    //////////////////////////////////按钮////////////////////////////////
    var btn = $('button');
    btn.on('click', function () {
        pages = 1;
        $('button').removeClass('active');
        $(this).addClass('active');
        type = $(this).attr('id');
        $.ajax({
            url: '/ktv/index.php/game/change',
            dataType: 'json',
            data: { type: type, pages: 1 },
            success: function success(data) {
                render(data);
            }
        });
    });
    $(btn[0]).triggerHandler('click');
    ////////////////////////////////////函数/////////////////////////////
    function render(data) {
        main.empty();
        $('.change').removeClass('active');
        data.forEach(function (v) {
            $('<li>').html(v.gname).prependTo(main);
        });
    }
});