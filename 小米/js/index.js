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
let now = 0;
let next = 0;
let w = parseInt(window.getComputedStyle(bannerli[0],null).width);
let flag=true;
	//自动
	/*let t;
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
					animate(bannerli[j],{opacity: 0})
					btn[j].className='yuan1'
				}
			animate(bannerli[i],{opacity: 1})
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
					animate(bannerli[i],{opacity: 0})
					btn[i].className='yuan1'
				}
			animate(bannerli[num],{opacity: 1})
			btn[num].className='yuan2'
		}
		function fn1(){
			num--;
			if(num<0){
				num=bannerli.length-1;
			}
			for(let i=0;i<bannerli.length;i++){
					animate(bannerli[i],{opacity: 0})
					btn[i].className='yuan1';
				}
			animate(bannerli[num],{opacity: 1})
			btn[num].className='yuan2'
		}*/
		let t;
		t=setInterval(move,2000)
		bannerbox.onmouseover=function(){
			clearInterval(t);
		}
		bannerbox.onmouseout=function(){
			t=setInterval(move,2000);
		}
		left.onclick=function(){
			if(!flag){
				return;
			}
			moveL();
			flag=false;
		}
		right.onclick=function(){
			if(!flag){
				return;
			}
			move();
			flag=false;
		}
		/////////////////////////////////自动轮播///////////////////////////////
		function move(){
			next++;
			if(next==bannerli.length){
				next=0;
			}
			btn[now].className='yuan1';
			btn[next].className='yuan2';
			bannerli[next].style.left = `${w}px`;
			animate(bannerli[now],{left:-w})
			animate(bannerli[next],{left:0},function(){
				flag=true;
			})
			now = next;
		}
		function moveL(){
			next--;
			if(next<0){
				next=bannerli.length-1;
			}
			btn[now].className='yuan1'
			btn[next].className='yuan2'
			bannerli[next].style.left = `${-w}px`;
			animate(bannerli[now],{left:w})
			animate(bannerli[next],{left:0},function(){
				flag=true;
			})
			now = next;
		}
		/////////////////////////////圆点点击事件/////////////////////////
		for(let i=0;i<btn.length;i++){
			btn[i].onmouseover=function(){
				if(now==i){
					return;
				}
				if(!flag){
				return;
				}
				btn[now].className='yuan1'
				btn[i].className='yuan2'
				bannerli[i].style.left = `${w}px`;
				animate(bannerli[now],{left:-w})
				animate(bannerli[i],{left:0},function(){
					flag=true;
				})
				now =next= i;
				flag=false;
				}

				
			}
}