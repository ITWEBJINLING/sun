$(function(){

	let textarea = document.querySelector('textarea');
	let input = document.querySelector('input');
	let text = $('#text');
	let user = $('#user');
	let span = $('span')[0];
	let bt = $('button')[0];
	let ul = $('ul')[0];
	let nstr='';
	let nstr1='';
	console.log(nstr);
	textarea.addEventListener('keyup',function(e){
		let str = text.value;
		let str1 =user.value
		span.innerHTML=`当前可输入字符数为${this.maxLength-str.length}`;
		
		nstr=str;
		nstr1=str1;

		if(e.keyCode==13 && e.keyCode==17){
			if(nstr==''){
				alert('请输入留言内容')
			}else{
				fn();
			}
		}
		console.log(e.keyCode)
	})	
	
	bt.addEventListener('click',function(){
		if(nstr==''){
			alert('请输入留言内容')
		}else{
			fn();
		}
	})
	function fn(){
		text.value=null;
		user.value=null;
		let li = document.createElement('li');
		li.className='li';
		li.innerHTML=`
		<h3>${nstr1}</h3>
		<p>${nstr}</p>
		`
		ul.prepend(li);
		nstr='';
		span.innerHTML=`当前可输入字符数为${200}`;
	}
	ul.onmouseover=function(e){
		let element=e.target;
		if(element.nodeName=='LI'){
			console.log(1)
			element.style.background='purple'
		}
	}
	ul.onmouseout=function(e){
		let element=e.target;
		if(element.nodeName=='LI'){
			element.style.background='none'
		}
	}

	
})