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
        $('.form-control').val('');
        document.querySelector('.progress-bar').style.width =0;
        $(location.hash +'-tab').addClass('active');
        if(location.hash == '#list'){
            $.get({
                url:'/ktv/index.php/shopmanage/show',
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
        // 上传的文件   list
       /* let data = this.files[0];
        // 读取
        let reader=new FileReader();
        // let image=new Image();
        reader.readAsDataURL(data);
        reader.onload=function (e) {
            // 当前图片，可直接显示
            image.src=e.target.result;
            // $('#image').parent().after(image);
            let formdata = new FormData();
            formdata.append('file',data);
            let xml = new XMLHttpRequest();
            xml.open('post','/ktv/index.php/shopmanage/upload',true);
            xml.send(formdata);
            xml.onload = function () {
                console.log(xml.response)
                $(':hidden').val(xml.response)
            }
        }*/
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
               console.log(formdata)
               let xml = new XMLHttpRequest();
                xml.upload.onprogress = function (e) {
                    document.querySelectorAll('.progress-bar')[index].style.width =
                        `${e.loaded/e.total *100 }%`
                }
               xml.open('post','/ktv/index.php/shopmanage/upload',true);
               xml.send(formdata);
               xml.onload = function () {
                    hidden.value += xml.response
               }
            }

        })

    }

////////////////////////插入/////////////////////////////////////
    $(':submit').on('click',function () {
        /*  let data = form.serialize();*/
        let form = $('form');
        let data = new FormData($('form')[0]);
        $.ajax({
            url:'/ktv/index.php/shopmanage/insert',
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
            url:'/ktv/index.php/shopmanage/delete',
            data:{sid:id},
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
        let sid = $(this).closest('tr').attr('id');
        $.ajax({
            url:"/ktv/index.php/shopmanage/update",
            data:{value,type,sid},
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
            str +=`<tr id="${value['sid']}">
                    <td type="sid">${value['sid']}</td>
                    <td type = 'type'><input type="text" value="${value['type']}" name="type"></td>
                    <td type = 'thumb'><img src="${value['thumb']}" alt="" width="50px" height="50px"></td>
                    <td type = 'name'><input type="text" value="${value['name']}" name="name"></td>
                    <td type = 'hot'><input type="text" value="${value['hot']}" name="hot"></td>
                    <td type = 'price'><input type="text" value="${value['price']}" name="price"></td>
                    <td type = 'description'><input type="text" value="${value['description']}" name="description"></td>
                    <td type = 'guige'><input type="text" value="${value['guige']}" name="guige"></td>
                    <td><a class="btn btn-default del">删除</a></td>
                   `
        })
        tbody.html(str);
    }
})