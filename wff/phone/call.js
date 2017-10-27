window.addEventListener('load',function(){
	let data = [{name:'刘倩',tel:'13080302167',py:"liuqian"},
			   {name:'宋三三',tel:'18834071243',py:"songsansan"},
			   {name:'彭艳婷',tel:'18834073886',py:"pengyanting"},
			   {name:'裴岳英',tel:'18106537091',py:"peiyueying"},
			   {name:'王方方',tel:'13099031302',py:"wangfangfang"},
			   {name:'董博雅',tel:'18434373879',py:"dongboya"},
			   {name:'张三',tel:'18434373880',py:"zhangsan"},
			   {name:'李四',tel:'18434373881',py:"lisi"},
			   {name:'王景',tel:'18434373882',py:"wangjing"},
			   {name:'王涵',tel:'18434373883',py:"wanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			   {name:'张涵',tel:'18434373883',py:"zhanghan"},
			  ]
	let dl = document.querySelector('dl')
	let input = document.querySelector('input')
	let num = document.getElementById('num')
	let ul = document.querySelector('ul')
	let title = document.querySelector('.title')
	let header = document.querySelector('header')
	let word = document.querySelector('.word')
	//获取数据
	render(data);
	//按首字母获取数据
    input.onkeyup=function(){
        let values = num.value.trim();
        console.log(values)
        let char =data.filter(element =>{
            return element.name.includes(values) || element.tel.includes(values) || element.py.includes(values)
        })
        render(char);
    }
	function render(data){
        ul.innerHTML =''
        dl.innerHTML =''
		let obj={};
		data.forEach(function(element){
			let first = element.py.charAt(0).toUpperCase();
			if(!obj[first]){
				obj[first] = [];
			}
			obj[first].push(element);	
		})
		//首字母排序
		let char = Object.keys(obj).sort();
		word.innerText=char[0]
		char.forEach(element=>{
			dl.innerHTML += `<dt>${element}</dt>`;
			ul.innerHTML += `<li>${element}</li>`
			obj[element].forEach(value=>{
				dl.innerHTML += `<dd><a href="tel:${value.tel}">${value.name}</a></dd>`
			})
		})
		ul.style.marginTop=`${-ul.offsetHeight/2}px`

	}
	let dt = document.querySelectorAll('dt')
	console.log(dt)
		//获取所有dt 
	let arr=[];
	//存放所有dt到页面顶端距离
	dt.forEach(element=>{
			arr.push(element.offsetTop);
		})
	window.addEventListener('scroll',function(){
		word.style.display="bolck";
		let scrolltop = document.documentElement.scrollTop;
		let innerHeight = title.offsetHeight +header.offsetHeight;
		
		arr.forEach((value,index)=>{

			if(scrolltop+innerHeight>=value ){

				word.innerText = dt[index].innerText;
			}
		})

	})//scroll结尾

})  //onload结尾