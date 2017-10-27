$(function () {
    let mian = $('.mian');
    let list = $('.main-list')
    mian.on('click',function () {
        list.slideToggle();
    })
})