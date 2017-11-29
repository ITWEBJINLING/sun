'use strict';

$(function () {
    var button = $('button');
    var form = $('form');
    var user = $('#user');
    var pass = $('#pass');
    ////////////////////////////////////验证/////////////////////////////////////
    $('input,textarea,select').on('blur', function () {
        var me = $(this);
        var datavalue = me.attr('data-validate');
        var value = me.val().replace(/^\s*|\s*$/g, '');
        if (datavalue) {
            var arr = datavalue.split(';');
            console.log(arr);
            me.closest('.form-group').find('.form-help').remove();
            var flag = true;
            for (var i = 0; i < arr.length; i++) {
                var type = arr[i].split(':');
                console.log(type);
                if (!dataValidate(type[0], value)) {
                    $('<div>').addClass('form-help').insertAfter(this).text(type[1]);
                    flag = false;
                    break;
                }
            }
        }
    });
    function dataValidate(type, value) {
        switch (type) {
            case 'require':
                return (/[^(^\s*|\s*$)]/.test(value)
                );
                break;
            case "user":
                return (/^[a-zA-Z]{3,8}$/.test(value)
                );
                break;
            case 'pass':
                return (/^\w{5,10}$/.test(value)
                );
                break;
            case 'qq':
                return (/^[1-9][0-9]{4,9}$/.test(value)
                );
                break;
        }
    }

    ////////////////////////////////登录/////////////////////////////////
    button.on('click', function () {
        $('input').trigger('blur');
        if ($('form').find('.form-help').length) {
            return;
        }
        // let data = {user:user.val(),pass:pass.val()};
        var data = form.serialize();
        /*let data = form.serializeArray();
        let obj={};
        $.each(data,function (i,v) {
            obj[v.name] = v.value;
        })*/

        $.ajax({
            url: '/ktv/index.php/login/check',
            data: data,
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/ktv/index.php/gamemanage';
                } else if (data == 'error') {
                    alert('fail');
                }
            }
        });
        return false;
    });
});