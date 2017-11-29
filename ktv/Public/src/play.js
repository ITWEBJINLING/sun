$(function () {
    let qid = location.search.slice(location.search.indexOf('=')+1)
    let datalist;
    let index=0;
    let current = $('.current');
    let duration = $('.duration');
    let select = $('.select');
    let select1 = $('.select1')
    let lyric=[];
    let text = $('.top');
    let vol = $('.vol');
    let audio = $('#audio')[0];
    let num = 0;
    audio.autoplay=true;
    select1.css('width',audio.volume*100+'%')
    $.ajax({
        url:'/ktv/index.php/singer/playSelect',
        data:{qid},
        success:function (data) {
            datalist = JSON.parse(data);
            for(let i =0;i<datalist.length;i++){
               if(datalist[i].qid == qid){
                   index=i;
               }
           }
            duration.text(datalist[index].qtime)
            $.ajax(`/ktv/Public/json/${ datalist[index].qname}.json`,{
                success:function (data) {
                    let lrc = data.lrc.lyric.split('\n');
                    lrc.forEach(ele=>{
                        let t= ele.substr(1,5)
                        let c = ele.substr(ele.indexOf(']')+1)
                        lyric.push({t,c})
                    })
                   render(datalist[index],lyric)
                }
            })
        }
    })
    ///////////////////////////按钮////////////////////////
    $('.play').on('click',function () {
       if(audio.paused){
            audio.play();
       }else{
           audio.pause();
       }
    })
    vol.on('click',function () {
        if(audio.volume){
            $('img',vol).attr('src','/ktv/Public/img/voice.png')
            $('span',vol).text('静音')
            audio.volume=0;
            select1.css('width',audio.volume*100+'%')
        }else{
            $('img',vol).attr('src','/ktv/Public/img/gc3.png')
            $('span',vol).text('取消静音')
            audio.volume=1;
            select1.css('width',audio.volume*100+'%')
        }
    })
    $('.prev').on('click',function () {
        text.empty();
        $.ajax({
            url:'/ktv/index.php/singer/playSelect',
            data:{qid},
            success:function (data) {
                datalist = JSON.parse(data);
                if(index==0){
                    index =0
                }else{
                    index--;
                }
                duration.text(datalist[index].qtime)
                $.ajax(`/ktv/Public/json/${ datalist[index].qname}.json`,{
                    success:function (data) {
                        let lrc = data.lrc.lyric.split('\n');
                        lyric.length=0;
                        lrc.forEach(ele=>{
                            let t= ele.substr(1,5)
                            let c = ele.substr(ele.indexOf(']')+1)
                            lyric.push({t,c})
                        })
                        render(datalist[index],lyric)
                    }
                })
            }
        })
    })
    $('.next').on('click',function () {
        text.empty();
        $.ajax({
            url:'/ktv/index.php/singer/playSelect',
            data:{qid},
            success:function (data) {
                datalist = JSON.parse(data);
                if(index==datalist.length-1){
                    index = datalist.length-1
                }else{
                    index++;
                }
                duration.text(datalist[index].qtime)
                $.ajax(`/ktv/Public/json/${ datalist[index].qname}.json`,{
                    success:function (data) {
                        let lrc = data.lrc.lyric.split('\n');
                        lyric.length=0;
                        lrc.forEach(ele=>{
                            let t= ele.substr(1,5)
                            let c = ele.substr(ele.indexOf(']')+1)
                            lyric.push({t,c})
                        })
                        render(datalist[index],lyric)
                    }
                })
            }
        })
    })
    $('.wu').on('click',function () {
        text.empty();
        $.ajax({
            url:'/ktv/index.php/singer/playSelect',
            data:{qid},
            success:function (data) {
                datalist = JSON.parse(data);
                index = Math.floor(Math.random()*datalist.length);
                console.log(index)
                duration.text(datalist[index].qtime)
                $.ajax(`/ktv/Public/json/${ datalist[index].qname}.json`,{
                    success:function (data) {
                        lyric.length=0;
                        let lrc = data.lrc.lyric.split('\n');
                        lrc.forEach(ele=>{
                            let t= ele.substr(1,5)
                            let c = ele.substr(ele.indexOf(']')+1)
                            lyric.push({t,c})
                        })
                        render(datalist[index],lyric)
                    }
                })
            }
        })
    })
////////////////////////////////////////////////////歌词同步///////////////////////////////
    $('audio').on('timeupdate',function () {
        let ct = audio.currentTime;
        let dt = audio.duration;
        current.text(formDate(ct));
        select.css('width',ct / dt * 100 + '%')
        let a;
        lyric.forEach((v,i)=>{
            if(v.t == formDate(ct)){
                a=i;
                if(i<=6){
                    i=0;
                }else{
                    i-=6;
                }
                text.empty();
                for(let j =i;j<lyric.length;j++){
                    text.html(function (index,value) {
                        return value+`<li class=lis${j}>${lyric[j].c}</li>`
                    })
                }
            }
        })
        $('.lis'+a).css({fontSize:'0.36rem',color:'#fff'})
        if(audio.ended){
            $('.next').triggerHandler('click')
        }
    })
 //////////////////////////////////////////播放顺序//////////////////////////////////////////
    $('.order').on('click',function () {
        num++;
        if (num > 2) {
            num = 0;
        }
         switch (num){
             case 0:
                 console.log(1)
                 $('.order>img').attr('src','/ktv/Public/img/shunxu.png')
                 $('.order>span').text('顺序播放');
                     audio.onended=function () {
                         $('.next').triggerHandler('click')
                     }
                 break;
             case 1:
                 $('.order>img').attr('src','/ktv/Public/img/danqu.png')
                 $('.order>span').text('单曲循环');
                 audio.onended=function () {
                   audio.looper = true;
                 }
                 break;
             case 2:
                 $('.order>img').attr('src','/ktv/Public/img/suiji.png')
                 $('.order>span').text('随机播放');
                 audio.onended=function () {
                     $('.wu').triggerHandler('click')
                 }
                 break;
         }
    })
    ///////////////////////////////////////////进度条//////////////////////////////////////
    let voice = $('.voice');
    let btn1 = $('.btn1');
    let width = $('.heng1').width();
    btn1.on('touchstart',function (e) {
        let ox = e.changedTouches[0].clientX;
        let w =  select1.width();
        btn1.on('touchmove',function (e) {
            let ex =  e.changedTouches[0].clientX;
            let lefts = (ex-ox + w)/width*100;
            if(lefts>=100){
                lefts = 100;
            }else if(lefts<=0){
                lefts = 0;
            }
            select1.css('width',lefts+'%')
            audio.volume = lefts/100;
        })
    })
/////////////////////////////////////////////////////////////////////////////////////////
    function formDate(time) {
        let m = Math.floor(time / 60) < 10 ? '0'+ Math.floor(time / 60) : Math.floor(time / 60);
        let s = Math.floor(time % 60) < 10 ? '0'+ Math.floor(time % 60) : Math.floor(time % 60);
        return m + ':'+s;
    }
    function render(music,lyric) {
        $('header>p').text(music.qname);
        $('audio').attr('src',music.music)
        text.empty();
        $.each(lyric,function (index,value) {
            text.html(function (i,v) {
                return v+ `
                <li  class=lis${i}>${value.c}</li>
                `
            })
        })
    }
   /* function random() {

    }*/

})