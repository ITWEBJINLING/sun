/////////在子元素的后面添加一个元素/////////
HTMLElement.prototype.insertAfter=function(element,position){
	let next = position.nextElementSibling;
	let parent =position.parentNode;
	if(next){
		parent.insertBefore(element, next)
	}else{
		parent.appendChild(element)
	}
}
/////////在父元素的最前面添加一个元素/////////
HTMLElement.prototype.prepend=function(element){
	let next = this.firstElementChild;
	if(next){
		this.insertBefore(element, next)
	}else{
		this.appendChild(element)
	}
}
/////////将子元素插入到父元素的最后///////////////
HTMLElement.prototype.appendto=function(element){
	element.appendChild(this)
}
/////////////////将子元素插入到父元素的最前面////////
HTMLElement.prototype.prependto=function(element){
	let next = element.firstElementChild;
	if(next){
		element.insertBefore(this, next)
	}else{
		element.appendChild(this)
	}
}