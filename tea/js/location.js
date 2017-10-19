window.onload=function(){
	////////////////////////////产地banner////////////////////
	let bannerli = document.querySelectorAll('.banner-box li');
	let left= document.getElementsByClassName('banner-left')[0];
	let right= document.getElementsByClassName('banner-right')[0];
	let now = 0;
	let next = 0;
	left.onclick=function(){
		moveL();
	}
	right.onclick=function(){
		move();
	}
	function move(){
		next++;
		if(next==bannerli.length){
			next=0;
		}
		bannerli[next].style.left = `${1140}px`;
		animate(bannerli[now],{left:-1140})
		animate(bannerli[next],{left:0},function(){
		})
		now = next;
	}
	function moveL(){
		next--;
		if(next<0){
			next=bannerli.length-1;
		}
		bannerli[next].style.left = `${-1140}px`;
		animate(bannerli[now],{left:1140})
		animate(bannerli[next],{left:0},function(){
		})
		now = next;
	}
}