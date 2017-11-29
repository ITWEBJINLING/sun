$(function () {
    let button = $('button');
    let form = $('form');
    let user =$('#user');
    let pass =$('#pass');
    ////////////////////////////////////验证/////////////////////////////////////
    $('input,textarea,select').on('blur',function () {
        let me = $(this);
        let datavalue = me.attr('data-validate')
        let value = me.val().replace(/^\s*|\s*$/g,'')
        if(datavalue){
            let arr = datavalue.split(';')
            console.log(arr)
            me.closest('.form-group').find('.form-help').remove();
            let flag = true;
            for(let i=0;i<arr.length;i++){
                let type = arr[i].split(':')
                console.log(type)
                if(!dataValidate(type[0],value)){
                    $('<div>').addClass('form-help').insertAfter(this).text(type[1])
                    flag=false;
                    break;
                }
            }
        }
    })
    function dataValidate(type,value) {
        switch (type){
            case  'require':
                return /[^(^\s*|\s*$)]/.test(value);
                break;
            case "user":
                return /^[a-zA-Z]{3,8}$/.test(value);
                break;
            case 'pass':
                return /^\w{5,10}$/.test(value);
                break;
            case  'qq':
                return /^[1-9][0-9]{4,9}$/.test(value);
                break;
        }
    }


    ////////////////////////////////登录/////////////////////////////////
    button.on('click',function () {
        $('input').trigger('blur')
        if($('form').find('.form-help').length){
            return;
        }
        // let data = {user:user.val(),pass:pass.val()};
        let data = form.serialize();
        /*let data = form.serializeArray();
        let obj={};
        $.each(data,function (i,v) {
            obj[v.name] = v.value;
        })*/


        $.ajax({
            url:'/ktv/index.php/login/check',
            data:data,
            success:function (data) {
                if(data == 'ok'){
                   location.href='/ktv/index.php/gamemanage'
                }else if(data == 'error'){
                    alert('fail');
                }
            }
        })
        return false;
    })
})