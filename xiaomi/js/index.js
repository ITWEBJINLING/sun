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
	let t;
	t=setInterval(move,3000)
	bannerbox.onmouseover=function(){
		clearInterval(t);
	}
	bannerbox.onmouseout=function(){
		t=setInterval(move,3000);
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
	///////////////////////////小米明星单品/////////////////////////
	let star=document.querySelector('.star-imgbox');
	let starli=document.querySelectorAll('.star-imgbox li');
	let zuo = document.querySelector('.zuo');
	let you = document.querySelector('.you');
	let wi=(starli[0].offsetWidth+parseInt(getComputedStyle(starli[0],null).marginRight))*5;
	let nums=0;
	let a=0;
	star.style.width=w*starli.length/5-1;
	you.onclick=function(){
		fn();
	}
	zuo.onclick=function(){
		fu();
	}
	setInterval(function(){
		setTimeout(fn,1000);
		setTimeout(fu,7000)
	},6000)
	function fn() {
			you.style.color='#FF8A3B';
			if(nums==starli.length/5-1){
				return;
			}
			nums++;
			for(let i=0;i<starli.length;i++){
				starli[i].style.transform = `translateX(${-wi*nums}px)`;
			}
			you.style.color='#e0e0e0'
			you.style.cursor='default';
			zuo.style.color='#b0b0b0'
			zuo.style.cursor='pointer';
	}
	function fu(){
		zuo.style.color='#FF8A3B';
		if (nums==0) {
			
			return;
		}
		nums--;
		for(i=0;i<starli.length;i++){
			starli[i].style.transform = `translateX(${-wi*nums}px)`;	
		}
		zuo.style.color='#e0e0e0'
		zuo.style.cursor='default';
		you.style.color='#b0b0b0'
		you.style.cursor='pointer';
	}



/////////////////////////////////////为你推荐开始///////////////////////
	let star1=document.querySelector('.star-imgbox1');
	let starli1=document.querySelectorAll('.star-imgbox1 li');
	let zuo1 = document.querySelectorAll('.zuo')[1];
	let you1 = document.querySelectorAll('.you')[1];
	let num1=0;
	star1.style.width=w*starli1.length/5-1;
	you1.onclick=function(){
		fn1();
	}
	zuo1.onclick=function(){
		fu1();
	}
	function fn1() {
			you1.style.color='#FF8A3B';
			if(num1==starli1.length/5-1){
				return;
			}
			num1++;
			for(let i=0;i<starli1.length;i++){
				starli1[i].style.transform = `translateX(${-wi*num1}px)`;
			}
			you1.style.color='#e0e0e0'
			you1.style.cursor='default';
			zuo1.style.color='#b0b0b0'
			zuo1.style.cursor='pointer';
	}
	function fu1(){
		zuo1.style.color='#FF8A3B';
		if (num1==0) {
			
			return;
		}
		num1--;
		for(i=0;i<starli1.length;i++){
			starli1[i].style.transform = `translateX(${-wi*num1}px)`;	
		}
		zuo1.style.color='#e0e0e0'
		zuo1.style.cursor='default';
		you1.style.color='#b0b0b0'
		you1.style.cursor='pointer';
	}


	///////////////////////////////////内容开始////////////////////////
	let nyou = document.querySelector('.neirong1>.neirong-you')
	let nyou1 = document.querySelector('.neirong2>.neirong-you')
	let nyou2 = document.querySelector('.neirong3>.neirong-you')
	let nyou3 = document.querySelector('.neirong4>.neirong-you')
	
	let nzuo = document.querySelector('.neirong1>.neirong-zou')
	let nzuo1 = document.querySelector('.neirong2>.neirong-zou')
	let nzuo2 = document.querySelector('.neirong3>.neirong-zou')
	let nzuo3 = document.querySelector('.neirong4>.neirong-zou')

	let nli = document.querySelectorAll('.neirong1>li')
	let nli1 = document.querySelectorAll('.neirong2>li')
	let nli2 = document.querySelectorAll('.neirong3>li')
	let nli3 = document.querySelectorAll('.neirong4>li')

	let dian = document.querySelectorAll('.dian a')
	let ndian = document.querySelectorAll('.ndian a')
	let nndian = document.querySelectorAll('.nndian a')
	let nnndian = document.querySelectorAll('.nnndian a')
	let b=0;
	let c=0;
	let d=0;
	//////圆点点击事件////////
	dian.forEach((element,index)=>{
		element.onclick=function(){
			for(let i=0;i<nli.length;i++){
				nli[i].style.transform = `translateX(${-296*index}px)`;
				dian[i].className='dian2'
			}
			dian[index].className='dian1';
			a=index;
		}
	})

	ndian.forEach((element,index)=>{
		element.onclick=function(){
			for(let i=0;i<nli.length;i++){
				nli1[i].style.transform = `translateX(${-296*index}px)`;
				ndian[i].className='dian2'
			}
			ndian[index].className='dian1';
			b=index;
		}
	})


	nndian.forEach((element,index)=>{
		element.onclick=function(){
			for(let i=0;i<nli.length;i++){
				nli2[i].style.transform = `translateX(${-296*index}px)`;
				nndian[i].className='dian2'
			}
			nndian[index].className='dian1';
			b=index;
		}
	})


	nnndian.forEach((element,index)=>{
		element.onclick=function(){
			for(let i=0;i<nli.length;i++){
				nli3[i].style.transform = `translateX(${-296*index}px)`;
				nnndian[i].className='dian2'
			}
			nnndian[index].className='dian1';
			b=index;
		}
	})
	/////////////右箭头点击////////////////
	nyou.onclick=function(){
		if(a==2){
			return;
		}
		a++;
		for(let i=0;i<nli.length;i++){
			nli[i].style.transform = `translateX(${-296*a}px)`;
			dian[i].className='dian2'
		}
		dian[a].className='dian1'
	}


	nyou1.onclick=function(){
		if(b==2){
			return;
		}
		b++;
		for(let i=0;i<nli.length;i++){
			nli1[i].style.transform = `translateX(${-296*b}px)`;
			ndian[i].className='dian2'
		}
		ndian[b].className='dian1'
	}


	nyou2.onclick=function(){
		if(c==2){
			return;
		}
		c++;
		for(let i=0;i<nli.length;i++){
			nli2[i].style.transform = `translateX(${-296*c}px)`;
			nndian[i].className='dian2'
		}
		nndian[c].className='dian1'
	}


	nyou3.onclick=function(){
		if(d==2){
			return;
		}
		d++;
		for(let i=0;i<nli.length;i++){
			nli3[i].style.transform = `translateX(${-296*d}px)`;
			nnndian[i].className='dian2'
		}
		nnndian[d].className='dian1'
	}
	//////////////左箭头点击///////////////
	
	nzuo.onclick=function(){
		if(a==0){
			return;
		}
		a--;
		for(i=0;i<nli.length;i++){
			nli[i].style.transform = `translateX(${-296*a}px)`;
			dian[i].className='dian2'
		}
		dian[a].className='dian1'	
	}

	nzuo1.onclick=function(){
		if(b==0){
			return;
		}
		b--;
		for(i=0;i<nli.length;i++){
			nli1[i].style.transform = `translateX(${-296*b}px)`;
			ndian[i].className='dian2'
		}
		ndian[b].className='dian1'	
	}

	nzuo2.onclick=function(){
		if(c==0){
			return;
		}
		c--;
		for(i=0;i<nli.length;i++){
			nli2[i].style.transform = `translateX(${-296*c}px)`;
			nndian[i].className='dian2'
		}
		nndian[c].className='dian1'	
	}

	nzuo3.onclick=function(){
		if(d==0){
			return;
		}
		d--;
		for(i=0;i<nli.length;i++){
			nli3[i].style.transform = `translateX(${-296*d}px)`;
			nnndian[i].className='dian2'
		}
		nnndian[d].className='dian1'	
	}
	/////////////////////////家电开始/////////////////////////
	let home=document.querySelector('.jia-top-right');

	let homeli=document.querySelectorAll('.jia-top-right>li');
	let homeli1=document.querySelectorAll('.zhi-top-right>li');
	let homeli2=document.querySelectorAll('.da-top-right>li');
	let homeli3=document.querySelectorAll('.pei-top-right>li');
	let homeli4=document.querySelectorAll('.zhou-top-right>li');

	let rtop= document.querySelectorAll('.jia-bottom-right>ul');
	let rtop1= document.querySelectorAll('.zhi-bottom-right>ul');
	let rtop2= document.querySelectorAll('.da-bottom-right>ul');
	let rtop3= document.querySelectorAll('.pei-bottom-right>ul');
	let rtop4= document.querySelectorAll('.zhou-bottom-right>ul');

	over(homeli,rtop)
	over(homeli1,rtop1)
	over(homeli2,rtop2)
	over(homeli3,rtop3)
	over(homeli4,rtop4)
	
	function over(obj,value){
		obj.forEach((element,index)=>{
		element.onmouseover=function(){
			for(let i=0;i<rtop.length;i++){
				value[i].style.display='none';
				obj[i].className='re1'
			}
			value[index].style.display='block';
			obj[index].className='re'
		}
	})

	}
	
	
}