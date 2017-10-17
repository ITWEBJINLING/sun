function Snake(){
	this.snake=['1_0','2_0','3_0']
	this.sence = document.querySelector('.sence');
	this.flag={'1_0':true,'2_0':true,'3_0':true,}
	this.direction = 40;
	this.food = '';
}
Snake.prototype={
	start:function(){
		this.drawLine();
		this.drawSnake();
		this.move();
		this.key();
		this.dropFood();
	},
	drawLine:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.sence.innerHTML +=`<div class="block" 
				id ="${i}_${j}"></div>`
			}
		}
	},
	drawSnake:function(){
		this.snake.forEach(element=>{
			document.getElementById(element).classList.add('hot')
		})
	},
	move:function(){
		this.t=setInterval(function(){
			let oldt = this.snake[this.snake.length-1];
			let newarr=oldt.split('_');
			let newt = '';
			if(this.direction ==37){
				newt = `${newarr[0]}_${newarr[1]*1-1}`;
			}else if(this.direction ==38){
				newt = `${newarr[0]*1-1}_${newarr[1]}`;
			}else if(this.direction ==39){
				newt = `${newarr[0]}_${newarr[1]*1+1}`;
			}else if(this.direction ==40){
				newt = `${newarr[0]*1+1}_${newarr[1]*1}`;
			}else{
				clearInterval(this.t)
				alert('over')
				return;
			}

			//边界
			if(newt.split('_')[0]< 0 || newt.split('_')[0]>19||newt.split('_')[1]< 0 || newt.split('_')[1]>19||this.flag[newt]){
				clearInterval(this.t)
				alert('game over')
				return;
			}
			//头碰到身子  
			/*this.snake.forEach(element=>{
				if(newt == element){
					clearInterval(this.t)
					alert('game over')
					return;	
				}
			})*/
			//是否吃到食物
			if( newt == this.food){
				document.getElementById(this.food).classList.remove('color');
				this.snake.push(newt);
				this.flag[newt]=true;
				this.dropFood()
				this.drawSnake();
			}else{
				this.snake.push(newt);
				this.flag[newt]=true;
				let weiba =this.snake.shift();
				delete this.flag[weiba]
				document.getElementById(weiba).classList.remove('hot')
				this.drawSnake();
			}
			
		}.bind(this),400);		
	},
	key:function(){
		document.onkeydown=function(e){
			let keycode = e.keyCode;
			if(Math.abs(keycode -this.direction) ==2){
				return;
			}
			this.direction = keycode;
		}.bind(this)
	},
	dropFood:function(){	
		let x = Math.floor(Math.random()*20);
		let y = Math.floor(Math.random()*20);
		do{
			x =Math.floor(Math.random()*20);
			y = Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`])
		
		this.food = `${x}_${y}`;
		document.getElementById(this.food).classList.add('color')
	}
}//结束