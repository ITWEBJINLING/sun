window.onload=function fn(){
	let a = document.getElementsByClassName('banner-left');
	// let b =a[0].getElementsByClassName('li');
	let b =document.querySelectorAll('.banner-left>li');  //可以选中当前ul下面的li  不会选中其他的
	let c= document.getElementsByClassName('banner-right')
	for(let i=0;i<b.length;i++){
		b[i].onmouseover=function(){
			c[i].style.display='block';
		}
		b[i].onmouseout=function(){
			c[i].style.display='none';
		}
	}
	/*------------------------banner-------------------------------*/
	//元素获取
	let banner = document.getElementsByClassName('banner')[0];
	let imgul = document.getElementsByClassName('banner-img')[0];
	let imgli = imgul.getElementsByTagName('li');
	let btns= document.getElementsByClassName('yuan')[0];
	let btn = btns.getElementsByTagName('div');
	let w = imgli[0].offsetWidth;
	console.log(w)
	let num = 0;
	let now =0;
	let next =0;
	let flag=true;
	//自动
	let t;
	t=setInterval(fn,2000);
	banner.onmouseover=function(){
		clearInterval(t);
	}
	banner.onmouseout=function(){
		t=setInterval(fn,2000);
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
			btn[now].className='yuan1';
			btn[i].className='yuan3';
			imgli[i].style.left=w+'px';
			animate(imgli[now],{left:-w})
			switch(i){
	 			case 0:
	 				animate(imgli[0],{left:0},function(){
						flag=true;
					});
	 				break;
	 			case 1:
	 				animate(imgli[1],{left:0},function(){
						flag=true;
					});
	 				imgli[1].style.background='#8136DD';
	 				break;
	 			case 2:
	 				animate(imgli[2],{left:0},function(){
						flag=true;
					});
	 				break;
	 			case 3:
	 				animate(imgli[3],{left:0},function(){
						flag=true;
					});
	 				imgli[3].style.background='#8136DD';
	 				break;
	 			case 4:
	 				animate(imgli[4],{left:0},function(){
						flag=true;
					});
	 				break;
	 			case 5:
	 				animate(imgli[5],{left:0},function(){
						flag=true;
					});
	 				imgli[5].style.background='#D9123D'
	 				break;
	 			}
				now =next= i;
				flag=false;
		}

	}

			/////////////////////////////////自动轮播///////////////////////////////
		function fn(){
			next++;
			if(next==imgli.length){
				next=0;
			}
			btn[now].className='yuan1';
			btn[next].className='yuan3';
			imgli[next].style.left=w+'px';
			animate(imgli[now],{left:-w})
			switch(next){
	 			case 0:
	 				animate(imgli[0],{left:0});
	 				break;
	 			case 1:
	 				animate(imgli[1],{left:0});
	 				imgli[1].style.background='#8136DD';
	 				break;
	 			case 2:
	 				animate(imgli[2],{left:0});
	 				break;
	 			case 3:
	 				animate(imgli[3],{left:0});
	 				imgli[3].style.background='#8136DD';
	 				break;
	 			case 4:
	 				animate(imgli[4],{left:0});
	 				break;
	 			case 5:
	 				animate(imgli[5],{left:0});
	 				imgli[5].style.background='#D9123D'
	 				break;
	 			}
				now = next;
		}
		/*//方法
		function fn(){
			num++;
			if(num==btn.length){
				num=0;
			}
			for(let i=0;i<imgli.length;i++){
					animate(imgli[i],{opacity:0});
					btn[i].className='yuan1';
				}
			switch(num){
		 		case 0:
	 				animate(imgli[0],{opacity:1});
	 				btn[num].className='yuan3';
	 				break;
	 			case 1:
	 				animate(imgli[1],{opacity:1});
	 				imgli[1].style.background='#8136DD';
	 				btn[num].className='yuan3';
	 				break;
	 			case 2:
	 				animate(imgli[2],{opacity:1});
	 				btn[num].className='yuan3';
	 				break;
	 			case 3:
	 				animate(imgli[3],{opacity:1});
	 				imgli[3].style.background='#8136DD';
	 				btn[num].className='yuan3';
	 				break;
	 			case 4:
	 				animate(imgli[4],{opacity:1});
	 				btn[num].className='yuan3';
	 				break;
	 			case 5:
	 				animate(imgli[5],{opacity:1});
	 				imgli[5].style.background='#D9123D'
	 				btn[num].className='yuan3';
	 				break;
		 		}
		}*/


}