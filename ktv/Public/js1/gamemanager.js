$(function () {
    if(!location.hash){
        location.href = location.pathname+'#add';
    }
    let tbody= $('tbody');
    $(window).on('hashchange',function () {
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $(location.hash +'-tab').addClass('active');
        if(location.hash == '#list'){
            $.get({
                url:'/ktv/index.php/gamemanage/show',
                dataType:'json',
                success:function (data) {
                    render(data)
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');


////////////////////////插入/////////////////////////////////////
    $(':submit').on('click',function () {
        let form = $('form');
        let data = form.serialize();
        $.ajax({
            url:'/ktv/index.php/gamemanage/insert',
            data:data,
            success:function (data) {
                if(data =='ok'){
                    location.href = location.pathname + '#list';
                }else if(data== 'error'){
                    alert('插入失败');
                }
            }
        })
    })
    ////////////////////////删除/////////////////////////////////////
    tbody.on('click','.del',function () {
        let tr =  $(this).closest('tr');
        let id = tr.attr('id');
        $.ajax({
            url:'/ktv/index.php/gamemanage/delete',
            data:{id:id},
            success:function (data) {
                if(data =='ok'){
                    tr.remove();
                }else if(data== 'error'){
                    alert('删除失败');
                }
            }
        })

    })
    ////////////////////////修改/////////////////////////////////////
    tbody.on('blur','input',function () {
        let value = $(this).val();
        let type = $(this).closest('td').attr('type');
        let id = $(this).closest('tr').attr('id');
        $.ajax({
            url:"/ktv/index.php/gamemanage/update",
            data:{value,type,id},
            success:function (data) {
                if(data =='ok'){
                    alert('修改成功');
                }else if(data== 'error'){
                    alert('修改失败');
                }
            }
        })
    })


    function render(data) {
        tbody.empty();
        let str = '';
        $.each(data,function (index,value) {
            str +=`<tr id="${value['gid']}">
                <td type="gid">${value['gid']}</td>
                <td type = 'gname'><input type="text" value="${value['gname']}" name="gname"></td>
                <td type = 'type'><input type="text" value="${value['type']}" name="type"></td>
                <td><a class="btn btn-default del">删除</a></td>
               `
        })
        tbody.html(str);
    }
})