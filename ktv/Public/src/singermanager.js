$(function () {
    if(!location.hash){
        location.href = location.pathname+'#add';
    }

    let imgBox = document.querySelector('.imgBox');
    let tbody= $('tbody');
    $(window).on('hashchange',function () {
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $('#thumb').val('')
        $('.imgBox').empty();
        $('.form')[0].reset();
        document.querySelector('.progress-bar').style.width =0;
        $(location.hash +'-tab').addClass('active');
        if(location.hash == '#list'){
            $.get({
                url:'/ktv/index.php/singermanage/show',
                dataType:'json',
                success:function (data) {
                    render(data)
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');
/////////////////////////////////////////////////////////////////////////////////
    let upload=document.querySelector('#thumb');
    let image=document.querySelector('#image');
    upload.onchange=function () {
        let hidden = document.querySelector('input[type = hidden]');
        [...this.files].forEach((element,index)=>{
            let type = ['jpg','png','jpeg'];
            let size = 5*1024*1024;
            if(!(type.includes(element.type.split('/')[1]) && element.size<=size)){
                alert('请检查文件大小及类型');
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(element);
            reader.onload=function (e) {
                let images=new Image();
                images.src=e.target.result;
                images.width = 200;
                images.height = 200;
               imgBox.appendChild(images);

               let formdata = new FormData();
               formdata.append('file',element);
               let xml = new XMLHttpRequest();
                xml.upload.onprogress = function (e) {
                    document.querySelectorAll('.progress-bar')[index].style.width =
                        `${e.loaded/e.total *100 }%`
                }
               xml.open('post','/ktv/index.php/singermanage/upload',true);
               xml.send(formdata);
               xml.onload = function () {
                    hidden.value += xml.response
               }
            }

        })

    }
    /////////////////////////////////////父级//////////////////////////////
    let select= $('select');
    $.ajax({
        url:'/ktv/index.php/singermanage/cateTree',
        dataType:'json',
        success:function (data) {
            catetree(data)
        }
    })

////////////////////////插入/////////////////////////////////////
    $(':submit').on('click',function () {
        /*  let data = form.serialize();*/
        let form = $('form');
        let data = new FormData($('form')[0]);
        $.ajax({
            url:'/ktv/index.php/singermanage/insert',
            method:'post',
            processData:false,
            contentType:false,
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
            url:'/ktv/index.php/singermanage/delete',
            data:{gid:id},
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
        let gid = $(this).closest('tr').attr('id');
        $.ajax({
            url:"/ktv/index.php/singermanage/update",
            data:{value,type,gid},
            success:function (data) {
                if(data =='ok'){
                    alert('修改成功');
                }else if(data== 'error'){
                    /*alert('修改失败');*/
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
                    <td type = 'gpy'><input type="text" value="${value['gpy']}" name="gpy"></td>
                    <td type = 'gmv'><input type="text" value="${value['gmv']}" name="gmv"></td> 
                    <td type = 'gcount'><input type="text" value="${value['gcount']}" name="gcount"></td>
                    <td type = 'cid'><input type="text" value="${value['cid']}" name="cid"></td>
                    <td type = 'gthumb'><img src="${value['gthumb']}" alt="" width="50px" height="50px"></td>
                    <td><a class="btn btn-default del">删除</a></td>
                   `
        })
        tbody.html(str);
    }
    function catetree(data) {
        select.empty();
        let str = '';
        $.each(data,function (index,value) {
            str +=`
                   <option value="${value.cid}">${value.cname}</option>
                   `
        })
        select.html(str);
    }
})