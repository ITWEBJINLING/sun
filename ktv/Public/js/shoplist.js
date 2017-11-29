'use strict';

$(function () {
    var data = JSON.parse(sessionStorage.getItem('chooselist'));
    var myScroll = new IScroll('.wrapper');
    var main = $('.main');
    var totalNum = $('.totalNum');
    var total = $('.total');
    var btn = $('.btn');
    render(data);
    myScroll = new IScroll('.wrapper', {
        click: true
    });
    totalNum.text(calcTotalNum());
    total.text(calcTotal());

    ////////////////////////////////////////购物车添加////////////////////////////////////
    main.on('click', '.plus', function () {
        var goods = JSON.parse($(this).closest('li').attr('data'));
        var v = data.filter(function (element) {
            return element.sid == goods.sid;
        });
        v[0].num++;
        $(this).prev().html(v[0].num);
        var totalPrice = $(this).closest('div').next().children('.totalPrice');
        totalNum.text(calcTotalNum());
        total.text(calcTotal());
        totalPrice.text((v[0].num * v[0].price.split('/')[0]).toFixed(2));
        sessionStorage.setItem('chooselist', JSON.stringify(data));
    });
    ////////////////////////////////////////购物车减少/////////////////////////
    main.on('click', '.subtract', function () {
        var goods = JSON.parse($(this).closest('li').attr('data'));
        var v = data.filter(function (ele) {
            return ele.sid == goods.sid;
        });
        if (v.length) {
            v[0].num--;
            if (!v[0].num) {
                data = data.filter(function (ele) {
                    return ele.sid != goods.sid;
                });
                $(this).closest('li').animate({ marginLeft: '-100%' }).queue(function () {
                    $(this).closest('li').remove();
                });
            }
            $(this).next().html(v[0].num);
        }
        totalNum.text(calcTotalNum());
        total.text(calcTotal());
        sessionStorage.setItem('chooselist', JSON.stringify(data));
        myScroll.refresh();
    });

    var obj = [];
    $.each(data, function (index, value) {
        obj.push({
            sid: value.sid,
            name: value.name,
            num: value.num,
            price: value.num * value.price.split('/')[0]
        });
    });
    obj = JSON.stringify(obj);
    /////////////////////////////////提交/////////////////////////////////////////
    btn.on('click', function () {

        $.ajax({
            url: '/ktv/index.php/shop/surelist',
            data: { obj: obj },
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/ktv/index.php/shop/sure';
                } else if (data == 'error') {
                    alert('操作错误');
                }
            }
        });
    });

    //////////////////////////////////////////函数部分//////////////////////////////////////
    function render(data) {
        main.empty();
        $.each(data, function (index, value) {
            main.html(function (i, v) {
                return v + ('\n            <li data=\'' + JSON.stringify(value) + '  \'>\n            <img src="' + value.thumb + '" alt="">\n            <div class="right">\n                <div class="title">' + value.name + '</div>\n                <div class="description">\n                    ' + value.description + '\n                    <div class="guige">' + value.guige + '</div>\n                </div>\n                <img src="/ktv/Public/img/fenge.png" alt="">\n                <div class="di">\n                    <div class="num">\n                        <a class="subtract"></a>\n                        <p>' + value.num + '</p>\n                        <a class="plus"></a>\n                    </div>\n                    <div class="price">\n                        <span class="totalPrice">' + (value.price.split('/')[0] * value.num).toFixed(2) + '</span>\n                        <img src="/ktv/Public/img/rmb.png" alt="">\n                    </div>\n                </div>\n            </div>\n        </li>\n            ');
            });
        });
    }
    function calcTotalNum() {
        var num = 0;
        data.forEach(function (element) {
            var price = element.price.split('/')[0];
            num += price * element.num;
        });
        return num.toFixed(2);
    }
    function calcTotal() {
        var num = 0;
        data.forEach(function (element) {
            num += element.num;
        });
        return num;
    }
});