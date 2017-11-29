'use strict';

$(function () {
    var head = $('.head>div');
    var wrapper = $('.wrapper');
    var winelist = $('.winelist>ul');
    var snacklist = $('.snacklist>ul');

    var myScroll = new IScroll('.winelist');
    var myScroll1 = new IScroll('.snacklist');
    head.on('click', function () {
        head.removeClass('active');
        $(this).addClass('active');
        wrapper.removeClass('active');
        wrapper.eq($(this).index()).addClass('active');
    });
    ///////////////////////////////购物车//////////////////////////////////////////
    var scroll = $('.scroll');
    var totalNum = $('.totalNum');
    var wineNum = $('.wineNum');
    var snackNum = $('.snackNum');
    var circle = $('.circle');
    var select = $('.select');
    var chooseList = [];
    var data = '';
    ////////////////////////////////////////购物车添加////////////////////////////////////
    scroll.on('click', '.plus', function () {
        var goods = JSON.parse($(this).closest('li').attr('data'));
        var v = chooseList.filter(function (element) {
            return element.sid == goods.sid;
        });
        if (v.length) {
            v[0].num++;
            $(this).prev().html(v[0].num);
        } else {
            goods.num = 1;
            $(this).prev().html(1);
            chooseList.push(goods);
        }
        totalNum.text(calcTotalNum());
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
        renderChooseList(chooseList.slice(0, 2));
        isshow();
    });
    ////////////////////////////////////////购物车减少/////////////////////////
    scroll.on('click', '.subtract', function () {
        var goods = JSON.parse($(this).closest('li').attr('data'));
        var v = chooseList.filter(function (ele) {
            return ele.sid == goods.sid;
        });
        if (v.length) {
            v[0].num--;
            if (!v[0].num) {
                chooseList = chooseList.filter(function (ele) {
                    return ele.sid != goods.sid;
                });
            }
            $(this).next().html(v[0].num);
        }
        totalNum.text(calcTotalNum());
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
        renderChooseList(chooseList.slice(0, 2));
        isshow();
    });

    $('.right').on('click', function () {
        sessionStorage.setItem('chooselist', JSON.stringify(chooseList));
        location.href = '/ktv/index.php/shop/order';
    });
    //////////////////////////////////////////函数部分//////////////////////////////////////
    function isshow() {
        if ($('span', select).length == 2) {
            circle.addClass('active');
        } else {
            circle.removeClass('active');
        }
    }
    function renderChooseList(data) {
        select.empty();
        for (var i = 0; i < data.length; i++) {
            $('<span>').html('\n            <p>' + data[i].name + '</p>\n            <p>' + data[i].num + data[i].price.split('/')[1] + '</p>\n        ').appendTo(select);
        }
    }
    function calcTotalNum() {
        var num = 0;
        chooseList.forEach(function (element) {
            var price = element.price.split('/')[0];
            num += price * element.num;
        });
        return num.toFixed(2);
    }
    function calcWineNum() {
        var num = 0;
        chooseList.filter(function (ele) {
            return ele.type == 1;
        }).forEach(function (element) {
            num += element.num;
        });
        return num;
    }
    function calcSnackNum() {
        var num = 0;
        chooseList.filter(function (ele) {
            return ele.type == 2;
        }).forEach(function (element) {
            num += element.num;
        });
        return num;
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    $.ajax({
        url: '/ktv/index.php/shop/select',
        dataType: 'json',
        success: function success(data) {
            var wineData = data.filter(function (element) {
                return element.type == 1;
            });
            var snackData = data.filter(function (element) {
                return element.type == 2;
            });
            render(winelist, wineData);
            render(snacklist, snackData);
            myScroll = new IScroll('.winelist');
            myScroll1 = new IScroll('.snacklist');
        }
    });

    function render(obj, data) {
        obj.empty();
        $.each(data, function (index, value) {
            obj.html(function (index, v) {
                return v + ('\n                <li data=\'' + JSON.stringify(value) + '  \'>\n               <div class="thumb"><img src="' + value.thumb + '" alt=""></div>\n                <div class="input">\n                <div class="top">\n                    <div class="name">' + value['name'] + '</div>\n                    <div class="hot">' + creatimg(value.hot) + '</div>\n                </div>\n               \n                 <div class="prize">\uFFE5' + value['price'] + '</div>\n                <div class="num">\n                    <a class="subtract"></a>\n                    <p>0</p>\n                    <a class="plus"></a>\n                </div>\n                </div>\n                </li>\n               ');
            });
        });
    }
    function creatimg(data) {
        var str = '';
        for (var i = 0; i < data; i++) {
            str += '<img src="/ktv/Public/img/sd20.png" alt="">';
        }
        return str;
    }
});