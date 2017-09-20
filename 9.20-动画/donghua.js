window.onload=function(){
	let box=document.getElementsByClassName('box')[0];
	animate(box,{width:500,height:500},function(){
		this.style.background='green'
		console.log(this)  //要将this指到box  需要冒充   否则为window
	})

	function animate(obj,attrObj,callback){
		let t=setInterval(function(){
			for(let i in attrObj){
				let w = parseInt(window.getComputedStyle(obj,null)[i]);
				if(w>=attrObj[i]){
					w=attrObj[i];
					clearInterval(t)
					if(callback){
						callback.call(obj);//要将this指到box  需要冒充
					}
				}
				obj.style[i]=w+10+'px';
			}
		},60)
	}
}
