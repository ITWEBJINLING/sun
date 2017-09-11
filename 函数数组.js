//一维数组最大值
function zumax(arr){
			var max=arr[0];
			for(var i=0;i<=arr.length;i++){
				if(max<arr[i]){
					max=arr[i]
				}
			}
			document.write(max);
		}

		var arr1=[1,5,8,51,72,25];
		zumax(arr1);
//二维数组最大值
function ermax(arr2){
		max=arr2[0][0];
		for(i=0;i<arr2.length;i++){
			for(j=0;j<arr2[i].length;j++){
				if(max<arr2[i][j]){
					max=arr2[i][j];
				}
			}
		}
		document.write(max);
	}
//一维数组排序
function pai(arr){
	for(i=0;i<arr.length;i++){
		for(j=i+1;j<arr.length;j++){
			if(arr[i]<arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	document.write(arr);
}
//在数组的后面添加任意个元素
function push(arr){
		for(var i=1;i<arguments.length;i++){
			arr[arr.length]=arguments[i]
		}			
	console.log(arr);
}
//任意数组任意排序  
function sort(arr,type){
	//四种默认值
	//第一
	if(type==undefined){
		type='<';
	}
	//第二
		//type=type==undefined?'>':type;
	//第三
	//type=type||'<'
	//第四
	//function sort(arr,type='<'){    ----实参传的是undefined 会使用默认值
	if(type=='<'){
		sortUp(arr);
	}
	if(type=='>'){
		sortDown(arr);
	}
}
//升序
function sortUp(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	console.log(arr);
}  
//降序  
function sortDown(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]<arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	console.log(arr);
}   




//rest参数    必须放在最后
function push(arr,...value){
		for(var i=0;i<value.length;i++){
			arr[arr.length]=value[i]
		}			
	console.log(arr);
}


//return判断数组是否存在某一个特定值，存在true  false
function exist(arr,value){
	if(!(typeof arr=='object'&&arguments.length>1)){
		return '输入错误';
	}
	for(var i=0;i<arr.length;i++){
		if(value==arr[i]){
			return true;
		}
	}
	return false;
}



//数组转换成字符
function join(arr,str){
	var result='';
	if(str==undefined){
		str='+';
	}
	// str = str == undefined ? '+' : str;
	str = str|| '+';
	for(var i=0;i<arr.length;i++){
		if(i<arr.length-1){
			result += arr[i]+str;
		}else{
			result+=arr[i];
		}
	}
	return result;
}


//函数作为参数

function aa(num1,num2){
	return num1*2+num2;
}
function bb(num1,num2){
	return num1-num2;
}
function cc(num1,num2){
	return num1/num2;
}

function math(num1,num2,fn){
	return fn(num1,num2);
}

console.log(math(5,6,aa));


//映射   map
function map(arr,fn){
	var newarr=[];
	for(var i=0;i<arr.length;i++){
		newarr[newarr.length]=fn(arr[i])
	}
	return newarr;
}


//filter
function filter(arr,fn){
	var newarr=[];
	for(var i=0;i<arr.length;i++){
		if(fn(arr[i])){
			newarr[newarr.length]=arr[i];
		}
	}
	return newarr;
}

//是否存在某个数
function exist(arr,value){
	if(!(typeof arr=='object'&&arguments.length>1)){
		return '输入错误';
	}
	for(var i=0;i<arr.length;i++){
		if(value==arr[i]){
			return i;
		}
	}
	return -1;
}


//indexof   首次位置
function indexof(arr,value){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==value){
			return i;
		}
	}
	return -1;
}
//最后一次位置
function lastIndexOf(arr,value){
	for(var i=arr.length-1;i>=0;i--){
		if(arr[i]==value){
			return i;
		}
	}
	return -1;
}
//反转
function reverse(arr){
	var newarr=[];
	for(var i=arr.length-1;i>-1;i--){
		//newarr[newarr.length]=arr[i];
		push(newarr,arr[i]);
	}
	return newarr;
}

function push(arr,...rest){
	for(var i=0;i<rest.length;i++){
		arr[arr.length]=rest[i];
	}
	return arr;
}




//万能的删除
function spliceCancle(arr,pos,num){
	var newarr=[];
	for(i=0;i<arr.length;i++){
		if(i>=pos && i< pos+num){
			continue;
		}
		newarr[newarr.length]=arr[i]
	}
	return newarr;
}


//万能的添加
/*
1.在pos前，放arr
2.等于pos时，放rest
3.pos及之后，放arr
 */
function spliceAdd(arr,pos,...rest){
	var newarr=[];
	for(var i=0;i<pos;i++){
		newarr[newarr.length] = arr[i]
	}
	for(var i=0;i<rest.length;i++){
		newarr[newarr.length] = rest[i]
	}
	for(var i=pos;i<arr.length;i++){
		newarr[newarr.length] = arr[i]
	}
	return newarr;
}



//万能的添加或删除
function splice(arr,pos,num,...rest){
	var newarr = spliceCancle(arr,pos,num);
	if(rest.length>0){
		newarr = spliceAdd(newarr,pos,...rest);
	}
	return newarr;
}


//回调函数
//map
var arr=[45,98,7,5,7]
var result=map(arr,function(value){
	return value*2;
})
console.log(result);
function map(arr,fn){
	var newarr=[];
	for(i=0;i<arr.length;i++){
		newarr[newarr.length]=fn(arr[i])
	}
	return newarr;
}

//filter
function filter(arr,fn){
	var newarr=[];
	for(i=0;i<arr.length;i++){
		if(fn(arr[i])){
			newarr[newarr.length]=fn(arr[i])
		}
	}
}

//存在大于0输出true
function some(arr,fn){
	for(var i=0;i<arr.length;i++){
		if(fn(arr[i])){
			return true;
		}
	}
	return false;
}


//全部大于0输出true
function every(arr,fn){
	for(var i=0;i<arr.length;i++){
		if(!fn(arr[i]))
			return false;
	}
	return true;
}

//递归函数   自己调用自己  不是循环
function fn(num){
	if(num<5){
		fn(++num)
		alert(num);
	}
}

//地址  （浅拷贝）
//传值   （深拷贝）
//copy数组 当为二维数组时
function copy(arr){
	var newarr=[];
	for(var i=0;i<arr.length;i++){
		if(typeof arr[i]=='object'){
			newarr[i]=copy(arr[i])
		}else{
			newarr[i]=arr[i]
		}	
	}
	return newarr;
}