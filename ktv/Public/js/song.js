'use strict';

$(function () {
    var data = location.search.slice(location.search.indexOf('=') + 1);
    var cont = $('.content');
    var myScroll = new IScroll('.wrapper',{click:true});
    $.ajax({
        url: '/ktv/index.php/singer/songlist',
        dataType: 'json',
        data: { gid: data },
        success: function success(data) {
            console.log(data);
            $('header>p').text(data[0].gname);
            $('.name>span').eq(0).text(data[0].gname);
            $('.name>span').eq(1).text(data[0].cname);
            $('.image>img').attr('src', data[0].gthumb);
            render(data[1]);
            myScroll.refresh();
        }
    });
    cont.on('webkitTransitionEnd', '.flag', function () {
        $('.tips').css('display', 'none');
    },false);
    cont.on('click', '.flag', function () {
        var me = $(this);
        if ($(this).hasClass('rotate')) {
            $(this).removeClass('rotate');
            var collect = JSON.parse($(this).closest('li').attr('data')).qid;
            $.ajax({
                url: '/ktv/index.php/singer/collectDel',
                data: { collect: collect },
                success: function success(data) {
                    me.prev().css('display', 'block').text('取消收藏');
                    setTimeout( function () {
                        me.prev().css('display', 'none')
                    },800)
                }
            });
        } else {
            $(this).addClass('rotate');
            var _collect = JSON.parse($(this).closest('li').attr('data')).qid;
            $.ajax({
                url: '/ktv/index.php/singer/collect',
                data: { collect: _collect },
                success: function success(data) {
                    me.prev().css('display', 'block').text('收藏成功');
                    setTimeout( function () {
                        me.prev().css('display', 'none')
                    },800)
                }
            });
        }
    });

    function render(data) {
        cont.empty();
        $.each(data, function (index, value) {
            cont.html(function (i, v) {
                return v + ('\n                <li data = ' + JSON.stringify(value) + '>\n                    <a href="/ktv/index.php/singer/play?qid=' + value.qid + '">\n                        <div class="num">' + (index + 1) + '</div>\n                        <div class="title">' + value.qname + '<div class="time">' + value.qtime + '</div></div>\n                    </a>\n                        <div class="tips"></div>\n                        <div class="flag"></div>\n                </li>\n               ');
            });
            if (value.collect) {
                $('.flag', cont).eq(index).addClass('rotate');
            }
        });
    }
});