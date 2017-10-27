$(function(){
    let zhuozi =$('.zhuozi')
    let color = ['c','d','h','s']
    let poke=[];
    let flag={};
    let index = 0;
    /*for(let i =0;i<52;i++){
        let hua = color[Math.floor(Math.random()*color.length)];
        let num = Math.floor(Math.random()*13+1);
        while(flag[`${hua}_${num}`]){
            hua = color[Math.floor(Math.random()*color.length)];
            num = Math.floor(Math.random()*13+1);
        }
        poke.push({hua,num})
        flag[`${hua}_${num}`]=true
    }*/
    while(poke.length<52){
        let hua = color[Math.floor(Math.random()*color.length)];
        let num = Math.floor(Math.random()*13+1);
        while(!(flag[`${hua}_${num}`])){
            poke.push({hua,num})
            flag[`${hua}_${num}`]=true
        }
    }
    for(let i=0;i<6;i++){
        for(let j=0;j<=i;j++) {
            let left = 300 - 50 * i + 100 * j,
                top = 50 * i;
            $('<div>').addClass('box')
                .attr('id',`${i}_${j}`)
                .data('num',poke[index].num)
                .appendTo(zhuozi)
                .css('background-image',`url(img/${poke[index].hua}${poke[index].num}.jpg)`)
                .delay(i * 10)
                .animate({left, top, opacity: 1})
            index++;
        }
    }
    for(;index<52;index++){
        $('<div>').addClass('box hot zuo')
            .attr('id',`${-2}_${-2}`)
            .data('num',poke[index].num)
            .appendTo(zhuozi)
            .css('background-image',`url(img/${poke[index].hua}${poke[index].num}.jpg)`)
            .delay(index * 10)
            .animate({left:50, top:460, opacity: 1})
    }
    let first = null;
    $(zhuozi).on('click','.box',function (e) {
        let element = $(e.target);
        let arr = $(this).attr('id').split('_')
        let ele = `#${arr[0]*1+1}_${arr[1]*1}`
        let ele1 = `#${arr[0]*1+1}_${arr[1]*1+1}`
        if($(ele).length || $(ele1).length){
            return;
        }


        element.toggleClass('active')
        if(element.hasClass('active')){
            element.animate({top:'-=20'})
        }else{
            element.animate({top:'+=20'})
        }
        if(!first){
            first = $(e.target)
        }else {
            console.log(first.data('num'))
            if (first.data('num') + element.data('num') == 14) {
                $('.active').animate({left:600, top:0}, function () {
                    $(this).remove()
                })
            }else {
                $('.active').animate({top: '+=20'},function () {
                    $(this).removeClass('active')
                })
            }
            first = null;
        }
    })
    let zindex = 0;
    let btnR = $('.right')
    let btnL = $('.left')
    btnR.on('click',function () {
            if(!$('.zuo').length){
                return;
            }
            $('.zuo').eq(-1).css('zIndex',zindex++).animate({left:600}).removeClass('zuo').addClass('you')
        })
        btnL.on('click',function () {
            if(!$('.you').length){
                return;
            }
            $('.you').css('zIndex',zindex--).animate({left:50}).removeClass('you').addClass('zuo')
        })


})