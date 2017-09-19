window.onload=function(){
////////////////////////////////aside///////////////////
let aside=document.querySelectorAll('.aside-box >li')
let item = document.getElementsByClassName('aside-item')
for(let i=0;i<aside.length;i++){
		aside[i].onmouseover=function(){
			item[i].style.display='block';
		}
		aside[i].onmouseout=function(){
			item[i].style.display='none';
		}
	}

//////////////////////////////banner//////////////////
let bannerbox = document.getElementsByClassName('banner-box')[0];
let bannerli = document.querySelectorAll('.banner-img>li');
let left= document.getElementsByClassName('banner-left')[0];
let right= document.getElementsByClassName('banner-right')[0];
let btns= document.getElementsByClassName('yuan')
let btn = btns[0].getElementsByTagName('a')
let num = 0;
	//自动
	let t;
	t=setInterval(fn,2000);
	bannerbox.onmouseover=function(){
		clearInterval(t);
	}
	bannerbox.onmouseout=function(){
		t=setInterval(fn,2000);
	}
	left.onclick=function(){
		fn1();
	}
	right.onclick=function(){
		fn();
	}


/////////////////////////////圆点点击事件/////////////////////////
	for(let i=0;i<btn.length;i++){
		btn[i].onmouseover=function(){
			for(let j=0;j<bannerli.length;j++){
					bannerli[j].style.display='none';
					btn[j].className='yuan1'
				}
			bannerli[i].style.display='block';
			btn[i].className='yuan2'
	 		num = i;
			}
		}

	/////////////////////////////////自动轮播///////////////////////////////
		
		//方法
		function fn(){
			num++;
			if(num==btn.length){
				num=0;
			}
			for(let i=0;i<bannerli.length;i++){
					bannerli[i].style.display='none';
					btn[i].className='yuan1'
				}
			bannerli[num].style.display='block'
			btn[num].className='yuan2'
		}
		function fn1(){
			num--;
			if(num<0){
				num=0;
			}
			for(let i=0;i<bannerli.length;i++){
					bannerli[i].style.display='none';
					btn[i].className='yuan1';
				}
			bannerli[num].style.display='block'
			btn[i].className='yuan2'
		}
}