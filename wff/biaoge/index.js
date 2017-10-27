window.onload=function(){
	let table = document.querySelector('tbody');
	let add = document.querySelector('.addbtn');
	let students = new storage();
	load();
	function load(){
		let result=students.getData();

		result.forEach((element,index)=>{
			ntr(element,index);
		})
	}
	
	function ntr(obj,i){
		let trs = document.createElement('tr');
		trs.id = i;
		for(let j in obj){
			trs.innerHTML+= `<td type=${j}>${obj[j]}</td>`
		}
		trs.innerHTML += `<td class="del"><button class="delbtn">删除</button></td>`
		table.appendChild(trs)
	}
	
	table.ondblclick=function(e){
		let element= e.target;
		if(element.nodeName=='TD' && element.className!='del'){
			let oldv = element.innerText;
			element.innerText=''
			let inputs = document.createElement('input');
			inputs.value=oldv;
			element.appendChild(inputs);
			inputs.onblur=function(){
				let newv = this.value.trim();

				element.removeChild(inputs);
				if(newv){
					element.innerText=newv;
				}else{
					element.innerText=oldv;
				}

				let index = element.parentNode.id,
					key = element.getAttribute('type'),
					value = element.innerText;	
				students.update(index,key,value);
			}
		}else if(element.nodeName=='BUTTON'){
			let trs = element.parentNode.parentNode;
			table.removeChild(trs);
			let index = trs.id;
			students.del(index)
			table.innerHTML='';
			load();
		}
		
	}

	add.onclick=function (){
		let obj = {name:'博雅',sex:'女',age:18,phone:'5465456',address:'山西柳林'}
    	ntr(obj,table.childElementCount)
    	students.push(obj)
 	}

}




/*function ntr(element,index){
		let trs = document.createElement('tr');
		trs.id = index;
		trs.innerHTML=`
			<td type='name'>${element.name}</td>
			<td type='sex'>${element.sex}</td>
			<td type='age'>${element.age}</td>
			<td type='phone'>${element.phone}</td>
			<td type='address'>${element.address}</td>
			<td class="del"><button class="delbtn">删除</button></td>
		`
		table.appendChild(trs)
	}*/