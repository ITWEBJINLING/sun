$(function () {
    let data = JSON.parse(sessionStorage.getItem('chooselist'));
    let myScroll = new IScroll('.wrapper');
    let main = $('.main')
    let totalNum = $('.totalNum')
    let total = $('.total')
    let btn = $('.btn')
    render(data)
    myScroll = new IScroll('.wrapper',{
        click:true,
    });
    totalNum.text(calcTotalNum())
    total.text(calcTotal())


    ////////////////////////////////////////购物车添加////////////////////////////////////
    main.on('click','.plus',function () {
        let goods = JSON.parse($(this).closest('li').attr('data'))
        let v = data.filter(element=>element.sid == goods.sid)
        v[0].num++;
        $(this).prev().html(v[0].num)
        let totalPrice = $(this).closest('div').next().children('.totalPrice')
        totalNum.text(calcTotalNum());
        total.text(calcTotal())
        totalPrice.text((v[0].num*v[0].price.split('/')[0]).toFixed(2))
        sessionStorage.setItem('chooselist',JSON.stringify(data))
    })
    ////////////////////////////////////////购物车减少/////////////////////////
    main.on('click','.subtract',function () {
        let goods = JSON.parse($(this).closest('li').attr('data'));
        let v = data.filter(ele=>ele.sid == goods.sid)
        if(v.length){
            v[0].num--
            if(!v[0].num){
                data = data.filter(ele=>ele.sid != goods.sid)
                $(this).closest('li').animate({marginLeft:'-100%'}).queue(
                    function () {
                        $(this).closest('li').remove()
                    }
                )
            }
            $(this).next().html(v[0].num)
        }
        totalNum.text(calcTotalNum());
        total.text(calcTotal())
        sessionStorage.setItem('chooselist',JSON.stringify(data))
        myScroll.refresh();
    })



    let obj=[];
    $.each(data,function (index,value) {
        obj.push({
            sid:value.sid,
            name:value.name,
            num:value.num,
            price:value.num*value.price.split('/')[0],
        })
    })
    obj = JSON.stringify(obj)
    /////////////////////////////////提交/////////////////////////////////////////
    btn.on('click',function () {

        $.ajax({
            url:'/ktv/index.php/shop/surelist',
            data:{obj:obj},
            method:'post',
            success:function (data) {
              if(data=='ok'){
                  location.href = '/ktv/index.php/shop/sure'
              }else if(data=='error'){
                  alert('操作错误')
              }
            }
        })


    })


    //////////////////////////////////////////函数部分//////////////////////////////////////
    function render(data) {
        main.empty();
        $.each(data,function (index,value) {
            main.html(function (i,v) {
                return v+`
            <li data='${JSON.stringify(value)}  '>
            <img src="${value.thumb}" alt="">
            <div class="right">
                <div class="title">${value.name}</div>
                <div class="description">
                    ${value.description}
                    <div class="guige">${value.guige}</div>
                </div>
                <img src="/ktv/Public/img/fenge.png" alt="">
                <div class="di">
                    <div class="num">
                        <a class="subtract"></a>
                        <p>${value.num}</p>
                        <a class="plus"></a>
                    </div>
                    <div class="price">
                        <span class="totalPrice">${(value.price.split('/')[0]*value.num).toFixed(2)}</span>
                        <img src="/ktv/Public/img/rmb.png" alt="">
                    </div>
                </div>
            </div>
        </li>
            `
            })
        })
    }
    function calcTotalNum() {
        let num = 0
        data.forEach(element=>{
            let price = element.price.split('/')[0];
            num += price*element.num;
        })
        return num.toFixed(2);
    }
    function calcTotal() {
        let num = 0;
        data.forEach(element=>{
            num += element.num;
        })
        return num;
    }

})