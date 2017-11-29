'use strict';

$(function () {
    var list = $('.list');
    var aside = $('.aside');
    var input = $('input');
    var datalist = [];
    var myScroll = new IScroll('.content');
    var id = location.search.slice(location.search.indexOf('=') + 1);
    $.ajax({
        url: '/ktv/index.php/singer/select',
        dataType: 'json',
        data: { cid: id },
        success: function success(data) {
            datalist = data;
            $('header>p').text(datalist[0].cname);
            render(data);
            myScroll = new IScroll('.content');
        }
    });
    ////////////////////////////////////////搜索//////////////////////////////////////////
    input.on('input', function () {
        var value = $.trim(this.value);
        var char = datalist.filter(function (ele) {
            return ele.gname.includes(value) || ele.gpy.includes(value);
        });
        render(char);
    });
    ////////////////////////////////////////函数////////////////////////////////////////////////////
    function render(data) {
        list.empty();
        aside.empty();
        var obj = {};
        $.each(data, function (index, value) {
            var first = value.gpy.charAt(0).toUpperCase();
            if (!obj[first]) {
                obj[first] = [];
            }
            obj[first].push(value);
        });
        var char = Object.keys(obj).sort();
        $.each(char, function (index, value) {
            aside.html(function (i, v) {
                return v + ('<li>' + value + '</li>');
            });
            $.each(obj[value], function (a, element) {
                list.html(function (i, v) {
                    return v + ('\n                 <li>\n                    <a href="/ktv/index.php/singer/song?gid=' + element.gid + '">\n                    <img src="' + element.gthumb + '" alt="">\n                    <div class="name">' + element.gname + '\uFF08' + element.gcount + '\uFF09</div>\n                    </a>\n                </li>\n                ');
                });
            });
        });
    }
});