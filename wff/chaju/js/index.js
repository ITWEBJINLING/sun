window.onload=function(){
	let bannerli = document.querySelectorAll('.banner-box li');
	let banner=document.querySelector('.banner');
	let left=document.querySelector('.banner-left');
	let right=document.querySelector('.banner-right');
	let span=document.querySelectorAll('span');
	let p=document.querySelectorAll('p');
	let num=0;
	let now=0;
	let next=0;
	let t ;
	let flag=true;
	let w =bannerli[0].offsetWidth;
	t = setInterval(move, 5000)

		banner.onmouseover=function(){
			clearInterval(t);
			animate(left,{opacity: 1})
			animate(right,{opacity: 1})
		}
		banner.onmouseout=function(){
			t=setInterval(move,2000);
			animate(left,{opacity: 0})
			animate(right,{opacity: 0})
		}
		left.onclick=function(){
				if(!flag){
				return;
			}
			moveL();
		}
		right.onclick=function(){
			if(!flag){
				return;
			}
			move();
		}



		function move(){
			num++;
			if(num==bannerli.length){
				num=0;
			}
			
			for(let i=0;i<bannerli.length;i++){
				animate(bannerli[i],{opacity: 0})
				span[i].className='h2'
				p[i].style.left = -50+'px';
				animate(p[num],{left:0})
			}
			animate(bannerli[num],{opacity: 1},function(){
				// flag=true;
			})
			span[num].className='h1'			
		}
		
		function moveL(){
			num--;
			if(num<0){
				num=bannerli.length-1;
			}
			for(let i=0;i<bannerli.length;i++){
					animate(bannerli[i],{opacity: 0})
				}
			animate(bannerli[num],{opacity: 1},function(){
				// flag=true;
			})
		}
}//结束

