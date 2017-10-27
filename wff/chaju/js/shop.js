window.onload=function () {
    let big = document.querySelector('.big');
    let small = document.querySelector('.content-img')
    let mask = document.querySelector('.mask')
    let Bimg = document.querySelector('.big img')

    let opacity = document.querySelector('.opacity')
    let mw = mask.offsetWidth,
        mh = mask.offsetHeight;
    sw = small.offsetWidth;
    sh = small.offsetHeight;
    bw = big.offsetWidth;
    bh = big.offsetHeight;

    opacity.addEventListener('mousemove', function (e) {
        big.style.opacity = 1;
        mask.style.opacity = 1;
        let ox = e.offsetX - mw / 2, oy = e.offsetY - mh / 2;
        if (ox >= sw - mw) {
            ox = sw - mw
        }
        if (ox <= 0) {
            ox = 0
        }
        if (oy >= sh - mh) {
            oy = sh - mh
        }
        if (oy <= 0) {
            oy = 0
        }
        mask.style.left = `${ox}px`
        mask.style.top = `${oy}px`
        /*
         mask	  big     ox
         small     Bimg    x
         */
        Bimg.style.width = sw * bw / mw + 'px';
        console.log(Bimg.style.width)
        Bimg.style.height = sh * bh / mh + 'px';

        Bimg.style.left = -sw * ox / mw + 'px'
        Bimg.style.top = -sh * oy / mh + 'px'
    })
    opacity.addEventListener('mouseleave', function () {
        big.style.opacity = 0
        mask.style.opacity = 0
    })

        let reserch = $('.reserch')
        let li = $('.small>li');
        let mask1 = $('.mask1');
        let Iimg = $('.mask1>img')
        let close = $('.close')
        let left = $('.btnL')
        let right = $('.btnR')
        let index=0;

    li.on('click', function () {
           let src = $(this).children('img').prop('src');
           Iimg.prop('src', src)
           mask1.addClass('active');
        })
        close.on('click',function () {
            mask1.removeClass('active')
        })
        left.on('click', function () {
            index--;
            if (index < 0) {
                index = 3;
            }
            if (index > 3) {
                index = 0;
            }
            let img = $(`li>img:eq(${index})`).prop('src')
            Iimg.prop('src', img)

        })
        right.on('click', function () {
            index++;
            if (index < 0) {
                index = 3;
            }
            if (index > 3) {
                index = 0;
            }
            let img =  $('li>img').eq(index).prop('src')
            Iimg.prop('src', img)
        })
}
