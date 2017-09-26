/*//寻找当前元素后面的指定兄弟元素
function next(element,tagname){
	let parent=element.parentNode;
	let child = parent.children;
	let index=0;

	for(let i=0;i<child.length;i++){
		if(child[i]==element){
			index=i;
			break;
		}
	}
	let nextAll = Array.from(child).slice(index+1);
	for(let i=0;i<nextAll.length;i++){
		if(nextAll[i].nodeName==tagname.toUpperCase()){
			return nextAll[i];
		}
	}
}
//寻找当前元素后面的所有兄弟元素
function nextAll(element){
	let parent=element.parentNode;
	let child = parent.children;
	let index=0;
	for(let i=0;i<child.length;i++){
		if(child[i]==element){
			index=i;
			break;
		}
	}
	let nextAll = Array.from(child).slice(index+1);
	return nextAll;
}
//寻找当前元素后面的指定兄弟元素
function previous(element,tagname){
	let parent=element.parentNode;
	let child = parent.children;
	let index=0;
	for(let i=0;i<child.length;i++){
		if(child[i]==element){
			index=i;
			break;
		}
	}
	let nextAll = Array.from(child).slice(0,index);
	for(let i=0;i<nextAll.length;i++){
		if(nextAll[i].nodeName==tagname.toUpperCase()){
			return nextAll[i];
		}
	}
}
//寻找当前元素前面的所有兄弟元素
function previousAll(element){
	let parent=element.parentNode;
	let child = parent.children;
	let index=0;
	for(let i=0;i<child.length;i++){
		if(child[i]==element){
			index=i;
			break;
		}
	}
	let nextAll = Array.from(child).slice(0,index);
	return nextAll;
}*/
//寻找当前元素相近的父元素
function closed(element,tagname){
	let parent=element.parentNode;
	while(parent.nodeName!=null){
		parent=parent.parentNode;
		while(parent.nodeName==tagname.toUpperCase()){
			return parent;
		}
		return null;
	}
}
//寻找当前元素所有的父元素
function closedAll(element){
	if(element.nodeName=='BODY'||element.nodeName=='html');
	let parent=element.parentNode;
	let newarr=[];
	while(parent.nodeName!='BODY'){
		newarr.push(parent)	;	
		parent=parent.parentNode;
	}
	return newarr;
}

///////////////////////////////////while///////////////////////////////
//寻找当前元素后面的指定兄弟元素
function next(element,tagname){
	let child = element.nextElementSibling;
	if(child == null){
		return null;
	}
	while(child.nodeName!=tagname.toUpperCase()){
		child=child.nextElementSibling;
		if(child == null){
		return null;
		}
		while(child.nodeName==tagname.toUpperCase()){
			return child;
		}
	}
}
//寻找当前元素后面的所有兄弟元素
function nextAll(element){
	let newarr=[];
	let child = element.nextElementSibling;
	if(child == null){
		return null;
	}
	while(child!=null){
		newarr.push(child)
		child=child.nextElementSibling;
	}
	return newarr;
}
//寻找当前元素前面的指定兄弟元素
function previous(element,tagname){
	let child = element.previousElementSibling;
	if(child == null){
		return null;
	}
	while(child.nodeName!=tagname.toUpperCase()){
		child=child.nextElementSibling;
		if(child == null){
		return null;
		}
		while(child.nodeName==tagname.toUpperCase()){
			return child;
		}
	}
}
//寻找当前元素前面的所有兄弟元素
function previousAll(element){
	let newarr=[];
	let child = element.previousElementSibling;
	while(child!=null){
		newarr.push(child)
		child=child.previousElementSibling;
	}
	return newarr;
}