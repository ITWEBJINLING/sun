$(function () {
    let cont = $('.content')
    let datalist ;
    $.ajax({
        url:'/ktv/index.php/singer/collectSelect',
        dataType:'json',
        success:function (data) {
            datalist = data;
            render(data)
        }
    })

    cont.on('click','.flag',function () {
        let me = $(this)
        let collect = me.closest('li').attr('data');
        $.ajax({
            url:'/ktv/index.php/singer/collectDel',
            data:{collect},
            success:function (data) {
                me.closest('li').animate({marginLeft:'-100%'}).queue(
                    function () {
                        me.closest('li').remove()
                    }
                );
                $('.count').text(datalist.length-1)
            }
        })

    })
    cont.on('click','.flag1',function () {
        let qid = $(this).closest('li').attr('data');
        let index = 0;
        for(let i=0;i<datalist.length;i++){
            if(datalist[i].qid==qid){
                index=i;
            }
        }
        datalist.unshift(datalist.splice(index,1)[0])
        render(datalist)
    })

    function render(data) {
        $('.count').text(data.length)
        cont.empty();
        $.each(data,function (index,value) {
            cont.html(function (i,v) {
                return v+`
                <li data="${value.qid}">
                    <a href = "/ktv/index.php/singer/play?qid=${value.qid}">
                        <div class="num"><img src="${value.qthumb}" alt=""></div>
                        <div class="title">${value.qname}<div class="time">${value.qtime}</div></div>
                    </a>
                    <div class="right">
                        <div class="flag"></div>
                        <div class="flag1"></div>
                    </div>
                </li>
                `
            })
        })
    }
})