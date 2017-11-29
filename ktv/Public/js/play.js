'use strict';

$(function () {
    var qid = location.search.slice(location.search.indexOf('=') + 1);
    var datalist = void 0;
    var index = 0;
    var current = $('.current');
    var duration = $('.duration');
    var select = $('.select');
    var select1 = $('.select1');
    var lyric = [];
    var text = $('.top');
    var vol = $('.vol');
    var audio = $('#audio')[0];
    var num = 0;
    audio.autoplay = true;
    select1.css('width', audio.volume * 100 + '%');
    $.ajax({
        url: '/ktv/index.php/singer/playSelect',
        data: { qid: qid },
        success: function success(data) {
            datalist = JSON.parse(data);
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].qid == qid) {
                    index = i;
                }
            }
            duration.text(datalist[index].qtime);
            $.ajax('/ktv/Public/json/' + datalist[index].qname + '.json', {
                success: function success(data) {
                    var lrc = data.lrc.lyric.split('\n');
                    lrc.forEach(function (ele) {
                        var t = ele.substr(1, 5);
                        var c = ele.substr(ele.indexOf(']') + 1);
                        lyric.push({ t: t, c: c });
                    });
                    render(datalist[index], lyric);
                }
            });
        }
    });
    ///////////////////////////按钮////////////////////////
    $('.play').on('click', function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
    vol.on('click', function () {
        if (audio.volume) {
            $('img', vol).attr('src', '/ktv/Public/img/voice.png');
            $('span', vol).text('静音');
            audio.volume = 0;
            select1.css('width', audio.volume * 100 + '%');
        } else {
            $('img', vol).attr('src', '/ktv/Public/img/gc3.png');
            $('span', vol).text('取消静音');
            audio.volume = 1;
            select1.css('width', audio.volume * 100 + '%');
        }
    });
    $('.prev').on('click', function () {
        text.empty();
        $.ajax({
            url: '/ktv/index.php/singer/playSelect',
            data: { qid: qid },
            success: function success(data) {
                datalist = JSON.parse(data);
                if (index == 0) {
                    index = 0;
                } else {
                    index--;
                }
                duration.text(datalist[index].qtime);
                $.ajax('/ktv/Public/json/' + datalist[index].qname + '.json', {
                    success: function success(data) {
                        var lrc = data.lrc.lyric.split('\n');
                        lyric.length = 0;
                        lrc.forEach(function (ele) {
                            var t = ele.substr(1, 5);
                            var c = ele.substr(ele.indexOf(']') + 1);
                            lyric.push({ t: t, c: c });
                        });
                        render(datalist[index], lyric);
                    }
                });
            }
        });
    });
    $('.next').on('click', function () {
        text.empty();
        $.ajax({
            url: '/ktv/index.php/singer/playSelect',
            data: { qid: qid },
            success: function success(data) {
                datalist = JSON.parse(data);
                if (index == datalist.length - 1) {
                    index = datalist.length - 1;
                } else {
                    index++;
                }
                duration.text(datalist[index].qtime);
                $.ajax('/ktv/Public/json/' + datalist[index].qname + '.json', {
                    success: function success(data) {
                        var lrc = data.lrc.lyric.split('\n');
                        lyric.length = 0;
                        lrc.forEach(function (ele) {
                            var t = ele.substr(1, 5);
                            var c = ele.substr(ele.indexOf(']') + 1);
                            lyric.push({ t: t, c: c });
                        });
                        render(datalist[index], lyric);
                    }
                });
            }
        });
    });
    $('.wu').on('click', function () {
        text.empty();
        $.ajax({
            url: '/ktv/index.php/singer/playSelect',
            data: { qid: qid },
            success: function success(data) {
                datalist = JSON.parse(data);
                index = Math.floor(Math.random() * datalist.length);
                console.log(index);
                duration.text(datalist[index].qtime);
                $.ajax('/ktv/Public/json/' + datalist[index].qname + '.json', {
                    success: function success(data) {
                        lyric.length = 0;
                        var lrc = data.lrc.lyric.split('\n');
                        lrc.forEach(function (ele) {
                            var t = ele.substr(1, 5);
                            var c = ele.substr(ele.indexOf(']') + 1);
                            lyric.push({ t: t, c: c });
                        });
                        render(datalist[index], lyric);
                    }
                });
            }
        });
    });
    ////////////////////////////////////////////////////歌词同步///////////////////////////////
    $('audio').on('timeupdate', function () {
        var ct = audio.currentTime;
        var dt = audio.duration;
        current.text(formDate(ct));
        select.css('width', ct / dt * 100 + '%');
        var a = void 0;
        lyric.forEach(function (v, i) {
            if (v.t == formDate(ct)) {
                a = i;
                if (i <= 6) {
                    i = 0;
                } else {
                    i -= 6;
                }
                text.empty();

                var _loop = function _loop(j) {
                    text.html(function (index, value) {
                        return value + ('<li class=lis' + j + '>' + lyric[j].c + '</li>');
                    });
                };

                for (var j = i; j < lyric.length; j++) {
                    _loop(j);
                }
            }
        });
        $('.lis' + a).css({ fontSize: '0.36rem', color: '#fff' });
        if (audio.ended) {
            $('.next').triggerHandler('click');
        }
    });
    //////////////////////////////////////////播放顺序//////////////////////////////////////////
    $('.order').on('click', function () {
        num++;
        if (num > 2) {
            num = 0;
        }
        switch (num) {
            case 0:
                console.log(1);
                $('.order>img').attr('src', '/ktv/Public/img/shunxu.png');
                $('.order>span').text('顺序播放');
                audio.onended = function () {
                    $('.next').triggerHandler('click');
                };
                break;
            case 1:
                $('.order>img').attr('src', '/ktv/Public/img/danqu.png');
                $('.order>span').text('单曲循环');
                audio.onended = function () {
                    audio.looper = true;
                };
                break;
            case 2:
                $('.order>img').attr('src', '/ktv/Public/img/suiji.png');
                $('.order>span').text('随机播放');
                audio.onended = function () {
                    $('.wu').triggerHandler('click');
                };
                break;
        }
    });
    ///////////////////////////////////////////进度条//////////////////////////////////////
    var voice = $('.voice');
    var btn1 = $('.btn1');
    var width = $('.heng1').width();
    btn1.on('touchstart', function (e) {
        var ox = e.changedTouches[0].clientX;
        var w = select1.width();
        btn1.on('touchmove', function (e) {
            var ex = e.changedTouches[0].clientX;
            var lefts = (ex - ox + w) / width * 100;
            if (lefts >= 100) {
                lefts = 100;
            } else if (lefts <= 0) {
                lefts = 0;
            }
            select1.css('width', lefts + '%');
            audio.volume = lefts / 100;
        });
    });
    /////////////////////////////////////////////////////////////////////////////////////////
    function formDate(time) {
        var m = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
        var s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
        return m + ':' + s;
    }
    function render(music, lyric) {
        $('header>p').text(music.qname);
        $('audio').attr('src', music.music);
        text.empty();
        $.each(lyric, function (index, value) {
            text.html(function (i, v) {
                return v + ('\n                <li  class=lis' + i + '>' + value.c + '</li>\n                ');
            });
        });
    }
    /* function random() {
       }*/
});