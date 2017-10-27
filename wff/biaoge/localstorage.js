class storage{
	constructor(){
		this.data=[{name:'刘倩',sex:'女',age:18,phone:'5465456',address:'山西柳林'},
				{name:'博雅',sex:'女',age:18,phone:'5465456',address:'山西柳林'},
				{name:'wff',sex:'女',age:18,phone:'5465456',address:'山西柳林'}
				];
	}
	_init(){
		localStorage.setItem('students',JSON.stringify(this.data));
	}
	getData(){
		let data = localStorage.getItem('students');
		if(!data){
			this._init();
		}
		return this.data = JSON.parse(localStorage.getItem('students'))
	}
	update(index,key,value){
		this.data[index][key] = value;
		this.save();
	}
	del(index){
		this.data.splice(index,1);
		this.save();
	}
	push(obj){

		this.data.push(obj);
		this.save();
	}
	save(){
		localStorage.setItem('students',JSON.stringify(this.data));
	}
}


/*
	信息存到本地
	封装一个对象
	属性   描述
		 存数据 

	方法  功能
			init  getData  save  update  clear  remove  

		修改：  哪一条  属性   修改后的值  
				this.data[index][key]=[value]
		保存  ：

		删除 ：  几行  splice



		修改后
 */