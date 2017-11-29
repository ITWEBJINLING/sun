$(function () {
    let cont = $('.content')
    $.ajax({
        url:'/ktv/index.php/singer/show',
        dataType:'json',
        success:function (data) {
            render(data);
        }
    })
    //////////////////////////////////函数////////////////////////////////////////////////////
    function render(data) {
        cont.empty();
        cont.html(`
      <a href = "/ktv/index.php/singer/singerlist?cid=${data[0]['cid']}" class="p1">
        <img src="${data[0]['cthumb']}" alt="">
        <div class="mask6">
            <span></span>
            <p>${data[0]['cname']}</p>
            <span></span>
        </div>
    </a>
    <a href = "/ktv/index.php/singer/singerlist?cid=${data[1]['cid']}" class="p2">
        <img src="${data[1]['cthumb']}" alt="">
        <div class="mask2">${data[1]['cname']}</div>
    </a>
    <a href = "/ktv/index.php/singer/singerlist?cid=${data[2]['cid']}" class="p3">
        <img src="${data[2]['cthumb']}" alt="">
        <div class="mask3">${data[2]['cname']}</div>
    </a>
    <a href = "/ktv/index.php/singer/singerlist?cid=${data[3]['cid']}" class="p4">
        <img src="${data[3]['cthumb']}" alt="">
        <div class="mask4">${data[3]['cname']}</div>
    </a>
    <a href = "/ktv/index.php/singer/singerlist?cid=${data[4]['cid']}" class="p5">
        <img src="${data[4]['cthumb']}" alt="">
        <div class="mask6">
            <span></span>
            <p>${data[4]['cname']}</p>
            <span></span>
        </div>
    </a>
    <a href = "/ktv/index.php/singer/singerlist?cid=${data[5]['cid']}" class="p6">
        <img src="${data[5]['cthumb']}" alt="">
        <div class="mask6">
            <span></span>
            <p>${data[5]['cname']}</p>
            <span></span>
        </div>
    </a>
        `)
    }
})