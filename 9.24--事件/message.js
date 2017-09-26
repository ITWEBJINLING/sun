$(function(){

	let textarea = document.querySelector('textarea');
	let text = $('#text');
	let span = $('span')[0];
	let bt = $('button')[0];
	let ul = $('ul')[0];
	let nstr='';
	console.log(nstr);
	textarea.addEventListener('keyup',function(e){
		let str = text.value;
		span.innerHTML=`当前可输入字符数为${100-str.length}`;
		nstr=str;
		console.log(nstr)
		if(e.keyCode==13&&e.keyCode==17){
			fn();
		}
		if(e.keyCode==13){
			fn();
		}
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
		let li = document.createElement('li');
		li.className='li';
		li.innerHTML=nstr;
		ul.appendChild(li)
	}
})