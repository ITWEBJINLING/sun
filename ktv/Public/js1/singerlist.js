$(function () {
    let list = $('.list')
    let aside = $('.aside')
    let input = $('input')
    let datalist =[]
    let myScroll = new IScroll('.content');
    let id = location.search.slice(location.search.indexOf('=')+1)
    $.ajax({
        url:'/ktv/index.php/singer/select',
        dataType:'json',
        data:{cid:id},
        success:function (data) {
            datalist=data;
            $('header>p').text(datalist[0].cname)
            render(data)
            myScroll = new IScroll('.content');
        }
    })
    ////////////////////////////////////////搜索//////////////////////////////////////////
    input.on('input',function () {
        let value = $.trim(this.value);
        let char = datalist.filter(ele=>{
           return ele.gname.includes(value) || ele.gpy.includes(value)
        })
        render(char)
    })
    ////////////////////////////////////////函数////////////////////////////////////////////////////
    function render(data) {
        list.empty();
        aside.empty();
        let obj = {};
        $.each(data,function (index,value) {
            let first =value.gpy.charAt(0).toUpperCase();
            if(!obj[first]){
                obj[first]=[]
            }
            obj[first].push(value)
        })
        let char = Object.keys(obj).sort()
        $.each(char,function (index,value) {
            aside.html(function (i,v) {
                return v+`<li>${value}</li>`
            })
            $.each(obj[value],function (a,element) {
                list.html(function (i,v) {
                    return v+`
                 <li>
                    <a href="/ktv/index.php/singer/song?gid=${element.gid}">
                    <img src="${element.gthumb}" alt="">
                    <div class="name">${element.gname}（${element.gcount}）</div>
                    </a>
                </li>
                `
                })
            })

        })
    }
})