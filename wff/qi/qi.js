$(function () {
    let qipan = $('.qipan');
    let kongbai = {};
    let flag = true;
    let hei={},bai={};
    let isAi = true;


    for(let i=0;i<15;i++){
        $('<span>').appendTo(qipan).addClass('shu');
        $('<div>').appendTo(qipan).addClass('heng');
        for(let j =0;j<15;j++){
            kongbai[`${i}_${j}`]={x:i,y:j}
            $('<li>').appendTo(qipan).addClass('qizi').attr('id',`${i}_${j}`).data('position',{x:i,y:j});
        }
    }
    $('.start').on('click',function () {
        $('.heizi').off();
        $('.shuangren').off();
       start();
    })
    $('.heizi').on('click',function () {
        $(this).css('border','3px solid #00c0a5');
        $('.baizi').css('border',"none");
        flag= !flag;
        return;
    });
    $('.shuangren').on('click',function () {
        $(this).css('border','3px solid #00c0a5');
        $('.zhineng').css('border',"none");
        isAi = !isAi;
    })
    //可以不用委派
function start() {
    $('.qipan li').on('click', function () {
        if ($(this).hasClass('hei') || $(this).hasClass('bai')) {
            return;
        }
        let data = $(this).data('position');
        if (flag) {
            $(this).addClass('bai');
            bai[data.x + '_' + data.y] = true;
            delete kongbai[data.x + '_' + data.y]
            if (panduan(data, bai) >= 5) {
                $('.qipan li').off();
                alert('白棋胜利')
                return;
            }
            if (isAi) {
                let pos = ai();
                console.log(pos)
                $(`#${pos.x}_${pos.y}`).addClass('hei');
                hei[pos.x + '_' + pos.y] = true;
                delete kongbai[pos.x + '_' + pos.y]
                if (panduan(pos, hei) >= 5) {
                    $('.qipan li').off();
                    alert('黑棋胜利')
                }
                return;
            }
        } else {
            $(this).addClass('hei');
            hei[data.x + '_' + data.y] = true;
            if (panduan(data, hei) >= 5) {
                $('.qipan li').off();
                alert('黑棋胜利')
            }
            if (isAi) {
                let pos = ai();
                console.log(pos)
                $(`#${pos.x}_${pos.y}`).addClass('bai');
                bai[pos.x + '_' + pos.y] = true;
                delete kongbai[pos.x + '_' + pos.y]
                if (panduan(pos, bai) >= 5) {
                    $('.qipan li').off();
                    alert('白棋胜利')
                }
                return;
            }
        }
        flag = !flag;

        function ai() {
            let max = -Infinity, max1 = -Infinity;
            let zb = null, zb1 = null;
            for (let i in kongbai) {
                let score = panduan(kongbai[i], bai);
                if (score > max) {
                    max = score;
                    zb = kongbai[i];
                }
            }
            for (let i in kongbai) {
                let score = panduan(kongbai[i], hei);
                if (score > max1) {
                    max1 = score;
                    zb1 = kongbai[i];
                }
            }
            console.log(max)
            console.log(max1)
            console.log(zb)
            console.log(zb1)
            return (max >= max1) ? zb : zb1;
        }

        function panduan(pos, obj) {
            let i = pos.x, j = pos.y + 1;
            let row = 1, clo = 1, zx = 1, yx = 1;
            //水平
            while (obj[i + '_' + j]) {
                row++;
                j++;
            }
            j = pos.y - 1;
            while (obj[i + '_' + j]) {
                row++;
                j--;
            }
            //垂直
            i = pos.x + 1, j = pos.y
            while (obj[i + '_' + j]) {
                clo++;
                i++;
            }
            i = pos.x - 1;
            while (obj[i + '_' + j]) {
                clo++;
                i--;
            }
            //左斜
            i = pos.x + 1, j = pos.y + 1;

            while (obj[i + '_' + j]) {
                zx++;
                i++;
                j++;
            }
            i = pos.x - 1, j = pos.y - 1;
            while (obj[i + '_' + j]) {
                zx++;
                i--;
                j--;
            }

            //右斜
            i = pos.x - 1, j = pos.y + 1
            while (obj[i + '_' + j]) {
                yx++;
                i--;
                j++;
            }
            i = pos.x + 1, j = pos.y - 1;
            while (obj[i + '_' + j]) {
                yx++;
                i++;
                j--;
            }
            return Math.max(row, clo, zx, yx);
        }
    })
}








})//结尾