$(function () {
    let head = $('.head>div')
    let wrapper = $('.wrapper')
    let winelist = $('.winelist>ul')
    let snacklist = $('.snacklist>ul')

    let myScroll = new IScroll('.winelist');
    let myScroll1 = new IScroll('.snacklist');
    head.on('click',function () {
        head.removeClass('active');
        $(this).addClass('active');
        wrapper.removeClass('active')
        wrapper.eq($(this).index()).addClass('active')
    })
    ///////////////////////////////购物车//////////////////////////////////////////
    let scroll = $('.scroll')
    let totalNum = $('.totalNum')
    let wineNum = $('.wineNum')
    let snackNum = $('.snackNum')
    let circle = $('.circle')
    let select = $('.select')
    let chooseList=[];
    let data = '';
    ////////////////////////////////////////购物车添加////////////////////////////////////
    scroll.on('click','.plus',function () {
        let goods = JSON.parse($(this).closest('li').attr('data'))
        let v = chooseList.filter(element=>element.sid == goods.sid)
        if(v.length){
            v[0].num++;
            $(this).prev().html(v[0].num)
        }else{
            goods.num = 1;
            $(this).prev().html(1)
            chooseList.push(goods)
        }
        totalNum.text(calcTotalNum());
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
        renderChooseList(chooseList.slice(0,2))
        isshow()
    })
    ////////////////////////////////////////购物车减少/////////////////////////
    scroll.on('click','.subtract',function () {
        let goods = JSON.parse($(this).closest('li').attr('data'));
        let v = chooseList.filter(ele=>ele.sid == goods.sid)
        if(v.length){
            v[0].num--
            if(!v[0].num){
                chooseList = chooseList.filter(ele=>ele.sid != goods.sid)
            }
            $(this).next().html(v[0].num)
        }
        totalNum.text(calcTotalNum());
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
        renderChooseList(chooseList.slice(0,2))
        isshow()
    })


    $('.right').on('click',function () {
        sessionStorage.setItem('chooselist',JSON.stringify(chooseList))
        location.href = '/ktv/index.php/shop/order'
    })
    //////////////////////////////////////////函数部分//////////////////////////////////////
    function isshow() {
        if($('span',select).length==2){
            circle.addClass('active');
        }else {
            circle.removeClass('active');
        }

    }
    function renderChooseList(data) {
        select.empty();
        for(let i=0;i<data.length;i++){
            $('<span>').html(`
            <p>${data[i].name}</p>
            <p>${data[i].num}${data[i].price.split('/')[1]}</p>
        `).appendTo(select)
        }

    }
    function calcTotalNum() {
        let num = 0
        chooseList.forEach(element=>{
            let price = element.price.split('/')[0];
            num += price*element.num;
        })
        return num.toFixed(2);
    }
    function calcWineNum() {
        let num = 0;
        chooseList.filter(ele=>ele.type==1).forEach(element=>{
           num += element.num;
        })
        return num;
    }
    function calcSnackNum() {
        let num = 0;
        chooseList.filter(ele=>ele.type==2).forEach(element=>{
            num += element.num;
        })
        return num;
    }



    /////////////////////////////////////////////////////////////////////////////////////////
    $.ajax({
        url:'/ktv/index.php/shop/select',
        dataType:'json',
        success:function (data) {
            let wineData = data.filter(element=>element.type==1)
            let snackData = data.filter(element=>element.type==2)
            render(winelist,wineData);
            render(snacklist,snackData);
            myScroll = new IScroll('.winelist');
            myScroll1 = new IScroll('.snacklist');
        }
    })

    function render(obj,data) {
        obj.empty();
        $.each(data,function (index,value) {
            obj.html(function (index,v) {
                return v+`
                <li data='${JSON.stringify(value)}  '>
               <div class="thumb"><img src="${value.thumb}" alt=""></div>
                <div class="input">
                <div class="top">
                    <div class="name">${value['name']}</div>
                    <div class="hot">${creatimg(value.hot)}</div>
                </div>
               
                 <div class="prize">￥${value['price']}</div>
                <div class="num">
                    <a class="subtract"></a>
                    <p>0</p>
                    <a class="plus"></a>
                </div>
                </div>
                </li>
               `
            })
        })
    }
    function creatimg(data) {
        let str = '';
        for(let i =0;i<data;i++){
           str += `<img src="/ktv/Public/img/sd20.png" alt="">`
        }
        return str;
    }

})