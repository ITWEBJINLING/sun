/*window.addEventListener('load',function(){
	let box = document.querySelector('.box')
	box.addEventListener('mousedown',function(e){
		let ox=e.offsetX,oy=e.offsetY;
		document.body.addEventListener('mousemove',fn)
		box.addEventListener('mouseup',function(){
			document.body.removeEventListener('mousemove',fn)
		})
		function fn(e){
			let lefts=e.clientX-ox,tops=e.clientY-oy;
			box.style.left = lefts+'px';
			box.style.top = tops+'px';
		}
	})
})*/
///////////////////////面向对象////////////////////
class Drag{
	constructor(obj){
		this.obj=obj;
	}
	move(){
		let that =this;
		this.obj.addEventListener('mousedown',function(e){
			let ox = e.offsetX,oy = e.offsetY;
			document.addEventListener('mousemove',fn);
			that.obj.addEventListener('mouseup',function(){
				document.removeEventListener('mousemove',fn)
			})

			function fn(e){
			let lefts=e.clientX-ox,tops=e.clientY-oy;
			that.obj.style.left = lefts+'px';
			that.obj.style.top = tops+'px';
			}
		})
	}
}