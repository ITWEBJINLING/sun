window.onload=function(){
	let lq = innerHeight;
	let floor = document.querySelectorAll('.floor')
	let floorArr=[];
	let aside=document.querySelectorAll('.aside li')
	let color=['red','green','yellowgreen','pink','lightblue'];
	//记录每一个楼层到文档顶部的距离
	floor.forEach(element=>{
		floorArr.push(element.offsetTop)
	})
	let flag=true;
	//侧导航的点击事件
	aside.forEach((element,index)=>{
		element.onclick=function(){
			flag=false;
			for(let i=0;i<aside.length;i++){
				aside[i].style.background='none'
			}
			aside[index].style.background=color[index];
			animate(document.documentElement,{scrollTop:floorArr[index]},function(){
				flag=true;
			})

		}
	})
	//页面滚动事件
	window.onscroll=function(){
		if(!flag){
			return;
		}
		//获取当前文档滚动的距离
		let scrolltop=document.documentElement.scrollTop;
		floorArr.forEach((value,index)=>{
			if(scrolltop+lq >=value +200){       //文档滚动距离+窗口高度>楼层到顶部距离
				for(let i=0;i<aside.length;i++){
					aside[i].style.background='none'
				}
				aside[index].style.background=color[index]
				//按需加载
				let imgs=floor[index].getElementsByTagName('img')
				for(i=0;i<imgs.length;i++){
					imgs[i].src=imgs[i].getAttribute('imgPath')
				}
			}
		})

		/////////////////////搜索跳出/////////////////////////
		let head = document.querySelector('header')
		let flag1=true;
		if(scrolltop>=500){
			if(flag1){
				flag1=!flag1
				head.style.top = 0;
			}
		}else{
			if(flag1){
				flag1=!flag1
				head.style.top = -50+'px'
			}
		}
	}
	//页面滚动事件结束
}
