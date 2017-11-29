'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(function () {
    if (!location.hash) {
        location.href = location.pathname + '#add';
    }

    var imgBox = document.querySelector('.imgBox');
    var tbody = $('tbody');
    $(window).on('hashchange', function () {
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $('#thumb').val('');
        $('.imgBox').empty();
        $('.form')[0].reset();
        document.querySelector('.progress-bar').style.width = 0;
        $(location.hash + '-tab').addClass('active');
        if (location.hash == '#list') {
            $.get({
                url: '/ktv/index.php/singermanage/show',
                dataType: 'json',
                success: function success(data) {
                    render(data);
                }
            });
        }
    });
    $(window).triggerHandler('hashchange');
    /////////////////////////////////////////////////////////////////////////////////
    var upload = document.querySelector('#thumb');
    var image = document.querySelector('#image');
    upload.onchange = function () {
        var hidden = document.querySelector('input[type = hidden]');
        [].concat(_toConsumableArray(this.files)).forEach(function (element, index) {
            var type = ['jpg', 'png', 'jpeg'];
            var size = 5 * 1024 * 1024;
            if (!(type.includes(element.type.split('/')[1]) && element.size <= size)) {
                alert('请检查文件大小及类型');
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(element);
            reader.onload = function (e) {
                var images = new Image();
                images.src = e.target.result;
                images.width = 200;
                images.height = 200;
                imgBox.appendChild(images);

                var formdata = new FormData();
                formdata.append('file', element);
                var xml = new XMLHttpRequest();
                xml.upload.onprogress = function (e) {
                    document.querySelectorAll('.progress-bar')[index].style.width = e.loaded / e.total * 100 + '%';
                };
                xml.open('post', '/ktv/index.php/singermanage/upload', true);
                xml.send(formdata);
                xml.onload = function () {
                    hidden.value += xml.response;
                };
            };
        });
    };
    /////////////////////////////////////父级//////////////////////////////
    var select = $('select');
    $.ajax({
        url: '/ktv/index.php/singermanage/cateTree',
        dataType: 'json',
        success: function success(data) {
            catetree(data);
        }
    });

    ////////////////////////插入/////////////////////////////////////
    $(':submit').on('click', function () {
        /*  let data = form.serialize();*/
        var form = $('form');
        var data = new FormData($('form')[0]);
        $.ajax({
            url: '/ktv/index.php/singermanage/insert',
            method: 'post',
            processData: false,
            contentType: false,
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
            url: '/ktv/index.php/singermanage/delete',
            data: { gid: id },
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
        var gid = $(this).closest('tr').attr('id');
        $.ajax({
            url: "/ktv/index.php/singermanage/update",
            data: { value: value, type: type, gid: gid },
            success: function success(data) {
                if (data == 'ok') {
                    alert('修改成功');
                } else if (data == 'error') {
                    /*alert('修改失败');*/
                }
            }
        });
    });

    function render(data) {
        tbody.empty();
        var str = '';
        $.each(data, function (index, value) {
            str += '<tr id="' + value['gid'] + '">\n                    <td type="gid">' + value['gid'] + '</td>\n                    <td type = \'gname\'><input type="text" value="' + value['gname'] + '" name="gname"></td>\n                    <td type = \'gpy\'><input type="text" value="' + value['gpy'] + '" name="gpy"></td>\n                    <td type = \'gmv\'><input type="text" value="' + value['gmv'] + '" name="gmv"></td> \n                    <td type = \'gcount\'><input type="text" value="' + value['gcount'] + '" name="gcount"></td>\n                    <td type = \'cid\'><input type="text" value="' + value['cid'] + '" name="cid"></td>\n                    <td type = \'gthumb\'><img src="' + value['gthumb'] + '" alt="" width="50px" height="50px"></td>\n                    <td><a class="btn btn-default del">\u5220\u9664</a></td>\n                   ';
        });
        tbody.html(str);
    }
    function catetree(data) {
        select.empty();
        var str = '';
        $.each(data, function (index, value) {
            str += '\n                   <option value="' + value.cid + '">' + value.cname + '</option>\n                   ';
        });
        select.html(str);
    }
});