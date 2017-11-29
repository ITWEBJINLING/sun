'use strict';

$(function () {
    var cont = $('.content');
    $.ajax({
        url: '/ktv/index.php/singer/show',
        dataType: 'json',
        success: function success(data) {
            render(data);
        }
    });
    //////////////////////////////////函数////////////////////////////////////////////////////
    function render(data) {
        cont.empty();
        cont.html('\n      <a href = "/ktv/index.php/singer/singerlist?cid=' + data[0]['cid'] + '" class="p1">\n        <img src="' + data[0]['cthumb'] + '" alt="">\n        <div class="mask6">\n            <span></span>\n            <p>' + data[0]['cname'] + '</p>\n            <span></span>\n        </div>\n    </a>\n    <a href = "/ktv/index.php/singer/singerlist?cid=' + data[1]['cid'] + '" class="p2">\n        <img src="' + data[1]['cthumb'] + '" alt="">\n        <div class="mask2">' + data[1]['cname'] + '</div>\n    </a>\n    <a href = "/ktv/index.php/singer/singerlist?cid=' + data[2]['cid'] + '" class="p3">\n        <img src="' + data[2]['cthumb'] + '" alt="">\n        <div class="mask3">' + data[2]['cname'] + '</div>\n    </a>\n    <a href = "/ktv/index.php/singer/singerlist?cid=' + data[3]['cid'] + '" class="p4">\n        <img src="' + data[3]['cthumb'] + '" alt="">\n        <div class="mask4">' + data[3]['cname'] + '</div>\n    </a>\n    <a href = "/ktv/index.php/singer/singerlist?cid=' + data[4]['cid'] + '" class="p5">\n        <img src="' + data[4]['cthumb'] + '" alt="">\n        <div class="mask6">\n            <span></span>\n            <p>' + data[4]['cname'] + '</p>\n            <span></span>\n        </div>\n    </a>\n    <a href = "/ktv/index.php/singer/singerlist?cid=' + data[5]['cid'] + '" class="p6">\n        <img src="' + data[5]['cthumb'] + '" alt="">\n        <div class="mask6">\n            <span></span>\n            <p>' + data[5]['cname'] + '</p>\n            <span></span>\n        </div>\n    </a>\n        ');
    }
});