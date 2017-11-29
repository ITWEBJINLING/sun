$(function () {
    let cont = $('.content')
    let datalist;
    $.ajax({
        url: '/ktv/index.php/rank/select',
        dataType: 'json',
        success: function (data) {
            datalist = data;
            render(data)
        }
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
                        <div class="title">${value.qname}-${value.gname}<div class="time">${value.qtime}</div></div>
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