/*function getClass(classname){
	if(false){
		return document.getElementsByClassName(classname);
	}else{
		var newarr=[];
		var all=document.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			if(all[i].className==classname){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}*/
function getClass(classname,ranger){
	ranger= ranger ? ranger : document;
	if(false){      //document.getElementsByClassName
		return ranger.getElementsByClassName(classname);
	}else{
		var newarr=[];
		var all=ranger.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			if( select(all[i].className,classname) ){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
function select(className,classname){
	var arr = className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i]==classname){
			return true;
		}
	}
	return false;
}
function $(select,ranger){
	if(typeof select=='string'){
		ranger= ranger ? ranger : document;
		var first=select.charAt(0);
		if(first=='.'){
			return getClass(select.substring(1),ranger);
		}else if(first =='#'){
			return document.getElementById(select.substring(1));
		}else if(/^[a-z][a-z1-6]{0,6}$/){
			return ranger.getElementsByTagName(select);
		}
	}else if(typeof select == 'function'){
		window.addEventListener('load',select)
	}
}