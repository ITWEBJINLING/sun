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
	let num = 0;
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
			for(let j=0;j<imgli.length;j++){
					imgli[j].style.display='none';
					btn[j].className='yuan1';
				}
			switch(i){
	 			case 0:
	 				imgli[0].style.display='block';
	 				btn[i].className='yuan3';
	 				break;
	 			case 1:
	 				imgli[1].style.display='block';
	 				imgli[1].style.background='#8136DD';
	 				btn[i].className='yuan3';
	 				break;
	 			case 2:
	 				imgli[2].style.display='block';
	 				btn[i].className='yuan3';
	 				break;
	 			case 3:
	 				imgli[3].style.display='block';
	 				imgli[3].style.background='#8136DD';
	 				btn[i].className='yuan3';
	 				break;
	 			case 4:
	 				imgli[4].style.display='block';
	 				btn[i].className='yuan3';
	 				break;
	 			case 5:
	 				imgli[5].style.display='block';
	 				imgli[5].style.background='#D9123D'
	 				btn[i].className='yuan3';
	 				break;
	 			}
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
			for(let i=0;i<imgli.length;i++){
					imgli[i].style.display='none';
					btn[i].className='yuan1';
				}
			switch(num){
		 		case 0:
		 			imgli[0].style.display='block';
		 			btn[num].className='yuan3';
		 			break;
		 		case 1:
		 			imgli[1].style.display='block';
		 			imgli[1].style.background='#8136DD';
		 			btn[num].className='yuan3';
		 			break;
		 		case 2:
		 			imgli[2].style.display='block';
		 			btn[num].className='yuan3';
		 			break;
		 		case 3:
		 			imgli[3].style.display='block';
		 			imgli[3].style.background='#8136DD';
		 			btn[num].className='yuan3';
		 			break;
		 		case 4:
		 			imgli[4].style.display='block';
		 			btn[num].className='yuan3';
		 			break;
		 		case 5:
		 			imgli[5].style.display='block';
		 			imgli[5].style.background='#D9123D'
		 			btn[num].className='yuan3';
		 			break;
		 		}
		}


}