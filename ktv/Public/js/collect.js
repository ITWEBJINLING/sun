'use strict';

$(function () {
    var cont = $('.content');
    var datalist = void 0;
    $.ajax({
        url: '/ktv/index.php/singer/collectSelect',
        dataType: 'json',
        success: function success(data) {
            datalist = data;
            render(data);
        }
    });

    cont.on('click', '.flag', function () {
        var me = $(this);
        var collect = me.closest('li').attr('data');
        $.ajax({
            url: '/ktv/index.php/singer/collectDel',
            data: { collect: collect },
            success: function success(data) {
                me.closest('li').animate({ marginLeft: '-100%' }).queue(function () {
                    me.closest('li').remove();
                });
                $('.count').text(datalist.length - 1);
            }
        });
    });
    cont.on('click', '.flag1', function () {
        var qid = $(this).closest('li').attr('data');
        var index = 0;
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].qid == qid) {
                index = i;
            }
        }
        datalist.unshift(datalist.splice(index, 1)[0]);
        render(datalist);
    });

    function render(data) {
        $('.count').text(data.length);
        cont.empty();
        $.each(data, function (index, value) {
            cont.html(function (i, v) {
                return v + ('\n                <li data="' + value.qid + '">\n                    <a href = "/ktv/index.php/singer/play?qid=' + value.qid + '">\n                        <div class="num"><img src="' + value.qthumb + '" alt=""></div>\n                        <div class="title">' + value.qname + '<div class="time">' + value.qtime + '</div></div>\n                    </a>\n                    <div class="right">\n                        <div class="flag"></div>\n                        <div class="flag1"></div>\n                    </div>\n                </li>\n                ');
            });
        });
    }
});