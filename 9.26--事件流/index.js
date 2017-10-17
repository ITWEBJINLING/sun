window.onload=function(){
	let table = document.querySelector('tbody');
	let add = document.querySelector('.addbtn');

	let students=[{name:'刘倩',sex:'女',age:18,phone:'5465456',address:'山西柳林'},
				{name:'刘倩',sex:'女',age:18,phone:'5465456',address:'山西柳林'},
				{name:'刘倩',sex:'女',age:18,phone:'5465456',address:'山西柳林'}
				]

	students.forEach(element=>{
		ntr(element);
	})
	function ntr(element){
		let trs = document.createElement('tr');
		trs.innerHTML=`
			<td>${element.name}</td>
			<td>${element.sex}</td>
			<td>${element.age}</td>
			<td>${element.phone}</td>
			<td>${element.address}</td>
			<td class="del"><button class="delbtn">删除</button></td>
		`
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
			}
		}else if(element.nodeName=='BUTTON'){
			let trs = element.parentNode.parentNode;
			table.removeChild(trs);
		}
		
	}
	
	let qd = document.querySelector('.qd')
	let a = document.querySelectorAll('.a');
	console.log(a)
	let hz = document.querySelector('.hz')
	
		qd.onclick=function () {
	    let lis = `
	    <tr>
	      <td>${a[0].value}</td>
	      <td>${a[1].value}</td>
	      <td>${a[2].value}</td>
	      <td>${a[3].value}</td>
	      <td>${a[4].value}</td>
	      <td><button class="delbtn">删除</button></td>
	    </tr>`;
		 a.forEach((element)=>{
		    element.value='';
		})
	    table.innerHTML+= lis;
	    hz.style.display='none';
	  }
	
	  add.onclick=function () {
    hz.style.display='block';
  }
	

	let reserch = document.querySelector('.reserch');
	let cha = document.querySelector('.cha')
	console.log(cha)
	reserch.onclick=function(){

	}

}