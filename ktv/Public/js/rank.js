'use strict';

$(function () {
    var cont = $('.content');
    var datalist = void 0;
    $.ajax({
        url: '/ktv/index.php/rank/select',
        dataType: 'json',
        success: function success(data) {
            datalist = data;
            render(data);
        }
    });
    function render(data) {
        $('.count').text(data.length);
        cont.empty();
        $.each(data, function (index, value) {
            cont.html(function (i, v) {
                return v + ('\n                <li data="' + value.qid + '">\n                    <a href = "/ktv/index.php/singer/play?qid=' + value.qid + '">\n                        <div class="num"><img src="' + value.qthumb + '" alt=""></div>\n                        <div class="title">' + value.qname + '-' + value.gname + '<div class="time">' + value.qtime + '</div></div>\n                    </a>\n                    <div class="right">\n                        <div class="flag"></div>\n                        <div class="flag1"></div>\n                    </div>\n                </li>\n                ');
            });
        });
    }
});