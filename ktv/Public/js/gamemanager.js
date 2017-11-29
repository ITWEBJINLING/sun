'use strict';

$(function () {
    if (!location.hash) {
        location.href = location.pathname + '#add';
    }
    var tbody = $('tbody');
    $(window).on('hashchange', function () {
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $(location.hash + '-tab').addClass('active');
        if (location.hash == '#list') {
            $.get({
                url: '/ktv/index.php/gamemanage/show',
                dataType: 'json',
                success: function success(data) {
                    render(data);
                }
            });
        }
    });
    $(window).triggerHandler('hashchange');

    ////////////////////////插入/////////////////////////////////////
    $(':submit').on('click', function () {
        var form = $('form');
        var data = form.serialize();
        $.ajax({
            url: '/ktv/index.php/gamemanage/insert',
            data: data,
            success: function success(data) {
                if (data == 'ok') {
                    location.href = location.pathname + '#list';
                } else if (data == 'error') {
                    alert('插入失败');
                }
            }
        });
    });
    ////////////////////////删除/////////////////////////////////////
    tbody.on('click', '.del', function () {
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        $.ajax({
            url: '/ktv/index.php/gamemanage/delete',
            data: { id: id },
            success: function success(data) {
                if (data == 'ok') {
                    tr.remove();
                } else if (data == 'error') {
                    alert('删除失败');
                }
            }
        });
    });
    ////////////////////////修改/////////////////////////////////////
    tbody.on('blur', 'input', function () {
        var value = $(this).val();
        var type = $(this).closest('td').attr('type');
        var id = $(this).closest('tr').attr('id');
        $.ajax({
            url: "/ktv/index.php/gamemanage/update",
            data: { value: value, type: type, id: id },
            success: function success(data) {
                if (data == 'ok') {
                    alert('修改成功');
                } else if (data == 'error') {
                    alert('修改失败');
                }
            }
        });
    });

    function render(data) {
        tbody.empty();
        var str = '';
        $.each(data, function (index, value) {
            str += '<tr id="' + value['gid'] + '">\n                <td type="gid">' + value['gid'] + '</td>\n                <td type = \'gname\'><input type="text" value="' + value['gname'] + '" name="gname"></td>\n                <td type = \'type\'><input type="text" value="' + value['type'] + '" name="type"></td>\n                <td><a class="btn btn-default del">\u5220\u9664</a></td>\n               ';
        });
        tbody.html(str);
    }
});