$(function () {
    let data = location.search.slice(location.search.indexOf('=')+1)
    let cont = $('.content')
    let myScroll = new IScroll('.wrapper');
    $.ajax({
        url:'/ktv/index.php/singer/songlist',
        dataType:'json',
        data:{gid:data},
        success:function (data) {
            console.log(data)
            $('header>p').text(data[0].gname)
            $('.name>span').eq(0).text(data[0].gname)
            $('.name>span').eq(1).text(data[0].cname)
            $('.image>img').attr('src',data[0].gthumb)
           render(data[1])
           myScroll.refresh();
        }
    })

    cont.on('click','.flag',function () {
        let me = $(this)
        if($(this).hasClass('rotate')){
            $(this).removeClass('rotate')
            let collect = JSON.parse($(this).closest('li').attr('data')).qid;
            $.ajax({
                url:'/ktv/index.php/singer/collectDel',
                data:{collect},
                success:function (data) {
                    me.prev().css('display','block').text('取消收藏');
                }
            })
        }else{
            $(this).addClass('rotate')
            let collect = JSON.parse($(this).closest('li').attr('data')).qid;
            $.ajax({
                url:'/ktv/index.php/singer/collect',
                data:{collect},
                success:function (data) {
                    me.prev().css('display','block').text('收藏成功');
                }
            })
        }
    })

    cont.on('webkitTransitionEnd','.flag',function () {
        $('.tips').css('display','none');
    })
    function render(data) {
        cont.empty();
       $.each(data,function (index,value) {
           cont.html(function (i,v) {
               return v+`
                <li data = ${JSON.stringify(value)}>
                    <a href="/ktv/index.php/singer/play?qid=${value.qid}">
                        <div class="num">${index+1}</div>
                        <div class="title">${value.qname}<div class="time">${value.qtime}</div></div>
                    </a>
                        <div class="tips"></div>
                        <div class="flag"></div>
                </li>
               `
           })
           if(value.collect){
               $('.flag',cont).eq(index).addClass('rotate')
           }
       })
    }
})