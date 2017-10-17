$(function(){
	let big = document.querySelector('.big');
	let small = document.querySelector('.small')
	let mask = document.querySelector('.mask')
	let Bimg = document.querySelector('.big img')
	let opacity = document.querySelector('.opacity')
	let mw=mask.offsetWidth,
		mh=mask.offsetHeight;
		sw=small.offsetWidth;
		sh=small.offsetHeight;
		bw=big.offsetWidth;
		bh=big.offsetHeight;
	
	opacity.addEventListener('mousemove',function(e){
		let ox = e.offsetX-mw/2, oy=e.offsetY-mh/2;
		console.log(e.offsetX)
		if(ox>=sw-mw){
			ox=sw-mw
		}
		if(ox<=0){
			ox=0
		}
		if(oy>=sh-mh){
			oy=sh-mh
		}
		if(oy<=0){
			oy=0
		}
		mask.style.left =`${ox}px`
		mask.style.top =`${oy}px`
		/*
			mask	  big     ox  
			small     Bimg    x
		 */
		Bimg.style.width= sw *bw / mw+'px';
		Bimg.style.height= sh *bh / mh+'px';

		Bimg.style.left = -sw * ox/ mw+'px'
		Bimg.style.top = -sh * oy/ mh+'px'
	})
		
})