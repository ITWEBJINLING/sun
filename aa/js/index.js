$(function () {
    let a = $('.a');
    let b = $('.b');
    let c = $('.c');
    let circle = $("div[class*='circle']")
    a.animate({bottom:1.8+'rem'},1000)
    b.animate({bottom:1+'rem'},1000).delay(60)
    c.animate({bottom:0+'rem'},1000).delay(120)
    $('.title').animate({bottom:5.8+'rem'},1000).delay(130)
    $('.star1').animate({bottom:-1.1+'rem'},1000).delay(130)
    $('.star2').animate({bottom:-1.3+'rem'},1200).delay(130)
    $('.star3').animate({bottom:-1.5+'rem'},1400).delay(130)
    circle.animate({opacity:1},2000).delay(140)
    setInterval(fn,1000)
    function fn() {
        for(let i=1;i<5;i++){
            let rights = -Math.random()*4-4
            let tops = -Math.random()*2-4
            let img = $('<img>').attr('src',`img/l${i}.png`)
            let divs = $('<div>').addClass('yu').css({position:'absolute',top:tops+'rem',right:rights+'rem'}).append(img).delay(200*i).animate({right:'100%',top:'100%'},3000).queue(function () {
             $(this).remove();
            })
            divs.appendTo($('body'))
        }
    }

})
