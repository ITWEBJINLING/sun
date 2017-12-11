$(function () {
    let a = $('.a');
    let b = $('.b');
    let c = $('.c');
    let circle = $("div[class*='circle']")
    a.animate({bottom:90},1000)
    b.animate({bottom:40},1000).delay(60)
    c.animate({bottom:-30},1000).delay(120)
    $('.title').animate({bottom:290},1000).delay(130)
    $('.star1').animate({bottom:-20},1000).delay(130)
    $('.star2').animate({bottom:-40},1200).delay(130)
    $('.star3').animate({bottom:-60},1400).delay(130)
    circle.animate({opacity:1},2000).delay(140)
    setInterval(fn,1000)
    function fn() {
        for(let i=1;i<5;i++){
            let rights = -Math.random()*500
            let tops = -Math.random()*200
            let img = $('<img>').attr('src',`img/l${i}.png`)
            let divs = $('<div>').css({position:'absolute',top:tops+'px',right:rights+'px'}).append(img).animate({right:700,top:700},3000).delay(200*i)
            divs.appendTo($('body'))
        }
    }

})
